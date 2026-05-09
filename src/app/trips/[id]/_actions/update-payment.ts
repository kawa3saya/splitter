"use server";

import { supabase } from "@/lib/supabase";
import { UpdateCreateTripPaymentSchemaType } from "@/app/trips/[id]/_types/update-create-trip-payment-schema-type";
import { updateCreateTripPaymentSchema } from "@/app/trips/[id]/_schema/update-create-trip-payment-schema";
import { getExchangeRate } from "@/utils/get-exchange-rate";

export async function updatePayment(
  tripId: string,
  baseCurrency: string,
  paymentId: string,
  data: UpdateCreateTripPaymentSchemaType,
) {
  const parsed = updateCreateTripPaymentSchema.parse(data);

  if (parsed.trip_id !== tripId) {
    throw new Error("Trip mismatch");
  }

  // Verify the payment belongs to this trip and is not soft-deleted
  const existing = await supabase
    .from("payments")
    .select("trip_id, deleted_at")
    .eq("id", paymentId)
    .single();

  if (
    existing.error ||
    existing.data.trip_id !== tripId ||
    existing.data.deleted_at !== null
  ) {
    throw new Error("Payment not found");
  }

  // Verify all referenced users belong to this trip
  const userIds = Array.from(
    new Set([parsed.paid_user_id, ...parsed.debtors.map((d) => d.user_id)]),
  );
  const usersResult = await supabase
    .from("users")
    .select("id")
    .eq("trip_id", tripId)
    .in("id", userIds);

  if (usersResult.error) throw new Error("Failed to verify users");
  if (!usersResult.data || usersResult.data.length !== userIds.length) {
    throw new Error("Invalid user");
  }

  // Fetch payment currency code, scoped to this trip
  const currencyResult = await supabase
    .from("currencies")
    .select("code")
    .eq("id", parsed.currency_id)
    .eq("trip_id", tripId)
    .single();

  if (currencyResult.error) throw new Error("Invalid currency");

  const paymentCurrency = currencyResult.data.code;

  // Convert paid_at to UTC date string (YYYY-MM-DD) for Frankfurter API
  const utcDate = parsed.paid_at.toISOString().slice(0, 10);

  let rateToBase: number | null = null;
  let amountInBaseCurrency: number | null = null;

  if (paymentCurrency !== baseCurrency) {
    rateToBase = await getExchangeRate(utcDate, paymentCurrency, baseCurrency);
    amountInBaseCurrency = Math.round(parsed.amount * rateToBase * 100) / 100;
  } else {
    rateToBase = 1;
    amountInBaseCurrency = parsed.amount;
  }

  // Update payment (scoped to tripId for defense-in-depth)
  const { error: updateError } = await supabase
    .from("payments")
    .update({
      user_id: parsed.paid_user_id,
      amount: parsed.amount,
      currency_id: parsed.currency_id,
      description: parsed.description,
      paid_at: parsed.paid_at.toISOString(),
      rate_to_base: rateToBase,
      amount_in_base_currency: amountInBaseCurrency,
    })
    .eq("id", paymentId)
    .eq("trip_id", tripId);

  if (updateError) {
    throw new Error("Failed to save payment");
  }

  // Delete existing debtors and re-insert with new split
  const { error: deleteError } = await supabase
    .from("debtors")
    .delete()
    .eq("payment_id", paymentId);

  if (deleteError) {
    throw new Error("Failed to save payment");
  }

  const amountOwed = parsed.amount / parsed.debtors.length;
  const amountOwedInBase =
    Math.round((amountInBaseCurrency! / parsed.debtors.length) * 100) / 100;
  const debtorsToInsert = parsed.debtors.map((debtor) => ({
    payment_id: paymentId,
    user_id: debtor.user_id,
    amount_owed: amountOwed,
    amount_owed_in_base: amountOwedInBase,
  }));

  if (debtorsToInsert.length > 0) {
    const { error: insertError } = await supabase
      .from("debtors")
      .insert(debtorsToInsert);

    if (insertError) {
      throw new Error("Failed to save payment");
    }
  }

  return { success: true };
}
