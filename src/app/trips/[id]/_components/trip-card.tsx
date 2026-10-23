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
    <Card className="bg-primary gap-xxs p-s">
      <CardContent className="flex flex-col gap-xxs">
        <div className="flex justify-between text-xs text-background font-bold">
          <p>Trip Summary</p>
          <Link
            href={`/trips/${trip.id}/edit`}
            className="flex items-center gap-xxs underline cursor-pointer"
          >
            <p>EDIT</p>
            <Settings className="size-4 text-background" strokeWidth={2.5} />
          </Link>
        </div>
        {/* The trip title is this page's only heading. Tailwind's preflight
            resets heading sizes, so <h1> renders exactly as the <p> did. */}
        <h1 className="text-base font-bold text-white break-words">
          {trip.title}
        </h1>
        <p className="text-xs text-background font-bold">
          Shared by {users.length} members
        </p>
      </CardContent>
    </Card>
  );
}
