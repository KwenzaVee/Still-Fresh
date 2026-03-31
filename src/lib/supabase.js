import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when both URL and anon key are set (e.g. in `.env.local`). */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Supabase browser client. Use the anon key only; never put the service role key in the frontend.
 * If env vars are missing, this is `null` — keep using mock/local data until configured.
 */
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
