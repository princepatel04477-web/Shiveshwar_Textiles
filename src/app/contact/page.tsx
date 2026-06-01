'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { submitInquiry } from '@/app/actions/submitInquiry';

function ContactFormSection() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General Inquiry',
    companyName: '',
    country: '',
    vatNumber: '',
    message: '',
    referral: 'LinkedIn',
    isHuman: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Pre-fill form from URL query parameters
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    const productParam = searchParams.get('product');

    const timer = setTimeout(() => {
      if (subjectParam) {
        setFormData(prev => ({ ...prev, subject: subjectParam }));
      }

      if (productParam) {
        const msg = language === 'EN'
          ? `Dear Shiveshwar Textiles Team,\n\nWe are a wholesale buyer interested in the following fabric:\n- Fabric Category: ${productParam}\n\nPlease share the available specifications, MOQ adjustments, and EXW/FOB shipping options.\n\nBest regards.`
          : `Sehr geehrtes Team von Shiveshwar Textiles,\n\nwir sind ein Großhandelskäufer und interessieren uns für folgenden Stoff:\n- Stoffkategorie: ${productParam}\n\nBitte senden Sie uns die verfügbaren Spezifikationen, MOQ-Optionen sowie EXW/FOB Versandbedingungen.\n\nMit freundlichen Grüßen.`;
        setFormData(prev => ({ ...prev, message: msg }));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isHuman) {
      setToast({
        type: 'error',
        message: language === 'EN' 
          ? 'Please verify that this is a professional business inquiry.' 
          : 'Bitte bestätigen Sie, dass dies eine professionelle Geschäftsanfrage ist.'
      });
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    try {
      const formPayload = new FormData();
      formPayload.append('fullName', formData.fullName);
      formPayload.append('email', formData.email);
      formPayload.append('companyName', formData.companyName);
      formPayload.append('subject', formData.subject);
      formPayload.append('country', formData.country);
      formPayload.append('vatNumber', formData.vatNumber);
      formPayload.append('referral', formData.referral);
      formPayload.append('message', formData.message);
      formPayload.append('isHuman', String(formData.isHuman));
      
      const formEl = e.currentTarget as HTMLFormElement;
      formPayload.append('website', formEl.website.value);

      const result = await submitInquiry(null, formPayload);

      if (result.success) {
        setToast({
          type: 'success',
          message: language === 'EN'
            ? 'Your inquiry has been submitted successfully. Our team will contact you shortly.'
            : 'Ihre Anfrage wurde erfolgreich übermittelt. Unser Team wird Sie in Kürze kontaktieren.'
        });
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          subject: 'General Inquiry',
          companyName: '',
          country: '',
          vatNumber: '',
          message: '',
          referral: 'LinkedIn',
          isHuman: false
        });
        formEl.reset();
      } else {
        setToast({
          type: 'error',
          message: result.error || (language === 'EN' ? 'Submission failed.' : 'Übermittlung fehlgeschlagen.')
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        type: 'error',
        message: language === 'EN' ? 'An unexpected error occurred.' : 'Ein unerwarteter Fehler ist aufgetreten.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
      {/* Contact Info Details */}
      <div className="space-y-8">
        <div className="space-y-3 text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono">B2B Sourcing Desk</span>
          <h2 className="font-serif text-3xl uppercase tracking-wide text-white md:text-4xl">
            Let&apos;s discuss your <span className="text-[#d4a96a]">requirements</span>
          </h2>
          <p className="text-sm leading-relaxed text-white/70">
            Connect with our international export coordinators. Whether you require standard Cotton/Polyester shipments or custom development runs, Shiveshwar Textiles provides direct loom-to-warehouse scaling.
          </p>
        </div>

        {/* Info Grid */}
        <div className="space-y-6 text-xs tracking-wider">
          {/* Location */}
          <div className="flex gap-4 items-start border-l border-[#b8924a]/30 pl-4 py-1">
            <MapPin className="h-5 w-5 text-[#d4a96a] shrink-0" />
            <div className="space-y-1">
              <span className="text-white/45 uppercase text-[10px] block">Global Manufacturing Hub</span>
              <a 
                href="https://www.google.com/maps/place/SHIVESHWAR+TEXTILES/@21.3251,72.8748276,17z/data=!3m1!4b1!4m6!3m5!1s0x3be049e2c904bbc1:0xdbe4fe76ba7bb75!8m2!3d21.3251!4d72.8748276!16s%2Fg%2F11qs0vbflr?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-[#d4a96a] transition"
              >
                Gujarat, India
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 items-start border-l border-[#b8924a]/30 pl-4 py-1">
            <Mail className="h-5 w-5 text-[#d4a96a] shrink-0" />
            <div className="space-y-1">
              <span className="text-white/45 uppercase text-[10px] block">Direct B2B Email</span>
              <a 
                href="mailto:parthmangukiya@shiveshwartextiles.com" 
                className="text-white hover:text-[#d4a96a] transition font-mono"
              >
                parthmangukiya@shiveshwartextiles.com
              </a>
            </div>
          </div>

          {/* Timezones */}
          <div className="flex gap-4 items-start border-l border-[#b8924a]/30 pl-4 py-1">
            <Clock className="h-5 w-5 text-[#d4a96a] shrink-0" />
            <div className="space-y-1 leading-relaxed">
              <span className="text-white/45 uppercase text-[10px] block">Office Hours (IST & CET)</span>
              <div className="text-white/90">
                Mon – Fri: 11:00 AM – 8:00 PM <strong className="text-[#d4a96a]">IST</strong>
              </div>
              <div className="text-white/60">
                Mon – Fri: 7:30 AM – 4:30 PM <strong className="text-[#d4a96a]/70">CET</strong> (Germany/Europe)
              </div>
            </div>
          </div>

          {/* Response Promise */}
          <div className="flex gap-4 items-start border-l border-[#b8924a]/30 pl-4 py-1">
            <ShieldCheck className="h-5 w-5 text-[#d4a96a] shrink-0" />
            <div className="space-y-1">
              <span className="text-white/45 uppercase text-[10px] block">B2B SLA Promise</span>
              <span className="text-[#d4a96a] font-medium">{t('contact.promise')}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Link */}
        <div className="pt-4 border-t border-[#b8924a]/10">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-3">Prefer Instant Chat?</p>
          <a
            href="https://wa.link/xv04fy"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#b8924a] hover:bg-[#d4a96a] text-[#0f0e0c] font-bold uppercase tracking-wider text-xs px-6 py-4 w-full sm:w-auto transition shadow-lg shadow-[#b8924a]/10"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>Chat Live on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Form Content */}
      <div className="border border-[#b8924a]/18 bg-[#171513] p-6 md:p-10">
        {isSubmitted ? (
          <div className="py-16 text-center space-y-6 animate-fade-in">
            <CheckCircle2 className="h-16 w-16 text-[#d4a96a] mx-auto animate-bounce" />
            <div className="space-y-2">
              <h3 className="font-serif text-3xl text-white">Thank You.</h3>
              <p className="text-[#d4a96a] text-xs uppercase tracking-widest font-mono">RFQ SUBMISSION COMPLETED</p>
            </div>
            <p className="text-sm leading-relaxed text-white/70 max-w-md mx-auto">
              Your RFQ has been submitted. We will respond within 1 business day.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="border border-[#b8924a]/40 px-6 py-2.5 text-xs uppercase tracking-widest text-[#d4a96a] hover:bg-[#b8924a]/10 transition font-bold"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              
              {/* Full Name */}
              <label className="grid gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">Full Name *</span>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                  placeholder="John Doe"
                />
              </label>

              {/* Email */}
              <label className="grid gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">Business Email *</span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                  placeholder="partner@company.com"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Company Name */}
              <label className="grid gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">Company Name *</span>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                  placeholder="Garment Label GmbH"
                />
              </label>

              {/* Subject */}
              <label className="grid gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">Subject *</span>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="border border-[#b8924a]/20 bg-[#171513] px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Quote Inquiry">Quote Inquiry</option>
                  <option value="Sample Request">Sample Request</option>
                  <option value="Business Inquiry">Business Partnership</option>
                  <option value="Complaint">Complaint</option>
                </select>
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Country */}
              <label className="grid gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">Country *</span>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                  placeholder="Germany / Deutschland"
                />
              </label>

              {/* VAT Number */}
              <label className="grid gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">EU VAT Number</span>
                <input
                  type="text"
                  value={formData.vatNumber}
                  onChange={e => setFormData({ ...formData, vatNumber: e.target.value })}
                  className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition"
                  placeholder="DE 123456789 (Optional)"
                />
              </label>
            </div>

            {/* How did you find us */}
            <label className="grid gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">How did you find us?</span>
              <select
                value={formData.referral}
                onChange={e => setFormData({ ...formData, referral: e.target.value })}
                className="border border-[#b8924a]/20 bg-[#171513] px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Google Search">Google Search</option>
                <option value="Industry Directory">Industry Directory</option>
                <option value="Recommendation">Recommendation</option>
                <option value="Other">Other</option>
              </select>
            </label>

            {/* Message */}
            <label className="grid gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#d4a96a] font-mono">Your Message / Fabric Specifications *</span>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="border border-[#b8924a]/20 bg-transparent px-4 py-3 text-xs outline-none text-white focus:border-[#d4a96a] transition font-mono leading-relaxed"
                placeholder="List fabric types, GSM targets, quantities, delivery ports, and timeframes..."
              />
            </label>

            {/* Verification Check */}
            <label className="flex items-center gap-3 text-xs text-white/70 select-none cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.isHuman}
                onChange={e => setFormData({ ...formData, isHuman: e.target.checked })}
                className="h-4 w-4 rounded-sm accent-[#d4a96a] border-[#b8924a]/30"
              />
              <span>I confirm that this is a professional business inquiry.</span>
            </label>

            {/* Honeypot hidden input */}
            <input 
              type="text" 
              name="website" 
              tabIndex={-1} 
              autoComplete="off" 
              className="hidden" 
              style={{ display: 'none' }} 
            />

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#b8924a] hover:bg-[#d4a96a] disabled:bg-[#b8924a]/50 text-[#0f0e0c] font-bold uppercase tracking-widest text-xs py-3.5 transition disabled:cursor-not-allowed"
            >
              {isSubmitting 
                ? (language === 'EN' ? 'Submitting Inquiry...' : 'Anfrage wird gesendet...') 
                : (language === 'EN' ? 'Send Wholesale Inquiry' : 'Großhandelsanfrage senden')}
            </button>
          </form>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div 
          className={`fixed bottom-8 right-8 z-[9999] p-4 border rounded shadow-2xl flex items-center justify-between gap-4 animate-slide-in max-w-md ${
            toast.type === 'success' 
              ? 'bg-[#11100e] border-[#b8924a] text-[#f5f0e8]' 
              : 'bg-[#1d1616] border-red-500/40 text-red-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <span className="text-[#d4a96a] font-bold">✓</span>
            ) : (
              <span className="text-red-500 font-bold">✕</span>
            )}
            <span className="text-xs leading-relaxed font-sans">{toast.message}</span>
          </div>
          <button 
            type="button"
            onClick={() => setToast(null)} 
            className="text-white/40 hover:text-white transition-colors text-xs font-bold leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-16 border-b border-[#b8924a]/15 pb-8 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-[#d4a96a]">Direct Factory Inquiry</span>
          <h1 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl mt-2">
            Contact & <span className="text-[#d4a96a] font-light italic">Inquiries</span>
          </h1>
          <p className="max-w-2xl text-xs text-[#f5f0e8]/60 mt-3 uppercase tracking-widest leading-relaxed">
            Wholesale orders only. Connect with Parth Mangukiya to review production configurations, sample distributions, or logistics frameworks.
          </p>
        </div>

        {/* Suspense wrapped form */}
        <Suspense fallback={<div className="text-center py-12 text-[#d4a96a] font-mono">Loading form parameters...</div>}>
          <ContactFormSection />
        </Suspense>

        {/* Map Embed Section */}
        <section className="mt-24 space-y-8">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a96a] font-mono block font-medium">Global Manufacturing Hub</span>
            <h3 className="font-serif text-2xl uppercase tracking-wide text-white mt-1">Loom Infrastructure & Sourcing Office</h3>
          </div>
          
          <div className="border border-[#b8924a]/15 h-[450px] w-full overflow-hidden grayscale hover:grayscale-0 transition duration-700">
            <iframe
              src="https://maps.google.com/maps?q=SHIVESHWAR%20TEXTILES&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

      </div>
    </main>
  );
}
