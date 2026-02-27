import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !serviceRole) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE env vars.");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.resolve(__dirname, "..", "backup", `supabase-${timestamp}`);
fs.mkdirSync(outDir, { recursive: true });

const headers = {
  apikey: serviceRole,
  Authorization: `Bearer ${serviceRole}`,
};

async function fetchOpenApi() {
  const res = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers: {
      ...headers,
      Accept: "application/openapi+json",
    },
  });
  if (!res.ok) {
    throw new Error(`OpenAPI fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function getTableNames(openapi) {
  const paths = openapi.paths || {};
  const names = Object.keys(paths)
    .map((p) => p.replace(/^\//, ""))
    .filter((p) => p && !p.includes("/") && p !== "rpc" && p !== "health" && p !== "")
    .filter((p) => !p.startsWith("pg_") && !p.startsWith("graphql"));
  return Array.from(new Set(names)).sort();
}

async function fetchTable(table) {
  const pageSize = 1000;
  let from = 0;
  let total = null;
  const rows = [];

  while (true) {
    const to = from + pageSize - 1;
    const url = new URL(`${supabaseUrl}/rest/v1/${table}`);
    url.searchParams.set("select", "*");

    const res = await fetch(url, {
      headers: {
        ...headers,
        Range: `${from}-${to}`,
        Prefer: "count=exact",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed ${table} ${res.status}: ${text}`);
    }

    const contentRange = res.headers.get("content-range") || "";
    if (total === null && contentRange.includes("/")) {
      const totalPart = contentRange.split("/")[1];
      const parsed = Number(totalPart);
      if (!Number.isNaN(parsed)) total = parsed;
    }

    const page = await res.json();
    if (Array.isArray(page)) rows.push(...page);

    if (!Array.isArray(page) || page.length < pageSize) break;
    from += pageSize;
  }

  return { rows, total: total ?? rows.length };
}

async function main() {
  const openapi = await fetchOpenApi();
  const tables = getTableNames(openapi);

  const summary = [];
  for (const table of tables) {
    const { rows, total } = await fetchTable(table);
    const payload = { table, count: total, rows };
    fs.writeFileSync(path.join(outDir, `${table}.json`), JSON.stringify(payload, null, 2));
    summary.push({ table, count: total });
  }

  fs.writeFileSync(
    path.join(outDir, "_summary.json"),
    JSON.stringify({ supabaseUrl, createdAt: new Date().toISOString(), tables: summary }, null, 2),
  );

  console.log(`Backup complete: ${outDir}`);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
