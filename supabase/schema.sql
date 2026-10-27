-- H.I.T. Academy database: run once in Supabase (SQL Editor -> New query -> paste -> Run).
-- Safe to re-run: every statement checks whether it already exists.

-- 1. Profiles: one row per student, created automatically when they register.
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null default '',
  email text not null,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "Students read their own profile" on public.profiles;
create policy "Students read their own profile" on public.profiles
  for select using ((select auth.uid()) = id);
drop policy if exists "Students update their own profile" on public.profiles;
create policy "Students update their own profile" on public.profiles
  for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Purchases: written only by the server after Stripe confirms a payment.
create table if not exists public.purchases (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  product_id text not null,
  status text not null default 'paid',
  amount integer,
  currency text,
  stripe_session_id text unique,
  withdrawal_waiver boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists purchases_user_idx on public.purchases (user_id);
alter table public.purchases enable row level security;
drop policy if exists "Students read their own purchases" on public.purchases;
create policy "Students read their own purchases" on public.purchases
  for select using ((select auth.uid()) = user_id);

-- 3. Progress: lessons done, quiz scores, reflections (one JSON document per student).
create table if not exists public.progress (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;
drop policy if exists "Students read their own progress" on public.progress;
create policy "Students read their own progress" on public.progress
  for select using ((select auth.uid()) = user_id);
drop policy if exists "Students add their own progress" on public.progress;
create policy "Students add their own progress" on public.progress
  for insert with check ((select auth.uid()) = user_id);
drop policy if exists "Students update their own progress" on public.progress;
create policy "Students update their own progress" on public.progress
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- 4. AI coach usage: a daily count per student, used for the fair-use limit. Server only.
create table if not exists public.coach_usage (
  user_id uuid not null references auth.users on delete cascade,
  day date not null default current_date,
  count integer not null default 0,
  primary key (user_id, day)
);
alter table public.coach_usage enable row level security;

create or replace function public.bump_coach_usage(p_user uuid) returns integer
language sql security definer set search_path = '' as $$
  insert into public.coach_usage (user_id, day, count) values (p_user, current_date, 1)
  on conflict (user_id, day) do update set count = public.coach_usage.count + 1
  returning count;
$$;
revoke execute on function public.bump_coach_usage(uuid) from public, anon, authenticated;

-- Purchases: remember the Stripe payment, whether it was a real (live) payment, and when it was refunded.
alter table public.purchases add column if not exists payment_intent text;
alter table public.purchases add column if not exists livemode boolean not null default false;
alter table public.purchases add column if not exists refunded_at timestamptz;

-- Messages: students write to Raad from inside the course. Only the server reads and writes this table.
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete set null,
  name text not null default '',
  email text not null,
  subject text not null default '',
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);
create index if not exists messages_created_idx on public.messages (created_at desc);
alter table public.messages enable row level security;
