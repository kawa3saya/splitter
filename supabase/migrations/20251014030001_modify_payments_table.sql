-- Remove currency column and add currency_id to payments table
ALTER TABLE payments DROP COLUMN currency;
ALTER TABLE payments ADD COLUMN currency_id UUID REFERENCES currencies(id) ON DELETE CASCADE;
