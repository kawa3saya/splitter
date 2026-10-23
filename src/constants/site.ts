/**
 * Site-wide identity used by metadata, robots.txt, sitemap.xml, JSON-LD and
 * the shareable trip link.
 *
 * Keeping the origin here means a non-production deployment only has to set
 * NEXT_PUBLIC_SITE_URL instead of having the URL duplicated across files.
 */

// `||` rather than `??`: a var that is set but empty would otherwise survive
// and make `new URL("")` throw while the root layout is being loaded.
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://splitter.seppaaan.workers.dev";

/** Canonical origin, without a trailing slash so paths can be appended. */
export const SITE_URL = configuredSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = "Seppaaan";

export const SITE_TITLE = "Seppaaan - Split expenses easily and fairly";

export const SITE_DESCRIPTION =
  "Track group spending, split across currencies, and settle up in seconds — no sign-up required.";

/**
 * Absolute URL for a route.
 *
 * Canonical tags and sitemap entries have to agree character for character,
 * so both go through here instead of concatenating the origin by hand.
 *
 * @param path - Route path starting with "/", e.g. "/privacy"
 * @returns The absolute URL, with no trailing slash for the home page
 */
export function siteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
