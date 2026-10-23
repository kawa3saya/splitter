import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Main } from "@/components/ui/main";
import { StructuredData } from "@/app/_components/structured-data";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/constants/site";
import { OPEN_GRAPH_BASE } from "@/utils/page-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Static on purpose: reading headers() here would opt every route out of
// static rendering, and the origin is already known from SITE_URL.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "split expenses",
    "group spending",
    "currency converter",
    "trip expenses",
    "settle up",
  ],
  // Fallback for routes that set no metadata of their own — the trip pages.
  // Their own URL must not leak here, so it stays the site root.
  openGraph: { ...OPEN_GRAPH_BASE, url: SITE_URL },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  // No `alternates.canonical` here: it would be inherited by every page and
  // declare each of them a duplicate of the home page. Each indexable route
  // sets its own via pageMetadata().
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh p-0 bg-background`}
      >
        <StructuredData />
        <Header />
        <Main>{children}</Main>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
