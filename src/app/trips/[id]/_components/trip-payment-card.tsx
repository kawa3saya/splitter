import { PaymentWithDetailsType } from "@/app/trips/[id]/_types/trip-detail-type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";
import { formatDate } from "@/utils/date";
import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import { TripPaymentFormDialog } from "@/app/trips/[id]/_components/trip-payment-form-dialog";
import { CurrencyType, UserType } from "@/types/type";
import { PencilIcon } from "lucide-react";

export function TripPaymentCard({
  payments,
  currencies,
  users,
}: {
  payments: PaymentWithDetailsType[];
  currencies: CurrencyType[];
  users: UserType[];
}) {
  return (
    <div className="flex flex-col gap-s">
      {payments.map((payment) => (
        <Dialog key={payment.id}>
          <Card className="gap-s transition-opacity hover:opacity-90">
            <CardHeader>
              <div>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    {payment.description}
                  </CardTitle>
                  <p className="text-xs font-bold text-gray-400 min-w-20">
                    {formatDate(payment.paid_at)}
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-400">
                  PAID BY {payment.user_name} FOR {payment.debtors.length}{" "}
                  members
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-400">Total spent</p>
                <CardDescription className="text-xl font-bold">
                  {getCurrencyEmoji(payment.currency_code)} {payment.amount}{" "}
                  {payment.currency_code}
                </CardDescription>
              </div>
              <DialogTrigger className="inline-flex items-center gap-1 text-sm font-bold text-primary underline cursor-pointer">
                <PencilIcon className="size-4" />
                <span>Edit</span>
              </DialogTrigger>
            </CardContent>
          </Card>
          <TripPaymentFormDialog
            payment={payment}
            currencies={currencies}
            users={users}
          />
        </Dialog>
      ))}
    </div>
  );
}
