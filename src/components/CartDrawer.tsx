'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Trash2, Mail, Phone, Calculator, Check, AlertCircle } from 'lucide-react';
import { submitInquiry } from '@/app/actions/submitInquiry';

export default function CartDrawer() {
  const { cartItems, isDrawerOpen, closeDrawer, removeItem, updateQuantity, clearCart } = useCart();
  const { t, language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    country: '',
    vatNumber: '',
    deliveryDate: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [randomRef, setRandomRef] = useState('');

  // Form validation states
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let err = '';
    if (name === 'companyName' && !value) {
      err = 'Company name is required';
    } else if (name === 'email') {
      if (!value) {
        err = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        err = 'Invalid email address';
      }
    } else if (name === 'country' && !value) {
      err = 'Country is required';
    }
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Live RFQ calculations
  const totalMeters = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getEstShipment = () => {
    if (totalMeters === 0) return '-';
    if (totalMeters <= 1000) return 'Express Courier / Air Freight (Pallet)';
    if (totalMeters <= 5000) return 'Part Truckload (LTL Cargo)';
    if (totalMeters <= 22000) return '1x 20ft Full Truckload (FTL Container Truck)';
    return '1x 40ft Full Truckload (FTL Container Truck)';
  };

  const getEstLeadTime = () => {
    if (totalMeters === 0) return '-';
    if (totalMeters <= 5000) return '14 business days';
    if (totalMeters <= 20000) return '21 business days';
    return '30 business days';
  };

  // Spawns gold confetti canvas effect on success
  useEffect(() => {
    if (!isSubmitted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#b8924a', '#d4a96a', '#faf8f4', '#f5f0e8', '#e5c07b'];
    const particles: any[] = [];

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        speed: Math.random() * 3 + 2
      });
    }

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speed;
        p.x += Math.sin(p.tiltAngle) * 0.5;

        // Draw particle
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.r / 2, p.y);
        ctx.lineTo(p.x - p.r / 2, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        if (p.y < canvas.height) {
          active = true;
        }
      });

      if (active) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validations
    const newErrors: Record<string, string> = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.country) newErrors.country = 'Country is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append('fullName', 'RFQ Builder Contact');
      formPayload.append('email', formData.email);
      formPayload.append('companyName', formData.companyName);
      formPayload.append('subject', 'RFQ Builder Submission');
      formPayload.append('country', formData.country);
      formPayload.append('vatNumber', formData.vatNumber);
      formPayload.append('referral', 'Website RFQ Builder');
      formPayload.append('message', `RFQ Target Delivery Date: ${formData.deliveryDate || 'Not specified'}\n\nSpecial Requirements/Notes:\n${formData.notes || 'None'}`);
      formPayload.append('isHuman', 'true');
      formPayload.append('selectedProducts', JSON.stringify(cartItems));
      formPayload.append('website', ''); // Honeypot empty

      const result = await submitInquiry(null, formPayload);
      if (result.success) {
        const ref = 'ST-' + Math.floor(100000 + Math.random() * 900000);
        setRandomRef(ref);
        setIsSubmitted(true);
      } else {
        alert(result.error || 'Failed to submit RFQ. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting your RFQ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    clearCart();
    setFormData({
      companyName: '',
      email: '',
      country: '',
      vatNumber: '',
      deliveryDate: '',
      notes: '',
    });
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Blur Backdrop */}
      <div 
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide Panel */}
      <aside className="relative z-10 w-full max-w-lg bg-[#141211] border-l border-[#b8924a]/20 shadow-2xl p-6 flex flex-col justify-between h-full animate-slide-in">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#b8924a]/10 pb-4 mb-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-[#d4a96a] uppercase tracking-widest">Inquiry List</span>
            <h2 className="font-serif text-xl uppercase tracking-wider text-white">RFQ Builder</h2>
          </div>
          <button 
            onClick={closeDrawer}
            className="p-1 text-white/50 hover:text-white transition focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {isSubmitted ? (
          /* SUCCESS STATE PANEL */
          <div className="flex-grow flex flex-col justify-center text-center space-y-6 px-4 animate-fade-in relative z-20">
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
            
            <div className="h-16 w-16 bg-[#b8924a]/10 border border-[#b8924a]/40 rounded-full flex items-center justify-center mx-auto text-[#d4a96a]">
              <Check className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-white uppercase tracking-wider">RFQ Submitted Successfully</h3>
              <p className="text-[#d4a96a] font-mono text-xs uppercase tracking-widest">
                Reference Code: {randomRef}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-white/70 max-w-md mx-auto">
              Your inquiry has been compiled and dispatched to Parth Mangukiya at <span className="text-[#d4a96a] font-mono">parthmangukiya@shiveshwartextiles.com</span>. We will respond with pricing structures and shipping routes within 1 business day.
            </p>

            <button
              onClick={handleReset}
              className="bg-[#b8924a] hover:bg-[#d4a96a] text-[#0f0e0c] font-bold uppercase tracking-widest text-xs py-3 w-full transition"
            >
              Build New RFQ Inquiry
            </button>
          </div>
        ) : (
          /* CART DRAWER FORM & PRODUCTS */
          <div className="flex-grow overflow-y-auto pr-1 space-y-6 flex flex-col justify-between">
            {cartItems.length === 0 ? (
              <div className="flex-grow flex flex-col justify-center items-center text-center py-16 space-y-3">
                <Calculator className="h-12 w-12 text-[#b8924a]/30 animate-pulse" />
                <span className="font-serif text-base text-white/70">Inquiry List is Empty</span>
                <p className="text-xs text-white/40 max-w-xs leading-relaxed">
                  Browse our fabric catalogue and select &quot;Add to Inquiry&quot; to configure custom parameters.
                </p>
                <button
                  onClick={closeDrawer}
                  className="border border-[#b8924a]/40 px-4 py-2 text-[10px] uppercase tracking-wider text-[#d4a96a] hover:bg-[#b8924a]/10 transition"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              <>
                {/* 1. Item List */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#d4a96a] font-medium border-b border-[#b8924a]/10 pb-1.5">
                    Selected Fabrics ({cartItems.length})
                  </h4>
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex gap-4 border border-[#b8924a]/10 bg-[#191715] p-3 relative group"
                      >
                        <img src={item.image} alt={item.name} className="h-12 w-12 object-cover border border-[#b8924a]/10" />
                        
                        <div className="flex-grow min-w-0 space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-serif text-sm text-white truncate">{item.name}</span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-white/40 hover:text-red-400 transition"
                              title="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          
                          {/* Quantity selector */}
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] uppercase tracking-wider text-white/45">{item.gsm}</span>
                            <div className="flex items-center border border-[#b8924a]/20 bg-[#121110]">
                              <input 
                                type="number" 
                                min="100"
                                step="100"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                className="w-20 bg-transparent px-2 py-0.5 text-center text-xs font-mono text-white outline-none"
                              />
                              <span className="text-[9px] uppercase text-[#d4a96a] pr-2 font-mono">meters</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Live Calculation Summary */}
                <div className="border border-[#b8924a]/15 bg-[#171513] p-4 space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#d4a96a] font-mono block">Live RFQ Estimator</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-mono text-white/80">
                    <div>Total volume: <span className="text-white font-bold">{totalMeters}m</span></div>
                    <div>Approx Lead: <span className="text-white font-bold">{getEstLeadTime()}</span></div>
                    <div className="col-span-2 border-t border-[#b8924a]/10 pt-1.5 mt-1 text-[9px] text-white/50">
                      Est. Shipment: <span className="text-[#d4a96a] font-bold">{getEstShipment()}</span>
                    </div>
                  </div>
                </div>

                {/* 3. B2B Submission Fields */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#b8924a]/10">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#d4a96a] font-medium">Business Profile Details</h4>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Company Name */}
                    <label className="grid gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#d4a96a]/70 font-mono">Company Name *</span>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={e => handleInputChange('companyName', e.target.value)}
                          className={`w-full border bg-transparent px-3 py-2 text-xs outline-none text-white transition ${
                            errors.companyName ? 'border-red-500 animate-shake' : 'border-[#b8924a]/25 focus:border-[#d4a96a]'
                          }`}
                          placeholder="Garment Label GmbH"
                        />
                        {errors.companyName && <AlertCircle className="h-3.5 w-3.5 text-red-500 absolute right-2 top-2.5" />}
                      </div>
                    </label>

                    {/* Email */}
                    <label className="grid gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#d4a96a]/70 font-mono">Business Email *</span>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => handleInputChange('email', e.target.value)}
                          className={`w-full border bg-transparent px-3 py-2 text-xs outline-none text-white transition ${
                            errors.email ? 'border-red-500 animate-shake' : 'border-[#b8924a]/25 focus:border-[#d4a96a]'
                          }`}
                          placeholder="import@brand.com"
                        />
                        {errors.email && <AlertCircle className="h-3.5 w-3.5 text-red-500 absolute right-2 top-2.5" />}
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Country */}
                    <label className="grid gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#d4a96a]/70 font-mono">Country *</span>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={e => handleInputChange('country', e.target.value)}
                          className={`w-full border bg-transparent px-3 py-2 text-xs outline-none text-white transition ${
                            errors.country ? 'border-red-500 animate-shake' : 'border-[#b8924a]/25 focus:border-[#d4a96a]'
                          }`}
                          placeholder="Germany / Deutschland"
                        />
                        {errors.country && <AlertCircle className="h-3.5 w-3.5 text-red-500 absolute right-2 top-2.5" />}
                      </div>
                    </label>

                    {/* VAT Number */}
                    <label className="grid gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#d4a96a]/70 font-mono">EU VAT Number</span>
                      <input
                        type="text"
                        value={formData.vatNumber}
                        onChange={e => handleInputChange('vatNumber', e.target.value)}
                        className="w-full border border-[#b8924a]/25 bg-transparent px-3 py-2 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                        placeholder="DE 123456789"
                      />
                    </label>
                  </div>

                  {/* Delivery date & Notes */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="grid gap-1 sm:col-span-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#d4a96a]/70 font-mono">Target Date</span>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={e => handleInputChange('deliveryDate', e.target.value)}
                        className="border border-[#b8924a]/25 bg-[#171513] px-2 py-2 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                      />
                    </label>
                    <label className="grid gap-1 sm:col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-[#d4a96a]/70 font-mono">Special Requirements</span>
                      <input
                        type="text"
                        value={formData.notes}
                        onChange={e => handleInputChange('notes', e.target.value)}
                        className="border border-[#b8924a]/25 bg-transparent px-3 py-2 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                        placeholder="Custom packing, specific GSM tolerance..."
                      />
                    </label>
                  </div>

                   {/* Submit RFQ */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#b8924a] hover:bg-[#d4a96a] disabled:bg-[#b8924a]/50 text-[#0f0e0c] font-bold uppercase tracking-widest text-xs py-3.5 transition disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting RFQ...' : 'Submit Bulk Wholesale RFQ'}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
