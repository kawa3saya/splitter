import z from "zod";

export const updateCreateTripPaymentSchema = z.object({
  trip_id: z.uuid({ message: "Trip ID is required" }),
  amount: z.coerce
    .number({ error: "Please enter a number" })
    .min(0.001, { message: "Amount is required" })
    .finite({ message: "Amount must be a finite number" })
    .max(1_000_000, { message: "Amount must be 1,000,000 or less" }),
  currency_id: z.uuid({ message: "Currency is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be 500 characters or fewer" }),
  paid_at: z.coerce
    .date({ error: "Paid at is required" })
    .min(new Date("2000-01-01"), {
      message: "Paid at must be on or after 2000-01-01",
    })
    .max(new Date("2100-01-01"), {
      message: "Paid at must be on or before 2100-01-01",
    }),
  paid_user_id: z.uuid({ message: "Paid by is required" }),
  debtors: z
    .array(
      z.object({
        user_id: z.uuid({ message: "member is required" }),
      }),
    )
    .min(1, { message: "Split with is required" })
    .max(50, { message: "At most 50 debtors are allowed" }),
});
