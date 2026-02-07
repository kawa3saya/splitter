import { PaymentWithDetailsType } from "@/app/trips/[id]/_types/trip-detail-type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";
import Link from "next/link";
import { formatDate } from "@/utils/date";

export function TripPaymentCard({
  payments,
}: {
  payments: PaymentWithDetailsType[];
}) {
  return (
    <div className="flex flex-col gap-s">
      {payments.map((payment) => (
        <Link key={payment.id} href="#">
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
            <CardContent>
              <p className="text-sm font-bold text-gray-400">Total spent</p>
              <CardDescription className="text-xl font-bold">
                {getCurrencyEmoji(payment.currency_code)} {payment.amount}{" "}
                {payment.currency_code}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
