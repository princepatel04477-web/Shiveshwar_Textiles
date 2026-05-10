'use client';

import { FormEvent, useEffect, useState, useRef } from 'react';

const logo =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png';
const heroImage =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69d08aab1e14cd492e736468_ChatGPT%20Image%20Feb%2024%2C%202026%2C%2006_40_44%20PM.png';

const team = [
  {
    name: 'Prakashbhai M. Mangukiya',
    role: 'Founder',
    quote:
      'Provides strategic direction and oversees sourcing and overall operational discipline. Ensures production standards, quality control, and long-term stability.',
    image:
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0b33bb678b3610fc96196_8EEC1158-D63D-45C3-8912-C6278FF0F6B6.JPEG',
  },
  {
    name: 'Parth P. Mangukiya',
    role: 'Director',
    quote:
      'Leads business development, client coordination, and growth planning. Focuses on building reliable partnerships and expanding market presence.',
    image:
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0b267548d236482a03b3a_2483CA4D-93B6-46E6-A5F8-00A5BB52C568.JPG',
  },
  {
    name: 'Fenil M. Mangukiya',
    role: 'Production Manager',
    quote:
      'Supervises daily manufacturing operations and workflow execution. Maintains strict quality checks, timely dispatch control, and production efficiency.',
    image:
      'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0b47d2f8adb3525789c71_5e66cb27-8dd5-499e-a66f-fc78eb84b372.jpg',
  },
];

const products = [
  {
    name: 'Cotton Fabrics',
    detail: '100-150 GSM',
    href: 'https://shiveshwartextiles.com/products/cotton-fabrics',
    image:
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d41725e55a6fa6b34401c0_IMG_4578.JPG',
  },
  {
    name: 'Polyester Fabrics',
    detail: '50-250 GSM',
    href: 'https://shiveshwartextiles.com/products/polyster-fabrics',
    image:
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d4174501addf7b2249c368_IMG_4580.JPG',
  },
  {
    name: 'Blended Fabrics',
    detail: 'Custom GSM',
    href: 'https://shiveshwartextiles.com/products/blended-fabrics',
    image:
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69d74a5359b7eb61b0060dce_Untitled%20design%20(33)1775508183.jpg',
  },
  {
    name: 'Custom Development',
    detail: 'Bespoke Specs',
    href: 'https://shiveshwartextiles.com/products/custom-development-of-fabric',
    image:
      'https://cdn.prod.website-files.com/699c95632d9783a33a533c4d/69a096da7a6b26e1b628d2fe_Untitled%20design%20(21)%20(1).png',
  },
];

const infrastructureImages = [
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a481180d61ac1d5340aa1e_PHOTO-2026-02-10-15-49-02.jpg',
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c710cef29f7ffeadedfe_IMG_0653.jpg',
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a483bdd8b87082bab902dd_566BC337-549E-42E5-8AA0-65BAB9B977EF.JPEG',
];

const qualityPoints = [
  {
    title: 'GSM Accuracy',
    body:
      'Each production batch is monitored to maintain precise GSM control within defined tolerances to ensure structural consistency.',
  },
  {
    title: 'Weave and Alignment Inspection',
    body:
      'Fabric is checked for uniform weave structure and alignment to prevent irregularities across bulk production.',
  },
  {
    title: 'Pre-Dispatch Verification',
    body:
      'Before shipment, rolls are verified for measurement accuracy and batch consistency to maintain delivery reliability.',
  },
];

