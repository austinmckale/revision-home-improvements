import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/portfolio.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function asset(index, categoryTags = ["Kitchen remodeling"], overrides = {}) {
  return {
    id: String(index).padStart(4, "0"),
    storageKey: `projects/${index}.jpg`,
    fileName: `${index}.jpg`,
    stage: "AFTER",
    area: "Kitchen",
    tags: ["asset-tag"],
    description: `Photo ${index}`,
    takenAt: "2026-01-01T00:00:00.000Z",
    isPortfolio: true,
    type: "PHOTO",
    Job: { jobName: `Job ${index}`, categoryTags },
    ...overrides,
  };
}

// Evaluate the real loader with cache and database mocks; never read credentials
// or make a network request. Each query applies the real filters/order/range.
function loader(rows, { configured = true, failure } = {}) {
  const requests = [];
  const cacheCalls = [];
  const client = {
    from(table) {
      assert.equal(table, "FileAsset");
      const request = { filters: [], orders: [] };
      const query = {
        select(columns) {
          assert.match(columns, /Job:jobId/);
          return query;
        },
        eq(key, value) {
          request.filters.push([key, value]);
          return query;
        },
        order(key, options) {
          request.orders.push([key, options]);
          return query;
        },
        limit(value) {
          request.limit = value;
          return query;
        },
        range(start, end) {
          request.range = [start, end];
          return query;
        },
        then(resolve, reject) {
          requests.push(request);
          return Promise.resolve()
            .then(() => {
              const failed = failure?.(request, requests.length);
              if (failed instanceof Error) throw failed;
              if (failed) return failed;
              let data = rows.filter((row) => request.filters.every(([key, value]) => row[key] === value));
              data = data.toSorted((left, right) => {
                for (const [key, options] of request.orders) {
                  if (left[key] === right[key]) continue;
                  return (left[key] < right[key] ? -1 : 1) * (options.ascending ? 1 : -1);
                }
                return 0;
              });
              if (request.range) data = data.slice(request.range[0], request.range[1] + 1);
              else if (request.limit) data = data.slice(0, request.limit);
              return { data, error: null };
            })
            .then(resolve, reject);
        },
      };
      return query;
    },
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    process: { env: { PORTFOLIO_SUPABASE_URL: "https://portfolio.example.test" } },
    require(name) {
      if (name === "./supabase") return { supabase: configured ? client : null };
      assert.equal(name, "next/cache");
      return {
        unstable_cache(fn, keys, options) {
          cacheCalls.push({ keys, options });
          return fn;
        },
      };
    },
  });
  return { get: exports.getPortfolioImages, requests, cacheCalls };
}

const ids = (images) => Array.from(images, (image) => image.id);

test("filtered limit counts matches after an entirely unrelated first page", async () => {
  const rows = Array.from({ length: 150 }, (_, index) =>
    asset(index, index >= 100 ? ["BATHROOM renovation"] : ["Kitchen"]),
  );
  const { get, requests } = loader(rows);
  const images = await get({ serviceTags: ["bathroom"], limit: 2 });
  assert.deepEqual(ids(images), ["0100", "0101"]);
  assert.deepEqual(
    requests.map((request) => request.range),
    [
      [0, 99],
      [100, 199],
    ],
  );
  assert.ok(requests.every((request) => request.limit === undefined));
  assert.ok(requests.every((request) => request.orders[1][0] === "id"));
});

test("every page preserves publishing, photo and stage filters and job tag semantics", async () => {
  const rows = Array.from({ length: 230 }, (_, index) => asset(index, ["Kitchen"]));
  rows[120] = asset(120, ["Water DAMAGE Restoration"], { stage: "BEFORE" });
  rows[121] = asset(121, ["Water DAMAGE Restoration"], { isPortfolio: false });
  rows[122] = asset(122, ["Water DAMAGE Restoration"], { type: "DOCUMENT" });
  rows[123] = asset(123, null, { tags: ["water"] });
  rows[124] = asset(124, ["Water DAMAGE Restoration"]);
  rows[125] = asset(125, ["Fire rebuild"]);
  const { get, requests } = loader(rows);
  assert.deepEqual(ids(await get({ serviceTags: ["water damage", "fire"], stage: "AFTER", limit: 2 })), [
    "0124",
    "0125",
  ]);
  assert.equal(requests.length, 2);
  for (const request of requests) {
    assert.deepEqual(request.filters, [
      ["isPortfolio", true],
      ["type", "PHOTO"],
      ["stage", "AFTER"],
    ]);
    assert.equal(request.orders[0][0], "takenAt");
    assert.equal(request.orders[0][1].ascending, false);
  }
});

