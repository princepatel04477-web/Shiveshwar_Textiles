'use client';

import { useEffect, useState } from 'react';

const logo =
  'https://cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree%20Shiveshwar%20Weavetech%20LLP%20-%201%20-%20Edited.png';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Disable scrolling during preloader
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    let current = 0;
    const interval = setInterval(() => {
      // Elegant non-linear progress increment
      const increment = Math.floor(Math.random() * 8) + 2; 
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          // Restore scrolling
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          setTimeout(() => {
            setShouldRender(false);
          }, 800); // Wait for CSS fade/slide animation to complete
        }, 500); // Elegant hold at 100%
      }
    }, 80);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0b09] transition-all duration-[800ms] ease-in-out ${
        isLoaded ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'
      }`}
    >
      {/* Subtle luxury light reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#b8924a]/5 to-transparent pointer-events-none" />

      {/* Loader Content */}
      <div className="relative flex flex-col items-center gap-8 px-4 text-center">
        {/* Animated Gold Logo */}
        <div className="relative">
          <img
            src={logo}
            alt="Shiveshwar logo"
            className="h-20 w-auto object-contain animate-pulse drop-shadow-[0_0_15px_rgba(212,169,106,0.3)]"
          />
        </div>

        {/* Brand Text */}
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#f5f0e8]/40">
            Premium Textile Manufacture
          </div>
          <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em] text-[#d4a96a] font-light">
            Shiveshwar Textiles
          </h1>
        </div>

        {/* Counter & Loading Bar */}
        <div className="mt-6 flex flex-col items-center gap-3 w-64">
          {/* Progress Number */}
          <span className="font-mono text-xs tracking-wider text-[#d4a96a]/90">
            {progress.toString().padStart(3, '0')}%
          </span>
          {/* Progress Bar Container */}
          <div className="h-[2px] w-full bg-[#faf8f4]/5 overflow-hidden rounded-full relative">
            <div
              className="h-full bg-gradient-to-r from-[#b8924a]/30 via-[#d4a96a] to-[#b8924a] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
