-- H.I.T. Academy update 9: course reviews by students who bought the course.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- Server only: every read and write goes through the site's server (api/reviews.js), which checks
-- that the writer bought the course and lets only Raad publish or reject. Row security is on with
-- no policies, so the browser can never read or change this table directly.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users on delete cascade, -- one review per student; deleting the account deletes it
  display_name text not null,           -- "Sara M.", never the full name or email
  rating smallint not null check (rating between 1 and 5),
  body text not null,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  reject_reason text,
  google_clicked_at timestamptz,         -- the student opened Google's review page from the app
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  decided_at timestamptz
);
create index if not exists reviews_status on public.reviews (status, created_at desc);
alter table public.reviews enable row level security;
