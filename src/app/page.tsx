'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { ArrowRight, CheckCircle2, Factory, Shield, Truck, Sparkles, MessageSquare, Download, X, Award, Clock, Users, Globe, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { animate, createTimeline, stagger } from 'animejs';
import dynamic from 'next/dynamic';


const GlobalNetworkGlobe = dynamic(
  () => import('@/components/GlobalNetworkGlobe'),
  { ssr: false }
);

const heroImage =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69d08aab1e14cd492e736468_ChatGPT%20Image%20Feb%2024%2C%202026%2C%2006_40_44%20PM.png';

const fabricSwatches = [
  {
    name: 'Cotton Weave',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
    gsm: '120 GSM',
    width: '150 cm',
    moq: '500m',
    slug: 'cotton-fabrics',
    class: 'floating-swatch-1'
  },
  {
    name: 'Greig Polyster Fabric',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
    gsm: '180 GSM',
    width: '150 cm',
    moq: '1000m',
    slug: 'polyester-fabrics',
    class: 'floating-swatch-2'
  },
  {
    name: 'Blended Weave',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d74a5359b7eb61b0060dce_Untitled%20design%20(33)1775508183.jpg',
    gsm: '220 GSM',
    width: '150 cm',
    moq: '800m',
    slug: 'blended-fabrics',
    class: 'floating-swatch-3'
  },
  {
    name: 'Custom Weaving',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69a096da7a6b26e1b628d2fe_Untitled%20design%20(21)%20(1).png',
    gsm: 'Custom GSM',
    width: 'Custom Width',
    moq: '1500m',
    slug: 'custom-development',
    class: 'floating-swatch-4'
  }
];

const products = [
  {
    name: 'Cotton Fabrics',
    slug: 'cotton-fabrics',
    detail: '50-150 GSM',
    moq: 500,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
  },
  {
    name: 'Greig Polyster Fabric',
    slug: 'polyester-fabrics',
    detail: '50-250 GSM',
    moq: 1000,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
  },
  {
    name: 'Blended Fabrics',
    slug: 'blended-fabrics',
    detail: '50/250 GSM',
    moq: 800,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d74a5359b7eb61b0060dce_Untitled%20design%20(33)1775508183.jpg',
  },
  {
    name: 'Custom Development',
    slug: 'custom-development',
    detail: 'Bespoke Specs',
    moq: 1500,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69a096da7a6b26e1b628d2fe_Untitled%20design%20(21)%20(1).png',
  },
];

const infrastructureImages = [
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a481180d61ac1d5340aa1e_PHOTO-2026-02-10-15-49-02.jpg',
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c710cef29f7ffeadedfe_IMG_0653.jpg',
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a483bdd8b87082bab902dd_566BC337-549E-42E5-8AA0-65BAB9B977EF.JPEG',
];



