import { CURRENCIES } from "@/constants/currencies";
import { CurrencyCodeType } from "@/types/currency-code-type";

/**
 * Returns the flag emoji for a currency code (e.g. "jpy" → "🇯🇵").
 *
 * @param code - Currency code (case-insensitive, e.g. "JPY", "jpy")
 * @returns Emoji string, or empty string if the code is not in CURRENCIES
 */
export function getCurrencyEmoji(code: string): string {
  const key = code as CurrencyCodeType;
  return CURRENCIES[key]?.emoji ?? "";
}
