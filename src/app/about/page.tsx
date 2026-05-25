'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award, CheckCircle, Factory, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';

const team = [
  {
    name: 'Prakashbhai M. Mangukiya',
    role: 'Founder',
    bio: 'Prakashbhai provides overall strategic direction and oversees raw material sourcing and mill operations. With over two decades of industry expertise, he ensures our manufacturing setups align with strict international delivery grids and quality checks.',
    quote: 'Provides strategic direction and oversees sourcing and overall operational discipline. Ensures production standards, quality control, and long-term stability.',
    image: 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0b33bb678b3610fc96196_8EEC1158-D63D-45C3-8912-C6278FF0F6B6.JPEG',
  },
  {
    name: 'Parth P. Mangukiya',
    role: 'Director',
    bio: 'Parth leads global business development, European buyer relations, and contract specifications. Having designed our direct export pipelines, he functions as the main contact desk for fabric importers and labels in Germany and the EU.',
    quote: 'Leads business development, client coordination, and growth planning. Focuses on building reliable partnerships and expanding market presence.',
    image: 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0b267548d236482a03b3a_2483CA4D-93B6-46E6-A5F8-00A5BB52C568.JPG',
  },
  {
    name: 'Fenil M. Mangukiya',
    role: 'Production Manager',
    bio: 'Fenil supervises daily loom orchestration, GSM weight calibration, and batch consistency on our Surat factory floor. He ensures that every fabric roll complies with technical tolerances and is dispatched on schedule.',
    quote: 'Supervises daily manufacturing operations and workflow execution. Maintains strict quality checks, timely dispatch control, and production efficiency.',
    image: 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0b47d2f8adb3525789c71_5e66cb27-8dd5-499e-a66f-fc78eb84b372.jpg',
  },
];

const infrastructureImages = [
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a481180d61ac1d5340aa1e_PHOTO-2026-02-10-15-49-02.jpg',
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c710cef29f7ffeadedfe_IMG_0653.jpg',
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a483bdd8b87082bab902dd_566BC337-549E-42E5-8AA0-65BAB9B977EF.JPEG',
];

