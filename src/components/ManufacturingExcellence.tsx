'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  maxOpacity: number;
}

export default function ManufacturingExcellence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Scroll/Reveal trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth mouse coordinates interpolation
  useEffect(() => {
    let animId: number;
    const updateSmooth = () => {
      setSmoothMouse(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.05,
        y: prev.y + (mousePos.y - prev.y) * 0.05
      }));
      animId = requestAnimationFrame(updateSmooth);
    };
    updateSmooth();
    return () => cancelAnimationFrame(animId);
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Canvas floating gold dust particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 750;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Populate particles
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      const maxOpacity = Math.random() * 0.4 + 0.15;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.0 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * maxOpacity,
        fadeSpeed: Math.random() * 0.006 + 0.002,
        maxOpacity
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // Render with luxury golden color
        ctx.fillStyle = `rgba(212, 169, 106, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update positions (drift slowly upwards and sway)
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(Date.now() * 0.0008 + p.size) * 0.1;

        // Fade in/out logic
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.opacity = 0;
        }

        if (p.opacity < p.maxOpacity) {
          p.opacity += p.fadeSpeed;
        }
      });

      animId = requestAnimationFrame(drawParticles);
    };
    drawParticles();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[700px] md:min-h-[800px] bg-[#070706] overflow-hidden flex flex-col justify-center border-t border-[#b8924a]/10"
    >
      {/* Background Image Container with Mouse Parallax & Cinematic Subtle Zoom */}
      <div 
        className="absolute inset-0 z-0 select-none pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `scale(1.15) translate(${smoothMouse.x * -40}px, ${smoothMouse.y * -35}px)`,
          willChange: 'transform'
        }}
      >
        <img
          src="https://cdn.prod.website-files.com/699c95622d9783a33a533b90/69a481180d61ac1d5340aa1e_PHOTO-2026-02-10-15-49-02.jpg"
          alt="Shiveshwar Textiles weaving loom floor"
          className="w-full h-full object-cover grayscale opacity-[0.25] mix-blend-luminosity"
        />
        {/* Subtle gold overlay directly on image */}
        <div className="absolute inset-0 bg-[#d4a96a]/5 mix-blend-color-burn" />
      </div>

      {/* Luxury Gradient Overlays (Radial Center Glow + Soft Linear Blends) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(184,146,74,0.08)_0%,rgba(7,7,6,0.9)_80%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#070706] via-transparent to-[#070706] pointer-events-none" />

      {/* Floating Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-24 md:px-8 w-full flex flex-col justify-between h-full min-h-[650px]">
        
        {/* Editorial Typography Header */}
        <div className="space-y-6 max-w-4xl">
          <div className={`transition-all duration-1000 transform ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#d4a96a] block">
              MANUFACTURING EXCELLENCE
            </span>
          </div>

          <h2 className={`font-serif text-4xl text-white tracking-wide uppercase leading-tight md:text-6xl lg:text-7xl transition-all duration-1000 delay-100 transform ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Built for Scale. <br />
            <span className="text-[#d4a96a] font-light italic">Engineered for Consistency.</span>
          </h2>

          <p className={`text-sm md:text-base tracking-wide leading-relaxed text-[#f5f0e8]/70 max-w-3xl font-light font-sans transition-all duration-1000 delay-200 transform ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            State-of-the-art weaving infrastructure, disciplined production systems, and reliable manufacturing capacity designed for large-scale textile requirements.
          </p>
        </div>

        {/* Minimalist Premium Stat Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-24 pt-12 border-t border-[#b8924a]/20 transition-all duration-1000 delay-300 transform ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Stat 1 */}
          <div className="space-y-2 group">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a96a] group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Scale</span>
            </div>
            <div className="font-serif text-3xl md:text-5xl text-[#d4a96a] font-light tracking-wide transition-colors group-hover:text-white">
              1M+ Meters
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/50 font-light font-sans">
              Monthly Capacity
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-2 group">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a96a] group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Rate</span>
            </div>
            <div className="font-serif text-3xl md:text-5xl text-[#d4a96a] font-light tracking-wide transition-colors group-hover:text-white">
              10,000+ Meters
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/50 font-light font-sans">
              Daily Production
            </p>
          </div>

          {/* Stat 3 */}
          <div className="space-y-2 group">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a96a] group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Availability</span>
            </div>
            <div className="font-serif text-3xl md:text-5xl text-[#d4a96a] font-light tracking-wide transition-colors group-hover:text-white">
              24/7
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/50 font-light font-sans">
              Manufacturing Operations
            </p>
          </div>

          {/* Stat 4 */}
          <div className="space-y-2 group">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a96a] group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Engineering</span>
            </div>
            <div className="font-serif text-3xl md:text-5xl text-[#d4a96a] font-light tracking-wide transition-colors group-hover:text-white">
              Custom Fabric
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/50 font-light font-sans">
              Development
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
