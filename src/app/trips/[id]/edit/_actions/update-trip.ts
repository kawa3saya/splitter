"use server";

import { supabase } from "@/lib/supabase";
import { EditTripSchemaType } from "@/app/trips/[id]/edit/_type/edit-trip-schema-type";
import { editTripSchema } from "@/app/trips/[id]/edit/_schema/edit-trip-schema";

export async function updateTrip(tripId: string, formData: EditTripSchemaType) {
  const parsed = editTripSchema.parse(formData);

  if (parsed.id !== tripId) {
    throw new Error("Trip mismatch");
  }

  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .update({ title: parsed.title })
    .eq("id", tripId)
    .select()
    .single();

  if (tripError) {
    throw new Error(tripError.message);
  }

  const codes = parsed.currencies ?? [];
  if (codes.length > 0) {
    const currenciesData = codes.map((code) => ({
      trip_id: tripId,
      code,
    }));
    const { error: currenciesError } = await supabase
      .from("currencies")
      .upsert(currenciesData, { onConflict: "trip_id,code" });

    if (currenciesError) {
      throw new Error(currenciesError.message);
    }
  }

  const memberNames = parsed.member_names ?? [];
  if (memberNames.length > 0) {
    const usersData = memberNames.map((member) => ({
      name: member.name.trim(),
      trip_id: tripId,
    }));
    const { error: usersError } = await supabase
      .from("users")
      .insert(usersData);

    if (usersError) {
      throw new Error(usersError.message);
    }
  }

  return { trip: { id: trip.id } };
}
