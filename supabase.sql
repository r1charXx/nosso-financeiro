-- Cole todo este arquivo no SQL Editor do Supabase e clique em Run.
create table if not exists public.transactions (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 type text not null check(type in ('income','expense')),person text not null,description text not null,
 amount numeric(12,2) not null check(amount>0),category text not null,date date not null,
 created_at timestamptz not null default now()
);
create table if not exists public.bills (
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 title text not null,amount numeric(12,2) not null check(amount>=0),due_date date not null,
 paid boolean not null default false,created_at timestamptz not null default now()
);
create table if not exists public.goals (
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 name text not null,target_amount numeric(12,2) not null check(target_amount>0),
 current_amount numeric(12,2) not null default 0 check(current_amount>=0),
 deadline date,created_at timestamptz not null default now()
);
create table if not exists public.couple_settings (
 user_id uuid primary key references auth.users(id) on delete cascade,
 person_one text not null default 'Você',person_two text not null default 'Esposa'
);
alter table public.transactions enable row level security;
alter table public.bills enable row level security;
alter table public.goals enable row level security;
alter table public.couple_settings enable row level security;
drop policy if exists "own_transactions" on public.transactions;
create policy "own_transactions" on public.transactions for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists "own_bills" on public.bills;
create policy "own_bills" on public.bills for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists "own_goals" on public.goals;
create policy "own_goals" on public.goals for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists "own_settings" on public.couple_settings;
create policy "own_settings" on public.couple_settings for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
