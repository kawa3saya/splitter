"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TripType, UserType, CurrencyType } from "@/types/type";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";
import { formatCurrencyCode } from "@/utils/format-currency-code";
import { CURRENCIES, CURRENCY_CODES } from "@/constants/currencies";
import { CurrencyCodeType } from "@/types/currency-code-type";
import { Button } from "@/components/ui/button";
import { CircleMinus } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { EditTripSchemaType } from "@/app/trips/[id]/edit/_type/edit-trip-schema-type";
import { editTripSchema } from "@/app/trips/[id]/edit/_schema/edit-trip-schema";
import { useUpdateTrip } from "@/app/trips/[id]/edit/_hooks/use-update-trip";

export function EditTripForm({
  trip,
  users,
  currencies,
}: {
  trip: TripType;
  users: UserType[];
  currencies: CurrencyType[];
}) {
  const { handleUpdateTrip, loading } = useUpdateTrip();
  const registeredCodes = new Set(currencies.map((c) => c.code));
  const anchor = useComboboxAnchor();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTripSchemaType>({
    resolver: zodResolver(editTripSchema),
    defaultValues: {
      id: trip.id,
      title: trip.title,
      currencies: currencies.map((c) => c.code),
      member_names: null,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "member_names",
  });

  return (
    <form onSubmit={handleSubmit(handleUpdateTrip)}>
      <div className="flex flex-col gap-s p-s bg-white rounded-2xl w-full">
        <FieldGroup>
          <Field>
            <FieldLabel>TRIP NAME</FieldLabel>
            <Input
              type="text"
              {...register("title")}
              className="text-base font-bold"
            />
            {errors.title?.message && <FieldError errors={[errors.title]} />}
          </Field>
          <Field>
            <FieldLabel>BASE CURRENCY</FieldLabel>
            <div className="flex items-center gap-xxs justify-between p-xs">
              <p className="flex items-center gap-xxs font-bold text-gray-400">
                <span>{getCurrencyEmoji(trip.base_currency)}</span>
                <span>{formatCurrencyCode(trip.base_currency)}</span>
                <span>-</span>
                <span>
                  {CURRENCIES[trip.base_currency as CurrencyCodeType]?.name}
                </span>
              </p>
              <div className="rounded-full bg-background text-primary p-xs text-sm font-bold">
                BASE
              </div>
            </div>
          </Field>
          <Field>
            <FieldLabel>CURRENCIES TO TRACK</FieldLabel>
            {currencies.map((currency) => (
              <div
                key={currency.id}
                className="flex items-center gap-xxs justify-between p-xs"
              >
                <p className="flex items-center gap-xxs font-bold text-gray-400">
                  <span>{getCurrencyEmoji(currency.code)}</span>
                  <span>{formatCurrencyCode(currency.code)}</span>
                  <span>-</span>
                  <span>
                    {CURRENCIES[currency.code as CurrencyCodeType]?.name}
                  </span>
                </p>
                <div className="rounded-full bg-gray-100 text-gray-400 p-xs text-sm font-bold">
                  ACTIVE
                </div>
              </div>
            ))}
          </Field>
          <Field>
            <FieldLabel className="text-primary">ADD NEW CURRENCIES</FieldLabel>
            <Controller
              control={control}
              name="currencies"
              render={({ field }) => (
                <Combobox<string, true>
                  multiple={true}
                  autoHighlight
                  items={CURRENCY_CODES}
                  value={field.value ?? []}
                  onValueChange={(newVal) => {
                    const rest = (newVal ?? []).filter(
                      (code) => !registeredCodes.has(code),
                    );
                    field.onChange([...currencies.map((c) => c.code), ...rest]);
                  }}
                >
                  <ComboboxChips ref={anchor} className="w-full">
                    <ComboboxValue>
                      {(values: string[]) => (
                        <>
                          {values.map((code) => (
                            <ComboboxChip
                              key={code}
                              showRemove={!registeredCodes.has(code)}
                              className="flex gap-xxs"
                            >
                              <span>{getCurrencyEmoji(code)}</span>
                              <span>{formatCurrencyCode(code)}</span>
                            </ComboboxChip>
                          ))}
                          <ComboboxChipsInput />
                        </>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent className="mb-xs" anchor={anchor}>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList className="flex flex-col gap-xs">
                      {(code: string) => {
                        const data = CURRENCIES[code as CurrencyCodeType];
                        return (
                          <ComboboxItem
                            key={code}
                            value={code}
                            disabled={registeredCodes.has(code)}
                            className="flex items-center justify-between hover:bg-gray-100 selected:bg-gray-100 p-xs hover:cursor-pointer hover:bg-background"
                          >
                            <div className="flex items-center gap-s">
                              <p className="text-3xl">
                                {getCurrencyEmoji(code)}
                              </p>
                              <div className="flex flex-col">
                                <p className="font-bold">
                                  {formatCurrencyCode(code)}
                                </p>
                                {data && (
                                  <span className="text-gray-400 text-xs font-bold">
                                    {data.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          </ComboboxItem>
                        );
                      }}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            />
            {errors.currencies?.message && (
              <FieldError errors={[errors.currencies]} />
            )}
          </Field>
          <Field>
            <FieldLabel>MEMBERS</FieldLabel>
            <div className="flex flex-col gap-s">
              {users.map((user) => (
                <div key={user.id}>
                  <p className="font-bold font-base text-gray-400">
                    {user.name}
                  </p>
                </div>
              ))}
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-xxs">
                  <div className="flex items-center gap-xxs">
                    <Input
                      {...register(`member_names.${index}.name`)}
                      placeholder="Enter member name"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(index)}
                    >
                      <CircleMinus className="size-6 font-l text-primary" />
                    </Button>
                  </div>
                  {errors.member_names?.[index]?.name?.message && (
                    <FieldError errors={[errors.member_names?.[index]?.name]} />
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ name: "" })}
                className="max-w-fit"
                size="xs"
              >
                <CirclePlus className="size-4" /> Add another member
              </Button>
            </div>
            {errors.member_names?.message && (
              <FieldError errors={[errors.member_names]} />
            )}
          </Field>
        </FieldGroup>
      </div>
      <Button
        type="submit"
        className="mt-l text-xl font-bold w-full"
        disabled={loading}
      >
        SAVE CHANGES
      </Button>
    </form>
  );
}
