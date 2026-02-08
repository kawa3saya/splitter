"use client";
import { UpdateCreateTripPaymentSchemaType } from "@/app/trips/[id]/_types/update-create-trip-payment-schema-type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updatePayment } from "@/app/trips/[id]/_actions/update-payment";
import { createPayment } from "@/app/trips/[id]/_actions/create-payment";

export function useUpdateCreatePayment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitTrip = async (
    formData: UpdateCreateTripPaymentSchemaType,
    isUpdate = false,
    paymentId?: string | null,
  ) => {
    if (
      !formData.trip_id ||
      !formData.amount ||
      !formData.currency_id ||
      !formData.description ||
      !formData.paid_user_id ||
      !formData.debtors ||
      formData.debtors.length < 1
    ) {
      toast.error("Invalid form data", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      if (isUpdate && paymentId) {
        await updatePayment(paymentId, formData);
      } else {
        await createPayment(formData);
      }
      toast.success("Payment saved successfully", { position: "top-center" });
      router.refresh();
    } catch (error) {
      toast.error("Failed to save payment", { position: "top-center" });
      return error;
    } finally {
      setLoading(false);
    }
  };
  return { submitTrip, loading };
}
