'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Check, ShieldCheck, HelpCircle, Truck, RefreshCw } from 'lucide-react';

const qcImages = [
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a483bdd8b87082bab902dd_566BC337-549E-42E5-8AA0-65BAB9B977EF.JPEG',
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a481bccd58eb2a0cd63f93_FFB41501-33AD-4C86-83F6-8CC206047FC9.JPEG',
];

// Scroll-triggered quality audit progress bar component
function QCMeter({ label, targetValue, suffix = '%' }: { label: string; targetValue: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;

    const duration = 1000;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setVal(Math.min(Math.round((targetValue / steps) * step), targetValue));
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [triggered, targetValue]);

  return (
    <div ref={ref} className="space-y-1.5 mt-4">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-[#d4a96a]">
        <span>{label}</span>
        <span>{val}{suffix}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 border border-[#b8924a]/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#b8924a] to-[#d4a96a] transition-all duration-75 ease-out"
          style={{ width: `${val}%` }}
        />
      </div>
    </div>
  );
}

export default function QualityPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-16 border-b border-[#b8924a]/15 pb-8 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">ISO-COMPLIANT QUALITY AUDITING</span>
          <h1 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl mt-2">
            Quality & <span className="text-[#d4a96a] font-light italic">Standards</span>
          </h1>
          <p className="max-w-2xl text-xs text-[#f5f0e8]/60 mt-3 uppercase tracking-widest leading-relaxed">
            Ensuring precise fabric weight, flawless weave alignments, and reliable shade parity for international wholesale buyers.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start mb-20">
          
          {/* Detailed Pillars */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">Inspection Checkpoints</span>
              <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-3xl">
                Loom-to-Container Checkpoints
              </h2>
            </div>

            <div className="space-y-8">
              {/* Pillar 1 */}
              <div className="border border-[#b8924a]/15 bg-[#171513] p-6 md:p-8 space-y-3">
                <span className="text-[10px] font-mono text-[#d4a96a] uppercase tracking-widest block">Checkpoint 01</span>
                <h3 className="font-serif text-lg text-white">GSM Accuracy (Weight Controls)</h3>
                <p className="text-xs leading-relaxed text-white/70 font-light">
                  Each production batch is monitored to maintain precise GSM control within defined tolerances. We extract physical fabric circle samples from random rolls and test them on calibrated electronic GSM balances. This prevents density drift between the start and end of bulk weaving loops, providing garment manufacturers with consistent fabric weight and thickness.
                </p>
                <QCMeter label="GSM Calibrated Accuracy" targetValue={99} />
              </div>

              {/* Pillar 2 */}
              <div className="border border-[#b8924a]/15 bg-[#171513] p-6 md:p-8 space-y-3">
                <span className="text-[10px] font-mono text-[#d4a96a] uppercase tracking-widest block">Checkpoint 02</span>
                <h3 className="font-serif text-lg text-white">Weave and Alignment Inspection</h3>
                <p className="text-xs leading-relaxed text-white/70 font-light">
                  Fabric is checked for uniform weave structure and alignment to prevent structural irregularities. Our technicians pull yards over glass-mounted backlight tables to perform continuous optical checks for pick counts, broken warp threads, color staining, and thread deviations.
                </p>
                <QCMeter label="Weave Structural Integrity" targetValue={100} />
              </div>

              {/* Pillar 3 */}
              <div className="border border-[#b8924a]/15 bg-[#171513] p-6 md:p-8 space-y-3">
                <span className="text-[10px] font-mono text-[#d4a96a] uppercase tracking-widest block">Checkpoint 03</span>
                <h3 className="font-serif text-lg text-white">Pre-Dispatch Verification</h3>
                <p className="text-xs leading-relaxed text-white/70 font-light">
                  Before shipment, rolls are verified for measurement accuracy and batch consistency to maintain delivery reliability. Each roll undergoes automated yardage measuring, tensile stretch testing, and shade-matching controls under standardized D65 light boxes.
                </p>
                <QCMeter label="Pre-Dispatch Parity Compliance" targetValue={99} />
              </div>
            </div>
          </div>

          {/* Quality check images */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">Audit Evidence</span>
            <div className="grid gap-6">
              {qcImages.map((imgUrl, idx) => (
                <div key={idx} className="border border-[#b8924a]/15 overflow-hidden h-72 relative group" data-cursor="View">
                  <img 
                    src={imgUrl} 
                    alt={`Quality control audit ${idx + 1}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition duration-75" 
                  />
                  <div className="absolute bottom-3 left-3 bg-[#0f0e0c]/80 border border-[#b8924a]/25 px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#d4a96a] font-mono">
                    Audit Photo 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Sections: Sampling Process & Batch Consistency */}
        <section className="grid gap-8 md:grid-cols-2">
          
          {/* Sampling Process */}
          <div className="border border-[#b8924a]/15 bg-[#171513] p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-[#d4a96a] shrink-0" />
              <h3 className="font-serif text-xl text-white uppercase tracking-wider">Sampling Process</h3>
            </div>
            <p className="text-xs leading-relaxed text-white/70 font-light">
              We understand that physical touch is essential when sourcing fabrics. European garment labels can request custom swatch sheets or 1-meter test hangers. Samples are cut directly from current weaving runs, packed securely in moisture-proof seals, and dispatched via DHL Express or FedEx.
            </p>
            <div className="border-t border-[#b8924a]/10 pt-4 text-[11px] font-mono text-[#d4a96a]">
              DHL Shipping: <span className="text-white/80">5–7 business days to Germany & EU</span>
            </div>
          </div>

          {/* Batch Consistency */}
          <div className="border border-[#b8924a]/15 bg-[#171513] p-8 space-y-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-[#d4a96a] shrink-0" />
              <h3 className="font-serif text-xl text-white uppercase tracking-wider">Batch Consistency</h3>
            </div>
            <p className="text-xs leading-relaxed text-white/70 font-light">
              Maintaining spec parity on repeat orders is a key B2B challenge. We store digital weave templates and shade coordinates for every order. Repeat looms are calibrated using identical yarn specifications and tension parameters, ensuring that fabric GSM and texture do not drift across repeat seasonal orders.
            </p>
            <div className="border-t border-[#b8924a]/10 pt-4 text-[11px] font-mono text-[#d4a96a]">
              Quality Assurance: <span className="text-white/80">Calibration parity logged for repeat runs</span>
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}
