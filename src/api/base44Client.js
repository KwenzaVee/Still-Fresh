import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const ORDERS_KEY = "stillfresh_orders";
const USER_KEY = "stillfresh_user";
const useSupabase = import.meta.env.VITE_DATA_SOURCE === "supabase" && isSupabaseConfigured;

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const ensureUser = () => {
  const existing = readJson(USER_KEY, null);
  if (existing) return existing;

  const demoUser = {
    id: "demo-user",
    full_name: "Still Fresh User",
    email: "user@stillfresh.app",
    role: "user",
  };
  writeJson(USER_KEY, demoUser);
  return demoUser;
};

const createOrder = async (payload) => {
  if (useSupabase) {
    const { data, error } = await supabase
      .from("orders")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  }

  const orders = readJson(ORDERS_KEY, []);
  const created = {
    id: crypto.randomUUID ? crypto.randomUUID() : `order_${Date.now()}`,
    created_date: new Date().toISOString(),
    ...payload,
  };
  orders.unshift(created);
  writeJson(ORDERS_KEY, orders);
  return created;
};

const listOrders = async (_sort = "-created_date", limit = 20) => {
  if (useSupabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  const orders = readJson(ORDERS_KEY, []);
  return orders.slice(0, limit);
};

export const base44 = {
  auth: {
    me: async () => ensureUser(),
    logout: () => {
      localStorage.removeItem(USER_KEY);
    },
    redirectToLogin: () => {
      window.location.assign("/");
    },
  },
  entities: {
    Order: {
      create: createOrder,
      list: listOrders,
    },
  },
};
