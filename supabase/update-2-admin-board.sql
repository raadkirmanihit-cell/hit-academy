-- H.I.T. Academy update 2: admin control board (refunds, live vs test payments, student messages).
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.

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
