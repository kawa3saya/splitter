"use server";

import { supabase } from "@/lib/supabase";
import {
  SettlementType,
  TotalSpendingType,
} from "@/app/trips/[id]/settlement/_types/settlement-type";
import { calculateBalances } from "@/app/trips/[id]/settlement/_utils/calculate-balances";
import { buildSettlements } from "@/app/trips/[id]/settlement/_utils/build-settlements";

export async function getSettlement(
  tripId: string,
): Promise<{
  settlements: SettlementType[];
  totalSpending: TotalSpendingType[];
  baseCurrency: string;
}> {
  // Step 1: データ取得
  const [paymentsResult, tripResult] = await Promise.all([
    supabase
      .from("payments")
      .select(
        "user_id, amount_in_base_currency, debtors(user_id, amount_owed_in_base)",
      )
      .eq("trip_id", tripId)
      .is("deleted_at", null),
    supabase
      .from("trips")
      .select("base_currency")
      .eq("id", tripId)
      .single(),
  ]);

  if (paymentsResult.error) throw new Error(paymentsResult.error.message);
  if (tripResult.error) throw new Error(tripResult.error.message);

  const payments = paymentsResult.data;
  const baseCurrency = tripResult.data.base_currency;

  if (!payments || payments.length === 0)
    return { settlements: [], totalSpending: [], baseCurrency };

  // Step 2: 各ユーザーの収支を計算（支払った額 − 負担すべき額）
  const balances = calculateBalances(payments);

  // Step 3: 収支からユーザー名を取得し、精算リストを生成
  const userIds = Object.keys(balances);
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, name")
    .in("id", userIds);

  if (usersError) throw new Error(usersError.message);

  const nameOf = Object.fromEntries((users ?? []).map((user) => [user.id, user.name]));

  // Step 4: ユーザーごとの支払い合計を算出（user_name昇順）
  const spendingMap: Record<string, number> = {};
  for (const payment of payments) {
    spendingMap[payment.user_id] =
      (spendingMap[payment.user_id] ?? 0) + payment.amount_in_base_currency;
  }
  const totalSpending: TotalSpendingType[] = Object.entries(spendingMap)
    .map(([userId, amount]) => ({
      user_id: userId,
      user_name: nameOf[userId] ?? userId,
      amount,
    }))
    .sort((a, b) => a.user_name.localeCompare(b.user_name));

  return {
    settlements: buildSettlements(balances, nameOf),
    totalSpending,
    baseCurrency,
  };
}
