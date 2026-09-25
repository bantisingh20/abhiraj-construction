import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Copy, Check, Navigation, Clock, Share2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface ContactSectionProps {
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialMessage = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Industrial Retrofitting & Rehabilitation',
    city: 'Vapi / Gujarat / Mumbai',
    message: initialMessage,
  });

  const [copiedGst, setCopiedGst] = useState(false);
  const [copiedLoc, setCopiedLoc] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleCopyGst = () => {
    playClickSound();
    navigator.clipboard.writeText(COMPANY_DETAILS.gstin);
    setCopiedGst(true);
    setTimeout(() => setCopiedGst(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playScanSound();
    setSubmitted(true);
  };

  const mapsAddress =
    'Silvasa Rd, opp. Circuit House, Laddak, Vapi East, Corner, Koparli, Vapi, Gujarat 396191';
  const mapsQuery = encodeURIComponent(mapsAddress);
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  const mapsDirectUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  const mapsShareUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const handleOpenMap = () => {
    playClickSound();
    window.open(mapsDirectUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLocation = () => {
    playClickSound();
    navigator.clipboard.writeText(`${COMPANY_DETAILS.name}\n${mapsAddress}\n${mapsShareUrl}`);
    setCopiedLoc(true);
    setTimeout(() => setCopiedLoc(false), 2000);
  };

  const handleShareLocation = async () => {
    playClickSound();
    const shareData = {
      title: `${COMPANY_DETAILS.name} — Head Office`,
      text: `${COMPANY_DETAILS.name}, ${mapsAddress}`,
      url: mapsShareUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled share */
      }
    } else {
      // Fallback: open WhatsApp with the location link
      const msg = encodeURIComponent(`${shareData.text}\n${shareData.url}`);
      window.open(`https://wa.me/?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = () => {
    playScanSound();
    const msg = `Hello Mr. Abhinay Palkar (Abhiraaj Construction),%0A%0AI would like to discuss an engineering/architectural project:%0A- Name: ${formData.name || 'Prospective Client'}%0A- Phone: ${formData.phone || 'N/A'}%0A- Scope: ${formData.projectType}%0A- City/Site: ${formData.city}%0A- Message: ${formData.message || 'Please share your technical audit availability.'}`;
    window.open(`https://wa.me/91${COMPANY_DETAILS.rawPhone}?text=${msg}`, '_blank');
  };

  return (
    <section id="contact" className="py-28 bg-[#FFFDF5] relative border-t border-amber-100 text-slate-900 overflow-hidden">
      {/* CAD grid pattern & ambient yellow glow */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-yellow-300/[0.15] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-amber-900 text-xs font-mono uppercase tracking-widest font-bold shadow-xs">
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Engineering Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Consult Directly with <br />
            <span className="text-amber-600 font-serif italic">Managing Director Mr. Abhinay Palkar</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Reach out for structural audits, chemical plant retrofitting, high-rise waterproofing, or luxury architectural construction.
          </p>
        </motion.div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Official Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Phone & Hotline Card */}
            <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200 shadow-xl shadow-yellow-500/5 space-y-3">
              <span className="text-[10.5px] font-mono text-amber-700 uppercase tracking-widest font-bold">
                DIRECT TECHNICAL HOTLINE
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <a
                    href={`tel:${COMPANY_DETAILS.rawPhone}`}
                    onClick={playClickSound}
                    className="text-xl sm:text-2xl font-black font-mono text-slate-900 hover:text-amber-600 transition-colors block"
                  >
                    {COMPANY_DETAILS.phone}
                  </a>
                  <span className="text-xs text-slate-500 font-mono">Abhinay Palkar</span>
                </div>
                <a
                  href={`tel:${COMPANY_DETAILS.rawPhone}`}
                  onClick={playClickSound}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-yellow-500/25 hover:scale-105 transition-transform"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* WhatsApp Quick Dispatch */}
            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200/80 backdrop-blur-xl shadow-lg space-y-3">
              <span className="text-[10.5px] font-mono text-emerald-800 uppercase tracking-widest font-bold">
                INSTANT WHATSAPP CHANNEL
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    Direct WhatsApp Chat
                  </h4>
                  <p className="text-xs text-slate-600 font-mono">
                    Share drawings, site crack photos & PDFs
                  </p>
                </div>
                <button
                  onClick={handleWhatsApp}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs font-mono shadow-md shadow-emerald-500/20 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Now</span>
                </button>
              </div>
            </div>

            {/* Official Registered Office Address */}
            <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200 shadow-xl shadow-yellow-500/5 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-700 font-bold font-mono uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Head Office Address</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-normal">
                {COMPANY_DETAILS.address.line1}, <br />
                {COMPANY_DETAILS.address.line2}
              </p>

              {/* Working Days & Hours */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="font-mono leading-tight">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Working Days & Hours</span>
                  <strong className="text-slate-900">{COMPANY_DETAILS.hours}</strong>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-200 shadow-inner group">
                <iframe
                  title={`${COMPANY_DETAILS.name} — Head Office Location`}
                  src={mapsEmbedUrl}
                  width="100%"
                  height="220"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block w-full grayscale-[0.15] contrast-[1.05] group-hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }}
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-yellow-400/20 rounded-2xl" />
              </div>

              <div className="text-slate-500 font-mono pt-1">
                Email: <strong className="text-slate-900">{COMPANY_DETAILS.email}</strong>
              </div>

              {/* Location Actions: Directions / Copy / Share */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={handleOpenMap}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold font-mono text-[11px] shadow-md shadow-yellow-500/25 hover:scale-105 transition-transform cursor-pointer"
                  title="Open directions in Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </button>
                <button
                  onClick={handleCopyLocation}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-amber-300 text-slate-700 hover:text-slate-900 hover:bg-amber-50 font-bold font-mono text-[11px] transition-colors cursor-pointer"
                  title="Copy location address & link"
                >
                  {copiedLoc ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{copiedLoc ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleShareLocation}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-amber-300 text-slate-700 hover:text-slate-900 hover:bg-amber-50 font-bold font-mono text-[11px] transition-colors cursor-pointer"
                  title="Share location"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* GST Verification Box with 1-Click Copy */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">
                  GST IDENTIFICATION (GOVT. OF INDIA)
                </span>
                <strong className="text-xs sm:text-sm font-mono text-amber-800 font-black">
                  {COMPANY_DETAILS.gstin}
                </strong>
              </div>
              <button
                onClick={handleCopyGst}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-slate-700 hover:text-slate-900 text-xs font-mono transition-colors shadow-2xs cursor-pointer"
              >
                {copiedGst ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-600" />}
                <span>{copiedGst ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Engineering Inquiry Form */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xl shadow-yellow-500/5 relative">
            
            <div className="flex items-center justify-between border-b border-amber-100 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Request Detailed Technical Proposal
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Guaranteed confidential response within 4 hours
                </p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-yellow-100 text-amber-800 border border-yellow-300 font-bold">
                AUDIT READY
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  Proposal Request Transmitted
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                  Thank you, <strong className="text-slate-900 font-semibold">{formData.name}</strong>. Mr. Abhinay Palkar and our engineering team have received your project scope regarding <strong className="text-amber-700">{formData.projectType}</strong>.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="px-6 py-3 rounded-xl text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open Instant WhatsApp Chat</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-3 rounded-xl text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-mono font-bold block mb-1">
                      CLIENT / ARCHITECT NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Er. Rajesh Patel / Company Rep"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-mono font-bold block mb-1">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9987832111"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 font-mono transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-mono font-bold block mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-mono font-bold block mb-1">
                      CITY / INDUSTRIAL ZONE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vapi GIDC / Sarigam / Mumbai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-mono font-bold block mb-1">
                    PRIMARY SERVICE REQUIREMENT
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 focus:outline-none focus:border-yellow-500 font-mono"
                  >
                    <option value="Industrial Retrofitting & Rehabilitation">
                      Industrial Retrofitting & Rehabilitation (CFRP Jacketing)
                    </option>
                    <option value="Chemical Plant Waterproofing & Membrane">
                      Chemical Plant Waterproofing & Membrane
                    </option>
                    <option value="Heavy Civil & Industrial Construction">
                      Heavy Civil & Industrial Construction
                    </option>
                    <option value="Turnkey Architectural Construction (Villas/Havelis)">
                      Turnkey Architectural Construction (Villas/Havelis)
                    </option>
                    <option value="NDT Ultrasound Structural Audit (IS 456 / ASTM)">
                      NDT Ultrasound Structural Audit (IS 456 / ASTM)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-mono font-bold block mb-1">
                    PROJECT SCOPE OR CRACK DETAILS
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe building age, observed beam cracks, approximate square footage, or plant operational constraints..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 hover:from-yellow-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/25 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Proposal Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="py-3.5 px-5 rounded-xl text-xs font-mono font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Director</span>
                  </button>
                </div>

                <div className="pt-2 text-center text-[10.5px] font-mono text-slate-500">
                  ⚡ All engineering details submitted are held under strict NDA and industrial privacy protocols.
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
