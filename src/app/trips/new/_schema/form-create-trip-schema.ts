import { z } from "zod";

export const formCreateTripSchema = z.object({
  title: z.string().min(1, { message: "Trip name is required" }),
  base_currency: z.string().min(1, { message: "Base currency is required" }),
  currencies: z
    .array(z.string())
    .min(1, { message: "Currencies are required" }),
  member_names: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Member name is required" }),
      })
    )
    .min(2, { message: "At least 2 members are required" }),
});
