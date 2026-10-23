import type { Metadata } from "next";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  TITLE_TEMPLATE,
  siteUrl,
} from "@/constants/site";

/**
 * Open Graph fields shared by every route.
 *
 * `url`, `title` and `description` are deliberately left out: Next
 * shallow-merges metadata, so a page that declares `openGraph` replaces the
 * layout's object instead of merging into it, and every route therefore has
 * to spread these itself.
 */
export const OPEN_GRAPH_BASE = {
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
 * Twitter card fields shared by every route, on the same terms as
 * OPEN_GRAPH_BASE: `title` and `description` are set per route.
 *
 * X prefers twitter:* over og:*, so leaving these at the site default while
 * og carried the page's own title would show two different cards for the same
 * page depending on where it was shared.
 */
export const TWITTER_BASE = {
  card: "summary_large_image",
  images: ["/opengraph-image.png"],
} satisfies Metadata["twitter"];

/**
 * Metadata for routes that must stay out of search results.
 *
 * A trip's URL is its only access token, so a trip page that reached an index
 * would expose the trip itself. This is a meta tag rather than a robots.txt
 * rule on purpose: a disallowed URL is never fetched, so the crawler would
 * never see the noindex and could still list the bare URL.
 */
export const PRIVATE_ROUTE_METADATA: Metadata = {
  robots: { index: false, follow: false },
};

type PageMetadataOptions = {
  /** Route path starting with "/", e.g. "/privacy" */
  path: string;
  /** Page title without the site name; omit to use the full site title. */
  title?: string;
  /** Defaults to the site description. */
  description?: string;
};

/**
 * Metadata for a publicly indexable route.
 *
 * Every page used to inherit the root layout's canonical and og:url, which
 * pointed at the home page — a page whose canonical names a different URL is
 * treated as a duplicate and dropped from the index, so /privacy, /terms and
 * /trips/new could never rank under their own URLs. They also all shared one
 * title and description, which gives search engines nothing to tell them
 * apart.
 *
 * Trip routes intentionally do not call this: see PRIVATE_ROUTE_METADATA.
 */
export function pageMetadata({
  path,
  title,
  description = SITE_DESCRIPTION,
}: PageMetadataOptions): Metadata {
  const url = siteUrl(path);
  // Next applies the layout's title template to `title`, but not to
  // og:title — that one is built here so the two stay in step.
  const fullTitle = title ? TITLE_TEMPLATE.replace("%s", title) : SITE_TITLE;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      ...TWITTER_BASE,
      title: fullTitle,
      description,
    },
  };
}
