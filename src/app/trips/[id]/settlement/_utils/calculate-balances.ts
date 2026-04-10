/**
 * 各ユーザーの純収支を計算する
 * 支払者には立替額を加算、負担者には負担額を減算し、全ユーザーの差額を返す
 * 正 = 立て替え超過（もらう側）、負 = 負担超過（払う側）
 *
 * @param payments - 支払い情報の配列（支払者・基準通貨額・負担者リスト）
 * @returns ユーザーIDをキー、収支差額を値とするオブジェクト
 */
type PaymentType = {
  user_id: string;
  amount_in_base_currency: number;
  debtors: { user_id: string; amount_owed_in_base: number }[];
};
export function calculateBalances(
  payments: PaymentType[],
): Record<string, number> {
  const balances: Record<string, number> = {};

  // 例: Aが2000円をA,B,Cの3人分として支払った場合
  //   payment: { user_id: "A", amount_in_base_currency: 2000, debtors: [B: 667, C: 667] }
  //   ※ 支払者A自身はdebtorsに含まれない
  //   → A: +2000（立て替えた全額）, B: -667（負担分）, C: -667（負担分）
  //   結果: A: +1333（B,Cから回収する額）, B: -667（Aに払う額）, C: -667（Aに払う額）
  for (const payment of payments) {
    balances[payment.user_id] =
      (balances[payment.user_id] ?? 0) + payment.amount_in_base_currency;

    for (const debtor of payment.debtors) {
      balances[debtor.user_id] =
        (balances[debtor.user_id] ?? 0) - debtor.amount_owed_in_base;
    }
  }

  return balances;
}
