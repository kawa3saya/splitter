import { z } from "zod";
import { editTripSchema } from "@/app/trips/[id]/edit/_schema/edit-trip-schema";

export type EditTripSchemaType = z.infer<typeof editTripSchema>;
