import { getTripDetail } from "@/app/trips/[id]/_actions/get-trip-detail";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/app/trips/[id]/_components/trip-card";
import { TripPaymentCard } from "@/app/trips/[id]/_components/trip-payment-card";
import { getCurrencyEmoji } from "@/utils/get-currency-emoji";

type ParamsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TripDetailPage({ params }: ParamsProps) {
  const id = (await params).id;
  const data = await getTripDetail(id);

  if (!data) {
    return notFound();
  }

  const { trip, users, payments } = data;

  return (
    <>
      <div className="p-s flex flex-col gap-s min-h-content pb-40">
        <TripCard trip={trip} users={users} />
        <p className="font-bold">
          Base currency: {trip.base_currency}
          <span className="pl-xxs">{getCurrencyEmoji(trip.base_currency)}</span>
        </p>
        <TripPaymentCard payments={payments} />
      </div>

      <Button
        asChild
        size="icon"
        className="fixed bottom-25 right-4 z-10 size-14 rounded-full shadow-xl shadow-primary/10"
      >
        <Link href="#" className="flex items-center justify-center">
          <Plus className="size-7" strokeWidth={2.5} />
        </Link>
      </Button>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-background p-4 shadow-top">
        <Button
          asChild
          variant="default"
          className="w-full text-base font-bold"
        >
          <Link href="#">SHOW SETTLEMENT</Link>
        </Button>
      </div>
    </>
  );
}
