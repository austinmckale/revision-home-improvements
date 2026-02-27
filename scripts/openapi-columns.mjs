import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE;
if (!url || !key) throw new Error("Missing env");

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  Accept: "application/openapi+json",
};

const res = await fetch(`${url}/rest/v1/`, { headers });
if (!res.ok) {
  throw new Error(`OpenAPI fetch failed: ${res.status} ${res.statusText}`);
}
const openapi = await res.json();

const tables = ["Kpi", "KpiTarget", "ActivityLog", "AuditLog", "ChangeOrderLineItem", "EstimateLineItem", "InvoiceLineItem", "JobAssignment", "JobScheduleEvent", "PortalMessage", "TimeEntry", "Task", "ShareLink", "PortalLink", "Payment", "Expense", "Lead", "ChangeOrder", "Estimate", "Invoice", "FileAsset", "Job", "Customer", "UserProfile", "Organization", "OrganizationSetting"];
for (const table of tables) {
  const schema = openapi.components?.schemas?.[table];
  const props = schema?.properties ? Object.keys(schema.properties) : [];
  console.log(`${table}: ${props.join(", ")}`);
}
