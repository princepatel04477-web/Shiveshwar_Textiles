'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'DE';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    // Nav
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.quality': 'Quality',
    'nav.shipping': 'Shipping & Export',
    'nav.contact': 'Contact',
    'nav.request_sample': 'Request Sample',
    // Hero
    'hero.badge': 'Since 2021 · Surat, India',
    'hero.title_textiles': 'Textiles',
    'hero.subline': 'Supplying premium Indian fabrics to European manufacturers — reliable, scalable, direct from the mill.',
    'hero.explore': 'Explore Products',
    'hero.request_sample': 'Request a Sample',
    // Stats
    'stats.meters_val': '1M+',
    'stats.meters_lbl': 'Meters / Month',
    'stats.est_val': '2021',
    'stats.est_lbl': 'Established',
    'stats.types_val': '500m',
    'stats.types_lbl': 'Minimum Order',
    // Badges strip
    'badge.iso': 'Audited Weave Quality',
    'badge.export': 'Export Since 2021',
    'badge.moq': 'MOQ from 500m',
    'badge.shipping': 'EXW/FOB Shipping Available',
    // Common CTAs
    'cta.inquire': 'Inquire Now',
    'cta.get_quote': 'Request Quote',
    'cta.whatsapp': 'WhatsApp Inquiry',
    // Quality page & section
    'quality.title': 'Consistency in Every Meter',
    'quality.sub': 'Structured inspection processes ensure accurate GSM, uniform weave, and reliable batch quality across all production runs.',
    // Shipping page & section
    'shipping.title': 'Shipping & Export Logistics',
    // Contact page
    'contact.title': 'Let\'s discuss your requirements',
    'contact.sub': 'Share your fabric specifications, quantity, and timeline. Our team will respond promptly.',
    'contact.promise': 'We respond to all B2B inquiries within 1 business day',
  },
  DE: {
    // Nav
    'nav.home': 'Startseite',
    'nav.products': 'Produkte',
    'nav.about': 'Über uns',
    'nav.quality': 'Qualität',
    'nav.shipping': 'Versand & Export',
    'nav.contact': 'Kontakt',
    'nav.request_sample': 'Muster anfordern',
    // Hero
    'hero.badge': 'Seit 2021 · Surat, Indien',
    'hero.title_textiles': 'Textilien',
    'hero.subline': 'Lieferung erstklassiger indischer Stoffe an europäische Hersteller — zuverlässig, skalierbar, direkt aus der Weberei.',
    'hero.explore': 'Produkte erkunden',
    'hero.request_sample': 'Muster anfordern',
    // Stats
    'stats.meters_val': '1M+',
    'stats.meters_lbl': 'Meter / Monat',
    'stats.est_val': '2021',
    'stats.est_lbl': 'Gegründet',
    'stats.types_val': '500m',
    'stats.types_lbl': 'Mindestbestellmenge',
    // Badges strip
    'badge.iso': 'Geprüfte Webqualität',
    'badge.export': 'Export seit 2021',
    'badge.moq': 'Mindestbestellmenge ab 500m',
    'badge.shipping': 'EXW/FOB-Versand verfügbar',
    // Common CTAs
    'cta.inquire': 'Jetzt anfragen',
    'cta.get_quote': 'Angebot anfordern',
    'cta.whatsapp': 'WhatsApp Anfrage',
    // Quality
    'quality.title': 'Konsistenz auf jedem Meter',
    'quality.sub': 'Strukturierte Inspektionsprozesse gewährleisten genaue GSM, gleichmäßige Bindung und zuverlässige Chargenqualität über alle Produktionsläufe hinweg.',
    // Shipping
    'shipping.title': 'Versand- und Exportlogistik',
    // Contact
    'contact.title': 'Besprechen wir Ihre Anforderungen',
    'contact.sub': 'Teilen Sie uns Ihre Stoffspezifikationen, Menge und Zeitplan mit. Unser Team wird umgehend antworten.',
    'contact.promise': 'Wir antworten auf alle B2B-Anfragen innerhalb von 1 Werktag',
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('shiveshwar_lang') as Language;
    if (saved === 'EN' || saved === 'DE') {
      const timer = setTimeout(() => {
        setLanguageState(saved);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('shiveshwar_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['EN']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
