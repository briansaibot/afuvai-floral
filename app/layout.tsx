import type { Metadata } from "next";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { FloatingCTA } from "./components/FloatingCTA";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://afuvai.com"),
  title: {
    default: "Afuvai Floral Society | Las Vegas Luxury Florist",
    template: "%s | Afuvai Floral Society",
  },
  description:
    "Afuvai Floral Society — Las Vegas luxury floral design, VIP experiences, floral classes, and same-day delivery across the Las Vegas Valley.",
  keywords: [
    "Las Vegas florist",
    "luxury floral design",
    "same-day flower delivery Las Vegas",
    "floral arrangements",
    "wedding florist Las Vegas",
    "floral classes Las Vegas",
    "AmiDayne Nelsen",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afuvai.com",
    siteName: "Afuvai Floral Society",
    title: "Afuvai Floral Society | Las Vegas Luxury Florist",
    description:
      "Las Vegas luxury floral design, VIP experiences, floral classes, and same-day delivery across the Las Vegas Valley.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Afuvai Floral Society — Las Vegas Luxury Florist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afuvai Floral Society | Las Vegas Luxury Florist",
    description: "Las Vegas luxury floral design and same-day delivery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://afuvai.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Florist",
                name: "Afuvai Floral Society",
                url: "https://afuvai.com",
                logo: "https://afuvai.com/logo.png",
                description:
                  "Las Vegas luxury floral design, VIP experiences, floral classes, and same-day delivery.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Las Vegas",
                  addressRegion: "NV",
                  addressCountry: "US",
                },
                email: "admin@afuvai.com",
                openingHours: "Mo-Su 09:00-17:00",
                priceRange: "$$$$",
                sameAs: ["https://instagram.com/afuvaifloral"],
                areaServed: ["Las Vegas", "Henderson", "Summerlin", "North Las Vegas"],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Do you offer same-day delivery in Las Vegas?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes — we offer same-day delivery across the Las Vegas Valley, Henderson, Summerlin, and North Las Vegas on orders placed before 2 pm.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do you host floral parties and events?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes — we offer Bouquet Bars, Floral Crown Bars, Arrangement Workshops, Bachelorette Pop-Ups, and private dinner florals across Las Vegas.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do you offer floral design classes?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes — AmiDayne hosts Beginner Bouquet, Seasonal Design, and Advanced Arrangement classes in Las Vegas, as well as private group workshops.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is your wedding floral minimum?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Our wedding minimum is $1,500. Most full-service weddings range from $3,000–$15,000+ depending on scope and design complexity.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
            <Nav />
            <CartDrawer />
            <FloatingCTA />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#FAF8F3",
                  color: "#1A1A14",
                  border: "1px solid rgba(90,107,84,0.18)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
