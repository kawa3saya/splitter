-- ==========================================
-- 🌱 Splitter Seed Data
-- ==========================================

-- トリップを作成し、IDを変数に保存
DO $$
DECLARE
  european_trip_id UUID;
  london_trip_id UUID;
  nordic_trip_id UUID;
  
  -- ユーザーID変数
  alice_id UUID;
  bob_id UUID;
  carol_id UUID;
  david_id UUID;
  emma_id UUID;
  alice_nordic_id UUID;
  bob_nordic_id UUID;
  carol_nordic_id UUID;
  
  -- 通貨ID変数
  eur_currency_id UUID;
  gbp_currency_id UUID;
  czk_currency_id UUID;
  sek_currency_id UUID;
  nok_currency_id UUID;
  dkk_currency_id UUID;
  
  -- 支払いID変数
  hotel_payment_id UUID;
  lunch_payment_id UUID;
  souvenirs_payment_id UUID;
  dinner_payment_id UUID;
  coffee_payment_id UUID;
  stockholm_payment_id UUID;
  oslo_payment_id UUID;
  copenhagen_payment_id UUID;
BEGIN
  -- 1. トリップを作成
  INSERT INTO trips (title, base_currency) VALUES ('European Adventure', 'eur') RETURNING id INTO european_trip_id;
  INSERT INTO trips (title, base_currency) VALUES ('London Business Trip', 'gbp') RETURNING id INTO london_trip_id;
  INSERT INTO trips (title, base_currency) VALUES ('Nordic Journey', 'sek') RETURNING id INTO nordic_trip_id;
  
  -- 2. ユーザーを作成
  INSERT INTO users (name, trip_id) VALUES ('Alice Johnson', european_trip_id) RETURNING id INTO alice_id;
  INSERT INTO users (name, trip_id) VALUES ('Bob Smith', european_trip_id) RETURNING id INTO bob_id;
  INSERT INTO users (name, trip_id) VALUES ('Carol Davis', european_trip_id) RETURNING id INTO carol_id;
  INSERT INTO users (name, trip_id) VALUES ('David Wilson', london_trip_id) RETURNING id INTO david_id;
  INSERT INTO users (name, trip_id) VALUES ('Emma Brown', london_trip_id) RETURNING id INTO emma_id;
  
  -- Nordic Journey用のユーザー（新しい変数を使用）
  INSERT INTO users (name, trip_id) VALUES ('Alice Johnson', nordic_trip_id) RETURNING id INTO alice_nordic_id;
  INSERT INTO users (name, trip_id) VALUES ('Bob Smith', nordic_trip_id) RETURNING id INTO bob_nordic_id;
  INSERT INTO users (name, trip_id) VALUES ('Carol Davis', nordic_trip_id) RETURNING id INTO carol_nordic_id;
  
  -- 3. 通貨を作成
  -- European Adventure currencies
  INSERT INTO currencies (trip_id, code) VALUES (european_trip_id, 'eur') RETURNING id INTO eur_currency_id;
  INSERT INTO currencies (trip_id, code) VALUES (european_trip_id, 'gbp') RETURNING id INTO gbp_currency_id;
  INSERT INTO currencies (trip_id, code) VALUES (european_trip_id, 'czk') RETURNING id INTO czk_currency_id;
  
  -- London Business Trip currencies
  INSERT INTO currencies (trip_id, code) VALUES (london_trip_id, 'gbp') RETURNING id INTO gbp_currency_id;
  
  -- Nordic Journey currencies
  INSERT INTO currencies (trip_id, code) VALUES (nordic_trip_id, 'sek') RETURNING id INTO sek_currency_id;
  INSERT INTO currencies (trip_id, code) VALUES (nordic_trip_id, 'nok') RETURNING id INTO nok_currency_id;
  INSERT INTO currencies (trip_id, code) VALUES (nordic_trip_id, 'dkk') RETURNING id INTO dkk_currency_id;
  
  -- 4. 支払いを作成
  -- European Adventure payments
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (european_trip_id, alice_id, 120.50, eur_currency_id, 'Hotel in Paris') 
  RETURNING id INTO hotel_payment_id;
  
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (european_trip_id, bob_id, 45.00, gbp_currency_id, 'Lunch in London') 
  RETURNING id INTO lunch_payment_id;
  
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (european_trip_id, carol_id, 600.00, czk_currency_id, 'Souvenirs in Prague') 
  RETURNING id INTO souvenirs_payment_id;
  
  -- London Business Trip payments
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (london_trip_id, david_id, 80.00, gbp_currency_id, 'Dinner') 
  RETURNING id INTO dinner_payment_id;
  
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (london_trip_id, emma_id, 20.00, gbp_currency_id, 'Coffee') 
  RETURNING id INTO coffee_payment_id;
  
  -- Nordic Journey payments
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (nordic_trip_id, alice_nordic_id, 500.00, sek_currency_id, 'Accommodation in Stockholm') 
  RETURNING id INTO stockholm_payment_id;
  
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (nordic_trip_id, bob_nordic_id, 300.00, nok_currency_id, 'Dinner in Oslo') 
  RETURNING id INTO oslo_payment_id;
  
  INSERT INTO payments (trip_id, user_id, amount, currency_id, description) 
  VALUES (nordic_trip_id, carol_nordic_id, 400.00, dkk_currency_id, 'Transportation in Copenhagen') 
  RETURNING id INTO copenhagen_payment_id;
  
  -- 5. 債務者を作成
  -- European Adventure debts
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (hotel_payment_id, bob_id, 40.17);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (hotel_payment_id, carol_id, 40.17);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (lunch_payment_id, alice_id, 22.50);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (lunch_payment_id, carol_id, 22.50);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (souvenirs_payment_id, alice_id, 300.00);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (souvenirs_payment_id, bob_id, 300.00);
  
  -- London Business Trip debts
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (dinner_payment_id, emma_id, 40.00);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (coffee_payment_id, david_id, 10.00);
  
  -- Nordic Journey debts
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (stockholm_payment_id, bob_nordic_id, 250.00);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (stockholm_payment_id, carol_nordic_id, 250.00);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (oslo_payment_id, alice_nordic_id, 150.00);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (oslo_payment_id, carol_nordic_id, 150.00);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (copenhagen_payment_id, alice_nordic_id, 200.00);
  INSERT INTO debtors (payment_id, user_id, amount_owed) VALUES (copenhagen_payment_id, bob_nordic_id, 200.00);
  
END $$;