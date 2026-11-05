-- H.I.T. Academy update 7: the members' community forum.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- Server only: every read and write goes through the site's server (api/forum.js), which checks
-- who may post, applies the community rules and records moderation. Row security is on with no
-- policies, so the browser can never read or change these tables directly.

-- Members' forum profiles: the display name shown on posts (never the email), when they accepted
-- the community rules, and whether Raad has blocked them from posting.
create table if not exists public.forum_members (
  user_id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  rules_accepted_at timestamptz,
  blocked_at timestamptz,
  blocked_reason text,
  created_at timestamptz not null default now()
);
alter table public.forum_members enable row level security;

create table if not exists public.forum_threads (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  user_id uuid references auth.users on delete cascade, -- deleting an account deletes the conversations it started
  pinned boolean not null default false,
  locked boolean not null default false,
  reply_count integer not null default 0,
  last_post_at timestamptz not null default now(),
  removed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists forum_threads_list on public.forum_threads (category, pinned desc, last_post_at desc);
alter table public.forum_threads enable row level security;

-- Every post, including the first one of each thread (is_first).
-- removed_*: taken down by Raad (the author still sees why). deleted_at: deleted by the author.
create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.forum_threads on delete cascade,
  user_id uuid references auth.users on delete cascade, -- deleting an account deletes its posts
  is_first boolean not null default false,
  body text not null,
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  deleted_at timestamptz,
  removed_at timestamptz,
  removed_reason text,
  removed_note text
);
create index if not exists forum_posts_thread on public.forum_posts (thread_id, created_at);
create index if not exists forum_posts_user on public.forum_posts (user_id, created_at desc);
alter table public.forum_posts enable row level security;

-- Reports (notices under the EU Digital Services Act). Kept after they are resolved, as a record.
create table if not exists public.forum_reports (
  id bigint generated always as identity primary key,
  post_id uuid references public.forum_posts on delete set null,
  reporter_id uuid references auth.users on delete set null,
  reason text not null,
  details text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolution text  -- 'removed' or 'kept'
);
create index if not exists forum_reports_open on public.forum_reports (resolved_at, created_at desc);
alter table public.forum_reports enable row level security;
