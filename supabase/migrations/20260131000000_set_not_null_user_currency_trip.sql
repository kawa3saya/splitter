-- payments: user_id, currency_id, trip_id を NOT NULL に
ALTER TABLE payments
  ALTER COLUMN user_id SET NOT NULL,
  ALTER COLUMN currency_id SET NOT NULL,
  ALTER COLUMN trip_id SET NOT NULL;

-- users: trip_id を NOT NULL に
ALTER TABLE users
  ALTER COLUMN trip_id SET NOT NULL;
