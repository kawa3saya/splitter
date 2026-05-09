"use server";

import { supabase } from "@/lib/supabase";

export async function deletePayment(tripId: string, paymentId: string) {
  // Verify the payment belongs to this trip
  const existing = await supabase
    .from("payments")
    .select("trip_id")
    .eq("id", paymentId)
    .single();

  if (existing.error || existing.data.trip_id !== tripId) {
    throw new Error("Payment not found");
  }

  const deletedAt = new Date().toISOString();

  const { error: paymentError } = await supabase
    .from("payments")
    .update({ deleted_at: deletedAt })
    .eq("id", paymentId)
    .eq("trip_id", tripId);

  if (paymentError) {
    throw new Error("Failed to delete payment");
  }

  const { error: debtorsError } = await supabase
    .from("debtors")
    .update({ deleted_at: deletedAt })
    .eq("payment_id", paymentId);

  if (debtorsError) {
    throw new Error("Failed to delete payment");
  }
}
