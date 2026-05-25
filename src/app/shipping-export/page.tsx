'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Anchor, FileText, Landmark, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Do you ship to Germany?',
    a: 'Yes, we regularly ship fabric containers to Germany and the broader European market. Direct sea freight routes run from Nhava Sheva (Mumbai) or Mundra ports in India to major European hubs like Hamburg and Rotterdam, with average maritime transit times of 25–30 days. Express air cargo is also available for urgent sample yardage.'
  },
  {
    q: 'What is your Minimum Order Quantity (MOQ)?',
    a: 'Our standard wholesale MOQs are: 500 meters for Cotton Fabrics, 1,000 meters for Polyester Fabrics, 800 meters for Blended Fabrics, and 1,500 meters for Custom Fabric Developments. MOQs are calculated per colorway / specification.'
  },
  {
    q: 'Can we request samples before placing a container order?',
    a: 'Absolutely. We encourage European garment labels and fabric buyers to inspect our weave parity firsthand. We provide swatch cards (A4 size) or 1-meter sample hangers free of charge. You only cover the express shipping costs via DHL Express (typically 5–7 business days transit time).'
  },
  {
    q: 'Do you provide GST-free export invoices?',
    a: 'Yes. All international export orders are processed under the Indian Customs Letter of Undertaking (LUT) scheme. This enables us to invoice overseas wholesale buyers at zero-rated GST (0% Tax), ensuring direct financial clearance and compliance with B2B trade laws.'
  }
];

const timelineSteps = [
  {
    title: 'Surat Mill Dispatch',
    desc: 'Fabric is rolled, packed in moisture-proof polyethylene sheets, and loaded into local Surat cargo containers.',
    duration: 'Day 1–2'
  },
  {
    title: 'Mumbai Port Clearance (Nhava Sheva)',
    desc: 'Containers arrive at Nhava Sheva port, undergoing customs checks and loading onto Hamburg-bound vessels.',
    duration: 'Day 3–5'
  },
  {
    title: 'Ocean Transit (Arabian Sea & Suez Canal)',
    desc: 'Vessel transits via the Suez Canal into the Mediterranean, heading towards Atlantic routes.',
    duration: 'Day 6–25'
  },
  {
    title: 'Hamburg Port Arrival',
    desc: 'Vessel docks at Hamburg Port. Bill of Lading is processed, and container is offloaded to terminal warehouses.',
    duration: 'Day 26–28'
  },
  {
    title: 'German Customs & Inland Delivery',
    desc: 'LUT-certified invoices are checked, import clearance is completed, and truck delivery is sent directly to your warehouse.',
    duration: 'Day 29–30'
  }
];

