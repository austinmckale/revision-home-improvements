import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE;
if (!url || !key) throw new Error("Missing env");

const supabase = createClient(url, key, { auth: { persistSession: false } });

const tables = ["KpiTarget", "AuditLog", "ActivityLog"];
for (const table of tables) {
  const { data, error } = await supabase.from(table).select("*").limit(1);
  if (error) throw error;
  console.log(table, JSON.stringify(data, null, 2));
}
