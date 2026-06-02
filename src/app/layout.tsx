import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Main } from "@/components/ui/main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://splitter.seppaaan.workers.dev"),
  title: "Seppaaan - Split expenses easily and fairly",
  description: "Track group spending, split across currencies, and settle up in seconds — no sign-up required.",
  keywords: ["split expenses", "group spending", "currency converter", "trip expenses", "settle up"],
  openGraph: {
    title: "Seppaaan - Split expenses easily and fairly",
    description: "Track group spending, split across currencies, and settle up in seconds — no sign-up required.",
    url: "https://splitter.seppaaan.workers.dev",
    siteName: "Seppaaan",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Seppaaan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seppaaan - Split expenses easily and fairly",
    description: "Track group spending, split across currencies, and settle up in seconds",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "https://splitter.seppaaan.workers.dev",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Seppaaan",
      description: "Track group spending, split across currencies, and settle up in seconds",
      url: "https://splitter.seppaaan.workers.dev",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
    }),
  },
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
        <Header />
        <Main>{children}</Main>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
