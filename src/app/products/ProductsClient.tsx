'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Filter, RotateCcw, Download, CheckCircle2, Factory, Shield, Truck, Calendar, Compass, Info, X, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { animate, stagger } from 'animejs';

interface FabricProduct {
  name: string;
  slug: string;
  type: 'Cotton' | 'Polyester' | 'Blended' | 'Custom';
  gsmMin: number;
  gsmMax: number;
  width: string[];
  colors: string[];
  moq: number;
  image: string;
  detailImage: string;
  description: string;
  blend: string;
  finish: string;
  application: string;
  export: string;
  leadTime: string;
}

const fabricProducts: FabricProduct[] = [
  {
    name: 'Cotton Fabrics',
    slug: 'cotton-fabrics',
    type: 'Cotton',
    gsmMin: 50,
    gsmMax: 150,
    width: ['90cm', '110cm', '150cm'],
    colors: ['Greige', 'Dyed', 'Printed'],
    moq: 500,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
    detailImage: 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbc9f986125431f4dc5e_IMG_0676.jpg',
    description: 'Manufactured within a 50–150 GSM range, offering breathability, structure, and high uniform weave quality. Ideal for shirting, garments, and workwear.',
    blend: '100% Organic Cotton (Carded / Combed)',
    finish: 'Combed, Mercerized, Soft-Wash Finished',
    application: 'Premium Shirtings, Luxury Uniforms, Apparel',
    export: 'Germany & broader European market (EXW / FOB)',
    leadTime: '14–21 Business Days'
  },
  {
    name: 'Greig Polyster Fabric',
    slug: 'polyester-fabrics',
    type: 'Polyester',
    gsmMin: 50,
    gsmMax: 250,
    width: ['90cm', '110cm', '150cm', 'custom'],
    colors: ['Greige', 'Dyed', 'Printed'],
    moq: 1000,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
    detailImage: 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbd4b0a77eae0b328da9_IMG_0669.jpg',
    description: 'Ranging from 50–250 GSM. Lighter ranges are optimized for linings and technical uses; heavier weights provide excellent strength for uniforms and outerwear.',
    blend: '100% Filament Spun Polyester Weaves',
    finish: 'High-Density Calendered, Water-Repellent Coating',
    application: 'Heavy-Duty Workwear, Outerwear, Industrial Linings',
    export: 'Germany, Poland, and Netherlands (EXW / FOB)',
    leadTime: '14–21 Business Days'
  },
  {
    name: 'Blended Fabrics',
    slug: 'blended-fabrics',
    type: 'Blended',
    gsmMin: 50,
    gsmMax: 250,
    width: ['110cm', '150cm'],
    colors: ['Greige', 'Dyed'],
    moq: 800,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d74a5359b7eb61b0060dce_Untitled%20design%20(33)1775508183.jpg',
    detailImage: 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c710cef29f7ffeadedfe_IMG_0653.jpg',
    description: 'Combining natural breathability with synthetic strength. Wrinkle-resistant, stable weave structures, suitable for industrial wear and uniforms.',
    blend: '65% Polyester / 35% Organic Cotton',
    finish: 'Anti-Pilling, Pre-Shrunk, Shade-Locked',
    application: 'Corporate Weavers, Heavy Linens, Uniform Sets',
    export: 'Global client warehouses (EXW / FOB)',
    leadTime: '21–28 Business Days'
  },
  {
    name: 'Custom Development',
    slug: 'custom-development',
    type: 'Custom',
    gsmMin: 50,
    gsmMax: 250,
    width: ['custom'],
    colors: ['Greige', 'Dyed', 'Printed'],
    moq: 1500,
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69a096da7a6b26e1b628d2fe_Untitled%20design%20(21)%20(1).png',
    detailImage: 'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a483bdd8b87082bab902dd_566BC337-549E-42E5-8AA0-65BAB9B977EF.JPEG',
    description: 'Bespoke fabric specifications developed directly under our weave engineering team. Tailored GSM, special compositions, and specialized finishing controls.',
    blend: 'Bespoke Fiber Composition (Nylon, Stretch blends)',
    finish: 'Peach-Skin Finish, Flame-Retardant Chemical Weft',
    application: 'High-Fashion Labels, Technical Wear, Waterproof Lining',
    export: 'Global air / ocean logistics (EXW / FOB)',
    leadTime: '28–35 Business Days'
  }
];

