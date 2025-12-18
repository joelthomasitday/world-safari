import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Changed fonts
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://worldsafaritours.com'),
  title: {
    default: "World Safari Tours – Hallmark of Premium Travel",
    template: "%s | World Safari Tours"
  },
  description: "Discover handcrafted luxury travel experiences. From African safaris to exotic honeymoons, we curate unforgettable journeys tailored to your dreams.",
  keywords: ["luxury travel", "safari tours", "honeymoon packages", "adventure travel", "world tours", "premium travel", "curated journeys"],
  authors: [{ name: "World Safari Tours" }],
  creator: "World Safari Tours",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "World Safari Tours",
    title: "World Safari Tours – Hallmark of Premium Travel",
    description: "Discover handcrafted luxury travel experiences. From African safaris to exotic honeymoons, we curate unforgettable journeys tailored to your dreams.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "World Safari Tours - Premium Travel Experiences"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "World Safari Tours – Hallmark of Premium Travel",
    description: "Discover handcrafted luxury travel experiences. From African safaris to exotic honeymoons, we curate unforgettable journeys tailored to your dreams.",
    images: ["/og-image.jpg"]
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
};

import { FloatingActions } from "@/components/landing/FloatingActions";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        {children}
        <Toaster />
        <FloatingActions />
      </body>
    </html>
  );
}
