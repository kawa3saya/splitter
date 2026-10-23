import { TotalSpendingType } from "@/app/trips/[id]/settlement/_types/settlement-type";
import { formatCurrencyCode } from "@/utils/format-currency-code";

export function CardTotalSpending({
  totalSpending,
  baseCurrency,
}: {
  totalSpending: TotalSpendingType[];
  baseCurrency: string;
}) {
  return (
    <div className="flex flex-col gap-xxs p-s">
      <div className="flex justify-between items-center text-sm font-bold">
        <p>MEMBER</p>
        <p>TOTAL SPENT (BASE)</p>
      </div>
      {totalSpending.map((spending) => (
        <div
          key={spending.user_id}
          className="flex justify-between items-center rounded-xl p-s bg-white"
        >
          <p className="font-bold">{spending.user_name}</p>
          <p className="font-bold text-primary">
            {spending.amount} {formatCurrencyCode(baseCurrency)}
          </p>
        </div>
      ))}
    </div>
  );
}
