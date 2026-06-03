'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Anchor, FileText, Landmark, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Do you deliver across India?',
    a: 'Yes, we regularly ship fabric rolls and bulk consignments across all states in India. We coordinate with trusted national logistics partners to manage reliable surface transport, express cargo, and local warehouse deliveries directly to your factory door.'
  },
  {
    q: 'What is your Minimum Order Quantity (MOQ)?',
    a: 'Our standard wholesale MOQs are: 500 meters for Cotton Fabrics, 1,000 meters for Greig Polyster Fabric, 800 meters for Blended Fabrics, and 1,500 meters for Custom Fabric Developments. MOQs are calculated per colorway / specification.'
  },
  {
    q: 'Can we request samples before placing a bulk order?',
    a: 'Absolutely. We encourage buyers and garment brands to inspect our weave density and finishing parity firsthand. We provide swatch cards (A4 size) or 1-meter sample hangers free of charge. You only cover the express courier costs to your office.'
  },
  {
    q: 'Do you support GST billing for business buyers?',
    a: 'Yes. All domestic wholesale orders are fully tax-compliant and invoiced with standard B2B tax invoices (with CGST/SGST or IGST depending on the state), enabling seamless input tax credit (ITC) claims for our business partners.'
  }
];

const timelineSteps = [
  {
    title: 'Requirement Discussion',
    desc: 'We review your fabric requirements, including composition, GSM, width, quantity, application, and delivery expectations to understand the project specifications.'
  },
  {
    title: 'Sample Development & Approval',
    desc: 'Fabric samples are developed according to the required specifications and submitted for evaluation. As sample development is scheduled alongside ongoing production commitments, approval timelines may vary. Production begins only after sample approval and order confirmation.'
  },
  {
    title: 'Yarn Procurement',
    desc: 'Following sample approval, the required yarn and raw materials are sourced according to the finalized fabric construction and quality requirements.'
  },
  {
    title: 'Production Planning',
    desc: 'Manufacturing schedules, loom allocation, and production parameters are organized to ensure efficient execution and consistent output.'
  },
  {
    title: 'Fabric Manufacturing',
    desc: 'Fabric is manufactured according to approved specifications and order requirements. Production timelines vary depending on fabric construction, quantity, yarn availability, and current manufacturing commitments. Throughout the process, GSM, weave structure, and fabric consistency are continuously monitored.'
  },
  {
    title: 'Quality Inspection',
    desc: 'Each production batch undergoes inspection for GSM accuracy, weave alignment, surface consistency, and overall fabric quality before dispatch.'
  },
  {
    title: 'Documentation & Export Preparation',
    desc: 'Commercial invoices, packing lists, and export-related documentation are prepared according to buyer requirements and shipping terms.'
  },
  {
    title: 'Packing & Dispatch',
    desc: 'Finished fabric rolls are packed securely to maintain cleanliness, material integrity, and safe handling during transportation.'
  },
  {
    title: 'Inland Transportation to Port',
    desc: 'Cargo is transported by truck or rail to the designated Indian port, including Nhava Sheva (Mumbai), Mundra, Hazira, Chennai, or other buyer-specified FOB ports.'
  },
  {
    title: 'FOB Handover',
    desc: 'The shipment is delivered to the designated port and handed over according to agreed FOB shipping terms, completing our scope of supply.'
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
          {String(index + 1).padStart(2, '0')}
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
          <span className="text-[10px] font-mono uppercase text-[#d4a96a]">
            Step {String(index + 1).padStart(2, '0')}
          </span>
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
              We support flexible domestic and international trade arrangements based on customer requirements and logistics preferences:
            </p>
            <ul className="text-xs space-y-2.5 text-white/80 font-mono">
              <li>• EX-WORKS (EXW) – Factory Pickup from Surat</li>
              <li>• FOB Surat / Mumbai Port – Buyer Arranged Freight</li>
            </ul>
          </div>

          {/* Box 2: Payment Terms */}
          <div className="border border-[#b8924a]/15 bg-[#171513] p-6 space-y-4">
            <Landmark className="h-6 w-6 text-[#d4a96a]" />
            <h3 className="font-serif text-lg text-white">Payment Terms</h3>
            <p className="text-xs leading-relaxed text-white/70">
              Flexible payment options available based on order value, client profile, and commercial agreement:
            </p>
            <ul className="text-xs space-y-2.5 text-white/80 font-mono">
              <li>• 100% Advance Payment (Bank Transfer)</li>
              <li>• Letter of Credit (L/C)</li>
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

        {/* Lead times & timelines strip */}
        <section className="max-w-2xl mx-auto mb-24">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">Order Operations</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-3xl">
              Lead Times & Timelines
            </h2>
            <p className="text-sm leading-relaxed text-white/70 font-light">
              Production timelines vary based on order volume, fabric specifications, yarn availability, processing requirements, and finishing requirements.
            </p>
            <div className="space-y-3 font-mono text-xs text-white/80">
              <div className="flex justify-between border-b border-[#b8924a]/10 pb-2">
                <span>Small Batches (Up to 50,000m)</span>
                <span className="text-[#d4a96a]">30–45 Days</span>
              </div>
              <div className="flex justify-between border-b border-[#b8924a]/10 pb-2">
                <span>Medium Batches (50,000m – 200,000m)</span>
                <span className="text-[#d4a96a]">60–75 Days</span>
              </div>
              <div className="flex justify-between border-b border-[#b8924a]/10 pb-2">
                <span>Large Production Runs (1,000,000m+)</span>
                <span className="text-[#d4a96a]">90 Days</span>
              </div>
            </div>
            <p className="text-xs text-white/50 italic leading-relaxed pt-2">
              Note: Production timelines are indicative and may vary based on order specifications, seasonality, yarn procurement, dyeing schedules, and finishing requirements.
            </p>
          </div>
        </section>

        {/* Order to FOB Delivery Process Visualizer */}
        <section className="mb-24 space-y-12">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">ORDER OPERATIONS</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-4xl mt-1">
              Order to FOB Delivery Process
            </h2>
            <p className="text-xs text-white/50 max-w-xl mx-auto mt-2 leading-relaxed font-sans">
              From sample development to port delivery, every stage is managed through a structured manufacturing, quality control, and logistics process.
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
