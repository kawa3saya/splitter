"use server";
import { supabase } from "@/lib/supabase";

export async function getUsers(tripId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("trip_id", tripId);

  if (error) {
    throw new Error(error.message);
  }

  return { users: data || [] };
}
