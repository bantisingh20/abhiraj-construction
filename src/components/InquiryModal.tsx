import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Send, MessageSquare, ShieldCheck, CheckCircle2, HardHat } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillSubject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, prefillSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectScope: prefillSubject || 'Industrial Retrofitting & CFRP Wrapping',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefillSubject) {
      setFormData((prev) => ({ ...prev, projectScope: prefillSubject }));
    }
  }, [prefillSubject]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playScanSound();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    playScanSound();
    const msg = `Hello Mr. Abhinay Palkar (Abhiraaj Construction),%0A%0AI would like to consult on a project:%0A- Name: ${formData.name || 'Prospective Client'}%0A- Phone: ${formData.phone || 'N/A'}%0A- Scope: ${formData.projectScope}%0A- Message: ${formData.details || 'Please share initial consultation availability.'}`;
    window.open(`https://wa.me/91${COMPANY_DETAILS.rawPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white border-2 border-yellow-400 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-900"
      >
        {/* Close */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-yellow-500/20">
            <HardHat className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-wider">
              {COMPANY_DETAILS.name}
            </h3>
            <p className="text-xs font-mono text-amber-700 font-bold">
              Direct Consultation with {COMPANY_DETAILS.owner}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900">
              Consultation Ticket Created
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
              Our engineering desk has logged your query regarding <strong className="text-amber-800 font-bold">{formData.projectScope}</strong>. Mr. Abhinay Palkar will contact you directly at <strong className="text-slate-950 font-bold">{formData.phone}</strong>.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Instant WhatsApp Chat</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-mono text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="text-slate-700 font-mono font-bold block mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Your Name / Company Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 font-mono transition-colors"
                />
              </div>

              <div>
                <label className="text-slate-700 font-mono font-bold block mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="contact@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-mono font-bold block mb-1">
                PROJECT SCOPE OR INQUIRY FOCUS
              </label>
              <input
                type="text"
                value={formData.projectScope}
                onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-amber-900 font-mono font-semibold focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-slate-700 font-mono font-bold block mb-1">
                STRUCTURAL DETAILS / CRACKS
              </label>
              <textarea
                rows={3}
                placeholder="Details on floor count, age of building, seepage issues, or architectural drawings..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 hover:from-yellow-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-md shadow-yellow-500/25 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Consultation</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="py-3 px-4 rounded-xl text-xs font-mono font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            </div>

            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 justify-center pt-2 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>GST Verified: {COMPANY_DETAILS.gstin} • Vapi, Gujarat</span>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
