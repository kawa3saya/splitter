import { SettlementType } from "@/app/trips/[id]/settlement/_types/settlement-type";
import { ArrowRight } from "lucide-react";
import { formatCurrencyCode } from "@/utils/format-currency-code";

export function CardSettlement({
  settlements,
  baseCurrency,
}: {
  settlements: SettlementType[];
  baseCurrency: string;
}) {
  return (
    <div className="flex flex-col gap-xxs p-s">
      <div className="flex justify-between items-center text-sm font-bold">
        <p>FROM</p>
        <p>TO</p>
        <p>AMOUNT</p>
      </div>
      {settlements.map((settlement, index) => (
        <div
          key={index}
          className="flex justify-between items-center rounded-xl p-s bg-white"
        >
          <p className="font-bold">{settlement.from_user_name}</p>
          <ArrowRight className="size-4 text-primary stroke-2" />
          <p className="font-bold">{settlement.to_user_name}</p>
          <p className="font-bold">
            {settlement.amount} {formatCurrencyCode(baseCurrency)}
          </p>
        </div>
      ))}
    </div>
  );
}
