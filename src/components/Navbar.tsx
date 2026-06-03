'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Globe, Menu, X, ShoppingBag } from 'lucide-react';

const logo =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { cartItems, openDrawer, shouldPulse } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.quality'), href: '/quality' },
    { name: t('nav.shipping'), href: '/shipping-export' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[#b8924a]/25 bg-[#0f0e0c]/95 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl'
          : 'border-[#b8924a]/15 bg-[#0f0e0c]/95 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        {/* Logo and Branding */}
        <Link href="/" className="flex min-w-0 items-center gap-3" data-cursor="Home">
          <img src={logo} alt="Shiveshwar Textiles logo" className="h-10 w-10 object-contain md:h-12 md:w-12" />
          <div className="min-w-0">
            <div className="text-[9px] uppercase tracking-[0.35em] text-[#f5f0e8]/50">Surat, India</div>
            <div className="font-serif text-sm uppercase tracking-[0.16em] text-[#d4a96a] sm:text-base md:text-lg">
              Shiveshwar Textiles
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-[0.2em] transition hover:text-[#d4a96a] ${
                  isActive ? 'text-[#d4a96a] font-medium' : 'text-[#f5f0e8]/75'
                }`}
                data-cursor="Go"
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Language Selection & CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'DE' : 'EN')}
            className="flex items-center gap-1.5 border border-[#b8924a]/25 px-2.5 py-1 text-xs uppercase tracking-wider text-[#d4a96a] transition hover:bg-[#b8924a]/10"
            title="Change language"
            data-cursor="Lang"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{language}</span>
          </button>

          {/* Cart Icon / RFQ Badge */}
          <button
            onClick={openDrawer}
            className={`relative flex items-center gap-2 border border-[#b8924a]/30 px-3 py-1.5 text-xs uppercase tracking-wider text-[#d4a96a] bg-[#b8924a]/5 transition hover:bg-[#b8924a]/10 ${
              shouldPulse ? 'animate-shake border-[#d4a96a] bg-[#b8924a]/20' : ''
            }`}
            data-cursor="Cart"
            title="Open RFQ Drawer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">RFQ {cartItems.length > 0 ? `(${cartItems.length})` : ''}</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4a96a] text-[9px] font-bold text-[#0f0e0c] animate-scale-in">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Gold CTA */}
          <Link
            href="/contact?subject=Sample Request"
            className="border border-[#b8924a]/50 bg-[#b8924a]/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#d4a96a] transition hover:bg-[#b8924a] hover:text-[#0f0e0c] hover:font-bold"
            data-cursor="Inquire"
          >
            {t('nav.request_sample')}
          </Link>
        </div>

        {/* Mobile controls: language select + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile RFQ Trigger */}
          <button
            onClick={openDrawer}
            className={`relative flex items-center gap-1.5 border border-[#b8924a]/25 px-2.5 py-1 text-[11px] text-[#d4a96a] ${
              shouldPulse ? 'animate-shake border-[#d4a96a] bg-[#b8924a]/10' : ''
            }`}
          >
            <ShoppingBag className="h-3 w-3" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d4a96a] text-[8px] font-bold text-[#0f0e0c]">
                {cartItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setLanguage(language === 'EN' ? 'DE' : 'EN')}
            className="flex items-center gap-1.5 border border-[#b8924a]/25 px-2 py-1 text-[11px] text-[#d4a96a]"
          >
            <Globe className="h-3 w-3" />
            <span>{language}</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-[#f5f0e8]/80 hover:text-[#d4a96a] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="border-t border-[#b8924a]/15 bg-[#0f0e0c] lg:hidden animate-fade-in">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 text-sm uppercase tracking-[0.25em] transition hover:bg-[#1c1a17] ${
                    isActive ? 'text-[#d4a96a] font-bold border-l-2 border-[#d4a96a]' : 'text-[#f5f0e8]/80'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#b8924a]/10 px-3">
              <Link
                href="/contact?subject=Sample Request"
                className="block w-full text-center border border-[#b8924a]/50 bg-[#b8924a] px-4 py-3 text-xs uppercase tracking-[0.25em] text-[#0f0e0c] font-bold transition hover:bg-[#d4a96a]"
              >
                {t('nav.request_sample')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
