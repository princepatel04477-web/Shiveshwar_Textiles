'use client';

import { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { animate } from 'animejs';

export default function FloatingWhatsApp() {
  const outerPulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outerPulseRef.current) {
      animate(outerPulseRef.current, {
        scale: [1, 1.4],
        opacity: [0.6, 0],
        duration: 2000,
        easing: 'easeOutExpo',
        loop: true,
      });
    }
  }, []);

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-40 flex items-center justify-center">
      {/* Outer Pulse */}
      <div
        ref={outerPulseRef}
        className="absolute w-14 h-14 rounded-full border border-[#d4a96a]/60 pointer-events-none"
      />
      
      {/* Inner Glowing Trigger */}
      <a
        href="https://wa.me/919924176337?text=Hi%2C%20I%20am%20interested%20in%20your%20fabrics%20from%20your%20B2B%20portal."
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0f0e0c] border border-[#d4a96a] text-[#d4a96a] shadow-[0_4px_20px_rgba(212,169,106,0.3)] hover:text-[#0f0e0c] hover:bg-[#d4a96a] hover:scale-105 transition-all duration-300 group"
        aria-label="WhatsApp Inquiry"
        data-cursor="WhatsApp"
      >
        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-[#25D366]" />
        
        {/* Tooltip */}
        <span className="absolute right-14 bg-[#1c1a17] text-[#f5f0e8] text-[10px] uppercase tracking-widest px-2.5 py-1.5 border border-[#b8924a]/30 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl pointer-events-none">
          WhatsApp Inquiry
        </span>
      </a>
    </div>
  );
}
