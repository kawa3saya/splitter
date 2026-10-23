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

/** Applied to each page's own title, e.g. "Privacy Policy | Seppaaan". */
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

export const SITE_DESCRIPTION =
  "Track group spending, split across currencies, and settle up in seconds — no sign-up required.";

/**
 * Last substantive change to the legal pages, as an ISO date.
 *
 * The pages display it and the sitemap reports it as their `lastmod`, so it
 * is written once here instead of in both places where the two could drift.
 * Update it whenever `docs/privacy-policy.md` or `docs/terms-of-service.md`
 * changes.
 */
export const LEGAL_LAST_UPDATED = "2026-05-10";

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
