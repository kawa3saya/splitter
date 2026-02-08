-- Add deleted_at (nullable) to payments for soft delete
ALTER TABLE payments
  ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;

-- Add deleted_at (nullable) to debtors for soft delete
ALTER TABLE debtors
  ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
