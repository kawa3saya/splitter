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

/**
 * Formats a date-only string in Japanese (e.g. "2026年5月10日").
 *
 * Used by the legal pages, whose copy is Japanese. The time zone is pinned to
 * UTC because a bare "YYYY-MM-DD" parses as UTC midnight: rendered in the
 * build machine's own zone, anywhere west of UTC would show the day before.
 *
 * @param date - Date-only string, e.g. "2026-05-10"
 * @returns Formatted string, e.g. "2026年5月10日"
 */
export function formatDateJa(date: string): string {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
