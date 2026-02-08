"use server";

import { supabase } from "@/lib/supabase";

export async function deletePayment(paymentId: string) {
  const deletedAt = new Date().toISOString();

  const { error: paymentError } = await supabase
    .from("payments")
    .update({ deleted_at: deletedAt })
    .eq("id", paymentId);

  if (paymentError) {
    throw new Error(paymentError.message);
  }

  const { error: debtorsError } = await supabase
    .from("debtors")
    .update({ deleted_at: deletedAt })
    .eq("payment_id", paymentId);

  if (debtorsError) {
    throw new Error(debtorsError.message);
  }
}
