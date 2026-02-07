import { Card, CardContent } from "@/components/ui/card";
import { TripType, UserType } from "@/types/type";

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
        <p className="text-sm text-background">Trip Summary</p>
        <p className="text-3xl font-bold text-white">{trip.title}</p>
        <p className="text-sm text-background">
          Shared by {users.length} members
        </p>
      </CardContent>
    </Card>
  );
}
