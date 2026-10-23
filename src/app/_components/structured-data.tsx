import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";

/**
 * Schema.org JSON-LD for the app.
 *
 * This has to be a real <script type="application/ld+json"> tag: passing it
 * through Next's `metadata.other` emits <meta name="application/ld+json">
 * with the JSON escaped into an attribute, which crawlers ignore.
 * Rendering it from a server component keeps it out of hydration.
 */
export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    // The app is free. This does not make the page eligible for Google's
    // software app rich result — that needs aggregateRating or review, which
    // we have no real data for and must not invent.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
