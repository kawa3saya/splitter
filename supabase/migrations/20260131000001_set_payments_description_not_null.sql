-- Backfill NULL descriptions before adding NOT NULL constraint
UPDATE payments SET description = '' WHERE description IS NULL;

ALTER TABLE payments
  ALTER COLUMN description SET NOT NULL;
