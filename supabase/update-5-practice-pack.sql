-- H.I.T. Academy update 5: AI role-play practice pack for complete-course buyers.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- Complete-course buyers get a fixed number of AI role-play messages in the Practice studio
-- (no expiry). They are counted here, apart from the AI coach messages (coach_usage), so they
-- never use up the free taster or a subscriber's monthly allowance. Server only.
create table if not exists public.practice_usage (
  user_id uuid not null references auth.users on delete cascade,
  day date not null default current_date,
  count integer not null default 0,
  primary key (user_id, day)
);
alter table public.practice_usage enable row level security;

-- Counts one practice message and returns today's count (for the daily limit).
create or replace function public.bump_practice_usage(p_user uuid) returns integer
language sql security definer set search_path = '' as $$
  insert into public.practice_usage (user_id, day, count) values (p_user, current_date, 1)
  on conflict (user_id, day) do update set count = public.practice_usage.count + 1
  returning count;
$$;
revoke execute on function public.bump_practice_usage(uuid) from public, anon, authenticated;

-- All practice messages a student has used so far.
create or replace function public.practice_usage_total(p_user uuid) returns integer
language sql stable security definer set search_path = '' as $$
  select coalesce(sum(count), 0)::integer from public.practice_usage where user_id = p_user;
$$;
revoke execute on function public.practice_usage_total(uuid) from public, anon, authenticated;