test("a later page error or exception discards partial results", async () => {
  const rows = Array.from({ length: 200 }, (_, index) => asset(index, index === 0 ? ["Bathroom"] : ["Kitchen"]));
  for (const failure of [
    (_request, count) => count === 2 && { data: null, error: { message: "Unavailable" } },
    (_request, count) => count === 2 && new Error("Unavailable"),
    (_request, count) => count === 2 && { data: null, error: null },
  ]) {
    const { get, requests } = loader(rows, { failure });
    assert.deepEqual(ids(await get({ serviceTags: ["bathroom"], limit: 2 })), []);
    assert.equal(requests.length, 2);
  }
});

test("short or empty final pages end the scan with available matches", async () => {
  const rows = Array.from({ length: 125 }, (_, index) => asset(index, index === 115 ? ["Bathroom"] : ["Kitchen"]));
  const { get, requests } = loader(rows);
  assert.deepEqual(ids(await get({ serviceTags: ["bathroom"], limit: 3 })), ["0115"]);
  assert.equal(requests.length, 2);
  const empty = loader([]);
  assert.deepEqual(ids(await empty.get({ serviceTags: ["bathroom"], limit: 3 })), []);
  assert.equal(empty.requests.length, 1);
});

test("sparse categories stop at 1,000 scanned rows", async () => {
  const rows = Array.from({ length: 1100 }, (_, index) => asset(index, index === 1050 ? ["Bathroom"] : ["Kitchen"]));
  const { get, requests } = loader(rows);
  assert.deepEqual(ids(await get({ serviceTags: ["bathroom"], limit: 3 })), []);
  assert.equal(requests.length, 10);
  assert.deepEqual(requests.at(-1).range, [900, 999]);
});

test("requests without a matching limit remain bounded", async () => {
  const rows = Array.from({ length: 1100 }, (_, index) => asset(index, ["Bathroom"]));
  for (const limit of [undefined, 0, 1200]) {
    const { get, requests } = loader(rows);
    assert.equal((await get({ serviceTags: ["bathroom"], limit })).length, 1000);
    assert.equal(requests.length, 10);
  }
});

test("unfiltered requests retain one-query limit and image mapping behavior", async () => {
  const { get, requests, cacheCalls } = loader([
    asset(0, null, { description: null, tags: null, Job: null }),
    asset(1, ["Bathroom"]),
    asset(2, ["Kitchen"]),
  ]);
  const images = await get({ serviceTags: [], stage: "AFTER", limit: 2 });
  assert.deepEqual(ids(images), ["0000", "0001"]);
  assert.equal(images[0].alt, "0.jpg");
  assert.equal(images[0].jobName, "");
  assert.equal(images[0].tags.length, 0);
  assert.equal(
    images[0].url,
    "https://portfolio.example.test/storage/v1/object/public/site-public/projects/0.jpg?width=1200&quality=80",
  );
  assert.match(images[0].thumbnail, /width=480&quality=80$/);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].limit, 2);
  assert.equal(requests[0].range, undefined);
  assert.equal(requests[0].orders.length, 1);
  assert.equal(cacheCalls[0].keys[0], "portfolio-images");
  assert.equal(cacheCalls[0].options.tags[0], "portfolio");
  assert.equal(cacheCalls[0].options.revalidate, 3600);
});

test("unconfigured clients and query errors retain the empty fallback", async () => {
  const absent = loader([], { configured: false });
  assert.deepEqual(ids(await absent.get()), []);
  assert.equal(absent.requests.length, 0);
  const failed = loader([asset(0)], { failure: () => ({ data: null, error: { message: "Unavailable" } }) });
  assert.deepEqual(ids(await failed.get({ limit: 2 })), []);
});
