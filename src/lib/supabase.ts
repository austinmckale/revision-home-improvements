import { createClient } from "@supabase/supabase-js";

const url = process.env.PORTFOLIO_SUPABASE_URL ?? "";
const key = process.env.PORTFOLIO_SUPABASE_ANON_KEY ?? "";

export const supabase = url && key ? createClient(url, key) : null;
