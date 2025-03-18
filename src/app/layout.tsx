import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GURU by AetherInc",
  description: "The world's first privacy-first AI device that keeps your data where it belongs — with you.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  themeColor: "#000000",
  keywords: "AI, artificial intelligence, privacy, edge computing, on-device AI, AetherInc, GURU",
  authors: [{ name: "AetherInc" }],
  openGraph: {
    title: "AetherInc - GURU: Privacy-First AI Assistant",
    description: "Experience the world's first truly private AI device. AetherInc's GURU keeps your data where it belongs - with you.",
    images: ["/og-image.jpg"],
    url: "https://aetherinc.com",
    siteName: "AetherInc",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherInc - GURU: Privacy-First AI Assistant",
    description: "Experience the world's first truly private AI device. AetherInc's GURU keeps your data where it belongs - with you.",
    images: ["/og-image.jpg"],
    creator: "@aetherinc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