export default function HomePage() {
  const { t, language } = useLanguage();
  const { addItem, openDrawer } = useCart();
  const statsRef = useRef<HTMLDivElement | null>(null);
  const trustStatsRef = useRef<HTMLDivElement | null>(null);

  // States for counters
  const [variantCount, setVariantCount] = useState(0);
  const [samplingCount, setSamplingCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [activeHeroSwatchIndex, setActiveHeroSwatchIndex] = useState(0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const toggleHomeFaq = (idx: number) => {
    setActiveFaqIndex(prev => prev === idx ? null : idx);
  };

  const homeFaqs = [
    {
      q: "What types of fabrics do you manufacture?",
      a: "We manufacture cotton fabrics (100–150 GSM), polyester fabrics (50–250 GSM), and blended fabrics for various industrial, apparel, and commercial applications."
    },
    {
      q: "What is your production capacity?",
      a: "Our manufacturing setup supports production volumes of up to 1 million meters per month, enabling us to handle substantial bulk requirements efficiently."
    },
    {
      q: "Do you accept custom fabric requirements?",
      a: "Yes. We support custom fabric development based on GSM, composition, width, and specific application requirements, subject to technical feasibility."
    },
    {
      q: "Do you supply fabrics for export markets?",
      a: "Yes. We work with international buyers and support export-oriented supply requirements with structured production and dispatch processes."
    },
    {
      q: "What is your minimum order quantity (MOQ)?",
      a: "MOQ depends on the fabric type, specification, and order requirements. Please contact our team with your requirements for detailed information."
    },
    {
      q: "How do you ensure fabric quality?",
      a: "Each production batch undergoes quality checks for GSM accuracy, weave consistency, alignment, and overall fabric appearance before dispatch."
    },
    {
      q: "What fabric compositions do you offer?",
      a: "We manufacture cotton, polyester, and blended fabric constructions. Additional specifications can be discussed based on project requirements."
    }
  ];

  // States for Step 2 Trust Section


  // 1. Text reveal & floating layers animations on mount
  useEffect(() => {
    // Split heading lines individually — wrap by WORD first so words never break mid-character
    const lines = document.querySelectorAll('.hero-title-line span.line-text');
    lines.forEach((line) => {
      if (line && line.textContent && !line.querySelector('.word')) {
        const text = line.textContent;
        line.innerHTML = text
          .split(' ')
          .map((word) => {
            const letters = word
              .split('')
              .map((char) => `<span class="letter inline-block opacity-0">${char}</span>`)
              .join('');
            return `<span class="word inline-block whitespace-nowrap">${letters}</span>`;
          })
          .join('<span class="word-space inline-block opacity-0">&nbsp;</span>');
      }
    });

    // Hero Entry Timeline (Anime.js v4 createTimeline)
    const tl = createTimeline({
      autoplay: true
    });

    tl.add('.hero-title-line .letter, .hero-title-line .word-space', {
      translateY: [28, 0],
      opacity: [0, 1],
      delay: stagger(10),
      duration: 1100,
      ease: 'outExpo'
    })
    .add('.hero-subtitle', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      ease: 'outExpo'
    }, '-=800')
    .add('.hero-ctas .magnetic-btn', {
      opacity: [0, 1],
      translateY: [15, 0],
      delay: stagger(80),
      duration: 800,
      ease: 'outExpo'
    }, '-=600')
    .add('.hero-trust-bar', {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 800,
      ease: 'outExpo'
    }, '-=700')
    .add('.hero-trust-bar .trust-item', {
      opacity: [0, 0.8],
      translateY: [10, 0],
      delay: stagger(100),
      duration: 800,
      ease: 'outExpo'
    }, '-=500');

    // Slow Ken Burns background zoom
    animate('.hero-zoom-bg, .hero-video-bg', {
      scale: [1, 1.08],
      duration: 35000,
      ease: 'linear',
      alternate: true,
      loop: true
    });

    // Shifting color gradients
    animate('.shifting-gradient-1', {
      translateX: ['-10%', '15%'],
      translateY: ['-5%', '10%'],
      scale: [1, 1.15, 0.95],
      duration: 22000,
      alternate: true,
      loop: true,
      ease: 'inOutQuad'
    });

    animate('.shifting-gradient-2', {
      translateX: ['10%', '-15%'],
      translateY: ['5%', '-10%'],
      scale: [1.05, 0.9, 1.15],
      duration: 25000,
      alternate: true,
      loop: true,
      ease: 'inOutQuad'
    });

    // Hanging 3D Swatches Floating
    animate('.floating-swatch-1', {
      translateY: [-10, 10],
      translateX: [-6, 6],
      rotate: [-4, 4],
      duration: 5500,
      alternate: true,
      loop: true,
      ease: 'inOutSine'
    });

    animate('.floating-swatch-2', {
      translateY: [10, -10],
      translateX: [6, -6],
      rotate: [4, -4],
      duration: 7000,
      alternate: true,
      loop: true,
      ease: 'inOutSine'
    });

    // Animate sea cargo route flow using Anime.js
    animate('#sea-route', {
      strokeDashoffset: [0, -48],
      duration: 3000,
      ease: 'linear',
      loop: true
    });

    // Pulsing port nodes in map SVG using Anime.js
    animate('.port-pulse', {
      r: [4, 14],
      opacity: [0.8, 0],
      duration: 1800,
      loop: true,
      ease: 'outSine'
    });

  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const swatch1 = document.querySelector('.floating-swatch-1') as HTMLElement;
      const swatch2 = document.querySelector('.floating-swatch-2') as HTMLElement;
      const bgs = document.querySelectorAll('.hero-zoom-bg, .hero-video-bg');

      bgs.forEach((bg) => {
        (bg as HTMLElement).style.transform = `translateY(${scrolled * 0.35}px) scale(1.05)`;
      });
      if (swatch1) swatch1.style.transform = `translateY(${scrolled * 0.1 - 10}px) rotate(-4deg)`;
      if (swatch2) swatch2.style.transform = `translateY(${scrolled * 0.12 + 10}px) rotate(4deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Stats trigger intersection observer
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 4. Stats count animation using Anime.js v4 objects
  useEffect(() => {
    if (!statsTriggered) return;

    const statsObj = { variants: 0, sampling: 0, years: 0 };
    animate(statsObj, {
      variants: 650,
      sampling: 20,
      years: 5,
      round: 1,
      ease: 'outExpo',
      duration: 2000,
      onUpdate: () => {
        setVariantCount(Math.round(statsObj.variants));
        setSamplingCount(Math.round(statsObj.sampling));
        setYearsCount(Math.round(statsObj.years));
      }
    });

    // Fade blur animation for stats boxes
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    animate('.stats-card', {
      opacity: [0, 1],
      ...(isMobile ? {} : { filter: ['blur(8px)', 'blur(0px)'] }),
      translateY: [isMobile ? 12 : 20, 0],
      delay: stagger(isMobile ? 40 : 100),
      duration: 800,
      ease: 'outExpo'
    });
  }, [statsTriggered]);



  // 5. Magnetic CTA Mouse Handlers (Anime.js v4 translation animation)
  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    animate(btn, {
      translateX: x * 0.35,
      translateY: y * 0.35,
      scale: 1.05,
      duration: 200,
      ease: 'outQuad'
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      translateX: 0,
      translateY: 0,
      scale: 1,
      duration: 500,
      ease: 'outElastic(1, 0.5)'
    });
  };

  return (
    <main className="min-h-screen bg-[#070706] text-[#f5f0e8] pt-28 overflow-x-hidden">
      
      {/* 1. Cinematic Luxury Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden w-full">
        
        {/* Layered background with crossfade on selection */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#070706]">
          {/* Base cinematic weaving loop footage */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="hero-video-bg absolute inset-0 w-full h-full object-cover opacity-[0.22] mix-blend-luminosity"
          >
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05d00db84373111b5190a747cae3558&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>

          {/* Active swatch image crossfade overlay */}
          {fabricSwatches.map((swatch, idx) => (
            <div 
              key={idx}
              className="hero-zoom-bg absolute inset-0 bg-cover bg-center transition-opacity duration-[1000ms] ease-in-out mix-blend-luminosity"
              style={{ 
                backgroundImage: `url("${swatch.image}")`,
                opacity: activeHeroSwatchIndex === idx ? 0.38 : 0
              }}
            />
          ))}

          {/* Layered dark overlays for contrast & luxury depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070706] via-[#070706]/80 to-[#070706]/20 hidden lg:block" />
          <div className="absolute inset-0 bg-[#070706]/80 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070706] via-transparent to-[#070706]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(212,169,106,0.08),transparent)]" />
          
          {/* Subtle weaving grid structure overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(184,146,74,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(184,146,74,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Animated gradients */}
          <div className="shifting-gradient-1 absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-[#b8924a]/5 blur-[120px] rounded-full" />
          <div className="shifting-gradient-2 absolute -bottom-[25%] -right-[20%] w-[65%] h-[65%] bg-[#d4a96a]/5 blur-[140px] rounded-full" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto grid lg:grid-cols-[3fr_2fr] gap-8 xl:gap-16 items-center py-20 px-6 sm:px-10 lg:px-16">
          
          <div className="space-y-8 select-none w-full text-center lg:text-left flex flex-col justify-center lg:items-start items-center">
            <span className="hero-subtitle opacity-0 inline-flex items-center gap-2 border border-[#b8924a]/30 bg-[#b8924a]/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.35em] text-[#d4a96a]">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Global Textile Powerhouse
            </span>
            
            <h1 className="hero-title-main font-serif uppercase leading-[1.1] tracking-[0.03em] text-[#faf8f4] flex flex-col gap-2" style={{fontSize: 'clamp(2.5rem, 5.5vw, 5rem)'}}>
              <span className="hero-title-line block">
                <span className="line-text inline">Premium Fabrics</span>
              </span>
              <span className="hero-title-line block text-[#d4a96a] font-light italic">
                <span className="line-text inline">For Global Buyers</span>
              </span>
            </h1>
            
            <p className="hero-subtitle opacity-0 max-w-2xl text-sm leading-relaxed text-[#f5f0e8]/70 sm:text-base lg:text-lg font-light">
              Direct mill access to Surat&apos;s finest weaving lines — export-grade cotton, polyester &amp; blends with compliant customs documentation, 20-day sampling, and flexible MOQs.
            </p>

            {/* CTAs with Magnetic Animation & Glassmorphism */}
            <div className="hero-ctas opacity-0 pt-2 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <button
                onClick={openDrawer}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-btn cursor-pointer relative group overflow-hidden bg-gradient-to-r from-[#b8924a] to-[#d4a96a] text-[#0f0e0c] font-bold px-8 py-4 text-xs uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(184,146,74,0.15)] hover:shadow-[0_0_30px_rgba(212,169,106,0.35)] transition-all duration-300 border border-[#b8924a]/30 rounded-sm"
              >
                <span className="relative z-10">Request Quote</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => setIsCatalogOpen(true)}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-btn cursor-pointer border border-[#f5f0e8]/25 bg-white/5 text-[#f5f0e8]/90 font-bold px-8 py-4 text-xs uppercase tracking-[0.2em] backdrop-blur-md hover:bg-white/10 hover:border-[#b8924a] hover:text-[#d4a96a] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(212,169,106,0.1)] transition-all duration-300 rounded-sm"
              >
                Download Catalog
              </button>

              <a
                href="https://wa.me/919316189146?text=Hi%20Parth,%20interested%20in%20Shiveshwar%20Textiles%20fabrics."
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-btn cursor-pointer border border-[#25d366]/30 bg-[#25d366]/5 text-[#25d366] font-bold px-6 py-4 text-xs uppercase tracking-[0.2em] backdrop-blur-md hover:bg-[#25d366]/15 hover:border-[#25d366]/60 flex items-center gap-2 shadow-[0_4px_15px_rgba(37,211,102,0.05)] hover:shadow-[0_0_25px_rgba(37,211,102,0.2)] transition-all duration-300 rounded-sm"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Inquiry
              </a>
            </div>

            {/* Mini Premium B2B Trust Bar */}
            <div className="hero-trust-bar opacity-0 pt-6 mt-6 border-t border-[#b8924a]/15 w-full flex flex-wrap gap-x-8 gap-y-4 items-center justify-center lg:justify-start">
              <div className="trust-item flex items-center gap-2.5 text-[10px] sm:text-xs text-[#f5f0e8]/80 font-mono uppercase tracking-[0.15em]">
                <Award className="h-4.5 w-4.5 text-[#d4a96a]" />
                <span>Export Ready</span>
              </div>
              <div className="trust-item flex items-center gap-2.5 text-[10px] sm:text-xs text-[#f5f0e8]/80 font-mono uppercase tracking-[0.15em]">
                <Layers className="h-4.5 w-4.5 text-[#d4a96a]" />
                <span>MOQ Flexible</span>
              </div>
              <div className="trust-item flex items-center gap-2.5 text-[10px] sm:text-xs text-[#f5f0e8]/80 font-mono uppercase tracking-[0.15em]">
                <Clock className="h-4.5 w-4.5 text-[#d4a96a]" />
                <span>20 Days Sampling</span>
              </div>
              <div className="trust-item flex items-center gap-2.5 text-[10px] sm:text-xs text-[#f5f0e8]/80 font-mono uppercase tracking-[0.15em]">
                <Globe className="h-4.5 w-4.5 text-[#d4a96a]" />
                <span>Global Shipping</span>
              </div>
            </div>

            {/* Mobile interactive thumbnails */}
            <div className="lg:hidden mt-8 flex flex-col items-center w-full gap-2.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4a96a]/70">Tap to Preview Fabric & Specs</span>
              <div className="flex gap-3 justify-center items-center">
                {fabricSwatches.map((swatch, idx) => {
                  const isActive = activeHeroSwatchIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveHeroSwatchIndex(idx)}
                      className={`relative w-11 h-11 border rounded-sm overflow-hidden transition-all duration-300 cursor-pointer ${
                        isActive ? 'border-[#d4a96a] scale-115 shadow-lg' : 'border-[#b8924a]/20 opacity-60'
                      }`}
                    >
                      <img src={swatch.image} alt={swatch.name} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
              <div className="bg-[#121110]/95 border border-[#b8924a]/20 p-4 mt-2 text-xs space-y-2 w-full max-w-sm shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-[10px] font-mono border-b border-[#b8924a]/10 pb-1.5">
                  <span className="text-[#d4a96a]/70 uppercase">Weave Type:</span>
                  <span className="text-white font-medium">{fabricSwatches[activeHeroSwatchIndex].name}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono border-b border-[#b8924a]/10 pb-1.5">
                  <span className="text-[#d4a96a]/70 uppercase">GSM / Width:</span>
                  <span className="text-white font-medium">{fabricSwatches[activeHeroSwatchIndex].gsm} / {fabricSwatches[activeHeroSwatchIndex].width}</span>
                </div>
                <button
                  onClick={() => {
                    const active = fabricSwatches[activeHeroSwatchIndex];
                    addItem({
                      id: active.slug,
                      name: active.name,
                      gsm: active.gsm,
                      image: active.image
                    }, parseInt(active.moq));
                    openDrawer();
                  }}
                  className="w-full text-center border border-[#b8924a] bg-[#b8924a] text-[#0f0e0c] font-bold py-2 text-[9px] uppercase tracking-widest hover:bg-[#d4a96a] transition"
                >
                  Add Swatch To RFQ
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Fabric Selector & B2B Spec Card — Premium Configurator Panel */}
          <div className="hidden lg:flex flex-col gap-3 justify-center items-stretch relative z-20 w-full max-w-[420px] ml-auto">
            {/* Panel header */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a96a]/80">Configure Your Order</span>
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">4 Fabric Lines</span>
            </div>

            {/* Swatch selector cards */}
            <div className="space-y-2.5">
              {fabricSwatches.map((swatch, idx) => {
                const isActive = activeHeroSwatchIndex === idx;
                return (
                  <button 
                    key={idx}
                    onClick={() => setActiveHeroSwatchIndex(idx)}
                    className={`w-full text-left backdrop-blur-xl border p-3.5 flex items-center gap-4 transition-all duration-400 cursor-pointer rounded-sm ${
                      isActive 
                        ? 'bg-[#b8924a]/12 border-[#d4a96a]/70 shadow-[0_0_30px_rgba(212,169,106,0.18),inset_0_0_20px_rgba(212,169,106,0.04)] scale-[1.01]' 
                        : 'bg-black/50 border-[#b8924a]/12 hover:border-[#b8924a]/35 hover:bg-black/70 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    <div className={`relative w-14 h-14 flex-shrink-0 overflow-hidden border transition-all duration-300 rounded-sm ${
                      isActive ? 'border-[#d4a96a]/80 shadow-[0_0_12px_rgba(212,169,106,0.3)]' : 'border-[#b8924a]/20'
                    }`}>
                      <img 
                        src={swatch.image} 
                        alt={swatch.name} 
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#d4a96a]/10" />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className={`font-serif text-sm uppercase tracking-wider transition-colors truncate ${
                        isActive ? 'text-[#d4a96a]' : 'text-white/90'
                      }`}>{swatch.name}</h4>
                      <div className="flex gap-3 text-[9px] text-white/45 font-mono mt-1">
                        <span>{swatch.gsm}</span>
                        <span className="text-white/20">|</span>
                        <span>{swatch.width}</span>
                        <span className="text-white/20">|</span>
                        <span className="text-[#d4a96a]/60">MOQ: {swatch.moq}</span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4a96a] flex-shrink-0 shadow-[0_0_6px_rgba(212,169,106,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Active Spec Summary + CTA */}
            <div className="mt-1 bg-black/60 border border-[#b8924a]/20 backdrop-blur-xl p-4 space-y-3 rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-0.5">
                  <div className="text-[8px] font-mono uppercase tracking-widest text-[#d4a96a]/50">Weight</div>
                  <div className="text-xs font-medium text-white">{fabricSwatches[activeHeroSwatchIndex].gsm}</div>
                </div>
                <div className="space-y-0.5 border-x border-[#b8924a]/10">
                  <div className="text-[8px] font-mono uppercase tracking-widest text-[#d4a96a]/50">Width</div>
                  <div className="text-xs font-medium text-white">{fabricSwatches[activeHeroSwatchIndex].width}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[8px] font-mono uppercase tracking-widest text-[#d4a96a]/50">Min. Order</div>
                  <div className="text-xs font-medium text-white">{fabricSwatches[activeHeroSwatchIndex].moq}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  const active = fabricSwatches[activeHeroSwatchIndex];
                  addItem({
                    id: active.slug,
                    name: active.name,
                    gsm: active.gsm,
                    image: active.image
                  }, parseInt(active.moq));
                  openDrawer();
                }}
                className="w-full text-center bg-gradient-to-r from-[#b8924a] to-[#d4a96a] border border-[#b8924a]/50 text-[#0f0e0c] font-bold py-3 text-[10px] uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(212,169,106,0.3)] transition-all duration-300 cursor-pointer rounded-sm"
              >
                Add to Inquiry
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* 2. Interactive Scrolling Spec Ticker */}
      <div className="w-full bg-[#121110] border-y border-[#b8924a]/15 py-3.5 mt-8 overflow-hidden select-none">
        <div className="flex marquee-track gap-12 whitespace-nowrap text-[9px] font-mono uppercase tracking-[0.25em] text-[#d4a96a]/80">
          {Array(6).fill([
            "Cotton 50-150 GSM Weaving",
            "Greig Polyster Fabric 50-250 GSM",
            "Direct Mill-To-Buyer Logistics",
            "1,000,000 meters / Month Scale",
            "Standardized Quality Control Audits",
            "Zero GST Letter of Undertaking",
            "Fast Courier Swatch Dispatch"
          ]).flat().map((spec, i) => (
            <span key={i} className="flex items-center gap-2">
              <span>★</span>
              <span>{spec}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Cinematic Stats Section */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 md:px-8 py-24 select-none">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1 */}
          <div className="stats-card opacity-0 border border-[#b8924a]/15 bg-[#121110] p-6 space-y-2 relative group hover:border-[#b8924a]/30 transition duration-300">
            <span className="text-[10px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Variants Catalog</span>
            <div className="font-serif text-4xl text-[#d4a96a] font-light">
              {variantCount}+
            </div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">650+ Fabric Variants</p>
          </div>

          {/* Card 2 */}
          <div className="stats-card opacity-0 border border-[#b8924a]/15 bg-[#121110] p-6 space-y-2 relative group hover:border-[#b8924a]/30 transition duration-300">
            <span className="text-[10px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Sampling turnaround</span>
            <div className="font-serif text-4xl text-[#d4a96a] font-light">
              {samplingCount} Days
            </div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">20 Day Sampling</p>
          </div>

          {/* Card 3 */}
          <div className="stats-card opacity-0 border border-[#b8924a]/15 bg-[#121110] p-6 space-y-2 relative group hover:border-[#b8924a]/30 transition duration-300">
            <span className="text-[10px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Mill operations</span>
            <div className="font-serif text-4xl text-[#d4a96a] font-light">
              {yearsCount}+ Years
            </div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">5+ Years Manufacturing</p>
          </div>

        </div>
      </section>

      {/* 4. Products Category Overview (Glassmorphism + 3D details) */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16 border-b border-[#b8924a]/10 pb-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Global Fabric Production</p>
            <h2 className="font-serif text-3xl uppercase tracking-wide text-[#faf8f4] md:text-5xl">
              Fabric <span className="text-[#d4a96a] font-light italic">Categories</span>
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#f5f0e8]/70 uppercase tracking-widest">
            Premium raw textiles manufactured to exact specifications, catering to fashion brands, workwear suppliers, and upholstery labels.
          </p>
        </div>

        <div className="flex overflow-x-auto md:grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none">
          {products.map((product, idx) => (
            <div
              key={product.slug}
              className="border border-[#b8924a]/15 bg-[#121110] hover:border-[#b8924a]/35 transition duration-300 flex flex-col group relative w-[85vw] sm:w-[60vw] md:w-auto shrink-0 md:shrink snap-center"
            >
              {/* Product Image */}
              <div className="overflow-hidden aspect-w-4 aspect-h-5 relative h-72">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] via-[#0f0e0c]/20 to-transparent" />
              </div>

              {/* Text & Specs */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4a96a]">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl text-white mt-1">{product.name}</h3>
                  <p className="text-xs tracking-wider text-white/50 mt-1">{product.detail}</p>
                </div>
                
                {/* CTA actions */}
                <div className="mt-6 pt-4 border-t border-[#b8924a]/10 flex flex-col gap-2.5">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#d4a96a] hover:text-white transition font-medium"
                  >
                    <span>Product Specs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  
                  <button
                    onClick={() => {
                      addItem({
                        id: product.slug,
                        name: product.name,
                        gsm: product.detail,
                        image: product.image
                      }, product.moq);
                      openDrawer();
                    }}
                    className="w-full text-center border border-[#b8924a]/30 bg-transparent py-2.5 text-[10px] uppercase tracking-wider text-[#d4a96a] hover:bg-[#b8924a] hover:text-[#0f0e0c] transition font-bold cursor-pointer"
                  >
                    Add to Inquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* 5.1 Global Network Section (3D Connected Cities Globe) */}
      <GlobalNetworkGlobe />

      {/* 6. Production scale & capabilities preview */}
      <section className="bg-[#121110] border-y border-[#b8924a]/10 py-24 select-none">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Global Infrastructure</p>
            <h2 className="font-serif text-3xl uppercase tracking-wide text-[#faf8f4] md:text-5xl leading-tight">
              Export Scale. <br />
              <span className="text-[#d4a96a] font-light italic">Direct Mill Access.</span>
            </h2>
            <p className="text-sm leading-relaxed text-[#f5f0e8]/75 font-light">
              Operating state-of-the-art power looms and waterjet looms across our advanced manufacturing ecosystem. We offer global manufacturers direct factory prices, removing trading agents, while guaranteeing absolute batch compliance.
            </p>
            
            <div className="space-y-4 pt-4 text-xs tracking-wider">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a96a]" />
                <span>Waterjet looms optimized for highly uniform Polyester filament weaving</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a96a]" />
                <span>Cotton processing lines supporting strict GSM weight targets</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a96a]" />
                <span>Direct logistics routes from our manufacturing hubs to global ports</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-b border-[#d4a96a] pb-1 text-xs uppercase tracking-[0.25em] text-[#d4a96a] hover:text-white transition"
              >
                <span>Read Our Production Story</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Infrastructure Images grid */}
          <div className="grid grid-cols-2 gap-4">
            <img src={infrastructureImages[0]} alt="Weaving looms" className="col-span-2 h-64 w-full object-cover border border-[#b8924a]/10 grayscale hover:grayscale-0 transition duration-700" />
            <img src={infrastructureImages[1]} alt="Global factory mill floor" className="h-44 w-full object-cover border border-[#b8924a]/10 grayscale hover:grayscale-0 transition duration-700" />
            <img src={infrastructureImages[2]} alt="Fabric rolls before packaging" className="h-44 w-full object-cover border border-[#b8924a]/10 grayscale hover:grayscale-0 transition duration-700" />
          </div>
        </div>
      </section>

      {/* 5.5 Frequently Asked Questions section */}
      <section className="bg-[#0f0e0c] border-t border-[#b8924a]/10 py-24 select-none">
        <div className="mx-auto max-w-4xl px-4 space-y-12">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono">Resolve Doubts</span>
            <h2 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="border border-[#b8924a]/15 bg-[#121110] divide-y divide-[#b8924a]/10">
            {homeFaqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={idx} className="p-5 space-y-2">
                  <button 
                    onClick={() => toggleHomeFaq(idx)}
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
        </div>
      </section>

      {/* 6. Direct B2B Contact section */}
      <section className="bg-gradient-to-b from-[#121110] to-[#070706] py-24 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <h2 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl">
            Request an Export <span className="text-[#d4a96a] font-light italic">Sample Pack</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed text-[#f5f0e8]/75 font-light">
            Evaluate our fabric texture, weave density, and finishing quality first-hand. We prepare custom samples based on your specifications and ship them via DHL Express (5–7 business days to Europe).
          </p>
          
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/contact?subject=Sample Request"
              className="bg-[#b8924a] px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-[#0f0e0c] font-bold transition hover:bg-[#d4a96a]"
            >
              Order Sample Pack
            </Link>
            
            <Link
              href="/contact"
              className="border border-[#f5f0e8]/20 bg-transparent px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-[#f5f0e8]/85 font-bold transition hover:border-[#b8924a] hover:text-[#d4a96a]"
            >
              Speak to Parth
            </Link>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CATALOGUE MODAL */}
      {isCatalogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="absolute inset-0" onClick={() => setIsCatalogOpen(false)} />
          
          <div className="relative z-10 w-full max-w-2xl bg-[#141211] border border-[#b8924a]/30 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 animate-scale-in">
            <button 
              onClick={() => setIsCatalogOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-4 text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4a96a] block">Interactive Catalog</span>
              <h3 className="font-serif text-2xl text-white">Shiveshwar Textiles Digital Catalog</h3>
              <p className="text-xs leading-relaxed text-white/70 font-light">
                Our product catalog details the complete line of cotton, polyester, and blended fabrics produced across our manufacturing facility network. We provide detailed weave layouts, finishing specs, and pricing terms.
              </p>
              
              <div className="border border-[#b8924a]/15 bg-[#1c1a17] p-4 rounded-xs flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#d4a96a] font-mono block">File Spec</span>
                  <span className="text-xs text-white truncate block">Shiveshwar_Product_Catalog_2026.pdf</span>
                </div>
                <a 
                  href="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png"
                  download
                  className="bg-[#b8924a] hover:bg-[#d4a96a] text-[#0f0e0c] font-bold p-3 text-xs uppercase tracking-widest transition flex items-center gap-2 shrink-0"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
