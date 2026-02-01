"use client";
import { createTrip } from "@/app/trips/new/_actions/create-trip";
import { FormCreateTripSchemaType } from "@/app/trips/new/_types/form-create-trip-schema-type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateTrip() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitTrip = async (formData: FormCreateTripSchemaType) => {
    if (
      !formData.title ||
      !formData.base_currency ||
      !formData.member_names ||
      formData.member_names.length < 2 ||
      !formData.currencies ||
      formData.currencies.length < 1
    ) {
      toast.error("Invalid form data");
      return;
    }

    try {
      setLoading(true);
      const result = await createTrip(formData);
      router.replace(`/trips/${result.trip.id}/share`);
      toast.success("Trip created successfully");
    } catch (error) {
      toast.error("Failed to create trip");
      return error;
    } finally {
      setLoading(false);
    }
  };
  return { submitTrip, loading };
}
