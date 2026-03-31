import { MOCK_STORES } from "@/components/shared/mockData";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const useSupabase = import.meta.env.VITE_DATA_SOURCE === "supabase" && isSupabaseConfigured;

export async function listStores() {
  if (!useSupabase) return MOCK_STORES;

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getStoreById(id) {
  if (!useSupabase) {
    return MOCK_STORES.find((store) => String(store.id) === String(id)) || MOCK_STORES[0];
  }

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (data) return data;

  const stores = await listStores();
  return stores[0] || null;
}
