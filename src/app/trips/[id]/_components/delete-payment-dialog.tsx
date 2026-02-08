import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Trash2 } from "lucide-react";
import { PaymentWithDetailsType } from "@/app/trips/[id]/_types/trip-detail-type";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";
import { useDeletePayment } from "@/app/trips/[id]/_hooks/use-delete-payment";

export function DeletePaymentDialog({
  payment,
}: {
  payment: PaymentWithDetailsType;
}) {
  const { handleDeletePayment, loading } = useDeletePayment();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-0 right-0 z-10 size-8 min-w-0 rounded-full p-0"
        >
          <X className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-4xl">
        <Trash2
          className="size-14 text-red-500 mx-auto rounded-full bg-red-50 p-s"
          strokeWidth={2}
        />
        <DialogTitle className="text-center">Delete Payment</DialogTitle>
        <div className="flex flex-col gap-s text-center">
          <p>
            Are you sure you want to delete this payment for&nbsp;
            <span className="font-bold">&quot;{payment.description}&quot;</span>
            ?
          </p>
          <div className="flex flex-col gap-xs bg-gray-100 p-s rounded-lg w-full">
            <p className="text-xs font-bold text-gray-500">PAYMENT SUMMARY</p>
            <p className="text-base font-bold">
              Paid by {payment.user_name}
              <br />
              {getCurrencyEmoji(payment.currency_code)} {payment.amount}{" "}
              {payment.currency_code}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-s">
          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => handleDeletePayment(payment.id)}
          >
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" className="bg-gray-100" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
