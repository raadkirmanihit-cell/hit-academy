-- H.I.T. Academy update 4: AI coach monthly subscription.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.

-- One row per student: their coach subscription as Stripe last reported it.
-- Only the server writes it (from Stripe's notifications); students can read their own row.
create table if not exists public.coach_subscriptions (
  user_id uuid primary key references auth.users on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text not null default 'none',          -- Stripe status: active, trialing, past_due, canceled, unpaid, incomplete…
  amount integer,                               -- price per month in cents
  currency text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  started_at timestamptz,
  livemode boolean not null default false,
  consent_at timestamptz,                       -- asked to start now (withdrawal-right notice), see the Terms
  updated_at timestamptz not null default now()
);
alter table public.coach_subscriptions enable row level security;
drop policy if exists "Students read their own coach subscription" on public.coach_subscriptions;
create policy "Students read their own coach subscription" on public.coach_subscriptions
  for select using ((select auth.uid()) = user_id);

-- Every monthly payment (Stripe invoice), for the revenue figures on the control board.
create table if not exists public.coach_payments (
  stripe_invoice_id text primary key,
  user_id uuid references auth.users on delete set null,
  amount integer not null default 0,
  currency text,
  status text not null default 'paid',           -- paid or refunded
  livemode boolean not null default false,
  payment_intent text,
  paid_at timestamptz not null default now(),
  refunded_at timestamptz
);
alter table public.coach_payments enable row level security;

-- How many coach messages a student has sent since a date (for the free taster and the monthly cap).
create or replace function public.coach_usage_since(p_user uuid, p_since date) returns integer
language sql stable security definer set search_path = '' as $$
  select coalesce(sum(count), 0)::integer from public.coach_usage where user_id = p_user and day >= p_since;
$$;
revoke execute on function public.coach_usage_since(uuid, date) from public, anon, authenticated;