const brandLoop = [
  'Shiveshwar Textiles',
  'Cotton Fabrics',
  'Polyester Fabrics',
  'Blended Fabrics',
  'Custom Development',
  '1M Meters / Month',
  'Surat, India',
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const typedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Simple typewriter effect cycling through phrases
    let mounted = true;
    const el = typedRef.current;
    if (!el) return;
    const phrases = ['Precision manufacturing,', 'Dependable supply,', 'Fabric built for scale.'];
    let phraseIndex = 0;
    let charIndex = 0;
    let timeoutId: number | null = null;

    const type = () => {
      if (!mounted) return;
      const phrase = phrases[phraseIndex];
      if (charIndex < phrase.length) {
        el.textContent = phrase.slice(0, charIndex + 1);
        charIndex += 1;
        timeoutId = window.setTimeout(type, 50);
      } else {
        timeoutId = window.setTimeout(erase, 1100);
      }
    };

    const erase = () => {
      if (!mounted) return;
      if (charIndex > 0) {
        charIndex -= 1;
        el.textContent = phrases[phraseIndex].slice(0, charIndex);
        timeoutId = window.setTimeout(erase, 30);
      } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeoutId = window.setTimeout(type, 300);
      }
    };

    type();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="bg-[#0f0e0c] text-[#f5f0e8]">
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? 'border-[#b8924a]/18 bg-[#0f0e0c]/88 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl'
            : 'border-[#b8924a]/10 bg-[linear-gradient(180deg,rgba(15,14,12,0.72),rgba(15,14,12,0.18),transparent)]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
          <a href="#hero" className="flex min-w-0 items-center gap-3">
            <img src={logo} alt="Shiveshwar Textiles logo" className="h-12 w-12 object-contain" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#f5f0e8]/60">Surat, India</div>
              <div className="font-serif text-lg uppercase tracking-[0.18em] text-[#d4a96a] md:text-xl">
                Shiveshwar Textiles
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {['About', 'Products', 'Infrastructure', 'Quality', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.28em] text-[#f5f0e8]/72 transition hover:text-[#d4a96a]"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="border border-[#b8924a]/45 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#d4a96a] transition hover:bg-[#b8924a] hover:text-[#0f0e0c]"
          >
            Contact Us
          </a>
        </div>
      </nav>

      <section id="hero" className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url("${heroImage}")` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,240,232,0.18),transparent_32%),linear-gradient(135deg,rgba(8,8,8,0.1),rgba(8,8,8,0.9))]" />
        <div className="absolute inset-y-0 left-[15%] w-px bg-gradient-to-b from-transparent via-[#d4a96a]/30 to-transparent" />
        <div className="absolute inset-y-0 right-[18%] w-px bg-gradient-to-b from-transparent via-[#d4a96a]/20 to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-4 pb-20 pt-32 md:px-8 md:pt-36">
          <div className="max-w-4xl reveal-fade">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#d4a96a] reveal-delay-1">Since 2021 · Surat, India</p>
            <h1 className="font-serif text-5xl uppercase leading-none tracking-[0.12em] text-[#faf8f4] md:text-7xl reveal-delay-2">
              Shiveshwar
              <span className="mt-2 block text-[#d4a96a]">Textiles</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#f5f0e8]/78 md:text-lg reveal-delay-3">
              Precision manufacturing, dependable supply, and fabric built for scale. Up to 1 million meters monthly.
            </p>
            <div className="mt-4 text-lg text-[#f5f0e8]/90 font-mono reveal-fade reveal-delay-4" aria-hidden>
              <span ref={typedRef} suppressHydrationWarning />
              <span className="ml-2 inline-block align-middle" style={{width:4, height:20, background:'#d4a96a', verticalAlign:'middle', animation:'blink 1s steps(2,end) infinite'}} />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4 reveal-delay-4">
              <a
                href="#products"
                className="bg-[#b8924a] px-6 py-3 text-xs uppercase tracking-[0.28em] text-[#0f0e0c] transition hover:bg-[#d4a96a]"
              >
                Explore Products
              </a>
              <a
                href="https://www.linkedin.com/company/shiveshwar-textiles/"
                target="_blank"
                rel="noreferrer"
                className="border border-[#f5f0e8]/20 px-4 py-3 text-xs uppercase tracking-[0.28em] text-[#f5f0e8]/80 transition hover:border-[#b8924a] hover:text-[#d4a96a]"
              >
                LinkedIn
              </a>
              <a
                href="https://wa.link/xv04fy"
                target="_blank"
                rel="noreferrer"
                className="border border-[#f5f0e8]/20 px-4 py-3 text-xs uppercase tracking-[0.28em] text-[#f5f0e8]/80 transition hover:border-[#b8924a] hover:text-[#d4a96a]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#b8924a]/15 bg-[#151311] py-4">
        <div className="overflow-hidden">
          <div className="marquee-track flex min-w-max items-center gap-10 px-4 text-[11px] uppercase tracking-[0.3em] text-[#d4a96a]/90 md:px-8">
            {[0, 1].map((loop) => (
              <div key={loop} className="flex items-center gap-10">
                {brandLoop.map((item) => (
                  <div key={`${loop}-${item}`} className="flex items-center gap-10">
                    <span>{item}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b8924a]" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#faf8f4] px-4 py-20 text-[#1a1714] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8924a] reveal-fade">Our Story</p>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="reveal-fade reveal-delay-1">
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                Founded on <span className="text-[#b8924a]">precision</span>, built for reliability.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#1a1714]/72">
                Founded with a clear vision to deliver dependable fabric solutions, Shiveshwar Textiles is a growing
                textile manufacturing unit focused on quality, precision, and long-term business relationships.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#1a1714]/72">
                We operate with a strong commitment to disciplined production and consistent standards. Every order is
                handled with direct involvement, ensuring accurate GSM control, clean finishing, and reliable delivery
                timelines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal-fade reveal-delay-2">
              <img
                src="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0c7119263b15e0d55044e_IMG_0661.jpg"
                alt="Factory"
                className="col-span-2 h-64 w-full object-cover grayscale transition duration-700 hover:grayscale-0 hover:scale-[1.01] md:h-80"
              />
              <img
                src="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbc9f986125431f4dc5e_IMG_0676.jpg"
                alt="Fabric"
                className="h-44 w-full object-cover grayscale transition duration-700 hover:grayscale-0 hover:scale-[1.01] md:h-52"
              />
              <img
                src="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a0bbd4b0a77eae0b328da9_IMG_0669.jpg"
                alt="Production"
                className="h-44 w-full object-cover grayscale transition duration-700 hover:grayscale-0 hover:scale-[1.01] md:h-52"
              />
            </div>
          </div>

          <div className="mt-16">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#b8924a] reveal-fade">Core Management</p>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {team.map((member, index) => (
                <article
                  key={member.name}
                  className="group reveal-fade"
                  style={{ animationDelay: `${0.14 * (index + 1)}s` }}
                >
                  <div className="overflow-hidden bg-[#1a1714]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-[28rem] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="bg-white px-1 py-5">
                    <h3 className="font-serif text-2xl text-[#1a1714]">{member.name}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#b8924a]">{member.role}</p>
                    <p className="mt-4 text-sm leading-7 text-[#1a1714]/72">{member.quote}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="reveal-fade">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#d4a96a]">What We Make</p>
              <h2 className="font-serif text-4xl text-[#faf8f4] md:text-5xl">
                Our <span className="text-[#d4a96a]">Product</span> Range
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#f5f0e8]/68 reveal-fade reveal-delay-1">
              Cotton, polyester, blended, and custom development for reliable B2B supply with consistent production
              support.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="group reveal-fade relative overflow-hidden border border-[#b8924a]/18 bg-[#171513]"
                style={{ animationDelay: `${0.14 * (index + 1)}s` }}
              >
                <img src={product.image} alt={product.name} className="h-80 w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] via-[#0f0e0c]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-[#d4a96a]">0{index + 1}</div>
                  <div className="mt-2 font-serif text-2xl text-white">{product.name}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/72">{product.detail}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="infrastructure" className="bg-[#121110] px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal-fade">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Capabilities</p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Built for <span className="text-[#d4a96a]">Scale</span>. Managed with Precision.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f5f0e8]/72">
              Integrated power loom and waterjet production with disciplined manufacturing operations and quality
              control processes at every stage.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['1M+', 'Meters / Month'],
                ['2021', 'Established'],
                ['3+', 'Fabric Types'],
              ].map(([value, label]) => (
                <div key={label} className="border border-[#b8924a]/16 bg-[#171513] p-5">
                  <div className="font-serif text-3xl text-[#d4a96a]">{value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.28em] text-[#f5f0e8]/60">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal-fade reveal-delay-1">
            <img src={infrastructureImages[0]} alt="Infrastructure" className="col-span-2 h-64 w-full object-cover transition duration-700 hover:scale-[1.01] md:h-80" />
            <img src={infrastructureImages[1]} alt="Factory" className="h-44 w-full object-cover transition duration-700 hover:scale-[1.01] md:h-52" />
            <img src={infrastructureImages[2]} alt="Operations" className="h-44 w-full object-cover transition duration-700 hover:scale-[1.01] md:h-52" />
          </div>
        </div>
      </section>

      <section id="quality" className="bg-[#faf8f4] px-4 py-20 text-[#1a1714] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div className="reveal-fade">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#b8924a]">Standards</p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Consistency in <span className="text-[#b8924a]">Every Meter</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#1a1714]/72">
              Structured inspection processes ensure accurate GSM, uniform weave, and reliable batch quality across
              all production runs.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#1a1714]/72">
              At Shiveshwar Textiles, quality is maintained through disciplined monitoring at every stage of
              production. Our structured inspection checkpoints ensure fabric consistency, accurate measurements, and
              controlled finishing before dispatch.
            </p>

            <div className="mt-10 grid gap-4">
              {qualityPoints.map((point) => (
                <div key={point.title} className="border border-[#b8924a]/18 bg-white p-5">
                  <div className="text-xs uppercase tracking-[0.32em] text-[#b8924a]">{point.title}</div>
                  <div className="mt-3 text-sm leading-7 text-[#1a1714]/70">{point.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 reveal-fade reveal-delay-1">
            <img
              src="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a483bdd8b87082bab902dd_566BC337-549E-42E5-8AA0-65BAB9B977EF.JPEG"
              alt="Quality check"
              className="h-72 w-full object-cover transition duration-700 hover:scale-[1.01] md:h-80"
            />
            <img
              src="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a481bccd58eb2a0cd63f93_FFB41501-33AD-4C86-83F6-8CC206047FC9.JPEG"
              alt="Fabric inspection"
              className="h-72 w-full object-cover transition duration-700 hover:scale-[1.01] md:h-80"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Get in Touch</p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Let&apos;s discuss your <span className="text-[#d4a96a]">requirements</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f5f0e8]/72">
              Share your fabric specifications, quantity, and timeline. Our team will respond promptly.
            </p>

            <div className="mt-10 space-y-5 text-sm leading-7 text-[#f5f0e8]/76">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Location</div>
                <a href="https://maps.app.goo.gl/T35zEz5dXCPAy9oy7" target="_blank" rel="noreferrer" className="hover:text-[#d4a96a]">
                  Surat, Gujarat, India
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Email</div>
                <a href="mailto:parthmangukiya@shiveshwartextiles.com" className="hover:text-[#d4a96a]">
                  parthmangukiya@shiveshwartextiles.com
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Office Hours</div>
                <div>Monday - Friday · 11 AM - 8 PM IST</div>
              </div>
            </div>
          </div>

          <div className="border border-[#b8924a]/18 bg-[#151311] p-6 md:p-8">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="font-serif text-3xl text-[#d4a96a]">Thank you.</div>
                <p className="mt-4 text-sm leading-7 text-[#f5f0e8]/72">
                  Your message has been received. We&apos;ll get back to you promptly.
                </p>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Full Name</span>
                  <input
                    required
                    className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#d4a96a]"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Email</span>
                  <input
                    type="email"
                    required
                    className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#d4a96a]"
                    placeholder="your@email.com"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Subject</span>
                  <select className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#d4a96a]">
                    <option className="text-black">General Inquiry</option>
                    <option className="text-black">Business Inquiry</option>
                    <option className="text-black">Complaint</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a]">Your Message</span>
                  <textarea
                    required
                    rows={5}
                    className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#d4a96a]"
                    placeholder="Share your fabric specifications, quantity, and timeline..."
                  />
                </label>
                <label className="flex items-center gap-3 text-sm text-[#f5f0e8]/72">
                  <input type="checkbox" required className="h-4 w-4 accent-[#d4a96a]" />
                  I confirm I am a human
                </label>
                <button
                  type="submit"
                  className="mt-2 bg-[#b8924a] px-6 py-3 text-xs uppercase tracking-[0.28em] text-[#0f0e0c] transition hover:bg-[#d4a96a]"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Upper footer strip removed per request (single footer kept) */}

      <footer className="border-t border-[#b8924a]/15 bg-[#0b0a09] px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <a href="#hero" className="flex items-center gap-4">
            <img src={logo} alt="Shiveshwar Textiles logo" className="h-16 w-16 object-contain" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#f5f0e8]/68">Built for Scale</div>
              <div className="font-serif text-2xl uppercase tracking-[0.16em] text-[#f0c978]">Shiveshwar Textiles</div>
            </div>
          </a>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.28em] text-[#f5f0e8]/66">
            <a href="#about" className="hover:text-[#d4a96a]">About</a>
            <a href="#products" className="hover:text-[#d4a96a]">Products</a>
            <a href="#infrastructure" className="hover:text-[#d4a96a]">Infrastructure</a>
            <a href="#quality" className="hover:text-[#d4a96a]">Quality</a>
            <a href="#contact" className="hover:text-[#d4a96a]">Contact</a>
          </div>

          <div className="text-sm leading-7 text-[#f5f0e8]/54">
            <div>© 2024 Shiveshwar Textiles · Surat, India</div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#d4a96a]/72">
              Cotton · Polyester · Blended · Custom Development
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
