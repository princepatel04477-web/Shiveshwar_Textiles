'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { ArrowRight, CheckCircle2, Factory, Shield, Truck, Sparkles, MessageSquare, Download, X, Award, Clock, Users, Globe } from 'lucide-react';
import { animate, createTimeline, stagger } from 'animejs';

const heroImage =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69d08aab1e14cd492e736468_ChatGPT%20Image%20Feb%2024%2C%202026%2C%2006_40_44%20PM.png';

const fabricSwatches = [
  {
    name: 'Raw Cotton',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
    gsm: '120 GSM',
    class: 'floating-swatch-1'
  },
  {
    name: 'Polyester Filament',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
    gsm: '180 GSM',
    class: 'floating-swatch-2'
  }
];

const products = [
  {
    name: 'Cotton Fabrics',
    slug: 'cotton-fabrics',
    detail: '100-150 GSM',
    moq: 500,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
  },
  {
    name: 'Polyester Fabrics',
    slug: 'polyester-fabrics',
    detail: '50-250 GSM',
    moq: 1000,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
  },
  {
    name: 'Blended Fabrics',
    slug: 'blended-fabrics',
    detail: 'Custom GSM',
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

const trustCards = [
  {
    icon: Globe,
    title: 'Export Ready',
    description: '100% compliant with EU REACH standards, absolute chemical audit safety, and direct zero-GST LUT export pathways.',
    metric: 'Zero-GST LUT Setup'
  },
  {
    icon: Factory,
    title: 'Bulk Manufacturing',
    description: 'Operating high-speed Rapier and Waterjet loom lines in Surat with automated weaving configurations.',
    metric: '1,000,000m+/mo Scale'
  },
  {
    icon: CheckCircle2,
    title: 'Quality Inspected',
    description: 'Strict 4-point inspection system checking GSM weight uniformity, color fastness, and defect-free weave density.',
    metric: '<0.5% Defect Rate'
  },
  {
    icon: Clock,
    title: 'Fast Sampling',
    description: 'Rapid development loop with air courier swatch books dispatched via DHL Express to Europe in 48 hours.',
    metric: '48h Dispatch Loop'
  },
  {
    icon: Truck,
    title: 'Global Logistics',
    description: 'Integrated freight forwarding. Flexible DDP, FOB, and CIF ocean shipping routes directly to European ports.',
    metric: 'FOB / CIF / DDP Ports'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Direct round-the-clock WhatsApp & email correspondence with partners Parth Patel and Fenil Patel for custom weave runs.',
    metric: 'Direct Executive Line'
  }
];

const trustVisuals = [
  {
    title: 'Weaving Mill',
    desc: 'Our state-of-the-art weaving loom mill floor in Surat, India.',
    image: '/images/trust/factory.png'
  },
  {
    title: 'Waterjet Loom Machinery',
    desc: 'Advanced waterjet technology running at 600+ RPM for uniform weave.',
    image: '/images/trust/machinery.png'
  },
  {
    title: 'Fabric Roll Inspection',
    desc: 'Meticulous 4-point check to audit batch consistency before packing.',
    image: '/images/trust/warehouse.png'
  },
  {
    title: 'Heavy-Duty Packaging',
    desc: 'Secure moisture-proof tube packaging ready for international cargo container transport.',
    image: '/images/trust/packaging.png'
  },
  {
    title: 'Ocean Cargo Freight',
    desc: 'Seamless ocean shipment routes from Mumbai (JNPT) port direct to Germany.',
    image: '/images/trust/shipping.png'
  },
  {
    title: 'Surat Storage Facility',
    desc: 'Extensive inventory warehouse holding ready-to-ship cotton and polyester fabrics.',
    image: '/images/trust/warehouse.png'
  }
];

function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Build particle configurations
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));

    // Coordinate floating movement animations using Anime.js
    particles.forEach((p) => {
      animate(p, {
        x: [p.x, Math.random() * width],
        y: [p.y, Math.random() * height],
        opacity: [p.opacity, Math.random() * 0.8 + 0.1],
        duration: () => Math.random() * 8000 + 4000,
        ease: 'inOutSine',
        loop: true,
        alternate: true
      });
    });

    // Mesh technical lines shift coordinates using Anime.js
    const meshState = { offset: 0 };
    animate(meshState, {
      offset: [0, 60],
      duration: 12000,
      ease: 'linear',
      loop: true
    });

    let active = true;
    const tick = () => {
      if (!active) return;
      ctx.clearRect(0, 0, width, height);

      // Draw technical grid lines offset by the animated meshState
      ctx.strokeStyle = 'rgba(184, 146, 74, 0.025)';
      ctx.lineWidth = 1;
      const step = 60;
      const offset = meshState.offset;
      for (let x = offset % step; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = offset % step; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating golden particles
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(212, 169, 106, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      active = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85" />;
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const { addItem, openDrawer } = useCart();
  const statsRef = useRef<HTMLDivElement | null>(null);
  const trustStatsRef = useRef<HTMLDivElement | null>(null);

  // States for counters
  const [variantCount, setVariantCount] = useState(0);
  const [regionCount, setRegionCount] = useState(0);
  const [samplingCount, setSamplingCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // States for Step 2 Trust Section
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);
  const [trustStatsTriggered, setTrustStatsTriggered] = useState(false);
  const [capacityVal, setCapacityVal] = useState(0);
  const [countriesVal, setCountriesVal] = useState(0);
  const [ordersVal, setOrdersVal] = useState(0);
  const [retentionVal, setRetentionVal] = useState(0);

  // 1. Text reveal & floating layers animations on mount
  useEffect(() => {
    // Split heading letters for staggered animation
    const heading = document.querySelector('.hero-title-main');
    if (heading && heading.textContent) {
      const text = heading.textContent;
      heading.innerHTML = text
        .split('')
        .map((char) => `<span class="letter inline-block opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
    }

    // Hero Entry Timeline (Anime.js v4 createTimeline)
    const tl = createTimeline({
      autoplay: true
    });

    tl.add('.hero-title-main .letter', {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(15),
      duration: 1000,
      ease: 'outExpo'
    })
    .add('.hero-subtitle', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      ease: 'outExpo'
    }, '-=700')
    .add('.hero-ctas .magnetic-btn', {
      opacity: [0, 1],
      translateY: [15, 0],
      delay: stagger(80),
      duration: 800,
      ease: 'outExpo'
    }, '-=500');

    // Slow Ken Burns background zoom
    animate('.hero-zoom-bg', {
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

    // Floating ISO badge alignment using Anime.js
    animate('.iso-badge', {
      translateY: [-3, 3],
      duration: 3500,
      alternate: true,
      loop: true,
      ease: 'inOutSine'
    });

  }, []);

  // 2. Parallax scroll effect (direct manipulation for peak performance)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const swatch1 = document.querySelector('.floating-swatch-1') as HTMLElement;
      const swatch2 = document.querySelector('.floating-swatch-2') as HTMLElement;
      const bg = document.querySelector('.hero-zoom-bg') as HTMLElement;

      if (bg) bg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.05)`;
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

    const statsObj = { variants: 0, regions: 0, sampling: 0, years: 0 };
    animate(statsObj, {
      variants: 650,
      regions: 25,
      sampling: 48,
      years: 10,
      round: 1,
      ease: 'outExpo',
      duration: 2000,
      onUpdate: () => {
        setVariantCount(statsObj.variants);
        setRegionCount(statsObj.regions);
        setSamplingCount(statsObj.sampling);
        setYearsCount(statsObj.years);
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

  // 4b. Step 2 Trust Stats trigger intersection observer
  useEffect(() => {
    const el = trustStatsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrustStatsTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 4c. Step 2 Trust counters and cards animations
  useEffect(() => {
    if (!trustStatsTriggered) return;

    const trustStatsObj = { capacity: 0, countries: 0, orders: 0, retention: 0 };
    animate(trustStatsObj, {
      capacity: 1000000,
      countries: 25,
      orders: 1200,
      retention: 94,
      round: 1,
      ease: 'outExpo',
      duration: 2500,
      onUpdate: () => {
        setCapacityVal(trustStatsObj.capacity);
        setCountriesVal(trustStatsObj.countries);
        setOrdersVal(trustStatsObj.orders);
        setRetentionVal(trustStatsObj.retention);
      }
    });

    // Staggered reveal for trust cards with Anime.js
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    animate('.trust-card', {
      opacity: [0, 1],
      translateY: [isMobile ? 15 : 35, 0],
      scale: [isMobile ? 0.98 : 0.95, 1],
      delay: stagger(isMobile ? 40 : 90),
      duration: isMobile ? 700 : 900,
      ease: 'outExpo'
    });
  }, [trustStatsTriggered]);

  // 4e. Operational visual crossfade transition using Anime.js
  useEffect(() => {
    animate(`.operational-view-img-${activeCardIndex}`, {
      opacity: [0, 1],
      scale: [1.04, 1.0],
      duration: 600,
      ease: 'outQuad'
    });
  }, [activeCardIndex]);

  // 4d. Card hover & tilt animations using Anime.js
  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    setActiveCardIndex(idx);
    
    // Scale up, glow border, and transition background using Anime.js
    animate(e.currentTarget, {
      scale: 1.03,
      borderColor: 'rgba(212, 169, 106, 0.5)',
      backgroundColor: 'rgba(22, 21, 19, 0.95)',
      duration: 300,
      ease: 'outQuad'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reset scale, borders, backgrounds and rotations smoothly with Anime.js
    animate(e.currentTarget, {
      scale: 1.0,
      borderColor: 'rgba(184, 146, 74, 0.15)',
      backgroundColor: 'rgba(18, 17, 16, 0.8)',
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      duration: 400,
      ease: 'outQuad'
    });
  };

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>, cardTitle: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    
    // Smooth transform animation using Anime.js for fluid response
    animate(card, {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      duration: 150,
      ease: 'outQuad'
    });
  };

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
      <section className="relative min-h-[90vh] flex items-center justify-between overflow-hidden px-4 md:px-8 max-w-7xl mx-auto w-full">
        
        {/* Layered background with Ken Burns zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl border border-[#b8924a]/15 shadow-2xl">
          <div 
            className="hero-zoom-bg absolute inset-0 bg-cover bg-center opacity-30 scale-105"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
          {/* Layered dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070706] via-[#070706]/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,169,106,0.12),transparent_50%)]" />
          
          {/* Animated gradients */}
          <div className="shifting-gradient-1 absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-[#b8924a]/5 blur-[120px] rounded-full" />
          <div className="shifting-gradient-2 absolute -bottom-[25%] -right-[20%] w-[65%] h-[65%] bg-[#d4a96a]/5 blur-[140px] rounded-full" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center py-12 px-6 sm:px-12">
          
          <div className="space-y-6 select-none">
            <span className="hero-subtitle opacity-0 inline-flex items-center gap-2 border border-[#b8924a]/30 bg-[#b8924a]/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.35em] text-[#d4a96a]">
              <Sparkles className="h-3 w-3" />
              Surat Weaving Powerhouse
            </span>
            
            <h1 className="hero-title-main font-serif text-4xl uppercase leading-[1.1] tracking-[0.06em] text-[#faf8f4] sm:text-5xl md:text-6xl lg:text-7xl">
              Premium Indian Textile Manufacturing For Global Markets
            </h1>
            
            <p className="hero-subtitle opacity-0 max-w-2xl text-sm leading-relaxed text-[#f5f0e8]/75 sm:text-base md:text-lg font-light">
              Export-quality fabrics engineered for global buyers, wholesalers, and apparel brands. Designed to meet strict GSM weight standards, color coordinated, and shipped worldwide.
            </p>

            {/* CTAs with Magnetic Animation */}
            <div className="hero-ctas opacity-0 pt-6 flex flex-wrap gap-4 items-center">
              <button
                onClick={openDrawer}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-btn cursor-pointer bg-gradient-to-r from-[#b8924a] to-[#d4a96a] px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#0f0e0c] font-bold shadow-lg transition-shadow duration-300 hover:shadow-[#b8924a]/25"
              >
                Request RFQ
              </button>
              
              <button
                onClick={() => setIsCatalogOpen(true)}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-btn cursor-pointer border border-[#f5f0e8]/20 bg-[#f5f0e8]/5 px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#f5f0e8]/90 font-bold transition hover:border-[#b8924a] hover:text-[#d4a96a]"
              >
                Download Catalog
              </button>

              <a
                href="https://wa.me/919924517111?text=Hi%20Parth,%20interested%20in%20Shiveshwar%20Textiles%20fabrics."
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-btn cursor-pointer border border-[#25d366]/40 bg-[#25d366]/5 px-6 py-4 text-xs uppercase tracking-[0.2em] text-[#25d366] font-bold transition hover:bg-[#25d366] hover:text-white flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Floating Swatch Suspended Layer */}
          <div className="hidden lg:flex flex-col gap-6 justify-center items-end relative h-96">
            {fabricSwatches.map((swatch, idx) => (
              <div 
                key={idx}
                className={`${swatch.class} backdrop-blur-md bg-black/60 border border-[#b8924a]/20 p-4 shadow-2xl flex items-center gap-4 w-64 select-none transform hover:border-[#d4a96a]/50 transition-all duration-300`}
                style={{ transformStyle: 'preserve-3d', perspective: '500px' }}
              >
                <img 
                  src={swatch.image} 
                  alt={swatch.name} 
                  className="w-16 h-16 object-cover border border-[#b8924a]/25" 
                />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#d4a96a] font-mono block">Weave Swatch</span>
                  <h4 className="font-serif text-sm text-white font-medium">{swatch.name}</h4>
                  <span className="text-[10px] text-white/50 font-mono block mt-0.5">{swatch.gsm}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* 2. Interactive Scrolling Spec Ticker */}
      <div className="w-full bg-[#121110] border-y border-[#b8924a]/15 py-3.5 mt-8 overflow-hidden select-none">
        <div className="flex marquee-track gap-12 whitespace-nowrap text-[9px] font-mono uppercase tracking-[0.25em] text-[#d4a96a]/80">
          {Array(6).fill([
            "Cotton 100-150 GSM Weaving",
            "Polyester Filament 50-250 GSM",
            "Direct Mill-To-Buyer Logistics",
            "1,000,000 meters / Month Scale",
            "ISO 9001:2015 Compliant Audits",
            "Zero GST Letter of Undertaking",
            "DHL Express Swatch Courier"
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
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
            <span className="text-[10px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Global Footprint</span>
            <div className="font-serif text-4xl text-[#d4a96a] font-light">
              {regionCount}+
            </div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">25+ Export Regions</p>
          </div>

          {/* Card 3 */}
          <div className="stats-card opacity-0 border border-[#b8924a]/15 bg-[#121110] p-6 space-y-2 relative group hover:border-[#b8924a]/30 transition duration-300">
            <span className="text-[10px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Sampling turnaround</span>
            <div className="font-serif text-4xl text-[#d4a96a] font-light">
              {samplingCount}h
            </div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">48 Hour Sampling</p>
          </div>

          {/* Card 4 */}
          <div className="stats-card opacity-0 border border-[#b8924a]/15 bg-[#121110] p-6 space-y-2 relative group hover:border-[#b8924a]/30 transition duration-300">
            <span className="text-[10px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Mill operations</span>
            <div className="font-serif text-4xl text-[#d4a96a] font-light">
              {yearsCount}+ Years
            </div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">10+ Years Manufacturing</p>
          </div>

        </div>
      </section>

      {/* 4. Products Category Overview (Glassmorphism + 3D details) */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16 border-b border-[#b8924a]/10 pb-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Surat Loom Production</p>
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

      {/* 5. Trust & Export Credibility Section (Step 2) */}
      <section ref={trustStatsRef} className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 border-t border-[#b8924a]/10 overflow-hidden select-none">
        
        {/* Animated background canvas */}
        <CanvasParticles />
        
        {/* Title area */}
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#d4a96a] font-mono">Export Credibility</span>
            <h2 className="font-serif text-3xl uppercase tracking-wide text-[#faf8f4] md:text-5xl">
              Why Global <span className="text-[#d4a96a] font-light italic">Buyers Trust Us</span>
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#f5f0e8]/70 uppercase tracking-widest">
            From our high-speed Surat looms to your Hamburg warehouse, we guarantee absolute quality consistency, ISO compliance, and seamless customs logistics.
          </p>
        </div>

        {/* Core Layout Grid: Media & Map Panel + Trust Cards */}
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          
          {/* Left Panel: Visuals & Interactive Cargo Map */}
          <div className="flex flex-col gap-6">
            
            {/* Visual Crossfade Panel */}
            <div className="relative h-80 border border-[#b8924a]/15 bg-[#121110]/95 overflow-hidden group">
              {trustVisuals.map((visual, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 operational-view-img-${idx} ${
                    activeCardIndex === idx ? 'z-10' : 'z-0 pointer-events-none'
                  }`}
                  style={{ opacity: activeCardIndex === idx ? 1 : 0 }}
                >
                  <img
                    src={visual.image}
                    alt={visual.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/90 via-[#0f0e0c]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#d4a96a]">
                      Operational View 0{idx + 1}
                    </span>
                    <h4 className="font-serif text-lg text-white font-medium">{visual.title}</h4>
                    <p className="text-[11px] text-white/60 font-light mt-0.5">{visual.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stylized Cargo Map */}
            <div className="relative h-64 border border-[#b8924a]/15 bg-[#121110]/80 p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-3 left-4 z-20">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#d4a96a]">
                  Maritime Trade Corridor
                </span>
                <span className="text-[10px] text-white/50 block font-light">Surat Weaving Mill to European Ports</span>
              </div>

              {/* Vector Cargo Map SVG */}
              <div className="w-full h-full flex items-center justify-center relative mt-4">
                <svg
                  viewBox="0 0 600 220"
                  fill="none"
                  className="w-full h-full max-w-[500px]"
                >
                  {/* Abstract Europe Continent Grid */}
                  <path
                    d="M 50,40 Q 60,30 80,40 T 120,30 T 160,50 T 140,90 T 100,100 Z"
                    fill="rgba(184, 146, 74, 0.03)"
                    stroke="rgba(184, 146, 74, 0.1)"
                    strokeWidth="1"
                  />
                  {/* Abstract India Continent Grid */}
                  <path
                    d="M 400,170 Q 420,130 450,120 T 470,160 T 450,200 T 420,180 Z"
                    fill="rgba(184, 146, 74, 0.03)"
                    stroke="rgba(184, 146, 74, 0.1)"
                    strokeWidth="1"
                  />

                  {/* Sea Route Path */}
                  <path
                    id="sea-route"
                    d="M 450,150 C 370,160 250,200 120,80"
                    stroke="#d4a96a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="8, 4"
                    className="opacity-70"
                  />

                  {/* Air Route Path */}
                  <path
                    id="air-route"
                    d="M 450,150 C 350,70 220,50 120,80"
                    stroke="rgba(184, 146, 74, 0.4)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeDasharray="2, 4"
                  />

                  {/* Europe Port (Hamburg) Node */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => setHoveredPort('hamburg')}
                    onMouseLeave={() => setHoveredPort(null)}
                  >
                    <circle cx="120" cy="80" r="4" fill="#d4a96a" className="port-pulse" />
                    <circle cx="120" cy="80" r="4" fill="#b8924a" stroke="#fff" strokeWidth="1" />
                    <text x="130" y="84" fill="#f5f0e8" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">HAMBURG</text>
                  </g>

                  {/* India Port (Mumbai/Surat) Node */}
                  <g
                    className="cursor-pointer group/node"
                    onMouseEnter={() => setHoveredPort('mumbai')}
                    onMouseLeave={() => setHoveredPort(null)}
                  >
                    <circle cx="450" cy="150" r="4" fill="#d4a96a" className="port-pulse" />
                    <circle cx="450" cy="150" r="4" fill="#b8924a" stroke="#fff" strokeWidth="1" />
                    <text x="390" y="154" fill="#f5f0e8" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">SURAT / JNPT</text>
                  </g>
                </svg>

                {/* Interactive Tooltips */}
                {hoveredPort === 'mumbai' && (
                  <div className="absolute bottom-2 right-4 z-30 bg-[#141211]/95 border border-[#b8924a]/30 p-3 text-[10px] space-y-1 font-mono w-52 backdrop-blur-md shadow-xl transition-all duration-300">
                    <span className="text-[#d4a96a] font-bold block">Surat Loom & Mumbai Port</span>
                    <span className="text-white/60 block">Origin: Weave Factory (Surat)</span>
                    <span className="text-white/60 block">FCL Capacity: 40+ Containers/Wk</span>
                    <span className="text-white/60 block">Customs Clearance: Immediate</span>
                  </div>
                )}

                {hoveredPort === 'hamburg' && (
                  <div className="absolute top-2 left-4 z-30 bg-[#141211]/95 border border-[#b8924a]/30 p-3 text-[10px] space-y-1 font-mono w-52 backdrop-blur-md shadow-xl transition-all duration-300">
                    <span className="text-[#d4a96a] font-bold block">Hamburg / Rotterdam</span>
                    <span className="text-white/60 block">Transit Time: 21 Days (Sea)</span>
                    <span className="text-white/60 block">Courier Transit: 3 Days (Air)</span>
                    <span className="text-white/60 block">Inland: Direct DDP to Germany</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Panel: Six Grid Trust Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {trustCards.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={(e) => handleCardEnter(e, idx)}
                  onMouseMove={(e) => handleCardTilt(e, card.title)}
                  onMouseLeave={handleCardLeave}
                  className="trust-card opacity-0 border border-[#b8924a]/15 bg-[#121110]/80 p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                >
                  {/* Subtle hover background glow */}
                  <div className="absolute -inset-px bg-gradient-to-r from-[#b8924a]/0 via-[#b8924a]/5 to-[#b8924a]/0 opacity-0 group-hover:opacity-100 transition duration-500" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="p-2 border border-[#b8924a]/20 bg-[#b8924a]/5 text-[#d4a96a] group-hover:bg-[#b8924a] group-hover:text-[#0f0e0c] transition duration-300">
                        <CardIcon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-mono text-white/30">0{idx + 1}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-lg text-white group-hover:text-[#d4a96a] transition duration-300">
                        {card.title}
                      </h3>
                      <p className="text-[11px] leading-relaxed text-white/60 font-light">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#b8924a]/10 flex items-center justify-between relative z-10">
                    <span className="text-[9px] font-mono text-[#d4a96a]/70 uppercase tracking-widest">
                      {card.metric}
                    </span>
                    <span className="text-[9px] font-mono text-white/30 group-hover:text-[#d4a96a] transition duration-300">
                      ★ Active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Panel: Dynamic Stats counters strip */}
        <div className="relative z-10 grid grid-cols-2 gap-4 lg:grid-cols-4 mt-12 pt-12 border-t border-[#b8924a]/15 bg-[#121110]/40 p-6">
          
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[9px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Monthly Production Capacity</span>
            <div className="font-serif text-3xl text-white font-light sm:text-4xl">
              {capacityVal.toLocaleString()}+ Meters
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Weaving Capacity Scale</p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[9px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Countries Exported</span>
            <div className="font-serif text-3xl text-white font-light sm:text-4xl">
              {countriesVal}+ Countries
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Global Logistics Delivery</p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[9px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Orders Delivered</span>
            <div className="font-serif text-3xl text-white font-light sm:text-4xl">
              {ordersVal}+ FCL Shipments
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Delivered Since 2021</p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[9px] font-mono text-[#d4a96a]/70 uppercase tracking-widest block">Repeat Buyers</span>
            <div className="font-serif text-3xl text-white font-light sm:text-4xl">
              {retentionVal}% Repeat Rate
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Wholesale Partner Loyalty</p>
          </div>

        </div>

        {/* Bottom Compliance & Partner Logos strip */}
        <div className="relative z-10 grid gap-8 md:grid-cols-[1.5fr_2.5fr] mt-12 items-center pt-8 border-t border-[#b8924a]/10">
          
          {/* ISO Certification details */}
          <div className="iso-badge border border-[#b8924a]/20 bg-[#121110]/90 p-5 flex items-center gap-4">
            <div className="p-2 border border-[#b8924a]/30 text-[#d4a96a] bg-[#b8924a]/5">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4a96a] block">Mill Accreditation</span>
              <h4 className="font-serif text-sm text-white font-medium uppercase">ISO 9001:2015 & OEKO-TEX Standard 100</h4>
              <p className="text-[10px] text-white/50 mt-0.5">Compliant yarn procurement and weft audits.</p>
            </div>
          </div>

          {/* Partner Logistics Logos */}
          <div className="flex flex-wrap items-center justify-between gap-6 px-4 py-2 border border-[#b8924a]/10 bg-[#121110]/30 select-none">
            <span className="text-[9px] font-mono uppercase text-[#d4a96a]/50 tracking-wider">Logistics Integration</span>
            <div className="flex items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <span className="hover:text-[#d4a96a] transition duration-300">DHL Express</span>
              <span>•</span>
              <span className="hover:text-[#d4a96a] transition duration-300">Maersk</span>
              <span>•</span>
              <span className="hover:text-[#d4a96a] transition duration-300">MSC Cargo</span>
              <span>•</span>
              <span className="hover:text-[#d4a96a] transition duration-300">Hapag-Lloyd</span>
              <span>•</span>
              <span className="hover:text-[#d4a96a] transition duration-300">FedEx</span>
            </div>
          </div>

        </div>

      </section>

      {/* 6. Production scale & capabilities preview */}
      <section className="bg-[#121110] border-y border-[#b8924a]/10 py-24 select-none">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Surat Infrastructure</p>
            <h2 className="font-serif text-3xl uppercase tracking-wide text-[#faf8f4] md:text-5xl leading-tight">
              Export Scale. <br />
              <span className="text-[#d4a96a] font-light italic">Direct Mill Access.</span>
            </h2>
            <p className="text-sm leading-relaxed text-[#f5f0e8]/75 font-light">
              Operating state-of-the-art power looms and waterjet looms in Surat, India&apos;s textile capital. We offer European manufacturers direct factory prices, removing trading agents, while guaranteeing absolute batch compliance.
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
                <span>Direct logistics routes from Surat mill to Hamburg & Rotterdam ports</span>
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
            <img src={infrastructureImages[1]} alt="Surat factory mill floor" className="h-44 w-full object-cover border border-[#b8924a]/10 grayscale hover:grayscale-0 transition duration-700" />
            <img src={infrastructureImages[2]} alt="Fabric rolls before packaging" className="h-44 w-full object-cover border border-[#b8924a]/10 grayscale hover:grayscale-0 transition duration-700" />
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
                Our export catalog details the complete line of cotton, polyester, and blended fabrics produced in our Surat facility. We provide ISO certificates, weave layouts, finishing specs, and pricing terms.
              </p>
              
              <div className="border border-[#b8924a]/15 bg-[#1c1a17] p-4 rounded-xs flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#d4a96a] font-mono block">File Spec</span>
                  <span className="text-xs text-white truncate block">Shiveshwar_Export_Catalog_2026.pdf</span>
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
