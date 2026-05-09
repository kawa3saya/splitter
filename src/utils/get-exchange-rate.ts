/**
 * Fetch an exchange rate from the Frankfurter API.
 *
 * Frankfurter stores dates in UTC. This function expects a UTC date string
 * (YYYY-MM-DD) so the caller must convert local times to UTC before calling.
 *
 * @see https://frankfurter.dev
 */
export async function getExchangeRate(
  date: string,
  from: string,
  to: string,
): Promise<number> {
  // APIはcodeを大文字でしか受け取らない(参考：https://frankfurter.dev/)
  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();
  const params = new URLSearchParams({ from: fromUpper, to: toUpper });
  const encodedDate = encodeURIComponent(date);

  // Try the specified date first; if 404 (future/unavailable date), fall back to latest
  let res = await fetch(
    `https://api.frankfurter.dev/v1/${encodedDate}?${params}`,
  );
  if (res.status === 404) {
    res = await fetch(`https://api.frankfurter.dev/v1/latest?${params}`);
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch exchange rate: ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  const rate: number | undefined = data.rates?.[to.toUpperCase()];

  if (rate === undefined) {
    throw new Error(`Rate not found for ${from} -> ${to} on ${date}`);
  }

  return rate;
}
