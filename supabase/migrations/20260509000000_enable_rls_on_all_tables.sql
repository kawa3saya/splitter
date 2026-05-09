-- Enable Row Level Security on all public tables.
-- No policies are created, so the anon and authenticated roles get zero access.
-- Server-side code must use the service_role key (which bypasses RLS).

alter table trips enable row level security;
alter table users enable row level security;
alter table currencies enable row level security;
alter table payments enable row level security;
alter table debtors enable row level security;