export default function ProductsPage() {
  const { addItem, openDrawer } = useCart();

  // Filter States
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [gsmMin, setGsmMin] = useState<number>(50);
  const [gsmMax, setGsmMax] = useState<number>(250);
  const [selectedWidths, setSelectedWidths] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxMoq, setMaxMoq] = useState<number>(1500);

  // Redesign state managers
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleWidthChange = (width: string) => {
    setSelectedWidths(prev =>
      prev.includes(width) ? prev.filter(w => w !== width) : [...prev, width]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setGsmMin(50);
    setGsmMax(250);
    setSelectedWidths([]);
    setSelectedColors([]);
    setMaxMoq(1500);
  };

  // Filter Logic
  const filteredProducts = fabricProducts.filter(product => {
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
    if (product.gsmMax < gsmMin || product.gsmMin > gsmMax) return false;
    if (selectedWidths.length > 0 && !product.width.some(w => selectedWidths.includes(w))) return false;
    if (selectedColors.length > 0 && !product.colors.some(c => selectedColors.includes(c))) return false;
    if (product.moq > maxMoq) return false;
    return true;
  });

  // 1. Staggered Entrance Reveal for filtered cards
  useEffect(() => {
    animate('.product-catalog-card', {
      opacity: [0, 1],
      translateY: [35, 0],
      filter: ['blur(6px)', 'blur(0px)'],
      delay: stagger(100),
      duration: 800,
      ease: 'outExpo'
    });
  }, [filteredProducts.length, selectedTypes, selectedWidths, selectedColors, gsmMin, gsmMax, maxMoq]);

  // 2. Card tilt, scale, and crossfade image zoom using Anime.js
  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    animate(e.currentTarget, {
      translateY: -8,
      borderColor: 'rgba(212, 169, 106, 0.45)',
      boxShadow: '0 15px 35px rgba(184, 146, 74, 0.08)',
      duration: 350,
      ease: 'outQuad'
    });

    const mainImg = e.currentTarget.querySelector(`.product-img-main-${slug}`);
    const textureImg = e.currentTarget.querySelector(`.product-img-texture-${slug}`);

    if (mainImg) {
      animate(mainImg, {
        scale: 1.05,
        duration: 500,
        ease: 'outQuad'
      });
    }
    if (textureImg) {
      animate(textureImg, {
        opacity: [0, 1],
        scale: [1.02, 1.05],
        duration: 500,
        ease: 'outQuad'
      });
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    animate(e.currentTarget, {
      translateY: 0,
      borderColor: 'rgba(184, 146, 74, 0.15)',
      boxShadow: 'none',
      duration: 400,
      ease: 'outQuad'
    });

    const mainImg = e.currentTarget.querySelector(`.product-img-main-${slug}`);
    const textureImg = e.currentTarget.querySelector(`.product-img-texture-${slug}`);

    if (mainImg) {
      animate(mainImg, {
        scale: 1.0,
        duration: 400,
        ease: 'outQuad'
      });
    }
    if (textureImg) {
      animate(textureImg, {
        opacity: 0,
        scale: 1.0,
        duration: 400,
        ease: 'outQuad'
      });
    }
  };

  // 3. Expandable technical specs panel using Anime.js transitions
  const toggleSpecifications = (slug: string) => {
    const specEl = document.querySelector(`.specs-panel-${slug}`) as HTMLElement;
    if (!specEl) return;

    if (expandedCard === slug) {
      // Collapse active specifications panel
      animate(specEl, {
        height: 0,
        opacity: 0,
        duration: 400,
        ease: 'outQuad',
        onComplete: () => {
          setExpandedCard(null);
        }
      });
    } else {
      // Collapse previous specifications panel if active
      if (expandedCard) {
        const oldSpecEl = document.querySelector(`.specs-panel-${expandedCard}`) as HTMLElement;
        if (oldSpecEl) {
          animate(oldSpecEl, {
            height: 0,
            opacity: 0,
            duration: 300,
            ease: 'outQuad'
          });
        }
      }

      setExpandedCard(slug);
      specEl.style.height = 'auto';
      const targetHeight = specEl.scrollHeight;
      specEl.style.height = '0px';
      specEl.style.opacity = '0';

      // Expand target specifications panel
      animate(specEl, {
        height: targetHeight,
        opacity: 1,
        duration: 450,
        ease: 'outExpo'
      });
    }
  };

  // 4. Request Swatch adds 1-unit sample book to Cart drawer
  const handleRequestSwatch = (product: FabricProduct) => {
    addItem({
      id: `${product.slug}-swatch`,
      name: `${product.name} (Swatch Book)`,
      gsm: `${product.gsmMin}-${product.gsmMax} GSM`,
      image: product.detailImage,
      fabricType: product.type,
      width: product.width.join(', '),
      moq: '1 Swatch Book'
    }, 1);
  };

  return (
    <main className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8] pt-28 pb-24 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-12 border-b border-[#b8924a]/15 pb-8 flex flex-col justify-between items-start md:flex-row md:items-end gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#d4a96a] font-mono">Global Weaving Infrastructure</span>
            <h1 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl mt-2">
              Export <span className="text-[#d4a96a] font-light italic">Catalog</span>
            </h1>
            <p className="max-w-2xl text-xs text-[#f5f0e8]/60 mt-3 uppercase tracking-widest leading-relaxed">
              Premium raw textile manufacturing. Pricing is configured matching your order metrics, specific Incoterms, and custom woven finishes.
            </p>
          </div>

          <button
            onClick={() => setIsCatalogOpen(true)}
            className="flex items-center gap-2 border border-[#b8924a]/30 bg-[#b8924a]/5 px-6 py-3 text-xs uppercase tracking-widest text-[#d4a96a] hover:bg-[#b8924a] hover:text-[#0f0e0c] font-bold transition duration-300 cursor-pointer shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>Digital PDF Catalog</span>
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          
          {/* FILTER SIDEBAR */}
          <aside className="border border-[#b8924a]/15 bg-[#171513]/90 p-6 space-y-8 h-fit lg:sticky lg:top-28 z-20 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-[#b8924a]/10 pb-4">
              <span className="flex items-center gap-2 font-serif text-lg text-white">
                <Filter className="h-4 w-4 text-[#d4a96a]" />
                Filters
              </span>
              <button 
                onClick={resetFilters}
                className="text-[10px] uppercase tracking-wider text-[#d4a96a] hover:text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* Filter Section: Fabric Type */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#d4a96a] font-medium font-mono">Fabric Type</h4>
              <div className="space-y-2">
                {['Cotton', 'Polyester', 'Blended', 'Custom'].map(type => (
                  <label key={type} className="flex items-center gap-2.5 text-xs text-[#f5f0e8]/80 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="h-3.5 w-3.5 rounded-sm accent-[#d4a96a] border-[#b8924a]/30 bg-transparent cursor-pointer"
                    />
                    <span>{type === 'Polyester' ? 'Greig Polyster Fabric' : `${type} Fabrics`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: GSM Weight Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-[#d4a96a] font-medium font-mono">GSM Weight</h4>
                <span className="text-xs text-white/70 font-mono">{gsmMin}–{gsmMax} GSM</span>
              </div>
              <div className="space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-white/45 w-8 font-mono">MIN:</span>
                  <input 
                    type="range"
                    min="50"
                    max="250"
                    step="10"
                    value={gsmMin}
                    onChange={(e) => setGsmMin(Math.min(Number(e.target.value), gsmMax))}
                    className="w-full accent-[#d4a96a] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-white/45 w-8 font-mono">MAX:</span>
                  <input 
                    type="range"
                    min="50"
                    max="250"
                    step="10"
                    value={gsmMax}
                    onChange={(e) => setGsmMax(Math.max(Number(e.target.value), gsmMin))}
                    className="w-full accent-[#d4a96a] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none"
                  />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>50 GSM</span>
                <span>250 GSM</span>
              </div>
            </div>

            {/* Filter Section: Width */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#d4a96a] font-medium font-mono">Width Options</h4>
              <div className="space-y-2">
                {['90cm', '110cm', '150cm', 'custom'].map(width => (
                  <label key={width} className="flex items-center gap-2.5 text-xs text-[#f5f0e8]/80 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedWidths.includes(width)}
                      onChange={() => handleWidthChange(width)}
                      className="h-3.5 w-3.5 rounded-sm accent-[#d4a96a] border-[#b8924a]/30 bg-transparent cursor-pointer"
                    />
                    <span className="capitalize">{width}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Colors */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#d4a96a] font-medium font-mono">Color State</h4>
              <div className="space-y-2">
                {['Greige', 'Dyed', 'Printed'].map(color => (
                  <label key={color} className="flex items-center gap-2.5 text-xs text-[#f5f0e8]/80 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorChange(color)}
                      className="h-3.5 w-3.5 rounded-sm accent-[#d4a96a] border-[#b8924a]/30 bg-transparent cursor-pointer"
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: MOQ */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-[#d4a96a] font-medium font-mono">Max MOQ</h4>
                <span className="text-xs text-white/70 font-mono">{maxMoq}m</span>
              </div>
              <input 
                type="range"
                min="500"
                max="1500"
                step="100"
                value={maxMoq}
                onChange={(e) => setMaxMoq(Number(e.target.value))}
                className="w-full accent-[#d4a96a] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>500m</span>
                <span>1500m</span>
              </div>
            </div>

          </aside>

          {/* CATALOGUE GRID */}
          <div className="space-y-6">
            
            {/* Filter Result Summary */}
            <div className="text-xs uppercase tracking-wider text-white/50 flex justify-between items-center font-mono">
              <span>Showing {filteredProducts.length} of {fabricProducts.length} export ranges</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="border border-dashed border-[#b8924a]/20 bg-[#171513]/40 p-12 text-center space-y-4">
                <span className="font-serif text-lg text-[#d4a96a] block">No Fabrics Match Selected Filters</span>
                <p className="text-xs text-white/50 max-w-sm mx-auto">
                  Try widening your GSM range, enabling more colors, or resetting your filter configurations.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#b8924a] px-5 py-2.5 text-[10px] uppercase tracking-widest text-[#0f0e0c] font-bold transition hover:bg-[#d4a96a] cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {filteredProducts.map(product => (
                  <div 
                    key={product.slug}
                    onMouseEnter={(e) => handleCardEnter(e, product.slug)}
                    onMouseLeave={(e) => handleCardLeave(e, product.slug)}
                    className="product-catalog-card border border-[#b8924a]/15 bg-[#121110]/95 flex flex-col cursor-pointer relative overflow-hidden transition-shadow duration-300"
                  >
                    
                    {/* Image Panel with texture crossfade */}
                    <div className="h-64 overflow-hidden relative block">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={`product-img-main-${product.slug} absolute inset-0 h-full w-full object-cover`}
                      />
                      <img 
                        src={product.detailImage} 
                        alt={`${product.name} Texture`} 
                        className={`product-img-texture-${product.slug} absolute inset-0 h-full w-full object-cover opacity-0`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/90 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating tag */}
                      <span className="absolute top-4 right-4 z-10 border border-[#b8924a]/30 px-3 py-1 text-[9px] uppercase tracking-wider text-[#d4a96a] bg-black/75 backdrop-blur-md">
                        {product.type} Range
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-6 relative z-10">
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif text-2xl text-white group-hover:text-[#d4a96a] transition">
                            {product.name}
                          </h3>
                        </div>
                        <p className="text-xs leading-relaxed text-white/60 font-light">{product.description}</p>
                      </div>

                      {/* Standard parameters display */}
                      <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-wider border-y border-[#b8924a]/10 py-4 font-mono text-white/70">
                        <div>
                          <span className="text-[#d4a96a]/70 text-[8px] block font-sans">GSM Range</span>
                          {product.gsmMin}–{product.gsmMax} GSM
                        </div>
                        <div>
                          <span className="text-[#d4a96a]/70 text-[8px] block font-sans">MOQ Order</span>
                          {product.moq} Meters
                        </div>
                        <div>
                          <span className="text-[#d4a96a]/70 text-[8px] block font-sans">Width Spec</span>
                          {product.width.join(' / ')}
                        </div>
                        <div>
                          <span className="text-[#d4a96a]/70 text-[8px] block font-sans">Lead Time</span>
                          {product.leadTime}
                        </div>
                      </div>

                      {/* Expandable Specifications Area */}
                      <div 
                        className={`specs-panel-${product.slug} overflow-hidden opacity-0 h-0 space-y-4`}
                      >
                        <div className="p-4 border border-[#b8924a]/10 bg-black/40 text-[11px] font-mono space-y-2.5 text-white/80">
                          <div className="flex justify-between gap-4 border-b border-[#b8924a]/5 pb-1.5">
                            <span className="text-white/40 uppercase tracking-widest">Blend Ratio</span>
                            <span className="text-right">{product.blend}</span>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-[#b8924a]/5 pb-1.5">
                            <span className="text-white/40 uppercase tracking-widest">Woven Finish</span>
                            <span className="text-right">{product.finish}</span>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-[#b8924a]/5 pb-1.5">
                            <span className="text-white/40 uppercase tracking-widest">Primary Uses</span>
                            <span className="text-right">{product.application}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-white/40 uppercase tracking-widest">EU Shipping</span>
                            <span className="text-right">{product.export}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Specification Trigger */}
                      <button
                        onClick={() => toggleSpecifications(product.slug)}
                        className="w-full text-center border border-[#b8924a]/25 hover:border-[#b8924a]/50 py-2 text-[9px] uppercase tracking-widest text-[#d4a96a] transition font-bold font-mono cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Zap className="h-3 w-3" />
                        <span>{expandedCard === product.slug ? 'Close Specifications' : 'Technical Specifications'}</span>
                      </button>

                      {/* Card Action CTAs */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button 
                          onClick={() => handleRequestSwatch(product)}
                          className="border border-[#b8924a]/40 bg-transparent py-3 text-[10px] uppercase tracking-widest text-[#d4a96a] hover:bg-[#b8924a]/10 transition font-bold cursor-pointer"
                        >
                          Request Swatch
                        </button>
                        
                        <button 
                          onClick={() => {
                            addItem({
                              id: product.slug,
                              name: product.name,
                              gsm: `${product.gsmMin}-${product.gsmMax} GSM`,
                              image: product.image,
                              fabricType: product.type,
                              width: product.width.join(', '),
                              moq: `${product.moq}m`
                            }, product.moq);
                          }}
                          className="bg-[#b8924a] py-3 text-[10px] uppercase tracking-widest text-[#0f0e0c] font-bold hover:bg-[#d4a96a] transition cursor-pointer"
                        >
                          Add to RFQ
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* INTERACTIVE CATALOGUE DOWNLOAD OVERLAY */}
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
