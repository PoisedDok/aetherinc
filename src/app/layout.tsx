import type { Metadata, Viewport } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import "../components/ui/color-scheme.css";
import { SessionProvider } from "@/components/SessionProvider";
import dynamic from "next/dynamic";
import { validateEnv } from '@/lib/env';

const CookieConsentBanner = dynamic(() => import('@/components/CookieConsentBanner'), { ssr: false });

const josefinSans = Josefin_Sans({ subsets: ["latin"], display: "swap", variable: "--font-josefin-sans" });



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
    google: process.env.GOOGLE_SITE_VERIFICATION || 'google-site-verification-token',
    yandex: process.env.YANDEX_VERIFICATION || '',
  },
  alternates: {
    canonical: 'https://aetherinc.xyz',
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

        {/* AI Bot Optimization Meta Tags */}
        <meta name="generator" content="Next.js" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* AI Content Hints */}
        <meta name="ai-content-type" content="business, technology, ai, software" />
        <meta name="ai-audience" content="businesses, developers, enterprises, startups" />
        <meta name="ai-keywords" content="AI, artificial intelligence, machine learning, privacy, local AI, edge computing, automation, consulting" />
        <meta name="ai-summary" content="AetherInc provides privacy-first AI solutions including GURU personal assistant and AetherArena platform for secure, local AI applications." />

        {/* Additional SEO and Performance */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preload critical resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AetherInc",
              "url": "https://aetherinc.xyz",
              "logo": "https://aetherinc.xyz/logo.jpg",
              "image": "https://aetherinc.xyz/og-image.jpg",
              "description": "Scottish AI startup building privacy-first AI solutions including GURU personal AI assistant and AetherArena self-improving platform. Local AI, no cloud dependency.",
              "foundingDate": "2025-06-10",
              "founder": {
                "@type": "Person",
                "name": "Krish Dokania",
                "url": "https://linkedin.com/in/krish-dokania-56203b217",
                "jobTitle": "Founder & CEO",
                "sameAs": [
                  "https://linkedin.com/in/krish-dokania-56203b217",
                  "https://twitter.com/aether_inc_ai"
                ]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB",
                "addressRegion": "Scotland",
                "addressLocality": "Glasgow"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-XXXXXXXXXX",
                "contactType": "customer service",
                "availableLanguage": ["English"],
                "url": "https://aetherinc.xyz/contact"
              },
              "sameAs": [
                "https://twitter.com/aether_inc_ai",
                "https://www.linkedin.com/company/aetherinc",
                "https://github.com/aetherinc"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Privacy-First AI",
                "Local AI Solutions",
                "NVIDIA Jetson",
                "Edge Computing",
                "Computer Vision",
                "Natural Language Processing",
                "AI Automation",
                "Enterprise AI Solutions"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AetherInc Products & Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "GURU AI Assistant",
                      "description": "Personal AI assistant that runs locally on your device with Iron Man-inspired interface",
                      "category": "Software",
                      "brand": "AetherInc"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "AetherArena Platform",
                      "description": "Self-improving AI platform for enterprise applications",
                      "category": "Software",
                      "brand": "AetherInc"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Consulting Services",
                      "description": "Expert AI consulting for businesses in Glasgow and Scotland",
                      "provider": {
                        "@type": "Organization",
                        "name": "AetherInc"
                      }
                    }
                  }
                ]
              },
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "United Kingdom"
                },
                {
                  "@type": "State",
                  "name": "Scotland"
                }
              ],
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "1"
              }
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AetherInc",
              "url": "https://aetherinc.xyz",
              "description": "Privacy-First AI Solutions | GURU & AetherArena",
              "publisher": {
                "@type": "Organization",
                "name": "AetherInc",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://aetherinc.xyz/logo.jpg"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aetherinc.xyz/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://twitter.com/aether_inc_ai",
                "https://www.linkedin.com/company/aetherinc",
                "https://github.com/aetherinc"
              ]
            })
          }}
        />

        {/* Breadcrumb Schema for better navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://aetherinc.xyz"
                }
              ]
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
              <CookieConsentBanner />
            </div>
          </AnalyticsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
