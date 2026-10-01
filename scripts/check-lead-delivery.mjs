import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as zod from "zod";

function compile(path) {
  return ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
}

const schemaExports = {};
vm.runInNewContext(compile("../src/lib/quoteSchema.ts"), {
  exports: schemaExports,
  require(name) {
    assert.equal(name, "zod");
    return zod;
  },
});
const compiledRoute = compile("../src/app/api/quote/route.ts");
const lead = {
  name: "Sample Customer",
  phone: "(610) 555-0100",
  email: "homeowner@example.test",
  service: "Kitchen Remodeling",
  city: "Allentown",
  zip: "18101",
  timeline: "Exploring options",
  details: "Replace kitchen cabinets and counters.",
  website: "",
};
const phoneDisplay = "(484) 706-9229";
const providerPrivateText = "provider-private-response-do-not-expose";

// Run the actual route in an isolated VM. Environment, fetch, SMTP, Manager,
// and NextResponse are mocked; this never reads credentials or contacts a server.
function route({
  webhook = "unconfigured",
  email = "unconfigured",
  manager = "unconfigured",
  facebook = "unconfigured",
  schema = schemaExports.quoteSchema,
} = {}) {
  const calls = { fetch: [], mail: [], manager: [], transports: [], logs: [] };
  const env = {};
  if (webhook !== "unconfigured") env.LEADS_WEBHOOK_URL = "https://webhook.example.test/leads";
  if (email !== "unconfigured") {
    Object.assign(env, {
      SMTP_HOST: "smtp.example.test",
      SMTP_USER: "sender@example.test",
      SMTP_PASS: "synthetic-test-password",
    });
  }
  if (facebook !== "unconfigured") {
    Object.assign(env, { NEXT_PUBLIC_FB_PIXEL_ID: "test-pixel", FB_CONVERSIONS_API_TOKEN: "synthetic-test-token" });
  }
  const exports = {};
  vm.runInNewContext(compiledRoute, {
    exports,
    process: { env },
    console: Object.fromEntries(
      ["log", "warn", "error"].map((level) => [level, (...values) => calls.logs.push({ level, values })]),
    ),
    async fetch(url, options) {
      calls.fetch.push({ url, options });
      const mode = url.includes("graph.facebook.com") ? facebook : webhook;
      if (mode === "throw") throw new Error(providerPrivateText);
      return { ok: mode === "success", status: mode === "success" ? 200 : 502, text: async () => providerPrivateText };
    },
    require(name) {
      if (name === "next/server")
        return {
          NextResponse: { json: (body, options = {}) => ({ status: options.status ?? 200, json: async () => body }) },
        };
      if (name === "nodemailer")
        return {
          createTransport(options) {
            calls.transports.push(options);
            return {
              async sendMail(payload) {
                calls.mail.push(payload);
                if (email !== "success") throw new Error(providerPrivateText);
                return { accepted: ["quotes@example.test"] };
              },
            };
          },
        };
      if (name === "@/lib/leadIntake")
        return {
          async forwardToManagerAppLead(payload) {
            calls.manager.push(payload);
            if (manager === "throw") throw new Error(providerPrivateText);
            if (manager === "success") return { forwarded: true, status: 201, leadId: "test-lead" };
            if (manager === "failure")
              return { forwarded: false, reason: "non_2xx", status: 502, responseText: providerPrivateText };
            return { forwarded: false, reason: "missing_api_key" };
          },
        };
      if (name === "@/content/site") return { siteConfig: { primaryEmail: "quotes@example.test", phoneDisplay } };
      if (name === "@/lib/quoteSchema") return { quoteSchema: schema };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  async function submit(body = lead, ip = "192.0.2.1") {
    return exports.POST(
      new Request("https://site.example.test/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": ip, "user-agent": "Lead delivery test" },
        body: JSON.stringify(body),
      }),
    );
  }
  return { submit, calls, POST: exports.POST };
}

async function assertUnavailable(api) {
  const response = await api.submit();
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.match(body.message, new RegExp(phoneDisplay.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert(!JSON.stringify(body).includes(providerPrivateText));
  const logs = JSON.stringify(api.calls.logs);
  assert(!logs.includes(providerPrivateText));
  assert(!logs.includes(lead.email));
  assert(!logs.includes(lead.phone));
  assert(!logs.includes("synthetic-test-password"));
  assert(!logs.includes("synthetic-test-token"));
}

test("unconfigured delivery channels return503 and log skipped acknowledgements honestly", async () => {
  const api = route();
  await assertUnavailable(api);
  assert.equal(api.calls.fetch.length, 0);
  assert.equal(api.calls.mail.length, 0);
  const outcomes = api.calls.logs.flatMap((log) => log.values).filter((value) => value?.outcome);
  assert.equal(outcomes.length, 4);
  assert(outcomes.every((result) => result.outcome === "skipped"));
});

test("all configured delivery failures return503 without private provider response text", async () => {
  const api = route({ webhook: "failure", email: "failure", manager: "failure", facebook: "failure" });
  await assertUnavailable(api);
  assert.equal(api.calls.fetch.length, 2);
  assert.equal(api.calls.mail.length, 1);
  assert.equal(api.calls.manager.length, 1);
});

test("network exceptions cannot produce a success acknowledgement", async () => {
  await assertUnavailable(route({ webhook: "throw", email: "failure", manager: "throw", facebook: "throw" }));
});

test("Facebook analytics success alone is not contact delivery", async () => {
  const api = route({ facebook: "success" });
  await assertUnavailable(api);
  assert.equal(api.calls.fetch.length, 1);
  assert(
    api.calls.logs.some((log) =>
      log.values.some((value) => value?.channel === "Facebook conversion (analytics)" && value.outcome === "delivered"),
    ),
  );
});

for (const channel of ["webhook", "email", "manager"]) {
  test(`${channel} alone can acknowledge real contact delivery`, async () => {
    const api = route({ [channel]: "success" });
    const response = await api.submit();
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    if (channel === "manager") {
      assert.equal(api.calls.manager[0].contactName, lead.name);
      assert.equal(api.calls.manager[0].city, lead.city);
      assert.equal(api.calls.manager[0].serviceType, lead.service);
    }
  });
}

test("partial contact/analytics failure retains success when a contact channel acknowledged", async () => {
  const api = route({ webhook: "failure", email: "success", manager: "failure", facebook: "failure" });
  const response = await api.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.fetch.length, 2);
  assert.equal(api.calls.mail.length, 1);
  assert.equal(api.calls.manager.length, 1);
});

test("all real channels can receive the same valid request", async () => {
  const api = route({ webhook: "success", email: "success", manager: "success", facebook: "success" });
  const response = await api.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.fetch.length, 2);
  assert.equal(api.calls.mail.length, 1);
  assert.equal(api.calls.manager.length, 1);
  assert.equal(JSON.parse(api.calls.fetch[0].options.body).lead.name, lead.name);
  assert.equal(api.calls.mail[0].replyTo, lead.email);
});

test("invalid actual schema input returns400 with field errors and no deliveries", async () => {
  const api = route({ webhook: "success", email: "success", manager: "success" });
  const response = await api.submit({ ...lead, phone: "-------" });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.ok, false);
  assert(body.errors.phone.length);
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});

test("existing schema rejects a populated honeypot before attempting deliveries", async () => {
  const api = route();
  const response = await api.submit({ ...lead, website: "https://bot.example.test" });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});

test("isolated honeypot decoy branch remains a no-delivery acknowledgement", async () => {
  // The current production schema rejects nonempty website values. Isolate the
  // already-present decoy branch without changing that validation contract.
  const api = route({ schema: { safeParse: (data) => ({ success: true, data }) } });
  const response = await api.submit({ ...lead, website: "bot" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});

test("existing rate limit returns429 before a ninth delivery from the same IP", async () => {
  const api = route({ manager: "success" });
  for (let index = 0; index < 8; index++) assert.equal((await api.submit()).status, 200);
  const response = await api.submit();
  assert.equal(response.status, 429);
  assert.equal((await response.json()).ok, false);
  assert.equal(api.calls.manager.length, 8);
});

test("malformed JSON retains500 generic fallback without attempting a delivery", async () => {
  const api = route();
  const response = await api.POST({
    json: async () => {
      throw new Error(providerPrivateText);
    },
  });
  const body = await response.json();
  assert.equal(response.status, 500);
  assert.equal(body.ok, false);
  assert(!JSON.stringify(body).includes(providerPrivateText));
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});
