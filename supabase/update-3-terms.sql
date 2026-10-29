-- H.I.T. Academy update 3: record when each student accepted the Terms and Conditions.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.

-- Latest accepted version on the profile, for a quick look on the control board.
alter table public.profiles add column if not exists terms_version text;
alter table public.profiles add column if not exists terms_accepted_at timestamptz;

-- Full history: one row each time a student accepts a version. Never edited or deleted by students.
create table if not exists public.terms_acceptances (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  version text not null,
  accepted_at timestamptz not null default now(),
  via text not null default 'signup'
);
create index if not exists terms_acceptances_user_idx on public.terms_acceptances (user_id);
alter table public.terms_acceptances enable row level security;
drop policy if exists "Students read their own terms acceptances" on public.terms_acceptances;
create policy "Students read their own terms acceptances" on public.terms_acceptances
  for select using ((select auth.uid()) = user_id);

-- Students may change their own name, but not the acceptance record (only the functions below write it).
revoke update on public.profiles from authenticated, anon;
grant update (name) on public.profiles to authenticated;

-- New accounts: copy the name and the accepted Terms version, timestamped by the database clock.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare v text := nullif(new.raw_user_meta_data ->> 'terms_version', '');
begin
  insert into public.profiles (id, email, name, terms_version, terms_accepted_at)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'name', ''), v, case when v is not null then now() end)
  on conflict (id) do nothing;
  if v is not null then
    insert into public.terms_acceptances (user_id, version, via) values (new.id, v, 'signup');
  end if;
  return new;
end;
$$;

-- Existing students accepting the current (or a changed) version after signing in.
create or replace function public.accept_terms(p_version text) returns timestamptz
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); t timestamptz := now();
begin
  if uid is null then raise exception 'Not signed in'; end if;
  if coalesce(p_version, '') = '' then raise exception 'Missing version'; end if;
  update public.profiles set terms_version = p_version, terms_accepted_at = t where id = uid;
  insert into public.terms_acceptances (user_id, version, accepted_at, via) values (uid, p_version, t, 'prompt');
  return t;
end;
$$;
revoke execute on function public.accept_terms(text) from public, anon;
grant execute on function public.accept_terms(text) to authenticated;

-- Accounts created before this update that already accepted at sign-up (recorded on the account).
update public.profiles p set terms_version = u.raw_user_meta_data ->> 'terms_version',
  terms_accepted_at = coalesce((u.raw_user_meta_data ->> 'terms_accepted_at')::timestamptz, u.created_at)
from auth.users u
where u.id = p.id and p.terms_version is null and coalesce(u.raw_user_meta_data ->> 'terms_version', '') <> '';
