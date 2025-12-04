import { getTripDetail } from "@/app/trips/[id]/_actions/get-trip-detail";
import { getPayment } from "@/app/trips/[id]/_actions/get-payment";
import { getUsers } from "@/app/trips/[id]/_actions/get-users";
import { TablePayments } from "@/app/trips/[id]/_components/table-payments";

type ParamsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TripDetailPage({ params }: ParamsProps) {
  const id = (await params).id;
  const { payments, currencies } = await getPayment(id);
  const { trip } = await getTripDetail(id);
  const { users } = await getUsers(id);

  if (!trip) {
    return <div className="p-6 text-red-500">Trip not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{trip.title}</h1>
      <p className="text-gray-600">Base currency: {trip.base_currency}</p>
      <TablePayments
        payments={payments}
        currencies={currencies}
        users={users}
      />
    </div>
  );
}
