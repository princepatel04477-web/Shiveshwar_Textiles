'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Search, Compass, ShoppingBag, PhoneCall, HelpCircle, FileText, ArrowRight } from 'lucide-react';

interface PaletteCommand {
  name: string;
  section: string;
  icon: any;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { openDrawer } = useCart();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commands: PaletteCommand[] = [
    {
      name: 'Explore Products Catalogue',
      section: 'Navigation',
      icon: ShoppingBag,
      action: () => { router.push('/products'); setIsOpen(false); }
    },
    {
      name: 'View Quality and Standards Inspection',
      section: 'Navigation',
      icon: Compass,
      action: () => { router.push('/quality'); setIsOpen(false); }
    },
    {
      name: 'Read Shipping & Export Info',
      section: 'Navigation',
      icon: FileText,
      action: () => { router.push('/shipping-export'); setIsOpen(false); }
    },
    {
      name: 'Read About & Infrastructure Story',
      section: 'Navigation',
      icon: Compass,
      action: () => { router.push('/about'); setIsOpen(false); }
    },
    {
      name: 'Go to Contact / Inquiry Desk',
      section: 'Navigation',
      icon: PhoneCall,
      action: () => { router.push('/contact'); setIsOpen(false); }
    },
    {
      name: 'Open B2B RFQ Inquiry Drawer',
      section: 'RFQ Cart',
      icon: ShoppingBag,
      action: () => { openDrawer(); setIsOpen(false); }
    },
    {
      name: 'Sourcing: Cotton Fabrics (100–150 GSM)',
      section: 'Fabrics Sourcing',
      icon: ShoppingBag,
      action: () => { router.push('/products/cotton-fabrics'); setIsOpen(false); }
    },
    {
      name: 'Sourcing: Polyester Fabrics (50–250 GSM)',
      section: 'Fabrics Sourcing',
      icon: ShoppingBag,
      action: () => { router.push('/products/polyester-fabrics'); setIsOpen(false); }
    },
    {
      name: 'Sourcing: Blended Fabrics (Custom GSM)',
      section: 'Fabrics Sourcing',
      icon: ShoppingBag,
      action: () => { router.push('/products/blended-fabrics'); setIsOpen(false); }
    },
    {
      name: 'Sourcing: Custom Fabric Development',
      section: 'Fabrics Sourcing',
      icon: ShoppingBag,
      action: () => { router.push('/products/custom-development'); setIsOpen(false); }
    }
  ];

  // Listen for 'K' key globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't open if target is an input field or text area
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.isContentEditable
      );
      if (isInput) return;

      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setActiveIndex(0);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const filtered = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase()) || 
    cmd.section.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity duration-300">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Palette Container */}
      <div 
        className="relative z-10 w-full max-w-lg bg-[#141211] border border-[#b8924a]/30 shadow-2xl p-4 flex flex-col max-h-[480px] animate-scale-in"
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#b8924a]/15 pb-3">
          <Search className="h-5 w-5 text-[#d4a96a]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
            placeholder="Type 'germany', 'cotton', 'quality' or scroll to navigate..."
            className="w-full bg-transparent text-sm outline-none text-white placeholder-white/30"
          />
          <span className="text-[9px] border border-[#b8924a]/30 px-1.5 py-0.5 rounded-sm text-[#d4a96a] font-mono select-none">
            ESC
          </span>
        </div>

        {/* Action List */}
        <div className="flex-grow overflow-y-auto mt-4 space-y-4 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-white/40 flex flex-col items-center gap-2">
              <HelpCircle className="h-8 w-8 text-[#b8924a]/20" />
              <span>No commands found matching &quot;{query}&quot;</span>
            </div>
          ) : (
            <div>
              {/* Group commands by section */}
              {['Navigation', 'RFQ Cart', 'Fabrics Sourcing'].map(section => {
                const sectionItems = filtered.filter(cmd => cmd.section === section);
                if (sectionItems.length === 0) return null;

                return (
                  <div key={section} className="space-y-1.5 mt-3 first:mt-0">
                    <h5 className="text-[9px] uppercase tracking-widest text-[#d4a96a] font-mono font-medium pl-2">
                      {section}
                    </h5>
                    
                    <div className="space-y-1">
                      {sectionItems.map((cmd) => {
                        // Find global index in filtered array
                        const globalIndex = filtered.findIndex(f => f.name === cmd.name);
                        const isSelected = activeIndex === globalIndex;
                        const Icon = cmd.icon;

                        return (
                          <button
                            key={cmd.name}
                            onClick={cmd.action}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={`w-full flex items-center justify-between text-left px-3 py-2.5 transition text-xs ${
                              isSelected ? 'bg-[#b8924a]/10 border-l-2 border-[#b8924a]' : 'border-l-2 border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-3 truncate">
                              <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-[#d4a96a]' : 'text-white/40'}`} />
                              <span className={`truncate ${isSelected ? 'text-white' : 'text-white/70'}`}>
                                {cmd.name}
                              </span>
                            </div>
                            {isSelected && <ArrowRight className="h-3.5 w-3.5 text-[#d4a96a] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer shortcuts hint */}
        <div className="border-t border-[#b8924a]/10 pt-3 mt-3 flex justify-between text-[9px] font-mono text-white/30 select-none">
          <span>↑↓ to navigate</span>
          <span>ENTER to select</span>
        </div>

      </div>
    </div>
  );
}
