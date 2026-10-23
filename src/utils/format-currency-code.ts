/**
 * Formats a currency code for display (e.g. "jpy" → "JPY").
 *
 * Codes are stored lowercase (see CURRENCIES), so every place that shows one
 * to the user goes through here to keep the casing consistent.
 *
 * @param code - Currency code as stored, e.g. "jpy"
 * @returns The code in upper case, e.g. "JPY"
 */
export function formatCurrencyCode(code: string): string {
  return code.toUpperCase();
}
