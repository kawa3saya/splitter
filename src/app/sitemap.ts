import { MetadataRoute } from "next";
import { siteUrl } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: siteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
