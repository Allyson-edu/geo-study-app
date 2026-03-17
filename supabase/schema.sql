-- ==========================================
-- GeoStudy App — Schema SQL
-- Execute no Supabase SQL Editor
-- ==========================================

-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text,
  avatar_level integer default 1,
  total_xp integer default 0,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_study_date date,
  created_at timestamptz default now()
);

-- Disciplines
create table if not exists disciplines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  area text not null check (area in ('pre_course', 'graduation')),
  semester integer,
  icon text,
  color text,
  xp_value integer default 100,
  order_index integer default 0,
  created_at timestamptz default now()
);

-- Modules
create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  discipline_id uuid references disciplines on delete cascade,
  title text not null,
  description text,
  order_index integer default 0,
  is_locked boolean default false,
  created_at timestamptz default now()
);

-- Lessons
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules on delete cascade,
  title text not null,
  description text,
  order_index integer default 0,
  xp_reward integer default 10,
  created_at timestamptz default now()
);

-- User Progress
create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles on delete cascade,
  lesson_id uuid references lessons on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  notes text,
  unique(user_id, lesson_id)
);

-- Achievements
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  xp_bonus integer default 0,
  condition_type text
);

-- User Achievements
create table if not exists user_achievements (
  user_id uuid references profiles on delete cascade,
  achievement_id uuid references achievements on delete cascade,
  unlocked_at timestamptz default now(),
  primary key (user_id, achievement_id)
);

-- ==========================================
-- Row Level Security
-- ==========================================
alter table profiles enable row level security;
alter table user_progress enable row level security;
alter table user_achievements enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view own progress" on user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on user_progress for update using (auth.uid() = user_id);

create policy "Public can view disciplines" on disciplines for select using (true);
create policy "Public can view modules" on modules for select using (true);
create policy "Public can view lessons" on lessons for select using (true);

-- ==========================================
-- Trigger: auto-criar perfil no signup
-- ==========================================
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
