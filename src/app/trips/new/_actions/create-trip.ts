"use server";

import { supabase } from "@/lib/supabase";
import { FormCreateTripSchemaType } from "@/app/trips/new/_types/form-create-trip-schema-type";
import { formCreateTripSchema } from "@/app/trips/new/_schema/form-create-trip-schema";

export async function createTrip(formData: FormCreateTripSchemaType) {
  const parsed = formCreateTripSchema.parse(formData);

  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .insert({
      title: parsed.title,
      base_currency: parsed.base_currency,
    })
    .select()
    .single();

  if (tripError) {
    throw new Error("Failed to create trip");
  }

  const currenciesData = parsed.currencies.map((currency) => ({
    trip_id: trip.id,
    code: currency,
  }));

  const { data: createdCurrencies, error: currenciesError } = await supabase
    .from("currencies")
    .insert(currenciesData)
    .select();

  if (currenciesError) {
    throw new Error("Failed to create trip");
  }

  const users = parsed.member_names.map((member) => ({
    name: member.name.trim(),
    trip_id: trip.id,
  }));

  const { data: createdUsers, error: usersError } = await supabase
    .from("users")
    .insert(users)
    .select();

  if (usersError) {
    throw new Error("Failed to create trip");
  }

  return { trip, users: createdUsers, currencies: createdCurrencies };
}
