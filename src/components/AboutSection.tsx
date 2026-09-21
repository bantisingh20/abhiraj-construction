import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Award, MapPin, Phone, Mail, FileText, UserCheck, 
  Hammer, CheckCircle2, Calendar, Sparkles, ChevronRight, Stamp, 
  ExternalLink, ArrowUpRight, Compass, Shield
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { AbhirajLogo } from './BrandLogos';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface AboutSectionProps {
  onOpenInquiryModal: () => void;
}

const MILESTONES = [
  {
    year: '2008',
    title: 'Inception of Structural Practice',
    desc: 'Director Abhinay Palkar initiates civil structural engineering practice across Vapi, Daman, and South Gujarat industrial corridors.',
    tag: 'FOUNDATION',
    stat: '1st Industrial Site'
  },
  {
    year: '2014',
    title: 'Chemical Plant Restoration Mastery',
    desc: 'Pioneered live-operation concrete rehabilitation for chemical and pharmaceutical reactors in Sarigam and Vapi GIDC.',
    tag: 'INDUSTRIAL',
    stat: '45+ Plants Restored'
  },
  {
    year: '2018',
    title: 'CFRP Aerospace Retrofitting Division',
    desc: 'Introduced high-tensile (3,500 MPa) carbon fiber composite jacketing for zero-demolition structural column strengthening.',
    tag: 'HIGH-TECH RETROFIT',
    stat: '+300% Strength'
  },
  {
    year: '2022',
    title: 'G+21 High-Rise & Turnkey Haveli',
    desc: 'Expanded into large-scale multi-storey commercial towers (Supreme Eptimo) and bespoke heritage architectural construction.',
    tag: 'ARCHITECTURE',
    stat: 'G+21 Towers'
  },
  {
    year: '2025-26',
    title: 'Abhiraj Construction Consolidation',
    desc: 'Official incorporation and GST registration. Offering verified 10-Year Execution Warranties across Pan-India projects.',
    tag: 'GST REGISTERED',
    stat: '10-Yr Certified'
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenInquiryModal }) => {
  const [activeMilestone, setActiveMilestone] = useState<number>(4);
  const [clientProjectName, setClientProjectName] = useState<string>('Vapi Industrial Facility');
  const [isStamped, setIsStamped] = useState<boolean>(true);

  return (
    <section id="about" className="py-28 bg-white relative overflow-hidden border-t border-amber-200 text-slate-900">
      {/* Background blueprint grid & subtle yellow radial glow */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono uppercase tracking-widest font-bold shadow-xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Corporate Dossier & Engineering Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Creators of Enduring Structures & <br />
            <span className="text-gold-gradient font-serif italic">Industrial Realities</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Led by <strong className="text-slate-950 font-bold">{COMPANY_DETAILS.owner}</strong>, <strong className="text-amber-700 font-bold">ABHIRAJ CONSTRUCTION</strong> unites 18+ years of field civil engineering with aerospace-grade composite retrofitting and bespoke architectural craftsmanship.
          </p>
        </motion.div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The Company Philosophy & Interactive 18-Year Timeline */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Founder's Statement Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-xl relative"
            >
              <div className="text-xs font-mono text-amber-800 font-bold mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span>DIRECTOR'S STATEMENT • ABHIRAJ CONSTRUCTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4 leading-snug">
                "We aim to be more than just your construction team — we are your partner in the journey."
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Understanding that embarking on a construction or plant retrofitting project is a momentous endeavor, our commitment is to make your engineering experience seamless, cost-effective, and successful. When you choose Abhiraj Construction, you choose a team that shares your vision and works tirelessly to bring it into reality.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                From structural architects and civil engineers to project managers and master craftsmen, our multidisciplinary team brings collective knowledge and unwavering commitment to make every structure endure for generations.
              </p>

              {/* Leadership Signoff */}
              <div className="mt-6 pt-6 border-t border-amber-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-black text-slate-950 uppercase tracking-wider">
                    {COMPANY_DETAILS.owner}
                  </div>
                  <div className="text-xs text-amber-800 font-mono font-bold">
                    Managing Director & Chief Engineer
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-slate-500">Headquartered at</div>
                  <div className="text-xs font-bold text-slate-900">Vapi, Gujarat</div>
                </div>
              </div>
            </motion.div>

            {/* Interactive 18-Year Evolution Milestone Scrubber */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF5] border-2 border-amber-300 shadow-xl space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-900 font-bold">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>18-YEAR ENGINEERING EVOLUTION TIMELINE</span>
                </div>
                <span className="text-[10.5px] font-mono text-slate-500 font-bold">
                  Select year to inspect milestones
                </span>
              </div>

              {/* Year Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {MILESTONES.map((m, idx) => {
                  const isCurrent = activeMilestone === idx;
                  return (
                    <button
                      key={m.year}
                      onClick={() => {
                        playClickSound();
                        setActiveMilestone(idx);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 border ${
                        isCurrent 
                          ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md shadow-amber-400/30 scale-105' 
                          : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      {m.year}
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Card Animation */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeMilestone}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 rounded-2xl bg-white border border-amber-200 space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                      {MILESTONES[activeMilestone].tag}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      {MILESTONES[activeMilestone].stat}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-950">
                    {MILESTONES[activeMilestone].title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {MILESTONES[activeMilestone].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Quality & Execution Warranty Assurance Card */}
            <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/20 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2">
                    <span>Execution Warranty Commitment</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                      CERTIFIED SAFE
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    "We not only execute, but we also inspect, test, and continuously monitor to ensure we deliver quality output. That brings confidence in us to give long-term warranties on our structural works. Abhiraj Construction guarantees your structure is safe in our hands."
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Verified Official Credentials & Live Warranty Seal Generator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Official Corporate Credentials Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-7 rounded-3xl bg-white border-2 border-amber-200 shadow-xl relative"
            >
              <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-6">
                <div>
                  <div className="mb-2">
                    <AbhirajLogo variant="full" />
                  </div>
                  <h4 className="text-xs font-mono text-amber-800 uppercase tracking-wider font-bold">
                    Official Corporate Credentials
                  </h4>
                  <p className="text-xs text-slate-500">Statutory & Verification Metadata</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-mono font-bold">
                  ACTIVE 2026
                </span>
              </div>

              {/* Data Rows */}
              <div className="space-y-3 text-xs">
                
                {/* Legal Entity */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-semibold">COMPANY NAME</span>
                    <strong className="text-slate-950 text-sm font-bold tracking-wide">
                      {COMPANY_DETAILS.name.toUpperCase()}
                    </strong>
                  </div>
                </div>

                {/* Director */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <UserCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-semibold">OWNER / PROPRIETOR</span>
                    <strong className="text-slate-950 text-sm font-bold tracking-wide">
                      {COMPANY_DETAILS.owner}
                    </strong>
                  </div>
                </div>

                {/* GST */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-semibold">GST IDENTIFICATION NUMBER</span>
                    <div className="flex items-center justify-between">
                      <strong className="text-amber-900 font-mono text-sm font-bold tracking-wider">
                        {COMPANY_DETAILS.gstin}
                      </strong>
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">Govt. Validated</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-semibold">REGISTERED HEAD OFFICE</span>
                    <p className="text-slate-800 text-xs leading-relaxed font-medium">
                      {COMPANY_DETAILS.address.line1}, <br />
                      {COMPANY_DETAILS.address.line2}
                    </p>
                  </div>
                </div>

                {/* Contact Direct */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href={`tel:${COMPANY_DETAILS.rawPhone}`}
                    onClick={playClickSound}
                    className="flex items-center gap-2 p-3 rounded-xl bg-amber-100/80 border border-amber-300 hover:bg-amber-200 text-amber-950 font-bold transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-mono text-xs truncate">{COMPANY_DETAILS.phone}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    onClick={playClickSound}
                    className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 transition-colors shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="font-mono text-xs truncate">Email Office</span>
                  </a>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-6 pt-5 border-t border-amber-200">
                <button
                  onClick={() => {
                    playClickSound();
                    onOpenInquiryModal();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-amber-400/25"
                >
                  <span>Book Formal Engineering Audit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>

            {/* Interactive Live 10-Year Certified Execution Warranty Certificate & Seal (Warm Gold Theme) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 text-slate-900 border-2 border-amber-400 shadow-xl relative overflow-hidden">
              
              {/* Background watermark badge */}
              <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
                <Award className="w-48 h-48 text-amber-600" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-900 font-black">
                    <Stamp className="w-4 h-4 text-amber-700" />
                    <span>INTERACTIVE WARRANTY CERTIFICATE</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black border border-amber-500">
                    10-YEAR GUARANTEE
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-[10px] font-mono text-slate-700 uppercase font-bold">
                    Enter Your Project / Facility Name:
                  </label>
                  <input
                    type="text"
                    value={clientProjectName}
                    onChange={(e) => setClientProjectName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-slate-950 font-mono text-xs focus:outline-none focus:border-amber-500 transition-colors shadow-xs"
                    placeholder="e.g. Chemical Reactor Unit 3"
                  />
                </div>

                {/* Stamped Certificate Preview */}
                <div className="p-4 rounded-2xl bg-white border-2 border-amber-300 space-y-2 relative shadow-md">
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-800 font-bold">
                    <span>CERTIFICATE ID: ABH-2026-WAR</span>
                    <span>IS 456-2000 COMPLIANT</span>
                  </div>

                  <div className="text-sm font-black text-slate-950 tracking-wide">
                    Structure: "{clientProjectName || 'Industrial Site'}"
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    Certified for structural integrity, micro-concrete tensile load, and hydrostatic waterproofing barrier under direct engineering oversight of Abhiraj Construction.
                  </p>

                  {/* Stamp Graphic with Interactive Sound */}
                  <div className="pt-2 flex items-center justify-between border-t border-amber-200 text-[10px] font-mono">
                    <span className="text-amber-900 font-bold">ISSUED BY: {COMPANY_DETAILS.name}</span>
                    <button
                      onClick={() => {
                        playScanSound();
                        setIsStamped(!isStamped);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-black transition-all flex items-center gap-1.5 shadow-sm ${
                        isStamped 
                          ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                          : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isStamped ? 'SEAL VERIFIED ✓' : 'CLICK TO STAMP'}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
