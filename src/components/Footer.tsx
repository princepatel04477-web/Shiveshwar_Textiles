'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Award, Globe, Ship } from 'lucide-react';
import { animate } from 'animejs';

const logo =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png';

export default function Footer() {
  const { t, language } = useLanguage();
  const gradientRef = useRef<HTMLDivElement>(null);
  const brandStripRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState<number | string>('2026');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const el = brandStripRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (gradientRef.current) {
      animate(gradientRef.current, {
        translateX: ['-15%', '15%'],
        translateY: ['-10%', '10%'],
        scale: [1, 1.2, 0.95],
        duration: 18000,
        alternate: true,
        loop: true,
        ease: 'inOutQuad',
      });
    }
  }, []);

  const coordinators = [
    {
      name: 'Prakashbhai Mangukiya',
      role: 'FOUNDER',
      badge: '◆ Founder & Vision Lead',
    },
    {
      name: 'Parth P. Mangukiya',
      role: 'DIRECTOR',
      email: 'parthmangukiya@shiveshwartextiles.com',
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
    <footer className="relative border-t border-[#b8924a]/20 bg-[#0c0b09] text-[#f5f0e8]/80 overflow-hidden">
      {/* Cinematic Glowing Background Layer */}
      <div 
        ref={gradientRef}
        className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#b8924a]/10 to-transparent blur-[120px] pointer-events-none z-0"
      />

      {/* Brand Scrolling Marquee */}
      <div 
        ref={brandStripRef}
        className={`border-t border-b border-[#b8924a]/20 bg-[#11100e] py-6 overflow-hidden relative z-10 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex w-max items-center gap-16 animate-marquee whitespace-nowrap">
          {/* Loop 1 */}
          <div className="flex shrink-0 items-center gap-16">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={`m1-${idx}`} className="flex items-center gap-6 group cursor-pointer">
                <img 
                  src={logo} 
                  alt="Shiveshwar logo" 
                  className="h-8 w-auto object-contain logo-pulse-glow" 
                />
                <span className="font-serif text-sm md:text-base uppercase tracking-[0.25em] text-[#d4a96a] transition duration-300 group-hover:text-[#faf8f4]">
                  Shiveshwar Textiles
                </span>
                <span className="text-[#b8924a]/40 text-xs ml-4">◆</span>
              </div>
            ))}
          </div>
          {/* Loop 2 */}
          <div className="flex shrink-0 items-center gap-16">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={`m2-${idx}`} className="flex items-center gap-6 group cursor-pointer">
                <img 
                  src={logo} 
                  alt="Shiveshwar logo" 
                  className="h-8 w-auto object-contain logo-pulse-glow" 
                />
                <span className="font-serif text-sm md:text-base uppercase tracking-[0.25em] text-[#d4a96a] transition duration-300 group-hover:text-[#faf8f4]">
                  Shiveshwar Textiles
                </span>
                <span className="text-[#b8924a]/40 text-xs ml-4">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Info and Badges */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src={logo} alt="Shiveshwar logo" className="h-10 w-10 object-contain" />
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-[#f5f0e8]/50">Export Quality</div>
                <div className="font-serif text-base uppercase tracking-wider text-[#d4a96a]">Shiveshwar Textiles</div>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-[#f5f0e8]/65">
              Premium wholesale fabric supplier from Surat, India, exporting high-performance textiles to Germany, Europe, and global industrial hubs.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#d4a96a]">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-[#d4a96a] transition duration-200">Startseite</Link></li>
              <li><Link href="/products" className="hover:text-[#d4a96a] transition duration-200">Fabric Catalogue</Link></li>
              <li><Link href="/about" className="hover:text-[#d4a96a] transition duration-200">Company Profile</Link></li>
              <li><Link href="/quality" className="hover:text-[#d4a96a] transition duration-200">Quality Management</Link></li>
              <li><Link href="/shipping-export" className="hover:text-[#d4a96a] transition duration-200">Logistics & Freight</Link></li>
              <li><Link href="/contact" className="hover:text-[#d4a96a] transition duration-200">Contact Desk</Link></li>
            </ul>
          </div>

          {/* Column 3: Fabric Specifications */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#d4a96a]">Fabric Lines</h4>
            <ul className="space-y-2.5 text-xs text-[#f5f0e8]/75">
              <li><Link href="/products/cotton-fabrics" className="hover:text-[#d4a96a] transition">Cotton Fabrics (50–150 GSM)</Link></li>
              <li><Link href="/products/polyester-fabrics" className="hover:text-[#d4a96a] transition">Greig Polyster Fabric (50–250 GSM)</Link></li>
              <li><Link href="/products/blended-fabrics" className="hover:text-[#d4a96a] transition">Blended Fabrics (50/250 GSM)</Link></li>
              <li><Link href="/products/custom-development" className="hover:text-[#d4a96a] transition">Bespoke Mill Weaving</Link></li>
            </ul>
          </div>

          {/* Column 4: B2B Coordinators */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#d4a96a]">B2B Coordinators</h4>
            <div className="space-y-4">
              {coordinators.map((c, i) => (
                <div 
                  key={i} 
                  className="text-xs p-3 bg-[#11100e] border border-[#b8924a]/10 hover:border-[#b8924a]/40 transition duration-300 rounded-sm space-y-1 relative group"
                >
                  <p className="font-bold text-[#faf8f4] group-hover:text-[#d4a96a] transition-colors">{c.name}</p>
                  <p className="text-[10px] text-[#f5f0e8]/50 uppercase tracking-wider">{c.role}</p>
                  {'badge' in c && c.badge && (
                    <p className="text-[9px] text-[#d4a96a] uppercase tracking-widest font-serif font-light mt-0.5">
                      {c.badge}
                    </p>
                  )}
                  {('email' in c || 'phone' in c) && (c.email || c.phone) && (
                    <div className="flex flex-col gap-1 pt-1.5 font-mono text-[10px] text-[#d4a96a]/90">
                      {'email' in c && c.email && (
                        <a href={`mailto:${c.email}`} className="flex items-center gap-1 hover:text-white transition">
                          <Mail className="h-3 w-3 shrink-0" />
                          <span>{c.email}</span>
                        </a>
                      )}
                      {'phone' in c && c.phone && (
                        <a href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition">
                          <Phone className="h-3 w-3 shrink-0" />
                          <span>{c.phone}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export and Copyright Notice */}
        <div className="mt-16 border-t border-[#b8924a]/10 pt-8 sm:flex sm:items-center sm:justify-between relative z-10">
          <p className="text-[10px] uppercase tracking-wider text-[#f5f0e8]/50 leading-relaxed sm:text-left">
            All international exports are executed under Indian Customs LUT — Zero-rated GST for overseas B2B buyers.
          </p>
          <p className="mt-4 text-[10px] text-[#f5f0e8]/45 sm:mt-0 font-mono">
            © {currentYear} Shiveshwar Textiles. Surat, Gujarat, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
