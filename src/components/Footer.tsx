import React, { useState, useEffect } from 'react';
import { HardHat, Phone, Mail, MapPin, ShieldCheck, ArrowUp, Clock } from 'lucide-react';
import { COMPANY_DETAILS, SERVICES } from '../data/companyData';
import { AbhirajLogo } from './BrandLogos';
import { playClickSound } from '../utils/audioFx';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFDF5] text-slate-700 relative border-t border-amber-200 overflow-hidden">
      {/* CAD grid pattern */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-50 pointer-events-none" />

      {/* Upper Footer: Quick Action Band */}
      <div className="border-b border-amber-200/80 py-6 bg-amber-50/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AbhirajLogo variant="compact" light={false} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="text-amber-800 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              GST: {COMPANY_DETAILS.gstin}
            </span>
            <span className="text-amber-300">|</span>
            <span className="text-slate-600 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              {currentTime}
            </span>
            <span className="text-amber-300">|</span>
            <a
              href={`tel:${COMPANY_DETAILS.rawPhone}`}
              onClick={playClickSound}
              className="text-slate-900 hover:text-amber-600 transition-colors font-black"
            >
              {COMPANY_DETAILS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Address (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-slate-950 uppercase font-serif">
                ABHIRAJ
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-300 text-slate-950 font-mono font-black border border-yellow-400">
                CONSTRUCTION
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-normal">
              Specialized civil engineering, industrial plant construction, aerospace-grade carbon fiber (CFRP) structural retrofitting, and high-rise chemical waterproofing.
            </p>

            <div className="space-y-2 text-xs text-slate-700 font-mono font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {COMPANY_DETAILS.address.line1}, {COMPANY_DETAILS.address.line2}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <a 
                  href={`tel:${COMPANY_DETAILS.rawPhone}`} 
                  onClick={playClickSound}
                  className="hover:text-amber-700 transition-colors"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a 
                  href={`mailto:${COMPANY_DETAILS.email}`} 
                  onClick={playClickSound}
                  className="hover:text-amber-700 transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Specialized Services (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
              Engineering Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-mono">
              <li>
                <a href="#services" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  • Structural Retrofitting & CFRP Wrapping
                </a>
              </li>
              <li>
                <a href="#services" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  • Chemical & Industrial Plant Construction
                </a>
              </li>
              <li>
                <a href="#services" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  • G+21 High-Rise Chemical Waterproofing
                </a>
              </li>
              <li>
                <a href="#services" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  • Luxury Villa & Heritage Haveli Architecture
                </a>
              </li>
              <li>
                <a href="#scanner" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  • In-Situ Ultrasonic Pulse NDT Audits
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links & Scroll to Top (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
              Interactive Tools & Showcase
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-mono">
              <li>
                <a href="#gallery" onClick={playClickSound} className="hover:text-amber-600 transition-colors font-semibold text-amber-700">
                  → Interactive PDF Site Gallery
                </a>
              </li>
              <li>
                <a href="#scanner" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  → NDT Ultrasonic Diagnostic Lab
                </a>
              </li>
              <li>
                <a href="#technology" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  → Before/After CFRP Split Slider
                </a>
              </li>
              <li>
                <a href="#estimator" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  → Scope & Timeline Estimator
                </a>
              </li>
              <li>
                <a href="#clients" onClick={playClickSound} className="hover:text-amber-600 transition-colors">
                  → Client Endorsements (Page 15)
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-yellow-50 border border-amber-300 text-xs font-mono text-slate-800 font-bold transition-colors shadow-xs cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 text-amber-600" />
                <span>Scroll to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Band */}
        <div className="mt-12 pt-8 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>GSTIN: {COMPANY_DETAILS.gstin}</span>
            <span>•</span>
            <span>Vapi, Gujarat (20.3893° N, 72.9106° E)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
