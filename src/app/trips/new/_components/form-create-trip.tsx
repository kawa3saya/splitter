"use client";

import Link from "next/link";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { CircleMinus, CirclePlus, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CURRENCIES, CURRENCY_CODES } from "@/constants/currencies";
import { CurrencyCodeType } from "@/types/currency-code-type";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";
import { Button } from "@/components/ui/button";
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
import { FormCreateTripSchemaType } from "@/app/trips/new/_types/form-create-trip-schema-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCreateTripSchema } from "@/app/trips/new/_schema/form-create-trip-schema";
import { useCreateTrip } from "@/app/trips/new/_hooks/use-create-trip";
export function FormCreateTrip() {
  const { submitTrip, loading } = useCreateTrip();
  const anchor = useComboboxAnchor();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateTripSchemaType>({
    resolver: zodResolver(formCreateTripSchema),
    defaultValues: {
      title: "",
      base_currency: "",
      currencies: [],
      member_names: [{ name: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "member_names",
  });

  return (
    <Card>
      <form onSubmit={handleSubmit(submitTrip)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Create a new trip</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="trip-name">Trip name</FieldLabel>
                <Input
                  id="trip-name"
                  {...register("title")}
                  placeholder="e.g., Asian Adventure"
                />
                {errors.title?.message && (
                  <FieldError errors={[errors.title]} />
                )}
              </Field>
              <Field>
                <FieldLabel>Base currency (for settlement)</FieldLabel>
                <Controller
                  control={control}
                  name="base_currency"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CURRENCIES).map(([code, item]) => (
                          <SelectItem key={code} value={code}>
                            <div className="flex w-full items-center justify-start gap-s">
                              <p className="text-3xl">
                                {getCurrencyEmoji(code)}
                              </p>
                              <div className="flex flex-col items-start">
                                <p className="font-bold">
                                  {code.toUpperCase()}
                                </p>
                                <span className="text-gray-400 text-xs font-bold">
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.base_currency?.message && (
                  <FieldError errors={[errors.base_currency]} />
                )}
              </Field>
              <Field>
                <FieldLabel>Currencies to track</FieldLabel>
                <Controller
                  control={control}
                  name="currencies"
                  render={({ field }) => (
                    <Combobox<string, true>
                      multiple={true}
                      autoHighlight
                      items={CURRENCY_CODES}
                      value={field.value ?? []}
                      onValueChange={(newVal) => field.onChange(newVal ?? [])}
                    >
                      <ComboboxChips ref={anchor} className="w-full">
                        <ComboboxValue>
                          {(values: string[]) => (
                            <>
                              {values.map((code) => (
                                <ComboboxChip
                                  key={code}
                                  showRemove
                                  className="flex gap-xxs"
                                >
                                  <span>{getCurrencyEmoji(code)}</span>
                                  <span>{code.toUpperCase()}</span>
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
                                className="flex items-center justify-between hover:bg-gray-100 selected:bg-gray-100 p-xs hover:cursor-pointer hover:bg-background"
                              >
                                <div className="flex items-center gap-s">
                                  <p className="text-3xl">
                                    {getCurrencyEmoji(code)}
                                  </p>
                                  <div className="flex flex-col">
                                    <p className="font-bold">
                                      {code.toUpperCase()}
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
                <FieldLabel>Members</FieldLabel>
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
                    {/* FIX ME:  appendして二人分にする→1人分に減らす→Submitを押す→エラーが消えてしまう*/}
                    {errors.member_names?.[index]?.name?.message && (
                      <FieldError
                        errors={[errors.member_names?.[index]?.name]}
                      />
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
                {errors.member_names?.root?.message && (
                  <FieldError errors={[errors.member_names.root]} />
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <div className="flex items-center gap-xs">
              <Button variant="outline" type="button">
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" variant="default" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-xs">
                    <Loader2 className="size-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </Card>
  );
}
