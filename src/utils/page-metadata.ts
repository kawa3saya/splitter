import type { Metadata } from "next";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  siteUrl,
} from "@/constants/site";

/**
 * Open Graph fields shared by every route.
 *
 * `url` is deliberately left out: Next shallow-merges metadata, so a page that
 * declares `openGraph` replaces the layout's object instead of merging into
 * it, and every route therefore has to spread these itself.
 */
export const OPEN_GRAPH_BASE = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  siteName: SITE_NAME,
  images: [
    {
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: SITE_NAME,
    },
  ],
  locale: "en_US",
  type: "website",
} satisfies Metadata["openGraph"];

/**
 * Metadata for a publicly indexable route.
 *
 * Every page used to inherit the root layout's canonical and og:url, which
 * pointed at the home page — a page whose canonical names a different URL is
 * treated as a duplicate and dropped from the index, so /privacy, /terms and
 * /trips/new could never rank under their own URLs.
 *
 * Trip routes intentionally do not call this: their URL is the only access
 * token a trip has, so it should appear in neither a canonical tag nor og:url.
 *
 * @param path - Route path starting with "/", e.g. "/privacy"
 */
export function pageMetadata(path: string): Metadata {
  const url = siteUrl(path);

  return {
    alternates: { canonical: url },
    openGraph: { ...OPEN_GRAPH_BASE, url },
  };
}
