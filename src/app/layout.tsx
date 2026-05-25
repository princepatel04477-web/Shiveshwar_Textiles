import type { Metadata } from "next";
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
  title: "Shiveshwar Textiles | Premium B2B Indian Fabric Supplier to Europe",
  description: "Exporting premium Indian fabrics (Cotton, Polyester, Blends) direct from our Surat mill to Germany and the broader European market. Up to 1M meters/month capacity, ISO-compliant quality.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-[#0f0e0c] text-[#f5f0e8] flex flex-col min-h-screen overflow-x-hidden">
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