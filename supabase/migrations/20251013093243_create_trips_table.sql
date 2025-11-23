create table trips (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  base_currency text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);