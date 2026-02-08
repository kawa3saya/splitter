"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TripPaymentForm } from "@/app/trips/[id]/_components/trip-payment-form";
import { PaymentWithDetailsType } from "@/app/trips/[id]/_types/trip-detail-type";
import { CurrencyType, UserType } from "@/types/type";

export function TripPaymentDialog({
  payment,
  currencies,
  users,
  children,
}: {
  payment: PaymentWithDetailsType | null;
  currencies: CurrencyType[];
  users: UserType[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <TripPaymentForm
        payment={payment}
        currencies={currencies}
        users={users}
        open={open}
        onOpenChange={setOpen}
      />
    </Dialog>
  );
}
