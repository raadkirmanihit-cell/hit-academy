-- H.I.T. Academy update 8: deleting a student's account keeps the payment records.
-- Run once in Supabase (SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- German tax law requires payment records to be kept for up to 10 years (§ 147 AO, § 257 HGB).
-- Before this update, deleting an account (control board -> Students -> Delete account) also deleted
-- its purchases. After it, the purchase rows stay (amount, date, Stripe reference) and only lose
-- the link to the deleted account. Everything else still goes with the account.

alter table public.purchases alter column user_id drop not null;
alter table public.purchases drop constraint if exists purchases_user_id_fkey;
alter table public.purchases
  add constraint purchases_user_id_fkey foreign key (user_id) references auth.users on delete set null;
