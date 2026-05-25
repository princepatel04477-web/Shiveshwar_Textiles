'use client';

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { 
  CheckCircle2, MessageSquare, Download, Clock, Globe, ArrowRight, 
  Shield, Award, HelpCircle, MapPin, Truck, Ship, FileCheck, Layers, ChevronDown 
} from 'lucide-react';
import { animate, stagger } from 'animejs';

export default function GermanyLandingClient() {
  const { language } = useLanguage();
  const { openDrawer } = useCart();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // Custom form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    fabricType: 'Cotton',
    quantity: '1000',
    deliveryTerms: 'DDP',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Content dictionary for EN and DE
  const content = {
    EN: {
      heroTitle: "Trusted Indian Fabric Supplier For Germany & Europe",
      heroSub: "Direct mill access to premium, export-grade fabrics (Cotton, Polyester, Blends) engineered for German and European wholesalers, buyers, and brands.",
      requestSwatch: "Request Swatch Kit",
      downloadCatalog: "Download B2B Catalog",
      secTrustTitle: "Why European Buyers Choose Us",
      secTrustSub: "Adhering to strict European quality standards with reliable Indian manufacturing efficiency.",
      timelineTitle: "Our B2B Shipping & Export Process",
      timelineSub: "From Surat looms to your German warehouse: timeline, customs clearing, and ocean corridors.",
      rfqTitle: "Request a Custom Quote / Swatch",
      rfqSub: "Provide your target specifications. Our export desk responds in 1 business day.",
      faqTitle: "Frequently Asked Questions",
      successMsg: "Thank you! Our B2B export desk will contact you within 24 hours.",
      cards: [
        { title: "Standard 100 Yarns", desc: "We utilize yarns matching OEKO-TEX Standard 100 for high human-ecological safety." },
        { title: "German Documentation Support", desc: "Full Certificate of Origin, Mill Test Reports, Bill of Lading, and Customs Clearance forms." },
        { title: "Low MOQ & Fast Sampling", desc: "Flexible MOQs starting at 500m per color. Express A4 swatch dispatch within 3-5 days." },
        { title: "Direct Mill Pricing", desc: "Eliminate agents. Source direct from Surat's high-tech industrial weaving setup." }
      ],
      timeline: [
        { step: "01", title: "Surat Mill Packing", desc: "Fabric is rolled and packed in dual-layer moisture-proof polyethylene sheets." },
        { step: "02", title: "Port Loading & Export Clearance", desc: "Containers arrive at Nhava Sheva (Mumbai) port. LUT-certified export documentation processed." },
        { step: "03", title: "Suez Canal Transit", desc: "Ocean freight transits via Suez Canal direct to European cargo networks." },
        { step: "04", title: "Hamburg Terminal Arrival", desc: "Vessel docks at Hamburg Port. Import customs processing and offloading." },
        { step: "05", title: "Inland Delivery (DDP/DAP)", desc: "Scheduled container truck delivery direct to your warehouse or factory floor." }
      ],
      faqs: [
        { q: "Do you export to Germany?", a: "Yes. We regularly ship FCL (Full Container Load) and LCL (Less than Container Load) shipments to Hamburg and Bremen ports. We also support inland DDP delivery to anywhere in Germany." },
        { q: "What is your MOQ?", a: "For European buyers, we support an entry-level MOQ of 500 meters per colorway for stock yarn designs, and 1500 meters for bespoke blends." },
        { q: "What certifications do you provide?", a: "We provide ISO 9001:2015 certificates, mill test sheets for shrinkage, GSM and colorfastness, and certificate of origin." },
        { q: "How fast is sampling?", a: "We courier A4 swatches and fabric hangers via DHL Express, arriving at European offices within 3 to 5 business days." },
        { q: "What are your payment terms?", a: "Our standard terms for new European customers are 30% advance T/T, 70% against Bill of Lading, or 100% LC at sight. Letter of credit can be opened via major European banks." }
      ]
    },
    DE: {
      heroTitle: "Zuverlässiger indischer Stofflieferant für Deutschland & Europa",
      heroSub: "Direkter Zugang zu erstklassigen, exportfähigen Stoffen (Baumwolle, Polyester, Mischgewebe) für deutsche und europäische Großhändler, Einkäufer und Marken.",
      requestSwatch: "Muster-Kit anfordern",
      downloadCatalog: "B2B-Katalog herunterladen",
      secTrustTitle: "Warum europäische Einkäufer uns wählen",
      secTrustSub: "Einhaltung strenger europäischer Qualitätsstandards kombiniert mit effizienter indischer Produktion.",
      timelineTitle: "Unser B2B-Versand- & Exportprozess",
      timelineSub: "Von den Webstühlen in Surat bis zu Ihrem Lager in Deutschland: Ablauf, Zollabwicklung und Seewege.",
      rfqTitle: "Angebot / Stoffmuster anfordern",
      rfqSub: "Geben Sie Ihre Spezifikationen an. Unser Export-Team antwortet innerhalb von 1 Werktag.",
      faqTitle: "Häufig gestellte Fragen (FAQ)",
      successMsg: "Vielen Dank! Unser B2B-Export-Team wird sich innerhalb von 24 Stunden bei Ihnen melden.",
      cards: [
        { title: "Standard 100 Garne", desc: "Wir verwenden Garne, die dem OEKO-TEX Standard 100 für hohe humanökologische Sicherheit entsprechen." },
        { title: "Deutsche Zollabwicklung", desc: "Vollständiges Ursprungszeugnis, Werksprüfberichte, Frachtbriefe und zollrelevante Dokumente." },
        { title: "Kleine MOQ & Schnelle Muster", desc: "Flexible MOQs ab 500m pro Farbe. Express-Zustellung von A4-Mustern in 3-5 Tagen." },
        { title: "Preise direkt ab Werk", desc: "Keine Zwischenhändler. Kaufen Sie direkt aus unserer modernen Weberei in Surat." }
      ],
      timeline: [
        { step: "01", title: "Verpackung im Werk Surat", desc: "Die Stoffe werden gerollt und in feuchtigkeitsbeständige PE-Schläuche doppelt verpackt." },
        { step: "02", title: "Hafenverladung & Zoll", desc: "Die Container treffen am Hafen Nhava Sheva (Mumbai) ein. Zollabfertigung und LUT-Bescheinigung." },
        { step: "03", title: "Transport über Suezkanal", desc: "Seeschiff-Transit über den Suezkanal direkt in das europäische Transportnetzwerk." },
        { step: "04", title: "Ankunft im Hafen Hamburg", desc: "Das Schiff legt im Hamburger Hafen an. Zollabfertigung und Entladung des Containers." },
        { step: "05", title: "Inlandslieferung (DDP/DAP)", desc: "Zugeordneter Containertransport direkt vor Ihre Haustür, Ihr Lager oder Ihre Fabrik." }
      ],
      faqs: [
        { q: "Exportieren Sie nach Deutschland?", a: "Ja. Wir versenden regelmäßig FCL- und LCL-Lieferungen an die Häfen Hamburg und Bremen. Wir unterstützen auch die DDP-Lieferung im Inland nach ganz Deutschland." },
        { q: "Wie hoch ist die Mindestbestellmenge (MOQ)?", a: "Für europäische Abnehmer unterstützen wir eine Mindestbestellmenge von 500 Metern pro Farbe bei Standardgarnen und 1500 Metern bei Sondermischungen." },
        { q: "Welche Zertifikate stellen Sie bereit?", a: "Wir liefern ISO 9001:2015-Zertifikate, Qualitätsprüfberichte über Krumpfung, GSM und Farbechtheit sowie Ursprungszeugnisse." },
        { q: "Wie schnell ist die Musterbereitstellung?", a: "Wir versenden A4-Musterkarten und Stoffhänger per DHL Express. Diese treffen innerhalb von 3 bis 5 Werktagen bei Ihnen ein." },
        { q: "Wie lauten Ihre Zahlungsbedingungen?", a: "Unsere Standardkonditionen für europäische Neukunden sind 30% Anzahlung per T/T, 70% gegen Frachtbrief (B/L) oder 100% unwiderrufliches Akkreditiv (L/C)." }
      ]
    }
  };

  const activeContent = language === 'DE' ? content.DE : content.EN;

  useEffect(() => {
    // Initial reveals using Anime.js
    animate('.reveal-item', {
      translateY: [25, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 1000,
      easing: 'easeOutQuad'
    });
  }, [language]);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      // Close
      animate(`#faq-ans-${index}`, {
        height: 0,
        opacity: 0,
        duration: 350,
        easing: 'easeOutQuad',
        complete: () => setActiveFaq(null)
      });
    } else {
      // Open
      setActiveFaq(index);
      setTimeout(() => {
        animate(`#faq-ans-${index}`, {
          height: (el: HTMLElement) => el.scrollHeight,
          opacity: 1,
          duration: 350,
          easing: 'easeOutQuad'
        });
      }, 0);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Trigger anime confettis or success popups
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        fabricType: 'Cotton',
        quantity: '1000',
        deliveryTerms: 'DDP',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="pt-24 pb-20 overflow-x-hidden min-h-screen bg-[#0f0e0c]">
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#b8924a]/5 via-transparent to-transparent pointer-events-none z-0 h-[60vh]" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center pt-8 md:pt-16 pb-12">
        <div className="inline-flex items-center gap-2 border border-[#b8924a]/30 bg-[#b8924a]/5 px-3 py-1 rounded-full mb-6 reveal-item">
          <Globe className="h-3 w-3 text-[#d4a96a]" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#d4a96a]">
            {language === 'DE' ? 'EUROPA EXPORTDESK' : 'EUROPE EXPORT PORTAL'}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] max-w-4xl tracking-tight leading-tight reveal-item">
          {activeContent.heroTitle}
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-[#f5f0e8]/70 max-w-2xl leading-relaxed reveal-item">
          {activeContent.heroSub}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center reveal-item">
          <button
            onClick={openDrawer}
            className="w-full sm:w-auto px-8 py-3 bg-[#b8924a] text-[#0f0e0c] text-xs uppercase tracking-widest font-bold hover:bg-[#d4a96a] transition-all duration-300 rounded-sm"
          >
            {activeContent.requestSwatch}
          </button>
          
          <a
            href="/catalog.pdf"
            download
            className="w-full sm:w-auto px-8 py-3 border border-[#b8924a]/50 text-[#d4a96a] text-xs uppercase tracking-widest font-bold hover:bg-[#b8924a]/10 transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>{activeContent.downloadCatalog}</span>
          </a>
        </div>
      </section>

      {/* Trust Cards Section */}
      <section ref={cardsRef} className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-20 border-t border-[#b8924a]/10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-4xl text-[#f5f0e8]">
            {activeContent.secTrustTitle}
          </h2>
          <p className="mt-2 text-xs md:text-sm text-[#f5f0e8]/50 max-w-xl mx-auto">
            {activeContent.secTrustSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeContent.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#1c1a17]/60 border border-[#b8924a]/15 p-6 hover:border-[#b8924a]/50 hover:bg-[#1c1a17]/90 transition-all duration-300 group rounded-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#d4a96a]">0{idx + 1}</span>
                <CheckCircle2 className="h-5 w-5 text-[#d4a96a]" />
              </div>
              <h3 className="font-serif text-lg text-[#f5f0e8] mb-2 group-hover:text-[#d4a96a] transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm text-[#f5f0e8]/60 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping Timeline Section */}
      <section ref={timelineRef} className="relative z-10 px-4 md:px-8 max-w-5xl mx-auto py-12 md:py-20 border-t border-[#b8924a]/10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-2xl md:text-4xl text-[#f5f0e8]">
            {activeContent.timelineTitle}
          </h2>
          <p className="mt-2 text-xs md:text-sm text-[#f5f0e8]/50 max-w-xl mx-auto">
            {activeContent.timelineSub}
          </p>
        </div>

        {/* Mobile-optimized Timeline (snaps easily, zero horizontal scroll) */}
        <div className="relative border-l border-[#b8924a]/20 ml-4 md:ml-12 space-y-12">
          {activeContent.timeline.map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Circular Dot Pin */}
              <div className="absolute -left-3.5 top-0.5 w-7 h-7 rounded-full bg-[#0f0e0c] border-2 border-[#b8924a] flex items-center justify-center text-[10px] font-bold text-[#d4a96a] group-hover:bg-[#d4a96a] group-hover:text-[#0f0e0c] transition-all duration-300 shadow-md">
                {step.step}
              </div>

              {/* Box */}
              <div className="bg-[#1c1a17]/40 border border-[#b8924a]/10 p-5 md:p-6 rounded-sm hover:border-[#b8924a]/30 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif text-lg text-[#f5f0e8] group-hover:text-[#d4a96a] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <span className="text-[10px] bg-[#b8924a]/10 border border-[#b8924a]/30 px-2 py-0.5 text-[#d4a96a] rounded-full uppercase tracking-wider font-mono">
                    {idx === 0 ? "Dispatch" : idx === 4 ? "Delivery" : "Transit"}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#f5f0e8]/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RFQ Form Widget */}
      <section className="relative z-10 px-4 md:px-8 max-w-3xl mx-auto py-12 md:py-20 border-t border-[#b8924a]/10">
        <div className="bg-[#1c1a17]/80 border border-[#b8924a]/20 p-6 md:p-10 rounded-sm shadow-2xl relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#d4a96a] to-transparent" />
          
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-[#f5f0e8]">
              {activeContent.rfqTitle}
            </h2>
            <p className="mt-2 text-xs md:text-sm text-[#f5f0e8]/60">
              {activeContent.rfqSub}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-[#d4a96a] mx-auto mb-4 animate-scale-in" />
              <p className="text-sm font-medium text-[#f5f0e8]">
                {activeContent.successMsg}
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#d4a96a] mb-2 font-bold">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0f0e0c] border border-[#b8924a]/20 px-4 py-2.5 text-xs text-[#f5f0e8] focus:border-[#d4a96a] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#d4a96a] mb-2 font-bold">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0f0e0c] border border-[#b8924a]/20 px-4 py-2.5 text-xs text-[#f5f0e8] focus:border-[#d4a96a] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#d4a96a] mb-2 font-bold">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#0f0e0c] border border-[#b8924a]/20 px-4 py-2.5 text-xs text-[#f5f0e8] focus:border-[#d4a96a] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#d4a96a] mb-2 font-bold">Fabric Type</label>
                  <select
                    value={formData.fabricType}
                    onChange={(e) => setFormData({ ...formData, fabricType: e.target.value })}
                    className="w-full bg-[#0f0e0c] border border-[#b8924a]/20 px-4 py-2.5 text-xs text-[#f5f0e8] focus:border-[#d4a96a] focus:outline-none transition-colors"
                  >
                    <option value="Cotton">Cotton Fabrics</option>
                    <option value="Polyester">Polyester Fabrics</option>
                    <option value="Blends">Blends (CVC, PC)</option>
                    <option value="Custom">Custom Mill Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#d4a96a] mb-2 font-bold">Delivery Terms</label>
                  <select
                    value={formData.deliveryTerms}
                    onChange={(e) => setFormData({ ...formData, deliveryTerms: e.target.value })}
                    className="w-full bg-[#0f0e0c] border border-[#b8924a]/20 px-4 py-2.5 text-xs text-[#f5f0e8] focus:border-[#d4a96a] focus:outline-none transition-colors"
                  >
                    <option value="DDP">DDP (Customs Paid)</option>
                    <option value="FOB">FOB (India Port)</option>
                    <option value="CIF">CIF (German Port)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#d4a96a] mb-2 font-bold">Quantity (Meters)</label>
                <input
                  type="number"
                  min="500"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-[#0f0e0c] border border-[#b8924a]/20 px-4 py-2.5 text-xs text-[#f5f0e8] focus:border-[#d4a96a] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#d4a96a] mb-2 font-bold">Specifications / Comments</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0f0e0c] border border-[#b8924a]/20 px-4 py-2.5 text-xs text-[#f5f0e8] focus:border-[#d4a96a] focus:outline-none transition-colors resize-none"
                  placeholder="e.g. 150 GSM, 60/40 Cotton-Poly Blend, Width 150cm..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#b8924a] text-[#0f0e0c] text-xs uppercase tracking-widest font-bold py-3 hover:bg-[#d4a96a] transition-all duration-300 rounded-sm"
              >
                Submit Inquiry / Request Sample
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section ref={faqRef} className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto py-12 md:py-20 border-t border-[#b8924a]/10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-4xl text-[#f5f0e8]">
            {activeContent.faqTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {activeContent.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#b8924a]/15 bg-[#1c1a17]/30 hover:border-[#b8924a]/30 transition-all duration-300 rounded-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-serif text-base md:text-lg text-[#f5f0e8]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#d4a96a] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Answer wrapper - controlled via React & Anime.js */}
                <div
                  id={`faq-ans-${idx}`}
                  style={{ height: 0, opacity: 0 }}
                  className="overflow-hidden transition-all duration-300"
                >
                  <div className="p-5 pt-0 border-t border-[#b8924a]/10 text-xs md:text-sm text-[#f5f0e8]/70 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
