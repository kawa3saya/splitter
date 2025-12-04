"use server";
import { supabase } from "@/lib/supabase";

export async function getPayment(tripId: string) {
  // 支払いデータをユーザー名と通貨名を含めて取得
  const { data, error } = await supabase
    .from("payments")
    .select(
      `
      *,
      users!inner(name),
      currencies!inner(code)
    `
    )
    .eq("trip_id", tripId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // 通貨データを取得（フォーム用）
  const { data: currencies, error: currenciesError } = await supabase
    .from("currencies")
    .select("*")
    .eq("trip_id", tripId);

  if (currenciesError) {
    throw new Error(currenciesError.message);
  }

  // データを整形
  const formattedPayments = (data || []).map((payment) => ({
    ...payment,
    user_name: payment.users?.name || "Unknown",
    currency_code: payment.currencies?.code || "Unknown",
  }));

  return { payments: formattedPayments, currencies: currencies || [] };
}
