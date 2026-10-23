import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FormCreateTrip } from "@/app/trips/new/_components/form-create-trip";
import { pageMetadata } from "@/utils/page-metadata";

export const metadata = pageMetadata("/trips/new");

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
