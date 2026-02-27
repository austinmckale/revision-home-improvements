import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE;
if (!url || !key) throw new Error("Missing env");

const keepEmails = [
  "codex-test@rhipros.com",
  "rhisolutions316@gmail.com",
  "austinmck17@gmail.com",
];

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

const NEQ_UUID = "00000000-0000-0000-0000-000000000000";

async function deleteAll(table) {
  const { error } = await supabase.from(table).delete().neq("id", NEQ_UUID);
  if (error) throw new Error(`${table} delete failed: ${error.message}`);
}

async function deleteAllWhere(table, column, values) {
  const { error } = await supabase
    .from(table)
    .delete()
    .not(column, "in", `(${values.map((v) => `\"${v}\"`).join(",")})`);
  if (error) throw new Error(`${table} delete failed: ${error.message}`);
}

async function updateRoleToOwner(table, emails) {
  const { error } = await supabase
    .from(table)
    .update({ role: "OWNER", isActive: true })
    .in("email", emails);
  if (error) throw new Error(`${table} update failed: ${error.message}`);
}

async function main() {
  const orderedDeletes = [
    "ChangeOrderLineItem",
    "EstimateLineItem",
    "InvoiceLineItem",
    "JobAssignment",
    "JobScheduleEvent",
    "PortalMessage",
    "TimeEntry",
    "Task",
    "ShareLink",
    "PortalLink",
    "Payment",
    "Expense",
    "KpiTarget",
    "Kpi",
    "Lead",
    "ChangeOrder",
    "Estimate",
    "Invoice",
    "FileAsset",
    "Job",
    "Customer",
    "ActivityLog",
    "AuditLog",
  ];

  for (const table of orderedDeletes) {
    await deleteAll(table);
  }

  // Keep Organization + OrganizationSetting
  await deleteAllWhere("UserProfile", "email", keepEmails);
  await updateRoleToOwner("UserProfile", keepEmails);

  console.log("Wipe complete. Kept Organization/OrganizationSetting + admin UserProfiles.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
