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
  title: "Shiveshwar Textiles | Premium Fabric Manufacturer & Distribution Network",
  description: "Manufacturing premium fabrics (Cotton, Polyester, Blends) directly from our advanced mill infrastructure. Up to 1M meters/month capacity, high-performance quality standards.",
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