-- Add rate_to_base and amount_in_base_currency columns to payments table
ALTER TABLE payments
  ADD COLUMN rate_to_base numeric,
  ADD COLUMN amount_in_base_currency numeric;
