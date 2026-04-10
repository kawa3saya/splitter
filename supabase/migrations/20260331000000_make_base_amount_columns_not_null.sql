-- Make amount_in_base_currency and amount_owed_in_base NOT NULL
ALTER TABLE payments
  ALTER COLUMN rate_to_base SET NOT NULL,
  ALTER COLUMN amount_in_base_currency SET NOT NULL;

ALTER TABLE debtors
  ALTER COLUMN amount_owed_in_base SET NOT NULL;
