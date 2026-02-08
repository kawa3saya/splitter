import z from "zod";

export const updateCreateTripPaymentSchema = z.object({
  trip_id: z.string(),
  amount: z.coerce
    .number({ message: "Please enter a number" })
    .min(0.001, { message: "Amount is required" }),
  currency_id: z.string().min(1, { message: "Currency is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  paid_at: z.date({ message: "Paid at is required" }),
  paid_user_id: z.string().min(1, { message: "Paid by is required" }),
  debtors: z
    .array(
      z.object({
        user_id: z.string().min(1, { message: "member is required" }),
      }),
    )
    .min(1, { message: "Split with is required" }),
});
