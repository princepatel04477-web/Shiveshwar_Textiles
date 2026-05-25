'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Compass, Info, Mail, Phone, Calendar } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface SpecInfo {
  label: string;
  value: string;
}

interface ProductDetails {
  name: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  specs: SpecInfo[];
}

const productsData: Record<string, ProductDetails> = {
  'cotton-fabrics': {
    name: 'Cotton Fabrics',
    tagline: '100% Organic & Carded Cotton options from Surat',
    description: 'Our cotton fabrics are manufactured within a 100–150 GSM range, offering a balanced combination of breathability, durability, and structure. This GSM range is ideal for shirting, uniforms, light workwear, and general garment applications where comfort and consistent performance are essential. We maintain strict GSM control and finishing standards to ensure uniform texture, clean weave structure, and dependable batch consistency for bulk supply.',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
    gallery: [
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbc9f986125431f4dc5e_IMG_0676.jpg',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a483bdd8b87082bab902dd_566BC337-549E-42E5-8AA0-65BAB9B977EF.JPEG'
    ],
    specs: [
      { label: 'Composition', value: '100% Carded / Combed Cotton' },
      { label: 'GSM Range', value: '100–150 GSM (Precise control)' },
      { label: 'Width Options', value: '90cm / 110cm / 150cm' },
      { label: 'Weave Type', value: 'Plain Weave / Twill Weave' },
      { label: 'Available Colors', value: 'Greige (Raw), Piece-Dyed, Printed' },
      { label: 'Minimum Order Quantity', value: '500 meters per color/spec' },
      { label: 'Lead Time', value: '14–21 business days (FOB Surat)' },
      { label: 'Shipping Terms', value: 'FOB Surat / CIF Hamburg / DDP Germany' }
    ]
  },
  'polyester-fabrics': {
    name: 'Polyester Fabrics',
    tagline: 'High-density filament & spun polyester built for longevity',
    description: 'We produce polyester fabrics ranging from 50–250 GSM, covering lightweight lining materials to heavier structured applications. The lighter GSM range is suitable for lining and technical uses, while mid to higher GSM fabrics offer improved strength and form stability for uniforms, outerwear, and industrial requirements. Our production process ensures smooth surface finish, consistent density, and controlled quality parameters for reliable large-volume supply.',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
    gallery: [
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbd4b0a77eae0b328da9_IMG_0669.jpg',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a481bccd58eb2a0cd63f93_FFB41501-33AD-4C86-83F6-8CC206047FC9.JPEG'
    ],
    specs: [
      { label: 'Composition', value: '100% Filament / Spun Polyester' },
      { label: 'GSM Range', value: '50–250 GSM (High-durability control)' },
      { label: 'Width Options', value: '90cm / 110cm / 150cm / Custom' },
      { label: 'Weave Type', value: 'Plain / Satin / Ripstop / Drill' },
      { label: 'Available Colors', value: 'Greige, Dyed, Sublimation-Printed' },
      { label: 'Minimum Order Quantity', value: '1,000 meters per color/spec' },
      { label: 'Lead Time', value: '14–21 business days (FOB Surat)' },
      { label: 'Shipping Terms', value: 'FOB Surat / CIF Hamburg / DDP Germany' }
    ]
  },
  'blended-fabrics': {
    name: 'Blended Fabrics',
    tagline: 'Balanced performance combining natural and synthetic fibers',
    description: 'Our blended fabrics combine the comfort of natural fibers with the strength and durability of synthetic materials. Designed to deliver balanced performance, these fabrics offer improved wrinkle resistance, structural stability, and long-term wearability. Available in multiple compositions and GSM options, blended fabrics are suitable for uniforms, workwear, and structured garments requiring both comfort and durability.',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d74a5359b7eb61b0060dce_Untitled%20design%20(33)1775508183.jpg',
    gallery: [
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d74a5359b7eb61b0060dce_Untitled%20design%20(33)1775508183.jpg',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbc9f986125431f4dc5e_IMG_0676.jpg',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c710cef29f7ffeadedfe_IMG_0653.jpg'
    ],
    specs: [
      { label: 'Composition', value: 'Poly-Cotton (PC 65/35, 50/50), Cotton-Poly Blends' },
      { label: 'GSM Range', value: '100–220 GSM (High stability control)' },
      { label: 'Width Options', value: '110cm / 150cm' },
      { label: 'Weave Type', value: 'Plain / Twill / Matty / Oxford' },
      { label: 'Available Colors', value: 'Greige, Dyed' },
      { label: 'Minimum Order Quantity', value: '800 meters per color/spec' },
      { label: 'Lead Time', value: '21–28 business days (FOB Surat)' },
      { label: 'Shipping Terms', value: 'FOB Surat / CIF Hamburg / DDP Germany' }
    ]
  },
  'custom-development': {
    name: 'Custom Development',
    tagline: 'Bespoke fabric engineering matching proprietary garment designs',
    description: 'We offer custom fabric development tailored to specific client requirements, including GSM adjustments, composition variations, and finishing preferences. Our development process focuses on feasibility evaluation, sample creation, and controlled production planning to meet precise technical specifications. By working closely with clients, we ensure that every custom fabric solution aligns with performance expectations and bulk supply capability.',
    image: 'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69a096da7a6b26e1b628d2fe_Untitled%20design%20(21)%20(1).png',
    gallery: [
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69a096da7a6b26e1b628d2fe_Untitled%20design%20(21)%20(1).png',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbc9f986125431f4dc5e_IMG_0676.jpg',
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c710cef29f7ffeadedfe_IMG_0653.jpg'
    ],
    specs: [
      { label: 'Composition', value: 'Bespoke fibers (Cotton, Polyester, Nylon, Stretch blends)' },
      { label: 'GSM Range', value: '50–250 GSM (Tailored specifications)' },
      { label: 'Width Options', value: 'Bespoke width controls (up to 180cm)' },
      { label: 'Weave Type', value: 'Dobby, Jaquard, Custom weave structures' },
      { label: 'Available Colors', value: 'Bespoke dye lots, specific pigments, patterns' },
      { label: 'Minimum Order Quantity', value: '1,500 meters' },
      { label: 'Lead Time', value: '28–35 business days (FOB Surat)' },
      { label: 'Shipping Terms', value: 'FOB Surat / CIF Hamburg / DDP Germany' }
    ]
  }
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = productsData[slug];
  
  const { addItem, openDrawer } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product?.image || '');

  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8] pt-32 pb-24 text-center">
        <div className="mx-auto max-w-xl space-y-6 px-4">
          <h1 className="font-serif text-3xl text-[#d4a96a]">Fabric Category Not Found</h1>
          <p className="text-sm text-white/60">
            The fabric slug you are requesting does not exist in our catalog.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#b8924a] px-6 py-3 text-xs uppercase tracking-widest text-[#0f0e0c] font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalogue
          </Link>
        </div>
      </main>
    );
  }

  // Generate links for other fabrics in related products
  const relatedProducts = Object.entries(productsData)
    .filter(([key]) => key !== slug)
    .map(([key, val]) => ({
      slug: key,
      name: val.name,
      tagline: val.tagline,
      image: val.image,
    }));

  return (
    <main className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Back Link */}
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4a96a] hover:text-white transition mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Catalogue
        </Link>

        {/* Product Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Gallery View */}
          <div className="space-y-4">
            <div className="border border-[#b8924a]/15 bg-[#171513] overflow-hidden aspect-w-4 aspect-h-3 h-96 relative">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="h-full w-full object-cover transition duration-500"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`border overflow-hidden h-24 bg-[#171513] transition cursor-pointer ${
                    activeImage === imgUrl ? 'border-[#d4a96a]' : 'border-[#b8924a]/15 hover:border-[#b8924a]/40'
                  }`}
                  data-cursor="Open"
                >
                  <img src={imgUrl} alt={`Gallery index ${idx}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info & Specs Table */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.35em] text-[#d4a96a] font-mono">B2B Specifications</span>
              <h1 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl">
                {product.name}
              </h1>
              <p className="text-sm italic text-[#d4a96a]/90 font-serif">{product.tagline}</p>
              <p className="text-xs leading-relaxed text-white/70 pt-2 font-light">{product.description}</p>
            </div>

            {/* Specifications Table */}
            <div className="border border-[#b8924a]/15 bg-[#171513]">
              <div className="px-6 py-4 border-b border-[#b8924a]/15 bg-[#1f1d19]">
                <h3 className="font-serif text-sm uppercase tracking-widest text-[#d4a96a]">Technical Specs</h3>
              </div>
              <div className="divide-y divide-[#b8924a]/10 text-xs font-mono">
                {product.specs.map((spec, index) => (
                  <div key={index} className="grid grid-cols-[200px_1fr] px-6 py-3 hover:bg-[#1a1816] transition">
                    <span className="text-white/40 uppercase tracking-wider">{spec.label}</span>
                    <span className="text-white/80">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <button
                onClick={() => {
                  const gsmSpec = product.specs.find(s => s.label.toLowerCase().includes('gsm'))?.value || 'Custom GSM';
                  const moqVal = product.specs.find(s => s.label.toLowerCase().includes('minimum order'))?.value || '1000';
                  const numericMoq = parseInt(moqVal.replace(/[^0-9]/g, '')) || 1000;
                  
                  addItem({
                    id: slug,
                    name: product.name,
                    gsm: gsmSpec,
                    image: product.image
                  }, numericMoq);
                  openDrawer();
                }}
                className="text-center bg-[#b8924a] py-3.5 text-xs uppercase tracking-widest text-[#0f0e0c] font-bold hover:bg-[#d4a96a] transition cursor-pointer"
                data-cursor="Add"
              >
                Add to RFQ List
              </button>
              
              <Link 
                href={`/contact?subject=Sample Request&product=${product.name}`}
                className="text-center border border-[#b8924a]/40 bg-transparent py-3.5 text-xs uppercase tracking-widest text-[#d4a96a] hover:bg-[#b8924a]/10 transition font-bold flex items-center justify-center"
                data-cursor="Explore"
              >
                Order Fabric Samples
              </Link>
            </div>

            {/* B2B Trust Points */}
            <div className="grid grid-cols-3 gap-4 text-center pt-2">
              <div className="border border-[#b8924a]/10 bg-[#121110]/50 p-4">
                <Compass className="h-5 w-5 text-[#d4a96a] mx-auto" />
                <span className="text-[9px] uppercase tracking-wider text-white/50 block mt-2">Custom GSM</span>
              </div>
              <div className="border border-[#b8924a]/10 bg-[#121110]/50 p-4">
                <Calendar className="h-5 w-5 text-[#d4a96a] mx-auto" />
                <span className="text-[9px] uppercase tracking-wider text-white/50 block mt-2">14-21d Lead</span>
              </div>
              <div className="border border-[#b8924a]/10 bg-[#121110]/50 p-4">
                <Info className="h-5 w-5 text-[#d4a96a] mx-auto" />
                <span className="text-[9px] uppercase tracking-wider text-white/50 block mt-2">EU Customs Support</span>
              </div>
            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS STRIP */}
        <section className="mt-24 pt-16 border-t border-[#b8924a]/15">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Catalog Overview</span>
            <h3 className="font-serif text-2xl uppercase tracking-wide text-white mt-1">Other Fabric Ranges</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {relatedProducts.map((p) => (
              <div key={p.slug} className="border border-[#b8924a]/10 bg-[#171513] group hover:border-[#b8924a]/30 transition">
                <Link href={`/products/${p.slug}`} className="h-48 overflow-hidden block">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-103" />
                </Link>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-lg text-white">
                    <Link href={`/products/${p.slug}`} className="hover:text-[#d4a96a] transition">{p.name}</Link>
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-white/50">{p.tagline}</p>
                  <Link 
                    href={`/products/${p.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#d4a96a] pt-2"
                  >
                    <span>View Specifications</span>
                    <ArrowLeft className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
