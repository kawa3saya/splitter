"use server";

import {
  type PaymentDetailsType,
  type TripDetailType,
} from "@/app/trips/[id]/_types/trip-detail-type";
import { supabase } from "@/lib/supabase";

export async function getTripDetail(
  id: string,
): Promise<TripDetailType | null> {
  const { data, error } = await supabase
    .from("trips")
    .select(
      `
      *,
      users(*),
      currencies(*),
      payments(
        *,
        users(*),
        currencies(*),
        debtors(*)
      )
    `,
    )
    .eq("id", id)
    .is("payments.deleted_at", null)
    .order("paid_at", { referencedTable: "payments", ascending: false })
    .single();

  if (error || !data) {
    return null;
  }

  const trip = data;
  const users = trip.users ?? [];
  const currencies = trip.currencies ?? [];
  const payments = trip.payments ?? [];

  return {
    trip: {
      id: trip.id,
      title: trip.title,
      base_currency: trip.base_currency,
      created_at: trip.created_at,
      updated_at: trip.updated_at,
    },
    users,
    currencies,
    payments: payments.map((payment: PaymentDetailsType) => ({
      id: payment.id,
      trip_id: payment.trip_id,
      user_id: payment.user_id,
      amount: payment.amount,
      currency_id: payment.currency_id,
      deleted_at: payment.deleted_at ?? null,
      description: payment.description,
      created_at: payment.created_at,
      paid_at: payment.paid_at,
      updated_at: payment.updated_at,
      user_name: payment.users.name,
      currency_code: payment.currencies.code,
      debtors: payment.debtors ?? [],
    })),
  };
}
