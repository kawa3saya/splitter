import {
  CurrencyType,
  DebtorType,
  PaymentType,
  TripType,
  UserType,
} from "@/types/type";

export type PaymentDetailsType = PaymentType & {
  users: UserType;
  currencies: CurrencyType;
  debtors: DebtorType[];
};

export type PaymentWithDetailsType = PaymentType & {
  user_name: string;
  currency_code: string;
  debtors: DebtorType[];
};

export type TripDetailType = {
  trip: TripType;
  users: UserType[];
  currencies: CurrencyType[];
  payments: PaymentWithDetailsType[];
};
