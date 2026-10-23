import type { Metadata } from "next";
import { PRIVATE_ROUTE_METADATA } from "@/utils/page-metadata";

/**
 * Everything under /trips/[id] is private: the trip detail page, its edit,
 * settlement and share screens. Scoping the noindex here rather than on each
 * page means a route added later is covered by default.
 */
export const metadata: Metadata = PRIVATE_ROUTE_METADATA;

export default function TripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
