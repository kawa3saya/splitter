import { z } from "zod";
import { updateCreateTripPaymentSchema } from "@/app/trips/[id]/_schema/update-create-trip-payment-schema";

export type UpdateCreateTripPaymentSchemaType = z.infer<
  typeof updateCreateTripPaymentSchema
>;
