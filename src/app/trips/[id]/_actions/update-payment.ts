"use server";

import { supabase } from "@/lib/supabase";
import { UpdateCreateTripPaymentSchemaType } from "@/app/trips/[id]/_types/update-create-trip-payment-schema-type";

export async function updatePayment(
  id: string,
  data: UpdateCreateTripPaymentSchemaType,
) {
  // Update payment
  const { error: updateError } = await supabase
    .from("payments")
    .update({
      user_id: data.paid_user_id,
      amount: data.amount,
      currency_id: data.currency_id,
      description: data.description,
      paid_at: data.paid_at.toISOString(),
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
