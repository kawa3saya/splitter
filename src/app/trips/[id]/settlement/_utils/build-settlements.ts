import { SettlementType } from "@/app/trips/[id]/settlement/_types/settlement-type";

/**
 * 収支の差分から「誰が誰にいくら払うか」の精算リストを生成する
 * もらう側・払う側を金額の大きい順にマッチングし、送金回数を最小化する
 *
 * @param balances - 各ユーザーの収支差額（calculateBalances の戻り値）
 * @param nameOf - ユーザーIDから表示名へのマッピング
 * @returns 精算（from → to × amount）のリスト
 */
export function buildSettlements(
  balances: Record<string, number>,
  nameOf: Record<string, string>,
): SettlementType[] {
  // 例: balances = { A: +1333, B: -667, C: -667 }
  //   → receivers: [A: 1333], payers: [B: 667, C: 667]
  // もらう側・払う側に分離
  const receivers: { id: string; amount: number }[] = [];
  const payers: { id: string; amount: number }[] = [];

  for (const [id, balance] of Object.entries(balances)) {
    const rounded = Math.round(balance * 100) / 100;
    if (rounded > 0) receivers.push({ id, amount: rounded });
    if (rounded < 0) payers.push({ id, amount: -rounded });
  }

  // 金額の大きい順にソートし、大きい者同士からマッチングして送金回数を最小化
  receivers.sort((left, right) => right.amount - left.amount);
  payers.sort((left, right) => right.amount - left.amount);

  // 例: receivers: [A: 1333], payers: [B: 667, C: 667]
  //   1回目: B→A に min(667, 1333) = 667 → Aの残り: 666, Bの残り: 0 → B完了
  //   2回目: C→A に min(667, 666) = 666 → Aの残り: 0, Cの残り: 1 → 両方完了
  //   結果: [B→A: 667, C→A: 666]
  const settlements: SettlementType[] = [];
  let ri = 0;
  let pi = 0;

  while (ri < receivers.length && pi < payers.length) {
    const amount =
      Math.round(Math.min(payers[pi].amount, receivers[ri].amount) * 100) / 100;

    if (amount > 0) {
      settlements.push({
        from_user_id: payers[pi].id,
        from_user_name: nameOf[payers[pi].id] ?? "",
        to_user_id: receivers[ri].id,
        to_user_name: nameOf[receivers[ri].id] ?? "",
        amount,
      });
    }

    payers[pi].amount -= amount;
    receivers[ri].amount -= amount;
    if (payers[pi].amount < 0.01) pi++;
    if (receivers[ri].amount < 0.01) ri++;
  }

  return settlements;
}
