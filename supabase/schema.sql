-- Run in Supabase → SQL Editor when you are ready for real data.
-- After you wire Supabase Auth and set `orders.user_id`, enable RLS on `orders` and add policies.

create extension if not exists "uuid-ossp";

create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Bakery', 'Restaurant', 'Supermarket', 'Cafe', 'Deli')),
  description text,
  image_url text,
  banner_url text,
  rating numeric,
  distance_km numeric,
  address text,
  city text,
  bag_price numeric,
  bags_available integer,
  pickup_start text,
  pickup_end text,
  bag_description text,
  food_saved_kg numeric,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  store_id text not null,
  store_name text not null,
  store_image text,
  store_category text,
  bag_price numeric not null,
  quantity numeric,
  total_amount numeric,
  commission numeric,
  pickup_start text,
  pickup_end text,
  status text not null default 'Reserved' check (status in ('Reserved', 'Collected', 'Cancelled')),
  pickup_date text,
  user_email text,
  order_code text,
  user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz default now()
);

create index if not exists orders_user_id_created_at_idx on public.orders (user_id, created_at desc);

alter table public.stores enable row level security;

create policy "stores_select_public"
  on public.stores for select
  using (true);

-- RLS on `orders` is off until Auth + `user_id` are wired; then enable and scope by user_id.
alter table public.orders disable row level security;
