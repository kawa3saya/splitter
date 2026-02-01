import { formCreateTripSchema } from "@/app/trips/new/_schema/form-create-trip-schema";
import { z } from "zod";

export type FormCreateTripSchemaType = z.infer<typeof formCreateTripSchema>;
