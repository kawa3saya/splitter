import { Database } from "../../database.types";

export type TripType = Database["public"]["Tables"]["trips"]["Row"];
export type UserType = Database["public"]["Tables"]["users"]["Row"];
export type CurrencyType = Database["public"]["Tables"]["currencies"]["Row"];
export type PaymentType = Database["public"]["Tables"]["payments"]["Row"];
export type DebtorType = Database["public"]["Tables"]["debtors"]["Row"];
