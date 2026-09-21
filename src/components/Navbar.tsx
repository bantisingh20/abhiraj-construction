import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Menu, X, ShieldCheck, ArrowUpRight, Wrench, 
  Volume2, VolumeX, Sparkles, MapPin, Building2, Camera
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { AbhirajLogo } from './BrandLogos';
import { playClickSound, toggleAudioMute, getAudioMuteState } from '../utils/audioFx';

interface NavbarProps {
  onOpenEstimator: () => void;
  onOpenInquiryModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator, onOpenInquiryModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(getAudioMuteState());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['hero', 'about', 'services', 'gallery', 'scanner', 'technology', 'projects', 'estimator', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleAudioMute();
    setIsMuted(newState);
    if (!newState) {
      playClickSound();
    }
  };

  const navLinks = [
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Site Gallery', href: '#gallery', id: 'gallery' },
    { label: 'NDT Lab', href: '#scanner', id: 'scanner' },
    { label: 'CFRP Tech', href: '#technology', id: 'technology' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Cost Estimator', href: '#estimator', id: 'estimator' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top Technical Status Ribbon in Warm White & Amber */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF5]/95 backdrop-blur-md border-b border-amber-200/80 py-1.5 text-[11px] font-mono text-slate-700 hidden md:block">
        <div className="w-full px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-900 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              GST VERIFIED: {COMPANY_DETAILS.gstin}
            </span>
            <span className="text-amber-300">|</span>
            <span className="flex items-center gap-1 text-slate-800">
              <MapPin className="w-3 h-3 text-amber-600" />
              HQ: Vapi, Gujarat (Opp. Circuit House)
            </span>
            <span className="text-amber-300">|</span>
            <span className="text-amber-800 font-semibold">
              ● Specialized Engineering & Construction Co.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-700">Director: <strong className="text-slate-950 font-bold">{COMPANY_DETAILS.owner}</strong></span>
            <span className="text-amber-300">|</span>
            <a
              href={`tel:${COMPANY_DETAILS.rawPhone}`}
              onClick={playClickSound}
              className="text-amber-900 hover:text-amber-700 font-bold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-600" />
              {COMPANY_DETAILS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Floating Glassmorphism Pill Navbar (White & Yellow) */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 flex justify-center pointer-events-none ${
          scrolled ? 'top-0 md:top-8' : 'top-0 md:top-8'
        }`}
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full flex items-center justify-between px-6 lg:px-10 py-3 sm:py-4 bg-white/95 backdrop-blur-2xl border-b-2 border-amber-300 shadow-xl shadow-amber-500/10 text-slate-950"
        >
          {/* Official Brand Logo */}
          <a 
            href="#hero" 
            onClick={playClickSound}
            className="flex items-center group transition-transform hover:scale-[1.02]"
          >
            <AbhirajLogo variant="full" />
          </a>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-amber-50/80 border border-amber-200/80 rounded-full px-2 py-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={playClickSound}
                  className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'text-slate-950' 
                      : 'text-slate-700 hover:text-amber-900 hover:bg-amber-100/60'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right CTAs & Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors hidden sm:flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />}
            </button>

            {/* Quick Estimator Button */}
            <button
              onClick={() => {
                playClickSound();
                onOpenEstimator();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-all hover:border-amber-400 shadow-xs"
            >
              <Wrench className="w-3.5 h-3.5 text-amber-600" />
              <span>Estimator</span>
            </button>

            {/* Main Consultation CTA */}
            <button
              onClick={() => {
                playClickSound();
                onOpenInquiryModal();
              }}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 shadow-lg shadow-amber-400/25 transition-all transform hover:scale-105 active:scale-95 border border-amber-300"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Inquire</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2.5 rounded-xl bg-amber-50 text-slate-800 hover:text-slate-950 border border-amber-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 p-5 rounded-3xl bg-white/98 backdrop-blur-2xl border-2 border-amber-300 shadow-2xl lg:hidden flex flex-col gap-3 text-slate-900"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-200">
              <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider">
                Menu Navigation
              </span>
              <button
                onClick={handleSoundToggle}
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-800 font-mono"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600" />}
                <span>{isMuted ? 'Muted' : 'Audio On'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    playClickSound();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-50/80 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-slate-800 hover:text-slate-950 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-amber-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                  onOpenInquiryModal();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
              >
                <span>Consult Lead Engineer</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.rawPhone}`}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-900 font-mono text-xs flex items-center justify-center gap-2 border border-amber-200 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Hotline: {COMPANY_DETAILS.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
