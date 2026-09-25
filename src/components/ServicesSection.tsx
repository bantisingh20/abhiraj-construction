import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Factory, 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  Compass,
  Zap,
  Activity,
  AlertTriangle,
  Beaker,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface ServicesSectionProps {
  onSelectServiceForEstimate: (serviceTitle: string) => void;
  onOpenInquiryModal: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectServiceForEstimate,
  onOpenInquiryModal 
}) => {
  const [activeTab, setActiveTab] = useState<string>(SERVICES[0].id);

  // Interactive Material Stress & Acid Resistance Simulator State
  const [barrierType, setBarrierType] = useState<'standard' | 'Abhiraaj'>('Abhiraaj');
  const [acidLevel, setAcidLevel] = useState<number>(85); // 0-100%
  const [hydrostaticPressure, setHydrostaticPressure] = useState<number>(6); // Bar

  const activeService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];

  const getIcon = (iconName: string, isSelected: boolean) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className={`w-5 h-5 ${isSelected ? 'text-amber-900' : 'text-slate-600'}`} />;
      case 'Factory':
        return <Factory className={`w-5 h-5 ${isSelected ? 'text-amber-900' : 'text-slate-600'}`} />;
      case 'Droplets':
        return <Droplets className={`w-5 h-5 ${isSelected ? 'text-cyan-800' : 'text-slate-600'}`} />;
      case 'Sparkles':
        return <Sparkles className={`w-5 h-5 ${isSelected ? 'text-amber-800' : 'text-slate-600'}`} />;
      default:
        return <Compass className={`w-5 h-5 ${isSelected ? 'text-amber-900' : 'text-slate-600'}`} />;
    }
  };

  // Calculate live durability metrics based on barrier type & sliders
  const isProtected = barrierType === 'Abhiraaj';
  const ingressDepth = isProtected ? (acidLevel * 0.02).toFixed(1) : (acidLevel * 0.45 + hydrostaticPressure * 3.2).toFixed(1);
  const lifespanYears = isProtected ? Math.max(25, 30 - Math.round(acidLevel * 0.05)) : Math.max(2, 12 - Math.round(acidLevel * 0.1));
  const rebarRustRisk = isProtected ? Math.min(4, Math.round(acidLevel * 0.04)) : Math.min(96, Math.round(acidLevel * 0.75 + hydrostaticPressure * 2.5));

  return (
    <section id="services" className="py-28 bg-[#FFFDF5] relative border-t border-amber-200 text-slate-900 overflow-hidden">
      {/* Blueprint grid overlay in yellow */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-60 pointer-events-none" />
      <div className="absolute -top-32 right-10 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono uppercase tracking-widest font-bold shadow-xs">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Full-Spectrum Capabilities Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Specialized Engineering & <br />
              <span className="text-gold-gradient font-serif italic">Turnkey Construction Matrix</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From heavy chemical plant foundations to advanced carbon fiber structural jacketing and luxury estate finishes, we engineer enduring reliability.
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white border-2 border-amber-300 text-xs font-mono text-slate-800 flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-950">100% Quality Inspected</span>
            </div>
          </div>
        </div>

        {/* Interactive Service Tab Buttons (Bento Grid Navigation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {SERVICES.map((service) => {
            const isSelected = service.id === activeTab;
            return (
              <button
                key={service.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(service.id);
                }}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-amber-100/90 border-amber-500 shadow-lg shadow-amber-400/20 scale-[1.02]'
                    : 'bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50/70 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-4 w-full">
                  <div className={`p-3 rounded-2xl transition-colors ${isSelected ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-amber-50 text-slate-700'}`}>
                    {getIcon(service.iconName, isSelected)}
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black uppercase tracking-wider">
                      ACTIVE DOSSIER
                    </span>
                  )}
                </div>
                <div>
                  <h3 className={`text-sm font-bold tracking-tight mb-1.5 transition-colors ${isSelected ? 'text-amber-950' : 'text-slate-950 group-hover:text-amber-800'}`}>
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {service.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Stage */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white border-2 border-amber-300 p-6 sm:p-10 shadow-xl relative overflow-hidden mb-12 text-slate-900"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              
              {/* Left Column: Core Description & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono text-amber-800 uppercase tracking-widest font-black">
                    SPECIALIZED CAPABILITY DOSSIER
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-950 mt-1.5 leading-tight">
                    {activeService.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-mono mt-1">
                    {activeService.tagline}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {activeService.description}
                </p>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {activeService.specs.map((sp) => (
                    <div key={sp.label} className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 shadow-xs">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">{sp.label}</span>
                      <strong className="text-xs text-amber-900 font-mono font-black mt-0.5 block">{sp.value}</strong>
                    </div>
                  ))}
                </div>

                {/* Action triggers */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-amber-200">
                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenInquiryModal(activeService.title);
                    }}
                    className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-amber-400/25 border border-amber-300"
                  >
                    <span>Request Scope for this Service</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      onSelectServiceForEstimate(activeService.title);
                    }}
                    className="px-5 py-3.5 rounded-xl text-xs font-mono font-bold text-amber-950 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 transition-colors flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-amber-600" />
                    <span>Calculate Area Estimate</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Execution Checklist */}
              <div className="lg:col-span-5 bg-amber-50/70 p-6 sm:p-7 rounded-2xl border-2 border-amber-200 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <span className="text-xs font-mono text-slate-950 uppercase tracking-wider font-bold">
                    Engineering Scope & Standards
                  </span>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    VERIFIED PROTOCOL
                  </span>
                </div>

                <div className="space-y-3">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-800">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-mono text-[10px] font-black shrink-0 shadow-xs">
                        {idx + 1}
                      </span>
                      <span className="leading-snug font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Execution Warranty badge reminder */}
                <div className="pt-4 border-t border-amber-200 flex items-center gap-2.5 text-xs text-slate-600 font-mono">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Zero-downtime execution & strict timeline milestones guaranteed.</span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* INTERACTIVE CHEMICAL ACID & BARRIER STRESS-TESTER BENCH (ANIMATED SIMULATOR) */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-300 shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-amber-200 pb-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-800 font-bold uppercase mb-1">
                <Beaker className="w-4 h-4 text-amber-600" />
                <span>INTERACTIVE ENGINEERING AUDIT TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                Live Chemical Plant Barrier & Durability Simulator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Simulate acid immersion (H2SO4, HCl) and hydrostatic ground pressure on standard concrete vs. Abhiraaj's 4-layer epoxy crystalline armor.
              </p>
            </div>

            {/* Barrier Mode Selector */}
            <div className="flex items-center p-1.5 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
              <button
                onClick={() => {
                  playClickSound();
                  setBarrierType('standard');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  barrierType === 'standard'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unprotected Concrete
              </button>
              <button
                onClick={() => {
                  playScanSound();
                  setBarrierType('Abhiraaj');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-black transition-all ${
                  barrierType === 'Abhiraaj'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Abhiraaj 4-Layer Armor
              </button>
            </div>
          </div>

          {/* Interactive Controls & Real-Time Computed Telemetry */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Sliders */}
            <div className="lg:col-span-5 space-y-5 bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-700 font-bold">Acid Concentration (H2SO4 / HCl):</span>
                  <span className="text-amber-900 font-black">{acidLevel}% High Corrosive</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={acidLevel}
                  onChange={(e) => setAcidLevel(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-700 font-bold">Hydrostatic Water Pressure:</span>
                  <span className="text-cyan-800 font-black">{hydrostaticPressure} Bar (~60m Head)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={hydrostaticPressure}
                  onChange={(e) => setHydrostaticPressure(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-600 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Real-time ASTM C267 & IS 456 chemical degradation calculation.</span>
              </div>
            </div>

            {/* Right: Live Dynamic Telemetry Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Ingress Depth */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 shadow-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">CORROSION INGRESS DEPTH</span>
                <div className={`text-2xl font-mono font-black ${isProtected ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {ingressDepth} mm
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {isProtected ? 'Near zero penetration. Rebar matrix safe.' : 'Severe acid seepage attacking steel rebar.'}
                </p>
              </div>

              {/* Estimated Lifespan */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 shadow-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">STRUCTURAL LIFESPAN</span>
                <div className="text-2xl font-mono font-black text-amber-800">
                  {lifespanYears}+ Years
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {isProtected ? 'Certified 10-Year Execution Warranty guaranteed.' : 'Urgent spalling & collapse risk within 5-8 yrs.'}
                </p>
              </div>

              {/* Rebar Rust Risk */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 shadow-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">REBAR RUST / SPALLING RISK</span>
                <div className={`text-2xl font-mono font-black ${rebarRustRisk > 50 ? 'text-rose-600' : 'text-cyan-700'}`}>
                  {rebarRustRisk}%
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {isProtected ? 'Cathodic passivity maintained under chemical flow.' : 'Severe oxidation expanding concrete fractures.'}
                </p>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
