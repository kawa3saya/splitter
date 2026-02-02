import Link from "next/link";
import { ShareLink } from "@/app/trips/[id]/share/_components/share-link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export default async function SharePage({ params }: ParamsProps) {
  const tripId = (await params).id;

  return (
    <div className="p-l flex flex-col gap-s">
      <Link href="/">
        <span className="flex items-center gap-xs">
          <ArrowLeft className="size-4" />
          Back to Home
        </span>
      </Link>
      <Card>
        <ShareLink tripId={tripId} />
      </Card>
    </div>
  );
}
