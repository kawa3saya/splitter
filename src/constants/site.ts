/**
 * Site-wide identity used by metadata, robots.txt, sitemap.xml and JSON-LD.
 *
 * Keeping the origin here means a non-production deployment only has to set
 * NEXT_PUBLIC_SITE_URL instead of having the URL duplicated across files.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://splitter.seppaaan.workers.dev";

export const SITE_NAME = "Seppaaan";

export const SITE_TITLE = "Seppaaan - Split expenses easily and fairly";

export const SITE_DESCRIPTION =
  "Track group spending, split across currencies, and settle up in seconds — no sign-up required.";
