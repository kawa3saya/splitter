create table payments (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id) on delete cascade,
  amount numeric not null,
  currency text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);