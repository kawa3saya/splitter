import { Card, CardContent } from "@/components/ui/card";
import { TripType, UserType } from "@/types/type";
import { Settings } from "lucide-react";
import Link from "next/link";

export function TripCard({
  trip,
  users,
}: {
  trip: TripType;
  users: UserType[];
}) {
  return (
    <Card className="bg-primary">
      <CardContent className="flex flex-col gap-xxs">
        <div className="flex justify-between text-sm text-background font-bold">
          <p>Trip Summary</p>
          <Link
            href={`/trips/${trip.id}/edit`}
            className="flex items-center gap-xxs underline cursor-pointer font-s"
          >
            <p>EDIT</p>
            <Settings className="size-5 text-background" strokeWidth={2.5} />
          </Link>
        </div>
        <p className="text-3xl font-bold text-white">{trip.title}</p>
        <p className="text-sm text-background font-bold">
          Shared by {users.length} members
        </p>
      </CardContent>
    </Card>
  );
}
