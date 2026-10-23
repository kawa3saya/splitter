"use client";

import { PaymentWithDetailsType } from "@/app/trips/[id]/_types/trip-detail-type";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";
import { formatCurrencyCode } from "@/utils/format-currency-code";
import { formatDate } from "@/utils/date";
import { TripPaymentDialog } from "@/app/trips/[id]/_components/trip-payment-dialog";
import { CurrencyType, UserType } from "@/types/type";
import { PencilIcon } from "lucide-react";
import { DeletePaymentDialog } from "@/app/trips/[id]/_components/delete-payment-dialog";

export function TripPaymentCard({
  baseCurrency,
  payments,
  currencies,
  users,
}: {
  baseCurrency: string;
  payments: PaymentWithDetailsType[];
  currencies: CurrencyType[];
  users: UserType[];
}) {
  return (
    <div className="flex flex-col gap-xs">
      {payments.map((payment) => (
        <Card
          key={payment.id}
          className="relative gap-xxs p-s transition-opacity hover:opacity-90"
        >
          <DeletePaymentDialog payment={payment} />
          <div className="flex justify-between items-start gap-xs pr-l">
            <CardTitle className="text-sm font-bold break-words min-w-0 flex-1">
              {payment.description}
            </CardTitle>
            <p className="text-xs font-bold text-gray-400 shrink-0">
              {formatDate(payment.paid_at)}
            </p>
          </div>
          <p className="text-xs font-bold text-gray-400">
            PAID BY {payment.user_name} FOR {payment.debtors.length} members
          </p>
          <div className="flex justify-between items-center">
            <CardDescription className="text-sm font-bold">
              {getCurrencyEmoji(payment.currency_code)} {payment.amount}{" "}
              {formatCurrencyCode(payment.currency_code)}
            </CardDescription>
            <TripPaymentDialog
              baseCurrency={baseCurrency}
              payment={payment}
              currencies={currencies}
              users={users}
            >
              <div className="inline-flex items-center gap-1 text-xs font-bold text-primary underline cursor-pointer">
                <PencilIcon className="size-3" />
                <span>Edit</span>
              </div>
            </TripPaymentDialog>
          </div>
        </Card>
      ))}
    </div>
  );
}
