"use server";

import { supabase } from "@/lib/supabase";
import { UpdateCreateTripPaymentSchemaType } from "@/app/trips/[id]/_types/update-create-trip-payment-schema-type";

export async function createPayment(data: UpdateCreateTripPaymentSchemaType) {
  const { data: payment, error: insertError } = await supabase
    .from("payments")
    .insert({
      trip_id: data.trip_id,
      user_id: data.paid_user_id,
      amount: data.amount,
      currency_id: data.currency_id,
      description: data.description,
      paid_at: data.paid_at.toISOString(),
    })
    .select("id")
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  if (data.debtors.length === 0) {
    throw new Error("Debtors are required");
  }

  if (data.amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  const amountOwed = data.amount / data.debtors.length;
  const debtorsToInsert = data.debtors.map((debtor) => ({
    payment_id: payment.id,
    user_id: debtor.user_id,
    amount_owed: amountOwed,
  }));

  const { error: debtorsError } = await supabase
    .from("debtors")
    .insert(debtorsToInsert);

  if (debtorsError) {
    throw new Error(debtorsError.message);
  }
}
