"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import {
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { PaymentWithDetailsType } from "@/app/trips/[id]/_types/trip-detail-type";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyType, UserType } from "@/types/type";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader } from "lucide-react";
import { UpdateCreateTripPaymentSchemaType } from "@/app/trips/[id]/_types/update-create-trip-payment-schema-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCreateTripPaymentSchema } from "@/app/trips/[id]/_schema/update-create-trip-payment-schema";
import { formatDate } from "@/utils/date";
import { useUpdateCreatePayment } from "@/app/trips/[id]/_hooks/use-update-create-payment";

export function TripPaymentForm({
  payment,
  currencies,
  users,
  open = true,
  onOpenChange,
}: {
  currencies: CurrencyType[];
  payment: PaymentWithDetailsType | null;
  users: UserType[];
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { submitTrip, loading } = useUpdateCreatePayment();
  const [isSelectAll, setIsSelectAll] = useState(
    payment ? payment.debtors.length === users.length : false,
  );
  const [isOnMe, setIsOnMe] = useState(
    payment
      ? payment.debtors.every((debtor) => debtor.user_id === payment.user_id)
      : false,
  );
  const initialDebtors = payment?.debtors ?? [];

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateCreateTripPaymentSchemaType>({
    resolver: zodResolver(
      updateCreateTripPaymentSchema,
    ) as Resolver<UpdateCreateTripPaymentSchemaType>,
    defaultValues: {
      trip_id: currencies[0].trip_id,
      amount: payment?.amount ?? 0.1,
      currency_id: payment?.currency_id ?? "",
      description: payment?.description ?? "",
      paid_user_id: payment?.user_id ?? "",
      paid_at: payment?.paid_at ? new Date(payment?.paid_at) : new Date(),
      debtors: initialDebtors,
    },
    values: payment
      ? {
          trip_id: currencies[0].trip_id,
          amount: payment?.amount ?? 0.1,
          currency_id: payment?.currency_id ?? "",
          description: payment?.description ?? "",
          paid_user_id: payment?.user_id ?? "",
          paid_at: payment?.paid_at ? new Date(payment?.paid_at) : new Date(),
          debtors: initialDebtors,
        }
      : undefined,
  });

  const paidUserId = watch("paid_user_id") ?? "";
  const watchedDebtors = watch("debtors");
  const debtors = useMemo(() => watchedDebtors ?? [], [watchedDebtors]);

  useEffect(() => {
    // when all users are selected
    if (debtors.length === users.length) {
      setIsSelectAll(true);
      setIsOnMe(false);
    } else {
      setIsSelectAll(false);
    }

    // when selected one user is the paid user
    if (debtors.length === 1 && debtors[0].user_id === paidUserId) {
      setIsOnMe(true);
    } else {
      setIsOnMe(false);
    }
  }, [debtors, paidUserId, users]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: UpdateCreateTripPaymentSchemaType) => {
    await submitTrip(data, !!payment, payment?.id ?? null);
    onOpenChange(false);
  };

  return (
    <DialogContent className="max-h-content overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VisuallyHidden asChild>
          <DialogTitle />
        </VisuallyHidden>
        <FieldGroup>
          <div className="flex gap-s">
            <Field>
              <Label>AMOUNT</Label>
              <Input
                type="text"
                id="amount"
                placeholder="0.00"
                {...register("amount")}
              />
              {errors.amount?.message && (
                <FieldError errors={[errors.amount]} />
              )}
            </Field>
            <Field>
              <Label>CURRENCY</Label>
              <Controller
                control={control}
                name="currency_id"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {getCurrencyEmoji(currency.code)} {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.currency_id?.message && (
                <FieldError errors={[errors.currency_id]} />
              )}
            </Field>
          </div>
          <Field>
            <Label>DESCRIPTION</Label>
            <Input
              type="text"
              id="description"
              {...register("description")}
              placeholder="Lunch at cafe, Airport taxi..."
            />
            {errors.description?.message && (
              <FieldError errors={[errors.description]} />
            )}
          </Field>
          <Field>
            <Label>PAID BY</Label>
            <Controller
              control={control}
              name="paid_user_id"
              render={({ field }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.paid_user_id?.message && (
              <FieldError errors={[errors.paid_user_id]} />
            )}
          </Field>
          <Field>
            <Label>SPLIT WITH</Label>
            <div className="flex flex-wrap gap-xs justify-start items-center mb-xs">
              <Button
                type="button"
                variant="ghost"
                className={`h-10 whitespace-nowrap rounded-full border px-s py-xs font-bold transition-colors ${
                  isSelectAll
                    ? "border-primary bg-primary text-white"
                    : "border-primary text-primary"
                }`}
                onClick={() =>
                  setValue(
                    "debtors",
                    isSelectAll
                      ? initialDebtors
                      : users.map((user) => ({ user_id: user.id })),
                  )
                }
              >
                Select All
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={`h-10 whitespace-nowrap rounded-full border px-s py-xs font-bold transition-colors ${
                  isOnMe
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-orange-500 text-orange-500"
                }`}
                onClick={() =>
                  setValue(
                    "debtors",
                    isOnMe ? initialDebtors : [{ user_id: paidUserId }],
                  )
                }
              >
                It&apos;s on me!
              </Button>
            </div>
            <Controller
              control={control}
              name="debtors"
              render={({ field }) => (
                <div className="flex flex-wrap gap-xs justify-start items-center">
                  {users.map((user) => {
                    const isChecked = field.value?.some(
                      (debtor) => debtor.user_id === user.id,
                    );
                    return (
                      <FieldContent key={user.id} className="flex-none w-fit">
                        <Checkbox
                          hidden
                          id={user.id}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...field.value,
                                { user_id: user.id },
                              ]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (debtor) => debtor.user_id !== user.id,
                                ),
                              );
                            }
                          }}
                        />
                        <FieldLabel
                          htmlFor={user.id}
                          className={`h-10 cursor-pointer whitespace-nowrap rounded-full border px-s py-xs font-bold transition-colors ${
                            isChecked
                              ? "border-primary bg-primary text-white"
                              : "border-gray-200"
                          }`}
                        >
                          {user.name}
                        </FieldLabel>
                      </FieldContent>
                    );
                  })}
                </div>
              )}
            />
            {errors.debtors?.message && (
              <FieldError errors={[errors.debtors]} />
            )}
          </Field>
          <Field>
            <Label>PAID AT</Label>
            <Controller
              control={control}
              name="paid_at"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      className="hover:bg-white flex justify-start h-14 shadow-none w-full min-w-0 resize-none overflow-hidden rounded-lg border border-gray bg-base p-s text-left text-base font-normal leading-normal outline-none transition-[color,box-shadow] text-[var(--text-color-base)] placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-[4px] focus:ring-background dark:border-gray-700 dark:bg-gray-800 dark:text-white aria-invalid:border-destructive cursor-pointer"
                    >
                      <CalendarIcon className="size-4" />
                      {field.value
                        ? formatDate(field.value.toISOString())
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-auto p-0 border-none"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.paid_at?.message && (
              <FieldError errors={[errors.paid_at]} />
            )}
          </Field>
        </FieldGroup>
        <DialogFooter className="mt-s">
          <Button
            type="submit"
            variant="default"
            className="text-base"
            disabled={loading}
          >
            {loading ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              "Save Payment"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
