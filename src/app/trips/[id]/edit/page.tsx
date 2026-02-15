import Link from "next/link";
import { EditTripForm } from "@/app/trips/[id]/edit/_components/edit-trip-form";
import { getTripDetail } from "@/app/trips/[id]/_actions/get-trip-detail";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: ParamsProps) {
  const id = (await params).id;
  const data = await getTripDetail(id);

  if (!data) {
    return notFound();
  }

  const { trip, users, currencies } = data;

  return (
    <div className="p-s flex flex-col gap-s min-h-content">
      <h1 className="text-2xl font-bold">Edit Trip Settings</h1>
      <Link href={`/trips/${id}`}>
        <span className="flex items-center gap-xs font-bold underline cursor-pointer">
          <ArrowLeft className="size-6" />
          Back to Trip Detail
        </span>
      </Link>
      <EditTripForm trip={trip} users={users} currencies={currencies} />
      <p className="text-sm text-gray-500">
        Base Currency and existing members/currencies cannot be removed to
        maintain historical expense integrity.
      </p>
    </div>
  );
}
