-- H.I.T. Academy update 11: profile photos in the members' community.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- The photo is a small square picture (about 10 KB) stored with the member's community profile.
-- Like the rest of the community it is server only (row security on, no policies), and it is
-- deleted with the account, because forum_members is deleted with the account.

alter table public.forum_members add column if not exists avatar text;      -- the picture (base64), never sent to the browser in lists
alter table public.forum_members add column if not exists avatar_v bigint;  -- when it was uploaded; empty = no photo
