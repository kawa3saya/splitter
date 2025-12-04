"use server";
import { supabase } from "@/lib/supabase";

export async function getTripDetail(id: string) {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Trip not found.");
  }

  return data;
}
