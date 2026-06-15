-- Run this in Supabase SQL Editor

-- Users table (parents + children)
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role text not null default 'child', -- 'child' | 'parent'
  name text not null,
  parent_id uuid references users(id),
  grade int default 5,
  created_at timestamptz default now()
);

-- Subscriptions
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null default 'free', -- 'free' | 'monthly' | 'yearly'
  status text not null default 'active', -- 'active' | 'cancelled' | 'past_due'
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Quiz results per question
create table quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  subject text not null,
  topic text not null,
  question_id text not null,
  correct boolean not null,
  time_taken_seconds int,
  created_at timestamptz default now()
);

-- Daily usage (for freemium limit)
create table daily_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  date date not null default current_date,
  questions_answered int default 0,
  unique(user_id, date)
);

-- Streak tracking
create table streaks (
  user_id uuid primary key references users(id) on delete cascade,
  current_streak int default 0,
  longest_streak int default 0,
  last_active_date date
);

-- Indexes
create index on quiz_results(user_id, created_at desc);
create index on quiz_results(user_id, subject);
create index on daily_usage(user_id, date);
