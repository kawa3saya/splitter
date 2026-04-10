import { getSettlement } from "@/app/trips/[id]/settlement/_actions/get-settlement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardSettlement } from "@/app/trips/[id]/settlement/_components/card-settlement";
import { CardTotalSpending } from "@/app/trips/[id]/settlement/_components/card-total-spending";

type ParamsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SettlementPage({ params }: ParamsProps) {
  const id = (await params).id;
  const { settlements, totalSpending, baseCurrency } = await getSettlement(id);

  return (
    <div>
      <h1 className="text-2xl font-bold">Settlement Summary</h1>
      <Tabs defaultValue="settlements">
        <TabsList variant="line">
          <TabsTrigger value="settlements" className="text-sm font-bold">
            Settlements
          </TabsTrigger>
          <TabsTrigger value="total-spending" className="text-sm font-bold">
            Total Spending
          </TabsTrigger>
        </TabsList>
        <TabsContent value="settlements">
          <CardSettlement
            settlements={settlements}
            baseCurrency={baseCurrency}
          />
        </TabsContent>
        <TabsContent value="total-spending">
          <CardTotalSpending
            totalSpending={totalSpending}
            baseCurrency={baseCurrency}
          />
        </TabsContent>
      </Tabs>
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-background p-4 shadow-top">
        <Button
          asChild
          variant="default"
          className="w-full text-base font-bold"
        >
          <Link href={`/trips/${id}`}>BACK TO TRIP</Link>
        </Button>
      </div>
    </div>
  );
}
