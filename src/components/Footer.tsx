'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Award, Globe, Ship } from 'lucide-react';
import { animate } from 'animejs';

const logo =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png';
const logo11 =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a1dbe03c948290cf27de22_SHIWESHWAR-11.png';
const logoTextile =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a1e09bcb79a8d4f8a55957_textile.png';

const marqueeItems = [
  { src: logo, alt: 'Shiveshwar logo' },
  { src: logo11, alt: 'Shiveshwar 11' },
  { src: logoTextile, alt: 'WeaveTech logo' },
];

export default function Footer() {
  const { t, language } = useLanguage();
  const gradientRef = useRef<HTMLDivElement>(null);

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
      name: 'Parth P. Mangukiya',
      role: 'Export Director',
      email: 'parthmangukiya@shiveshwartextiles.com',
      phone: '+919924176337',
    },
    {
      name: 'Prakashbhai Mangukiya',
      role: 'Managing Partner / Production Lead',
      email: 'prakashbhai@shiveshwartextiles.com',
      phone: '+919904255555',
    },
    {
      name: 'Fenil Mangukiya',
      role: 'Operations & Logistics Manager',
      email: 'fenil@shiveshwartextiles.com',
      phone: '+919726880009',
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
      <div className="border-b border-[#b8924a]/10 bg-[#11100e] py-5 overflow-hidden relative z-10">
        <div className="flex w-max items-center gap-16 px-4 animate-marquee">
          {/* Loop 1 */}
          <div className="flex shrink-0 items-center gap-16">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={`m1-${idx}`} className="flex items-center gap-12">
                <img src={item.src} alt={item.alt} className="h-8 w-auto opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition duration-300 object-contain" />
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4a96a]/30">Shiveshwar Textiles</span>
              </div>
            ))}
          </div>
          {/* Loop 2 */}
          <div className="flex shrink-0 items-center gap-16">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={`m2-${idx}`} className="flex items-center gap-12">
                <img src={item.src} alt={item.alt} className="h-8 w-auto opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition duration-300 object-contain" />
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4a96a]/30">Shiveshwar Textiles</span>
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
            {/* Certifications & Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="border border-[#b8924a]/25 bg-[#b8924a]/5 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#d4a96a] flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>ISO 9001:2015</span>
              </span>
              <span className="border border-[#b8924a]/25 bg-[#b8924a]/5 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#d4a96a] flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>OEKO-TEX Yarn</span>
              </span>
              <span className="border border-[#b8924a]/25 bg-[#b8924a]/5 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#d4a96a] flex items-center gap-1">
                <Ship className="h-3 w-3" />
                <span>FOB / DDP EU</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#d4a96a]">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-[#d4a96a] transition duration-200">Startseite</Link></li>
              <li><Link href="/products" className="hover:text-[#d4a96a] transition duration-200">Fabric Catalogue</Link></li>
              <li><Link href="/fabric-supplier-germany" className="hover:text-[#d4a96a] transition duration-200 font-medium text-[#d4a96a]/90">Germany & Europe Portal</Link></li>
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
              <li><Link href="/products/cotton-fabrics" className="hover:text-[#d4a96a] transition">Cotton Fabrics (100–150 GSM)</Link></li>
              <li><Link href="/products/polyester-fabrics" className="hover:text-[#d4a96a] transition">Polyester Fabrics (50–250 GSM)</Link></li>
              <li><Link href="/products/blended-fabrics" className="hover:text-[#d4a96a] transition">Blended Fabrics (Custom GSM)</Link></li>
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
                  <div className="flex flex-col gap-1 pt-1.5 font-mono text-[10px] text-[#d4a96a]/90">
                    <a href={`mailto:${c.email}`} className="flex items-center gap-1 hover:text-white transition">
                      <Mail className="h-3 w-3 shrink-0" />
                      <span>{c.email}</span>
                    </a>
                    <a href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition">
                      <Phone className="h-3 w-3 shrink-0" />
                      <span>{c.phone}</span>
                    </a>
                  </div>
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
            © {new Date().getFullYear()} Shiveshwar Textiles. Surat, Gujarat, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
