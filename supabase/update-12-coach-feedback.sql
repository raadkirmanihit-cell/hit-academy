-- H.I.T. Academy update 12: anonymous feedback on the AI coach's plans.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- When a learner gives a plan a thumbs up or down, the AI writes a short anonymous analysis of how
-- the conversation went. Only that analysis is stored here: no learner id, no chat text, no names.
-- Only the server (service role) can write or read it; Raad sees a summary in the control board.

create table if not exists public.coach_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  rating text not null check (rating in ('up', 'down')),
  reason text,                 -- the tapped reason on a thumbs down, if any
  version text,                -- which version of the coach's rules gave the plan
  situation text,              -- general kind of situation, e.g. 'client'
  summary text,                -- at most 12 general words
  question_rounds int,
  went_well jsonb not null default '[]'::jsonb,
  went_wrong jsonb not null default '[]'::jsonb,
  area text,                   -- the part of the coach most responsible for the rating
  lesson text                  -- one general sentence for the next rule review
);
create index if not exists coach_feedback_created on public.coach_feedback (created_at desc);
alter table public.coach_feedback enable row level security;
-- No policies on purpose: students can't read or write this table; the server uses the service role.
