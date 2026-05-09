import { z } from "zod";
import { CURRENCIES } from "@/constants/currencies";

const supportedCurrencyCount = Object.keys(CURRENCIES).length;

export const formCreateTripSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Trip name is required" })
    .max(100, { message: "Trip name must be 100 characters or fewer" }),
  base_currency: z
    .string()
    .refine((v) => v in CURRENCIES, {
      message: "Base currency is required",
    }),
  currencies: z
    .array(
      z.string().refine((v) => v in CURRENCIES, {
        message: "Invalid currency code",
      }),
    )
    .min(1, { message: "Currencies are required" })
    .max(supportedCurrencyCount, {
      message: `Currencies must be ${supportedCurrencyCount} or fewer`,
    }),
  member_names: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: "Member name is required" })
          .max(50, { message: "Member name must be 50 characters or fewer" }),
      }),
    )
    .min(2, { message: "At least 2 members are required" })
    .max(50, { message: "At most 50 members are allowed" }),
});