export default function AboutPage() {
  const { language } = useLanguage();
  const [activeMember, setActiveMember] = useState<typeof team[0] | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  // Gallery keyboard navigation hook
  useEffect(() => {
    if (activeGalleryIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveGalleryIndex(prev => (prev !== null ? (prev + 1) % infrastructureImages.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setActiveGalleryIndex(prev => (prev !== null ? (prev - 1 + infrastructureImages.length) % infrastructureImages.length : 0));
      } else if (e.key === 'Escape') {
        setActiveGalleryIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryIndex]);

  // Escape key for member details modal
  useEffect(() => {
    if (!activeMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMember]);

  return (
    <main className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-16 border-b border-[#b8924a]/15 pb-8 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Surat, Gujarat (India)</span>
          <h1 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl mt-2">
            Company <span className="text-[#d4a96a] font-light italic">Profile</span>
          </h1>
          <p className="max-w-2xl text-xs text-[#f5f0e8]/60 mt-3 uppercase tracking-widest leading-relaxed">
            Founded on precision, built for reliability. Shiveshwar Textiles operates as a direct manufacturer of high-caliber raw fabrics.
          </p>
        </div>

        {/* Story Section */}
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block">Our Story</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-4xl leading-tight">
              A commitment to <span className="text-[#d4a96a]">disciplined</span> weaving standards.
            </h2>
            <p className="text-sm leading-relaxed text-white/70 font-light">
              Established in 2021 in Surat, Shiveshwar Textiles was founded with a singular focus: to bridge the gap between competitive raw material pricing and the rigid quality specifications demanded by global garment manufacturing grids.
            </p>
            <p className="text-sm leading-relaxed text-white/70 font-light">
              Unlike local trading agencies, we operate directly at the factory floor level. This hands-on management approach allows us to supervise yarn selection, loom parameters, and finishing treatments. By removing middlemen, we provide premium fabrics with absolute quality ownership, from first sample to bulk container dispatch.
            </p>
            <p className="text-xs text-[#d4a96a]/70 uppercase tracking-widest font-mono">
              Established 2021 · Direct Surat Weaving Mill Sourcing
            </p>
          </div>
          
          <div className="border border-[#b8924a]/15 bg-[#171513] overflow-hidden">
            <img 
              src="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c7119263b15e0d55044e_IMG_0661.jpg" 
              alt="Shiveshwar Mill floor" 
              className="w-full h-80 object-cover grayscale hover:grayscale-0 transition duration-700"
            />
          </div>
        </section>

        {/* Management Team Section */}
        <section className="mb-24">
          <div className="mb-12 text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono">Operations & Governance</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-4xl mt-1">Core Management</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member) => (
              <div 
                key={member.name} 
                onClick={() => setActiveMember(member)}
                className="border border-[#b8924a]/15 bg-[#171513] group flex flex-col h-full hover:border-[#b8924a]/35 transition cursor-pointer"
                data-cursor="Open"
              >
                <div className="overflow-hidden aspect-w-4 aspect-h-5 h-96">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-103 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl text-white group-hover:text-[#d4a96a] transition">{member.name}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-[#d4a96a] font-mono block mt-1">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/60 italic font-sans line-clamp-3">
                    &quot;{member.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section: Why Source from India? */}
        <section className="bg-[#121110] border border-[#b8924a]/15 p-8 md:p-12 mb-24 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono">B2B Sourcing Value</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-4xl">
              Why Source from India?
            </h2>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono">
              Connecting India&apos;s manufacturing efficiency with Europe&apos;s quality expectations.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-[#d4a96a]" />
                <h4 className="font-serif text-lg text-white">Cost Advantage</h4>
              </div>
              <p className="text-xs leading-relaxed text-white/60 font-light">
                Direct loom-level sourcing eliminates agent commissions. Combined with India&apos;s raw cotton supply, this allows us to offer competitive pricing per meter.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#d4a96a]" />
                <h4 className="font-serif text-lg text-white">Skilled Weaving Workforce</h4>
              </div>
              <p className="text-xs leading-relaxed text-white/60 font-light">
                Surat is home to centuries of textile processing expertise. Our weavers manage complicated dobby and filament setups with high technical precision.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#d4a96a]" />
                <h4 className="font-serif text-lg text-white">GSM Range & Scale</h4>
              </div>
              <p className="text-xs leading-relaxed text-white/60 font-light">
                With a monthly capacity of up to 1 million meters, we handle massive production runs while maintaining strict weight parameters from 50 to 250 GSM.
              </p>
            </div>
          </div>
        </section>

        {/* Factory Infrastructure Gallery */}
        <section className="space-y-8">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono">Surat Facility</span>
            <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-4xl mt-1">Loom Infrastructure</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3">
            {infrastructureImages.map((imgUrl, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveGalleryIndex(idx)}
                className="border border-[#b8924a]/15 bg-[#171513] overflow-hidden h-72 cursor-pointer group"
                data-cursor="View"
              >
                <img 
                  src={imgUrl} 
                  alt={`Mill Loom Area ${idx + 1}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition duration-75" 
                />
              </div>
            ))}
          </div>

          <div className="border border-dashed border-[#b8924a]/20 bg-[#171513]/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#d4a96a] shrink-0" />
              <span>
                <strong>Compliance Note:</strong> Export documentation and local compliance auditing assistance are standard.
              </span>
            </div>
            <span className="text-[#f5f0e8]/50 text-[10px] uppercase font-mono">
              LUT Shipping Certified · Zero GST Exports
            </span>
          </div>
        </section>

      </div>

      {/* TEAM PROFILE MODAL LIGHTBOX */}
      {activeMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="absolute inset-0" onClick={() => setActiveMember(null)} />
          
          <div className="relative z-10 w-full max-w-2xl bg-[#141211] border border-[#b8924a]/30 shadow-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 animate-scale-in">
            <button 
              onClick={() => setActiveMember(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>

            <img 
              src={activeMember.image} 
              alt={activeMember.name} 
              className="w-full sm:w-52 h-64 object-cover border border-[#b8924a]/20 shrink-0"
            />

            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4a96a]">{activeMember.role}</span>
                <h3 className="font-serif text-2xl text-white mt-0.5">{activeMember.name}</h3>
              </div>
              <p className="text-xs leading-relaxed text-white/70 font-light">{activeMember.bio}</p>
              <div className="border-t border-[#b8924a]/10 pt-4">
                <span className="text-[9px] uppercase tracking-wider text-[#d4a96a]/70 font-mono block">Direct Mandate</span>
                <p className="text-xs italic text-white/60 font-serif mt-1">&quot;{activeMember.quote}&quot;</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INFRASTRUCTURE GALLERY LIGHTBOX */}
      {activeGalleryIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xs animate-fade-in">
          <div className="absolute inset-0" onClick={() => setActiveGalleryIndex(null)} />
          
          {/* Close button */}
          <button 
            onClick={() => setActiveGalleryIndex(null)}
            className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition p-2 focus:outline-none"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Left Navigation */}
          <button 
            onClick={() => setActiveGalleryIndex(prev => (prev !== null ? (prev - 1 + infrastructureImages.length) % infrastructureImages.length : 0))}
            className="absolute left-6 text-white/50 hover:text-[#d4a96a] transition p-2 focus:outline-none z-10"
            title="Previous Image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-4xl max-h-[80vh] w-full px-12 flex flex-col justify-center items-center select-none animate-scale-in">
            <img 
              src={infrastructureImages[activeGalleryIndex]} 
              alt={`Loom Infrastructure Area ${activeGalleryIndex + 1}`} 
              className="max-h-[75vh] w-auto object-contain border border-[#b8924a]/15 shadow-2xl" 
            />
            <span className="text-[10px] font-mono tracking-widest text-[#d4a96a] uppercase mt-4">
              Loom Section 0{activeGalleryIndex + 1} of 0{infrastructureImages.length}
            </span>
          </div>

          {/* Right Navigation */}
          <button 
            onClick={() => setActiveGalleryIndex(prev => (prev !== null ? (prev + 1) % infrastructureImages.length : 0))}
            className="absolute right-6 text-white/50 hover:text-[#d4a96a] transition p-2 focus:outline-none z-10"
            title="Next Image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}

    </main>
  );
}
