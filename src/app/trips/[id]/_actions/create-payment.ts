"use server";

import { supabase } from "@/lib/supabase";
import { UpdateCreateTripPaymentSchemaType } from "@/app/trips/[id]/_types/update-create-trip-payment-schema-type";
import { getExchangeRate } from "@/utils/get-exchange-rate";

export async function createPayment(
  tripId: string,
  baseCurrency: string,
  data: UpdateCreateTripPaymentSchemaType,
) {
  if (data.trip_id !== tripId) {
    throw new Error("Trip mismatch");
  }

  if (data.debtors.length === 0) {
    throw new Error("Debtors are required");
  }

  if (data.amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  // Fetch payment currency code, scoped to this trip
  const currencyResult = await supabase
    .from("currencies")
    .select("code")
    .eq("id", data.currency_id)
    .eq("trip_id", tripId)
    .single();

  if (currencyResult.error) throw new Error("Invalid currency");

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

  const { data: payment, error: insertError } = await supabase
    .from("payments")
    .insert({
      trip_id: tripId,
      user_id: data.paid_user_id,
      amount: data.amount,
      currency_id: data.currency_id,
      description: data.description,
      paid_at: data.paid_at.toISOString(),
      rate_to_base: rateToBase,
      amount_in_base_currency: amountInBaseCurrency,
    })
    .select("id")
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  const amountOwed = data.amount / data.debtors.length;
  const amountOwedInBase =
    Math.round((amountInBaseCurrency! / data.debtors.length) * 100) / 100;
  const debtorsToInsert = data.debtors.map((debtor) => ({
    payment_id: payment.id,
    user_id: debtor.user_id,
    amount_owed: amountOwed,
    amount_owed_in_base: amountOwedInBase,
  }));

  const { error: debtorsError } = await supabase
    .from("debtors")
    .insert(debtorsToInsert);

  if (debtorsError) {
    throw new Error(debtorsError.message);
  }
}
