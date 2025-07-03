import type { Metadata, Viewport } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import "../components/ui/color-scheme.css";
import { SessionProvider } from "@/components/SessionProvider";
import dynamic from "next/dynamic";
import { validateEnv } from '@/lib/env';

const josefinSans = Josefin_Sans({ subsets: ["latin"], display: "swap", variable: "--font-josefin-sans" });

// Avoid rendering on the server to prevent RSC boundary issues
const FloatingChat = dynamic(() => import("@/components/FloatingChat"), { ssr: false });

// Dynamically load JarvisBackground (client-side only)
const JarvisBackground = dynamic(() => import("@/components/JarvisBackground"), {
  ssr: false,
});

// Dynamically load AnalyticsProvider (client-side only)
const AnalyticsProvider = dynamic(() => import("@/components/layout/AnalyticsProvider"), {
  ssr: false,
});

// Validate environment variables on server
if (typeof window === 'undefined') {
  validateEnv();
}

export const metadata: Metadata = {
  title: "AetherInc - Privacy-First AI Solutions | GURU & AetherArena",
  description: "Scottish AI startup building the future of privacy-first AI. GURU personal AI assistant and AetherArena self-improving platform. Local AI, no cloud dependency.",
  metadataBase: new URL('https://aetherinc.com'),
  keywords: "AI startup Scotland, privacy AI, local AI, GURU AI assistant, AetherArena platform, on-device AI, AI consulting Glasgow, enterprise AI solutions, NVIDIA Jetson, Iron Man Jarvis, AI automation, Business Bloom",
  authors: [
    { name: "Krish Dokania", url: "https://linkedin.com/in/krish-dokania-56203b217" },
  ],
  creator: "AetherInc Limited",
  publisher: "AetherInc Limited",
  category: "Technology",
  openGraph: {
    title: "AetherInc - Privacy-First AI Solutions | GURU & AetherArena",
    description: "Scottish AI startup building GURU personal AI assistant and AetherArena self-improving platform. Iron Man-inspired vision meets cutting-edge local AI technology.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AetherInc - Privacy-First AI Solutions"
      }
    ],
    url: "https://aetherinc.xyz",
    siteName: "AetherInc",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherInc - Privacy-First AI Solutions | GURU & AetherArena",
    description: "Scottish AI startup building GURU personal AI assistant and AetherArena self-improving platform. Iron Man-inspired vision meets cutting-edge local AI technology.",
    images: ["/og-image.jpg"],
    creator: "@aetherinc",
    site: "@aetherinc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
  alternates: {
    canonical: 'https://aetherinc.com',
  },
  other: {
    'company-registration': 'SC851680',
    'company-location': 'Glasgow, Scotland',
    'founded': '2025-06-10'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 0.9,
  maximumScale: 5,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${josefinSans.variable} fit-content`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="AetherInc" />
        <meta name="application-name" content="AetherInc" />
        <meta name="color-scheme" content="dark" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AetherInc",
              "url": "https://aetherinc.xyz",
              "logo": "https://aetherinc.xyz/logo.jpg",
              "sameAs": [
                "https://twitter.com/aether_inc_ai",
                "https://linkedin.com/company/aetherinc"
              ],
              "founder": {
                "@type": "Person",
                "name": "Krish Dokania",
                "url": "https://linkedin.com/in/krish-dokania-56203b217"
              },
              "description": "AetherInc is a privacy-first AI company revolutionizing how people interact with artificial intelligence through local-first, secure AI tools and solutions."
            })
          }}
        />
      </head>
      <body className="min-h-screen text-white overflow-x-hidden max-w-[100vw] color-scheme-dark">
        {/* Global background */}
        <JarvisBackground />

        <SessionProvider>
          <AnalyticsProvider>
            <div className="container-responsive responsive-padding">
              {children}
            </div>
          </AnalyticsProvider>
        </SessionProvider>
        <FloatingChat />
      </body>
    </html>
  );
}
