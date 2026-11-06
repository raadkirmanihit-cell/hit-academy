-- H.I.T. Academy update 10: what a review is about (the complete course, a module, the Arena or the AI coach).
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
alter table public.reviews add column if not exists topic text not null default 'course';
