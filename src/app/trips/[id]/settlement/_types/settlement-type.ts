export type SettlementType = {
  from_user_id: string;
  from_user_name: string;
  to_user_id: string;
  to_user_name: string;
  amount: number;
};

export type TotalSpendingType = {
  user_id: string;
  user_name: string;
  amount: number;
};
