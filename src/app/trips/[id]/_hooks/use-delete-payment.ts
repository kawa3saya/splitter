import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deletePayment } from "@/app/trips/[id]/_actions/delete-payment";

export function useDeletePayment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeletePayment = async (paymentId: string) => {
    setLoading(true);
    try {
      await deletePayment(paymentId);
      toast.success("Payment deleted successfully", { position: "top-center" });
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete payment", { position: "top-center" });
      return error;
    } finally {
      setLoading(false);
    }
  };
  return { handleDeletePayment, loading };
}
