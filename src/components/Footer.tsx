'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Mail, Phone, MapPin, Globe, Compass, ExternalLink, MessageSquare } from 'lucide-react';

const logo =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png';

export default function Footer() {
  const { language } = useLanguage();
  const { openDrawer } = useCart();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentYear, setCurrentYear] = useState<number | string>('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // 1. Interactive Spotlight Glow (CSS variables for mouse coordinates)
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      footer.style.setProperty('--mouse-x', `${x}px`);
      footer.style.setProperty('--mouse-y', `${y}px`);
      footer.style.setProperty('--glow-opacity', '1');
    };

    const handleMouseLeave = () => {
      footer.style.setProperty('--glow-opacity', '0');
    };

    footer.addEventListener('mousemove', handleMouseMove);
    footer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      footer.removeEventListener('mousemove', handleMouseMove);
      footer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 2. Interactive Gold Dust Particles Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
    }> = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Generate floating golden sparkles
    const count = Math.min(Math.round((canvas.width * canvas.height) / 10000), 100);
    for (let i = 0; i < count; i++) {
      const baseOpacity = Math.random() * 0.4 + 0.1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: -(Math.random() * 0.4 + 0.15), // Float upwards
        opacity: baseOpacity,
        baseOpacity
      });
    }

    let mouse = { x: -1000, y: -1000, active: false };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleCanvasMouseLeave = () => {
      mouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleCanvasMouseMove);
      parent.addEventListener('mouseleave', handleCanvasMouseLeave);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        // Cursor magnetic push
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
            p.opacity = Math.min(p.baseOpacity + force * 0.5, 0.9);
          } else {
            // Decay opacity back to normal
            p.opacity = p.opacity > p.baseOpacity ? p.opacity - 0.01 : p.baseOpacity;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 169, 106, ${p.opacity})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = '#b8924a';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handleCanvasMouseMove);
        parent.removeEventListener('mouseleave', handleCanvasMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const coordinators = [
    {
      name: 'Prakashbhai Mangukiya',
      role: 'FOUNDER & VISION LEAD',
      badge: 'Founder',
    },
    {
      name: 'Parth P. Mangukiya',
      role: 'DIRECTOR',
      phone: '+919316189146',
    },
    {
      name: 'Fenil Mangukiya',
      role: 'OPERATIONS & LOGISTICS MANAGER',
      phone: '+918155962069',
    },
    {
      name: 'Ayush Kanani',
      role: 'MARKETING HEAD',
      phone: '+919586054194',
    },
    {
      name: 'Dhruv Patel',
      role: 'EXPORT GUIDE',
      phone: '+917600381234',
    }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative border-t border-[#b8924a]/25 bg-[#080706] text-[#f5f0e8] overflow-hidden transition-all duration-300"
      style={{
        backgroundImage: `radial-gradient(1000px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(184, 146, 74, calc(var(--glow-opacity, 0) * 0.075)), transparent 55%)`
      }}
    >
      {/* 1. Golden Particle Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" 
      />

      {/* Main Luxury Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-12 md:px-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1: Centered Luxury Brand Block */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="relative group">
            {/* Ambient gold glow behind the logo */}
            <div className="absolute -inset-4 bg-[#b8924a]/10 rounded-full blur-xl group-hover:bg-[#b8924a]/25 transition duration-700 pointer-events-none" />
            <img 
              src={logo} 
              alt="Shiveshwar Textiles Logo" 
              className="h-16 w-16 md:h-20 md:w-20 object-contain relative logo-pulse-glow"
            />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em] text-[#faf8f4] font-medium leading-none">
              Shiveshwar Textiles
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d4a96a]/80 font-mono">
              {language === 'EN' 
                ? 'Premium textile manufacturing excellence' 
                : 'Erstklassige Textilherstellung in Perfektion'}
            </p>
          </div>
        </div>

        {/* Elegant Scanning Gold Divider Line */}
        <div className="gold-divider-shine" />

        {/* ========================================================================= */}
        {/* SECTION 2: Horizontal Luxury Information Grid */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center md:text-left">
          {/* Info Block 1 */}
          <div className="md:border-l md:border-[#b8924a]/20 md:pl-6 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4a96a]">
              {language === 'EN' ? 'Manufacturing Base' : 'Produktionsstandort'}
            </span>
            <p className="font-serif text-base text-[#faf8f4] font-medium tracking-wide">
              Surat, Gujarat, India
            </p>
          </div>

          {/* Info Block 2 */}
          <div className="md:border-l md:border-[#b8924a]/20 md:pl-6 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4a96a]">
              {language === 'EN' ? 'Business Model' : 'Geschäftsmodell'}
            </span>
            <p className="font-serif text-base text-[#faf8f4] font-medium tracking-wide">
              B2B Textile Manufacturing
            </p>
          </div>

          {/* Info Block 3 */}
          <div className="md:border-l md:border-[#b8924a]/20 md:pl-6 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4a96a]">
              {language === 'EN' ? 'Production Capacity' : 'Produktionskapazität'}
            </span>
            <p className="font-serif text-base text-[#faf8f4] font-medium tracking-wide">
              1M+ Meters Monthly
            </p>
          </div>

          {/* Info Block 4 */}
          <div className="md:border-l md:border-[#b8924a]/20 md:pl-6 space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4a96a]">
              {language === 'EN' ? 'Trade Terms' : 'Handelsbedingungen'}
            </span>
            <p className="font-serif text-base text-[#faf8f4] font-medium tracking-wide">
              EXW & FOB Shipping
            </p>
          </div>
        </div>

        {/* Elegant Scanning Gold Divider Line */}
        <div className="gold-divider-shine" />

        {/* ========================================================================= */}
        {/* BRAND DIRECTORY & EXECUTIVE GRID (Re-integrated Directory) */}
        {/* ========================================================================= */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr_1fr] pt-4">
          {/* Col 1: System Navigation */}
          <div className="space-y-5 md:border-l md:border-[#b8924a]/20 md:pl-6 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a96a] block">
              {language === 'EN' ? 'System Nav' : 'System-Navigation'}
            </span>
            <ul className="space-y-3.5 text-[10px] font-mono tracking-widest text-[#f5f0e8]/75">
              <li>
                <Link href="/" className="hover:text-[#d4a96a] transition-colors duration-300 block">
                  STARTSEITE
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#d4a96a] transition-colors duration-300 block">
                  FABRIC CATALOGUE
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#d4a96a] transition-colors duration-300 block">
                  COMPANY PROFILE
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-[#d4a96a] transition-colors duration-300 block">
                  QUALITY MANAGEMENT
                </Link>
              </li>
              <li>
                <Link href="/shipping-export" className="hover:text-[#d4a96a] transition-colors duration-300 block">
                  LOGISTICS & FREIGHT
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4a96a] transition-colors duration-300 block">
                  CONTACT DESK
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Material Index */}
          <div className="space-y-5 md:border-l md:border-[#b8924a]/20 md:pl-6 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a96a] block">
              {language === 'EN' ? 'Material Index' : 'Material-Index'}
            </span>
            <ul className="space-y-3.5 text-[10px] font-mono tracking-widest text-[#f5f0e8]/75">
              <li>
                <Link href="/products/cotton-fabrics" className="flex items-center justify-between hover:text-[#d4a96a] transition-colors group">
                  <span>COTTON FABRICS (50–150 GSM)</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-[#d4a96a] ml-2">↗</span>
                </Link>
              </li>
              <li>
                <Link href="/products/polyester-fabrics" className="flex items-center justify-between hover:text-[#d4a96a] transition-colors group">
                  <span>GREIG POLYESTER (50–250 GSM)</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-[#d4a96a] ml-2">↗</span>
                </Link>
              </li>
              <li>
                <Link href="/products/blended-fabrics" className="flex items-center justify-between hover:text-[#d4a96a] transition-colors group">
                  <span>BLENDED FABRICS (50/250 GSM)</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-[#d4a96a] ml-2">↗</span>
                </Link>
              </li>
              <li>
                <Link href="/products/custom-development" className="flex items-center justify-between hover:text-[#d4a96a] transition-colors group">
                  <span>BESPOKE MILL WEAVING</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-[#d4a96a] ml-2">↗</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Executive Desk */}
          <div className="space-y-5 md:border-l md:border-[#b8924a]/20 md:pl-6 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a96a] block">
              {language === 'EN' ? 'Executive Desk' : 'Vorstand & Kontakte'}
            </span>
            <div className="grid gap-3.5">
              {coordinators.map((c, i) => (
                <div 
                  key={i} 
                  className="text-xs pb-2 border-b border-[#b8924a]/10 flex items-center justify-between gap-1 group"
                >
                  <div>
                    <span className="font-serif text-xs text-[#faf8f4] group-hover:text-[#d4a96a] transition-colors font-medium">
                      {c.name}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-[#f5f0e8]/45 block font-mono">
                      {c.role}
                    </span>
                  </div>
                  {('phone' in c) && c.phone && (
                    <a 
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[8px] font-mono text-[#d4a96a]/70 hover:text-[#faf8f4] transition tracking-widest"
                    >
                      CONNECT ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Elegant Scanning Gold Divider Line */}
        <div className="gold-divider-shine" />

        {/* ========================================================================= */}
        {/* SECTION 3: Elegant Contact & CTA Strip */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-4 px-6 md:px-8 border border-[#b8924a]/15 bg-[#11100e]/40 backdrop-blur-sm rounded-sm">
          
          {/* Quick Contact Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 text-xs">
            {/* Email Link */}
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#d4a96a] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#f5f0e8]/45 block font-mono">Email Inquiry</span>
                <a 
                  href="mailto:parthmangukiya@shiveshwartextiles.com" 
                  className="text-[#faf8f4] hover:text-[#d4a96a] transition duration-300 font-mono tracking-wide"
                >
                  parthmangukiya@shiveshwartextiles.com
                </a>
              </div>
            </div>

            {/* Phone Link */}
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#d4a96a] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#f5f0e8]/45 block font-mono">Direct Desk</span>
                <a 
                  href="https://wa.me/919316189146" 
                  className="text-[#faf8f4] hover:text-[#d4a96a] transition duration-300 font-mono tracking-wide"
                >
                  +91 9316189146
                </a>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/919316189146?text=Hi%20Parth,%20interested%20in%20Shiveshwar%20Textiles%20fabrics."
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-[#b8924a]/45 hover:border-[#faf8f4] bg-transparent text-xs uppercase tracking-widest px-6 py-3 transition text-[#faf8f4] hover:bg-[#b8924a]/10 font-bold font-mono"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Inquiry</span>
            </a>

            {/* Request Quote Button */}
            <button
              onClick={openDrawer}
              className="flex items-center justify-center gap-2 bg-[#b8924a] hover:bg-[#d4a96a] text-[#0c0b09] text-xs uppercase tracking-widest px-6 py-3 transition font-bold font-mono cursor-pointer"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: Premium "Built By" Luxury Signature Card */}
        {/* ========================================================================= */}
        <div className="flex justify-center pt-4">
          <div className="w-full max-w-lg border border-[#b8924a]/20 bg-[#12110f]/60 backdrop-blur-md p-6 md:p-8 rounded-sm text-center relative group overflow-hidden transition-all duration-500 hover:border-[#b8924a]/50 hover:shadow-[0_0_25px_rgba(184,146,74,0.15)]">
            
            {/* Absolute Background Accent lines */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#d4a96a]/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#d4a96a]/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#d4a96a]/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#d4a96a]/40" />
            
            {/* Signature Content */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4a96a]/70 font-mono block">
                  Website Designed & Developed By
                </span>
                <a 
                  href="https://wa.me/919106139666?text=Hi%20Prince,%20saw%20your%20developer%20signature%20on%20Shiveshwar%20Textiles." 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-serif text-2xl uppercase tracking-widest text-[#faf8f4] hover:text-[#d4a96a] transition duration-300 font-semibold block pt-1"
                >
                  Prince Patel
                </a>
                <span className="text-[10px] uppercase tracking-wider text-[#f5f0e8]/50 block font-mono">
                  Full Stack Developer & Digital Solutions Architect
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-[10px] font-mono pt-1 text-[#d4a96a]/80">
                <a 
                  href="https://wa.me/919106139666?text=Hi%20Prince,%20saw%20your%20developer%20signature%20on%20Shiveshwar%20Textiles."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition duration-300 group-hover:scale-102"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>+91 9106139666</span>
                </a>
                <span className="text-[#b8924a]/30">|</span>
                <a 
                  href="https://wa.me/919106139666?text=Hi%20Prince,%20saw%20your%20developer%20signature%20on%20Shiveshwar%20Textiles."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white transition duration-300"
                >
                  <span>Chat Direct</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 5: Footer Bottom Bar */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-[#b8924a]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-[#f5f0e8]/45 font-mono">
          {/* Left Copyright */}
          <div className="text-center md:text-left leading-relaxed">
            © {currentYear} Shiveshwar Textiles.
            <span className="block md:inline md:ml-1">All Rights Reserved.</span>
          </div>

          {/* Center Signature */}
          <div className="flex items-center gap-1.5 text-[#d4a96a]/85 font-serif font-light tracking-wide text-xs">
            <span>Crafted with Precision in India</span>
          </div>

          {/* Right Credit */}
          <div className="text-center md:text-right hover:text-[#d4a96a] transition duration-300">
            <a 
              href="https://wa.me/919106139666?text=Hi%20Prince,%20saw%20your%20developer%20signature%20on%20Shiveshwar%20Textiles." 
              target="_blank" 
              rel="noreferrer"
            >
              Designed by Prince Patel
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
