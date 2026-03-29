"use server";

import { supabase } from "@/lib/supabase";
import { UpdateCreateTripPaymentSchemaType } from "@/app/trips/[id]/_types/update-create-trip-payment-schema-type";
import { getExchangeRate } from "@/utils/get-exchange-rate";

export async function updatePayment(
  baseCurrency: string,
  id: string,
  data: UpdateCreateTripPaymentSchemaType,
) {
  // Fetch payment currency code
  const currencyResult = await supabase
    .from("currencies")
    .select("code")
    .eq("id", data.currency_id)
    .single();

  if (currencyResult.error) throw new Error(currencyResult.error.message);

  const paymentCurrency = currencyResult.data.code;

  // Convert paid_at to UTC date string (YYYY-MM-DD) for Frankfurter API
  const utcDate = data.paid_at.toISOString().slice(0, 10);

  let rateToBase: number | null = null;
  let amountInBaseCurrency: number | null = null;

  if (paymentCurrency !== baseCurrency) {
    rateToBase = await getExchangeRate(utcDate, paymentCurrency, baseCurrency);
    amountInBaseCurrency = Math.round(data.amount * rateToBase * 100) / 100;
  } else {
    rateToBase = 1;
    amountInBaseCurrency = data.amount;
  }

  // Update payment
  const { error: updateError } = await supabase
    .from("payments")
    .update({
      user_id: data.paid_user_id,
      amount: data.amount,
      currency_id: data.currency_id,
      description: data.description,
      paid_at: data.paid_at.toISOString(),
      rate_to_base: rateToBase,
      amount_in_base_currency: amountInBaseCurrency,
    })
    .eq("id", id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  // Delete debtors to update
  if (data.debtors.length === 0) {
    throw new Error("Debtors are required");
  }

  if (data.amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  const { error: deleteError } = await supabase
    .from("debtors")
    .delete()
    .eq("payment_id", id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  // Insert debtors to update with split amount
  const amountOwed = data.amount / data.debtors.length;
  const debtorsToInsert = data.debtors.map((debtor) => ({
    payment_id: id,
    user_id: debtor.user_id,
    amount_owed: amountOwed,
  }));

  if (debtorsToInsert.length > 0) {
    const { error: insertError } = await supabase
      .from("debtors")
      .insert(debtorsToInsert);

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  return { success: true };
}
