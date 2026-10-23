import { MetadataRoute } from "next";
import { LEGAL_LAST_UPDATED, siteUrl } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // These routes are static, so this is the build time — which is when their
  // content last changed, since it only changes with a deploy.
  const lastModified = new Date();
  // The legal pages are the exception: they carry their own date, and
  // reporting the build time would claim they change on every deploy.
  const legalLastModified = new Date(LEGAL_LAST_UPDATED);

  // These URLs must match each page's canonical tag character for character,
  // so both are built with siteUrl(). Trip pages are deliberately left out:
  // the URL is the only access token a trip has.
  return [
    {
      url: siteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: siteUrl("/trips/new"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: siteUrl("/terms"),
      lastModified: legalLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: siteUrl("/privacy"),
      lastModified: legalLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
