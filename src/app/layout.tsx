import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CartDrawer from "@/components/CartDrawer";
import CommandPalette from "@/components/CommandPalette";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Preloader from "@/components/Preloader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shiveshwartextiles.com'),
  title: {
    default: 'Shiveshwar Textiles | Premium Textile Manufacturing',
    template: 'Shiveshwar Textiles | %s',
  },
  description: 'Shiveshwar Textiles is a textile manufacturing company based in Surat, Gujarat, specializing in cotton fabrics, polyester fabrics, blended fabrics, custom weaving, and large-scale textile production.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shiveshwartextiles.com',
    siteName: 'Shiveshwar Textiles',
    title: 'Shiveshwar Textiles | Premium Textile Manufacturing',
    description: 'Shiveshwar Textiles is a textile manufacturing company based in Surat, Gujarat, specializing in cotton fabrics, polyester fabrics, blended fabrics, custom weaving, and large-scale textile production.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shiveshwar Textiles - Premium Textile Manufacturing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiveshwar Textiles | Premium Textile Manufacturing',
    description: 'Shiveshwar Textiles is a textile manufacturing company based in Surat, Gujarat, specializing in cotton fabrics, polyester fabrics, blended fabrics, custom weaving, and large-scale textile production.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D945CX8433"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D945CX8433');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-[#0f0e0c] text-[#f5f0e8] flex flex-col min-h-screen overflow-x-hidden">
        <Preloader />
        <LanguageProvider>
          <CartProvider>
            <ScrollProgress />
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
            <CartDrawer />
            <CommandPalette />
            <MobileStickyCTA />
            <FloatingWhatsApp />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}