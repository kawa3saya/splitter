-- Add paid_at (required) to payments
ALTER TABLE payments
  ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;

-- Backfill: use created_at for existing rows
UPDATE payments SET paid_at = created_at WHERE paid_at IS NULL;

ALTER TABLE payments
  ALTER COLUMN paid_at SET NOT NULL;

-- Default for new rows
ALTER TABLE payments
  ALTER COLUMN paid_at SET DEFAULT NOW();
