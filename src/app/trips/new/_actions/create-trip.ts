"use server";

import { supabase } from "@/lib/supabase";

type CreateTripData = {
  title: string;
  base_currency: string;
  member_names: string[];
  currencies: string[];
};

export async function createTrip(formData: CreateTripData) {
  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .insert({
      title: formData.title,
      base_currency: formData.base_currency,
    })
    .select()
    .single();

  if (tripError) {
    throw new Error(tripError.message);
  }

  const currenciesData = formData.currencies.map((currency) => ({
    trip_id: trip.id,
    code: currency,
  }));

  const { data: createdCurrencies, error: currenciesError } = await supabase
    .from("currencies")
    .insert(currenciesData)
    .select();

  if (currenciesError) {
    throw new Error(currenciesError.message);
  }

  const users = formData.member_names.map((name) => ({
    name: name.trim(),
    trip_id: trip.id,
  }));

  const { data: createdUsers, error: usersError } = await supabase
    .from("users")
    .insert(users)
    .select();

  if (usersError) {
    throw new Error(usersError.message);
  }

  return { trip, users: createdUsers, currencies: createdCurrencies };
}
