-- H.I.T. Academy update 6: Practice studio scores.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- The server keeps each Practice studio role-play (so its transcript can't be changed in the browser)
-- and records the score of every feedback report. Server only: students read their own scores
-- through the site's server, never directly.
create table if not exists public.practice_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users on delete cascade,
  scenario_id text not null,
  turns jsonb not null default '[]'::jsonb,
  scored boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists practice_sessions_user on public.practice_sessions (user_id, created_at desc);
alter table public.practice_sessions enable row level security;

create table if not exists public.practice_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  session_id uuid,
  scenario_id text not null,
  level text not null,
  overall integer,           -- 0-100, or null when too few skills were shown
  passed boolean not null default false,
  skills jsonb not null default '[]'::jsonb,
  report jsonb,
  learner_turns integer,
  created_at timestamptz not null default now()
);
create index if not exists practice_attempts_user on public.practice_attempts (user_id, created_at);
alter table public.practice_attempts enable row level security;
