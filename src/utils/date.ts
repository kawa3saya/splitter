/**
 * Formats a date string for display (e.g. "Oct 24, 2025").
 *
 * @param date - Date string parseable by Date (e.g. ISO 8601)
 * @returns Formatted string, e.g. "Oct 24, 2025"
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
