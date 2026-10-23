import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FormCreateTrip } from "@/app/trips/new/_components/form-create-trip";
import { pageMetadata } from "@/utils/page-metadata";

export const metadata = pageMetadata({
  path: "/trips/new",
  title: "Create a new trip",
  description:
    "Name your trip, pick the base currency to settle in and the currencies you'll be spending, then add everyone sharing the costs. No sign-up required.",
});

export default function NewTripPage() {
  return (
    <div className="p-s flex flex-col gap-s">
      <Link href="/">
        <span className="flex items-center gap-xs">
          <ArrowLeft className="size-4" />
          Back to Home
        </span>
      </Link>
      <FormCreateTrip />
    </div>
  );
}
