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
    <div className="p-l flex flex-col gap-s h-screen bg-gradient-to-b from-primary to-white">
      <Link href="/">
        <span className="flex items-center gap-xs text-white font-bold underline">
          <ArrowLeft className="size-6" />
          Back to Home
        </span>
      </Link>
      <div className="flex flex-1 items-center justify-center">
        <Card>
          <ShareLink tripId={tripId} />
        </Card>
      </div>
    </div>
  );
}
