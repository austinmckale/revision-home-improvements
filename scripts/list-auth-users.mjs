import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE;
if (!url || !key) throw new Error("Missing env");

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

const { data, error } = await supabase.auth.admin.listUsers({ perPage: 200 });
if (error) throw error;
console.log(JSON.stringify(data.users.map(u => ({ id: u.id, email: u.email, createdAt: u.created_at, lastSignInAt: u.last_sign_in_at })), null, 2));
