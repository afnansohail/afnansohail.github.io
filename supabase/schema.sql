-- supabase/schema.sql
-- Run this once in the Supabase SQL Editor for the project (see supabase/README.md).

create table public.leaderboard (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  score integer not null,
  created_at timestamptz not null default now()
);

alter table public.leaderboard enable row level security;

-- Anyone (the public anon key) may read the leaderboard directly.
-- There is deliberately no insert/update/delete policy for anon here:
-- writes only ever happen through the submit-score Edge Function,
-- which uses the service-role key and bypasses RLS entirely.
create policy "public can read leaderboard"
  on public.leaderboard
  for select
  to anon
  using (true);

create index leaderboard_score_idx on public.leaderboard (score desc);

-- Single-use session tokens, issued by start-session, consumed by submit-score.
-- No RLS policies for anon: only the service-role client (inside the Edge
-- Functions) may touch this table.
create table public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  used_at timestamptz
);

alter table public.game_sessions enable row level security;

-- Per-IP submission attempts, used by submit-score for rate limiting.
-- Same as above: service-role only, no anon policies.
create table public.submission_log (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  created_at timestamptz not null default now()
);

alter table public.submission_log enable row level security;

create index submission_log_ip_created_at_idx
  on public.submission_log (ip, created_at);
