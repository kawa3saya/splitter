import z from "zod";
import { CURRENCIES } from "@/constants/currencies";

const supportedCurrencyCount = Object.keys(CURRENCIES).length;

export const editTripSchema = z.object({
  id: z.uuid({ message: "Trip ID is required" }),
  title: z
    .string()
    .min(1, { message: "Trip name is required" })
    .max(100, { message: "Trip name must be 100 characters or fewer" }),
  currencies: z
    .array(
      z.string().refine((v) => v in CURRENCIES, {
        message: "Invalid currency code",
      }),
    )
    .max(supportedCurrencyCount, {
      message: `Currencies must be ${supportedCurrencyCount} or fewer`,
    })
    .nullable(),
  member_names: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: "Member name is required" })
          .max(50, { message: "Member name must be 50 characters or fewer" }),
      }),
    )
    .max(50, { message: "At most 50 members are allowed" })
    .nullable(),
});
