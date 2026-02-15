import z from "zod";

export const editTripSchema = z.object({
  id: z.string().min(1, { message: "Trip ID is required" }),
  title: z.string().min(1, { message: "Trip name is required" }),
  currencies: z.array(z.string()).nullable(),
  member_names: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Member name is required" }),
      }),
    )
    .nullable(),
});
