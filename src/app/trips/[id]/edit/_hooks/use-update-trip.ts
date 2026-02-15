import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { EditTripSchemaType } from "@/app/trips/[id]/edit/_type/edit-trip-schema-type";
import { updateTrip } from "@/app/trips/[id]/edit/_actions/update-trip";

export function useUpdateTrip() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateTrip = async (formData: EditTripSchemaType) => {
    if (!formData.title || !formData.currencies || !formData.member_names) {
      toast.error("Invalid form data");
      return;
    }

    try {
      setLoading(true);
      const result = await updateTrip(formData);
      toast.success("Trip updated successfully", { position: "top-center" });
      router.replace(`/trips/${result.trip.id}`);
    } catch (error) {
      toast.error("Failed to update trip", { position: "top-center" });
      return error;
    } finally {
      setLoading(false);
    }
  };
  return { handleUpdateTrip, loading };
}