function TimelineStep({ step, index, total }: { step: typeof timelineSteps[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`relative flex gap-6 pb-12 last:pb-0 transition-all duration-700 ${
        active ? 'opacity-100 translate-y-0' : 'opacity-25 translate-y-4'
      }`}
    >
      {/* Line Indicator */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-500 ${
          active ? 'bg-[#d4a96a] text-[#0f0e0c] border-[#d4a96a]' : 'bg-transparent text-[#d4a96a]/70 border-[#b8924a]/30'
        }`}>
          0{index + 1}
        </div>
        {index < total - 1 && (
          <div className={`w-0.5 flex-grow border-l-2 border-dashed transition-colors duration-500 ${
            active ? 'border-[#d4a96a]/50' : 'border-[#b8924a]/15'
          }`} />
        )}
      </div>

      {/* Content */}
      <div className={`border p-5 flex-grow transition-all duration-500 ${
        active ? 'bg-[#171513] border-[#b8924a]/30 shadow-[0_4px_20px_rgba(212,169,106,0.05)]' : 'bg-transparent border-[#b8924a]/10'
      }`}>
        <div className="flex justify-between items-start gap-4">
          <h4 className={`font-serif text-base transition-colors duration-500 ${active ? 'text-white' : 'text-white/60'}`}>
            {step.title}
          </h4>
          <span className="text-[10px] font-mono uppercase text-[#d4a96a]">{step.duration}</span>
        </div>
        <p className="text-xs leading-relaxed text-white/50 mt-2 font-light">{step.desc}</p>
      </div>
    </div>
  );
}

export default function ShippingExportPage() {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-16 border-b border-[#b8924a]/15 pb-8 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Global B2B Logistics</span>
          <h1 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl mt-2">
            Shipping & <span className="text-[#d4a96a] font-light italic">Export Info</span>
          </h1>
          <p className="max-w-2xl text-xs text-[#f5f0e8]/60 mt-3 uppercase tracking-widest leading-relaxed">
            Incoterms, payment structures, customs compliance checklists, and transit guidelines for European fabric importers.
          </p>
        </div>

        {/* B2B Logistics Grid */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-24 text-left">
          {/* Box 1: Incoterms */}
          <div className="border border-[#b8924a]/15 bg-[#171513] p-6 space-y-4">
            <Anchor className="h-6 w-6 text-[#d4a96a]" />
            <h3 className="font-serif text-lg text-white">Incoterms</h3>
            <p className="text-xs leading-relaxed text-white/70">
              We offer standard B2B Incoterms to match your logistics grid:
            </p>
            <ul className="text-xs space-y-1 text-white/80 font-mono">
              <li>• FOB Surat (Surat Rail / Port)</li>
              <li>• CIF Hamburg / Rotterdam</li>
              <li>• DDP Germany (Delivery Duty Paid)</li>
            </ul>
          </div>

          {/* Box 2: Payment Terms */}
          <div className="border border-[#b8924a]/15 bg-[#171513] p-6 space-y-4">
            <Landmark className="h-6 w-6 text-[#d4a96a]" />
            <h3 className="font-serif text-lg text-white">Payment Terms</h3>
            <p className="text-xs leading-relaxed text-white/70">
              Standard secure trade finance options:
            </p>
            <ul className="text-xs space-y-1 text-white/80 font-mono">
              <li>• 30% Advance + 70% before shipping (T/T Bank Transfer)</li>
              <li>• Irrevocable Letter of Credit (L/C) at sight</li>
            </ul>
          </div>

          {/* Box 3: Customs HS Codes */}
          <div className="border border-[#b8924a]/15 bg-[#171513] p-6 space-y-4">
            <FileText className="h-6 w-6 text-[#d4a96a]" />
            <h3 className="font-serif text-lg text-white">HS Codes</h3>
            <p className="text-xs leading-relaxed text-white/70">
              Common HS Codes for customs clearance declarations:
            </p>
            <ul className="text-xs space-y-1 text-white/80 font-mono">
              <li>• Cotton Fabrics: Chapter 52</li>
              <li>• Polyester / Synthetic: Chapter 54 / 55</li>
              <li>• Blended Weaves: Chapter 55</li>
            </ul>
          </div>

          {/* Box 4: Export Docs */}
          <div className="border border-[#b8924a]/15 bg-[#171513] p-6 space-y-4">
            <ShieldCheck className="h-6 w-6 text-[#d4a96a]" />
            <h3 className="font-serif text-lg text-white">Export Documentation</h3>
            <p className="text-xs leading-relaxed text-white/70">
              Complete dispatch audit package sent with every shipment:
            </p>
            <ul className="text-xs space-y-1 text-white/80 font-mono">
              <li>• Commercial Invoice & Packing List</li>
              <li>• Certificate of Origin</li>
              <li>• Bill of Lading (B/L)</li>
              <li>• LUT GST-Free Export Clearance</li>
            </ul>
          </div>
        </section>

        {/* Lead times & carriers strip */}
        <section className="grid gap-12 lg:grid-cols-2 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">Order Operations</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-3xl">
              Lead Times & Carriers
            </h2>
            <p className="text-sm leading-relaxed text-white/70">
              Average production lead times depend on your specific batch size:
            </p>
            <div className="space-y-3 font-mono text-xs text-white/80">
              <div className="flex justify-between border-b border-[#b8924a]/10 pb-2">
                <span>Small Batches (&lt;5,000m)</span>
                <span className="text-[#d4a96a]">14–21 Business Days</span>
              </div>
              <div className="flex justify-between border-b border-[#b8924a]/10 pb-2">
                <span>Medium Orders (5,000m - 20,000m)</span>
                <span className="text-[#d4a96a]">21–28 Business Days</span>
              </div>
              <div className="flex justify-between border-b border-[#b8924a]/10 pb-2">
                <span>Full Containers (&gt;20,000m)</span>
                <span className="text-[#d4a96a]">30–45 Business Days</span>
              </div>
            </div>
            <p className="text-xs text-white/50 italic leading-relaxed pt-2">
              Note: Lead times exclude ocean freight duration (approx. 25–30 days Mumbai to Hamburg/Rotterdam).
            </p>
          </div>

          <div className="border border-[#b8924a]/15 bg-[#171513] p-8 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">Logistic Partners</span>
            <h3 className="font-serif text-xl text-white">Carrier Alliances</h3>
            <p className="text-xs leading-relaxed text-white/70 font-light">
              For ocean freight containers, we utilize primary global shipping carriers to guarantee container space, reliable transit times, and low cargo insurance rates:
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/80 pt-2">
              <div>• Maersk Line</div>
              <div>• MSC (Mediterranean Shipping)</div>
              <div>• CMA CGM</div>
              <div>• Hapag-Lloyd</div>
              <div>• DHL Express (Air Swatches)</div>
              <div>• FedEx Express (Air Swatches)</div>
            </div>
          </div>
        </section>

        {/* Maritime Cargo Timeline Visualizer */}
        <section className="mb-24 space-y-12">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">Logistics Route</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-4xl mt-1">
              Surat to Hamburg Transit Path
            </h2>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono mt-1">
              Track our export cargo delivery process step-by-step.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timelineSteps.map((step, idx) => (
              <TimelineStep key={idx} step={step} index={idx} total={timelineSteps.length} />
            ))}
          </div>
        </section>

        {/* B2B FAQ Accordion */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono">Resolve Doubts</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-4xl mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="border border-[#b8924a]/15 bg-[#171513] divide-y divide-[#b8924a]/10">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="p-5 space-y-2">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-serif text-base text-white hover:text-[#d4a96a] transition pr-4">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#d4a96a] shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#d4a96a] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="text-xs leading-relaxed text-white/70 pt-2 animate-fade-in font-sans">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
