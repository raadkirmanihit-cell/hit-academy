-- H.I.T. Academy update 11: saved AI coach chats and the optional coach profile.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- What it adds:
--   coach_chats    one row per coach chat (title, messages, prep sheet), so students can come back
--                  to a conversation, switch between chats and delete them.
--   coach_profiles the short, optional "about you" answers the coach uses to tailor its advice.
-- Students can only see and change their own rows. Both are deleted together with the account.
-- Until this update is run, the site keeps chats and the profile in the student's browser only.

create table if not exists public.coach_chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  title text not null default '',
  kind text not null default 'coach',          -- 'coach' or 'rehearsal'
  parent_id uuid references public.coach_chats on delete set null, -- the coach chat a rehearsal came from
  messages jsonb not null default '[]'::jsonb,
  prep jsonb,                                    -- the latest prep sheet made from this chat
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists coach_chats_user_updated on public.coach_chats (user_id, updated_at desc);
alter table public.coach_chats enable row level security;
drop policy if exists "Students read their own coach chats" on public.coach_chats;
create policy "Students read their own coach chats" on public.coach_chats
  for select using ((select auth.uid()) = user_id);
drop policy if exists "Students add their own coach chats" on public.coach_chats;
create policy "Students add their own coach chats" on public.coach_chats
  for insert with check ((select auth.uid()) = user_id);
drop policy if exists "Students update their own coach chats" on public.coach_chats;
create policy "Students update their own coach chats" on public.coach_chats
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Students delete their own coach chats" on public.coach_chats;
create policy "Students delete their own coach chats" on public.coach_chats
  for delete using ((select auth.uid()) = user_id);

create table if not exists public.coach_profiles (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.coach_profiles enable row level security;
drop policy if exists "Students read their own coach profile" on public.coach_profiles;
create policy "Students read their own coach profile" on public.coach_profiles
  for select using ((select auth.uid()) = user_id);
drop policy if exists "Students add their own coach profile" on public.coach_profiles;
create policy "Students add their own coach profile" on public.coach_profiles
  for insert with check ((select auth.uid()) = user_id);
drop policy if exists "Students update their own coach profile" on public.coach_profiles;
create policy "Students update their own coach profile" on public.coach_profiles
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Students delete their own coach profile" on public.coach_profiles;
create policy "Students delete their own coach profile" on public.coach_profiles
  for delete using ((select auth.uid()) = user_id);
