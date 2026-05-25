'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<string | null>(null);
  const [hoverText, setHoverText] = useState('');

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile/touch-based
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for clickable items or elements marked with data-cursor
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const isLink = target.closest('a, button, select, input[type="submit"]') !== null;

      if (cursorTarget) {
        setCursorType('hover-label');
        setHoverText(cursorTarget.getAttribute('data-cursor') || '');
      } else if (isLink) {
        setCursorType('hover');
        setHoverText('');
      } else {
        setCursorType(null);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    // Follower Lerp Loop
    let animationId: number;
    const updatePosition = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.left = `${mouseRef.current.x}px`;
        dot.style.top = `${mouseRef.current.y}px`;
      }

      if (ring) {
        // Lerp factor
        const ease = 0.16;
        ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * ease;
        ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * ease;

        ring.style.left = `${ringPosRef.current.x}px`;
        ring.style.top = `${ringPosRef.current.y}px`;
      }

      animationId = requestAnimationFrame(updatePosition);
    };

    animationId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div 
        ref={dotRef}
        className="fixed w-1.5 h-1.5 bg-[#d4a96a] rounded-full pointer-events-none z-[999] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      />
      
      {/* Outer Ring */}
      <div 
        ref={ringRef}
        className={`fixed rounded-full pointer-events-none z-[998] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-[#0f0e0c] font-bold text-center select-none overflow-hidden transition-all duration-300 ${
          cursorType === 'hover-label'
            ? 'w-16 h-16 bg-[#d4a96a] border-transparent'
            : cursorType === 'hover'
            ? 'w-10 h-10 border border-[#d4a96a] bg-[#d4a96a]/10 scale-110'
            : 'w-7 h-7 border border-[#d4a96a]/40 bg-transparent'
        }`}
      >
        <span className={`transition-opacity duration-200 ${cursorType === 'hover-label' ? 'opacity-100' : 'opacity-0'}`}>
          {hoverText}
        </span>
      </div>
    </>
  );
}
