import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartWishlistProvider } from "@/contexts/CartWishlistContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MapMySoul - Your Spiritual Journey Starts Here",
    template: "%s | MapMySoul"
  },
  description: "Discover personalized holistic healing with our quiz, connect with trusted healers via Zoom, and shop curated wellness products. Transform your mind, body, and soul with MapMySoul.",
  keywords: [
    "spiritual healing",
    "holistic wellness",
    "energy healing",
    "crystal therapy",
    "meditation",
    "mindfulness",
    "personal transformation",
    "spiritual guidance",
    "healing services",
    "wellness products",
    "chakra balancing",
    "reiki",
    "astrology",
    "human design",
    "soul purpose",
    "inner peace",
    "emotional healing",
    "spiritual awakening"
  ],
  authors: [{ name: "MapMySoul Team" }],
  creator: "MapMySoul",
  publisher: "MapMySoul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mapmysoul.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mapmysoul.com',
    siteName: 'MapMySoul',
    title: 'MapMySoul - Your Spiritual Journey Starts Here',
    description: 'Discover personalized holistic healing with our quiz, connect with trusted healers via Zoom, and shop curated wellness products. Transform your mind, body, and soul.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MapMySoul - Spiritual Healing and Wellness Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MapMySoul - Your Spiritual Journey Starts Here',
    description: 'Discover personalized holistic healing with our quiz, connect with trusted healers via Zoom, and shop curated wellness products.',
    images: ['/twitter-image.jpg'],
    creator: '@mapmysoul',
    site: '@mapmysoul',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Health & Wellness',
  classification: 'Spiritual Healing Platform',
  other: {
    'theme-color': '#8B5CF6',
    'color-scheme': 'light dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'MapMySoul',
    'application-name': 'MapMySoul',
    'msapplication-TileColor': '#8B5CF6',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <meta name="theme-color" content="#8B5CF6" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://static.wixstatic.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MapMySoul",
              "url": "https://mapmysoul.com",
              "description": "Discover personalized holistic healing with our quiz, connect with trusted healers via Zoom, and shop curated wellness products.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mapmysoul.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://www.facebook.com/mapmysoul",
                "https://www.instagram.com/mapmysoul",
                "https://twitter.com/mapmysoul",
                "https://www.linkedin.com/company/mapmysoul"
              ]
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MapMySoul",
              "url": "https://mapmysoul.com",
              "logo": "https://mapmysoul.com/logo.png",
              "description": "A spiritual healing and wellness platform connecting individuals with trusted healers and curated wellness products.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@mapmysoul.com"
              },
              "sameAs": [
                "https://www.facebook.com/mapmysoul",
                "https://www.instagram.com/mapmysoul",
                "https://twitter.com/mapmysoul"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartWishlistProvider>
            {children}
            <Toaster />
          </CartWishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
