'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function MobileStickyCTA() {
  const { openDrawer, cartItems } = useCart();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolling up, or if near the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        // Scrolling down - hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        // Scrolling up - show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 p-4 bg-[#0f0e0c]/90 backdrop-blur-md border-t border-[#b8924a]/20 transition-all duration-300 lg:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.5)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="flex gap-3 max-w-md mx-auto">
        {/* WhatsApp Inquiry */}
        <a
          href="https://wa.me/919316189146?text=Hi%2C%20I%20am%20interested%20in%20your%20fabrics%20from%20your%20B2B%20portal."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 py-3 text-xs uppercase tracking-widest text-[#25D366] font-bold rounded-sm transition active:bg-[#25D366]/20"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{t('cta.whatsapp')}</span>
        </a>

        {/* Request RFQ / Drawer Open */}
        <button
          onClick={openDrawer}
          className="flex-1 flex items-center justify-center gap-2 border border-[#b8924a]/50 bg-[#b8924a] py-3 text-xs uppercase tracking-widest text-[#0f0e0c] font-bold rounded-sm transition active:bg-[#d4a96a] relative"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{t('cta.get_quote')}</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f5f0e8] text-[10px] font-bold text-[#0f0e0c] border border-[#b8924a]">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
