import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, ShieldCheck, Zap, Layers, Activity, ArrowRight, CheckCircle2, 
  ChevronRight, Gauge, Sliders, AlertTriangle, ArrowLeftRight, ArrowUpRight
} from 'lucide-react';
import { RETROFITTING_TECHS } from '../data/companyData';
import { RetrofittingTech } from '../types';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface RetrofittingTechProps {
  onOpenInquiryModal: (techName?: string) => void;
}

export const RetrofittingInteractiveTech: React.FC<RetrofittingTechProps> = ({ onOpenInquiryModal }) => {
  const [selectedTech, setSelectedTech] = useState<RetrofittingTech>(RETROFITTING_TECHS[0]);
  const [activeTabMode, setActiveTabMode] = useState<'slider' | 'blueprint' | 'specs'>('slider');

  // Interactive Live Strain & Load Deflection Simulator
  const [appliedLoadKN, setAppliedLoadKN] = useState<number>(65); // 0 to 150 kN

  // Interactive Before/After Split Slider State (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingSlider = useRef<boolean>(false);

  // Computed engineering telemetry
  const fiberMicrostrain = Math.round(appliedLoadKN * 38.5); // Microstrain με
  const deflectionMM = (appliedLoadKN * 0.042).toFixed(2); // mm
  const safetyFactor = (180 / Math.max(10, appliedLoadKN)).toFixed(2);

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseDown = () => {
    isDraggingSlider.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSlider.current) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingSlider.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="technology" className="py-28 bg-[#FFFDF5] relative border-t border-amber-200 text-slate-900 overflow-hidden">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono tracking-widest uppercase font-bold shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-amber-600" />
            <span>Futuristic Engineering Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Advanced Retrofitting & <br />
            <span className="text-gold-gradient font-serif italic">Structural Diagnostics Lab</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Abhiraj Construction deploys market-leading non-destructive testing (NDT), aerospace-grade carbon fiber (CFRP) wrapping, and precision RCC jacketing to extend the life of aged industrial plants by 25+ years.
          </p>
        </motion.div>

        {/* Interactive Engineering Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Technology Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-slate-600 mb-2 px-1 flex items-center justify-between font-bold">
              <span>SELECT REHABILITATION METHOD</span>
              <span className="text-amber-800">5 METHODS ACTIVE</span>
            </div>

            {RETROFITTING_TECHS.map((tech) => {
              const isCurrent = tech.id === selectedTech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedTech(tech);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${
                    isCurrent
                      ? 'bg-amber-100/90 border-amber-500 text-slate-950 shadow-md shadow-amber-400/20 scale-[1.01]'
                      : 'bg-white border-amber-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/70 shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />
                      <span className={`text-sm font-bold tracking-wide transition-colors ${isCurrent ? 'text-amber-950' : 'text-slate-900 group-hover:text-amber-800'}`}>
                        {tech.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 pl-4 font-mono">
                      {tech.fullName}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isCurrent ? 'text-amber-700 translate-x-1' : 'text-slate-400'}`} />
                </button>
              );
            })}

            {/* Quick Proof Box */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs font-mono text-amber-950 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Plant Shutdown Required</span>
              </div>
              <p className="text-[11px] text-slate-700 font-sans">
                Our CFRP and PMM retrofitting allows industrial chemical plants to stay fully operational while structural reinforcement takes place.
              </p>
            </div>
          </div>

          {/* Right Column: High-Tech Blueprint HUD Display */}
          <div className="lg:col-span-8 rounded-3xl bg-white border-2 border-amber-300 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            
            {/* Top HUD Ribbon */}
            <div className="flex flex-wrap items-center justify-between border-b border-amber-200 pb-4 mb-6 gap-3">
              <div>
                <span className="text-[10px] font-mono text-amber-800 font-black tracking-widest uppercase block">
                  ACTIVE STRUCTURAL SYSTEM
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  {selectedTech.fullName}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-50 p-1.5 rounded-2xl border border-amber-200 text-xs font-mono font-bold">
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTabMode('slider');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTabMode === 'slider' ? 'bg-amber-400 text-slate-950 shadow-sm font-black' : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Before/After Split
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTabMode('blueprint');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTabMode === 'blueprint' ? 'bg-amber-400 text-slate-950 shadow-sm font-black' : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Strain HUD
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTabMode('specs');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTabMode === 'specs' ? 'bg-amber-400 text-slate-950 shadow-sm font-black' : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Technical Data
                </button>
              </div>
            </div>

            {/* Mode 1: Interactive Before / After Split Slider */}
            {activeTabMode === 'slider' && (
              <div className="space-y-6">
                <div 
                  ref={sliderContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchMove={handleTouchMove}
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden select-none cursor-ew-resize border-2 border-amber-400 shadow-2xl bg-slate-900"
                >
                  {/* Before Side (Underneath - Full Width with real defect photo) */}
                  <div className="absolute inset-0 bg-cover bg-center flex items-center justify-center p-6" style={{ backgroundImage: `url('/projects/pil-chemicals-corroded-beam.jpg')` }}>
                    <div className="absolute inset-0 bg-slate-950/75" />
                    <div className="relative z-10 text-center max-w-sm space-y-2">
                      <span className="px-3 py-1 rounded-full bg-rose-500/80 text-white text-[10px] font-mono font-bold uppercase shadow-sm">
                        BEFORE: DEGRADED RCC BEAM (PAGE 10)
                      </span>
                      <h4 className="text-lg font-bold text-white">Severely Spalled & Corroded</h4>
                      <p className="text-xs text-rose-200 font-mono">
                        35% Cross-Section Loss • Cracking & Carbonation
                      </p>
                      <div className="text-2xl font-mono font-black text-rose-400 pt-1">
                        SAFETY FACTOR: 0.78 (CRITICAL)
                      </div>
                    </div>
                  </div>

                  {/* After Side (Clipped via slider width with real restored photo) */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-cover bg-center flex items-center justify-center p-6 overflow-hidden border-r-4 border-amber-400 shadow-[0_0_25px_rgba(250,204,21,0.6)]"
                    style={{ 
                      width: `${sliderPos}%`,
                      backgroundImage: `url('/projects/pil-chemicals-jacketing-support.jpg')`
                    }}
                  >
                    <div className="absolute inset-0 bg-slate-950/70" />
                    <div className="relative z-10 text-center max-w-sm space-y-2 whitespace-nowrap sm:whitespace-normal">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-[10px] font-mono font-black uppercase shadow-sm">
                        AFTER: AEROSPACE CFRP RESTORATION
                      </span>
                      <h4 className="text-lg font-bold text-white">Monolithic Carbon Fiber Encased</h4>
                      <p className="text-xs text-emerald-300 font-mono font-semibold">
                        3,500 MPa Tensile Strength • Zero Demolition
                      </p>
                      <div className="text-2xl font-mono font-black text-emerald-400 pt-1">
                        SAFETY FACTOR: 2.85 (+310% LOAD)
                      </div>
                    </div>
                  </div>

                  {/* Drag Handle Knob */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>

                  {/* Bottom helper prompt */}
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-mono text-white/90 pointer-events-none font-bold drop-shadow">
                    <span>◄ DRAG TO REVEAL CFRP RESTORATION</span>
                    <span>DRAG TO REVEAL DEFECT ►</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs font-mono text-slate-700">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Tested per <strong>ACI 440.2R</strong> & <strong>IS 15988:2013</strong> Seismic Retrofit code.</span>
                  </span>
                  <span className="text-amber-800 font-bold hidden sm:inline">ZERO PLANT SHUTDOWN REQUIRED</span>
                </div>
              </div>
            )}

            {/* Mode 2: Blueprint & Strain Simulator */}
            {activeTabMode === 'blueprint' && (
              <div className="space-y-6">
                <div className="relative h-48 sm:h-56 rounded-2xl bg-amber-50/60 border-2 border-amber-200 p-4 flex items-center justify-center overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-cad-grid-yellow opacity-40 pointer-events-none" />

                  {/* Beam Wireframe Diagram Representation */}
                  <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
                    <div 
                      style={{ transform: `translateY(${Math.min(12, Number(deflectionMM) * 2)}px)` }}
                      className="w-full h-16 sm:h-20 rounded-xl border-2 border-dashed border-amber-500 bg-white flex items-center justify-between px-4 relative shadow-sm transition-transform duration-200"
                    >
                      {/* Left Anchor */}
                      <div className="w-8 h-full bg-amber-100 border-r border-amber-300 flex items-center justify-center rounded-l-lg">
                        <span className="text-[9px] font-mono text-amber-900 font-bold -rotate-90">BEARING</span>
                      </div>

                      {/* Center CFRP Band */}
                      <div className="flex-1 mx-4 h-10 rounded-lg border border-amber-400 bg-amber-200/80 flex items-center justify-center relative group">
                        <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-mono font-bold shadow-xs">
                          {selectedTech.name} LAYER
                        </div>
                        <span className="text-[10.5px] font-mono text-amber-950 tracking-wider font-bold">
                          HIGH-TENSILE BOND ZONE • RESISTANCE ARREST
                        </span>
                      </div>

                      {/* Right Anchor */}
                      <div className="w-8 h-full bg-amber-100 border-l border-amber-300 flex items-center justify-center rounded-r-lg">
                        <span className="text-[9px] font-mono text-amber-900 font-bold rotate-90">COLUMN</span>
                      </div>
                    </div>

                    {/* Stress and Audit Indicators */}
                    <div className="w-full flex justify-between text-[10px] font-mono text-slate-700 mt-3 px-2 font-bold">
                      <span className="text-emerald-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Corrosion Rate: Arrested (0.0mm/yr)
                      </span>
                      <span className="text-amber-800">
                        Safety Factor: SF = {safetyFactor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Fiber Strain Scrubber */}
                <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-3 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                    <span className="text-slate-800 font-bold flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-600" />
                      SIMULATE LIVE APPLIED LOAD:
                    </span>
                    <span className="text-amber-900 font-black">{appliedLoadKN} kN Point Load</span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="140"
                    value={appliedLoadKN}
                    onChange={(e) => setAppliedLoadKN(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />

                  {/* Real-time telemetry row */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                      <div className="text-[10px] text-slate-500 font-bold">CARBON FIBER STRAIN</div>
                      <div className="text-xs font-black text-amber-900">{fiberMicrostrain} με</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                      <div className="text-[10px] text-slate-500 font-bold">DEFLECTION</div>
                      <div className="text-xs font-black text-slate-900">{deflectionMM} mm</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                      <div className="text-[10px] text-slate-500 font-bold">ACI 440.2R STATUS</div>
                      <div className="text-xs font-black text-emerald-700">OPTIMAL SAFE</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 3: Specs Mode */}
            {activeTabMode === 'specs' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Real-World Application</span>
                    <strong className="text-sm text-amber-900 font-bold mt-1 block">
                      {selectedTech.application}
                    </strong>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Projected Durability</span>
                    <strong className="text-sm text-emerald-700 font-bold mt-1 block">
                      {selectedTech.durability}
                    </strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-3 shadow-xs">
                  <span className="text-xs font-mono text-slate-800 font-bold block uppercase tracking-wider">
                    Technical Specifications & Standards
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedTech.techSpecs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Card Action Bar */}
            <div className="mt-8 pt-4 border-t border-amber-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-600">
                <span>Case Study Reference: </span>
                <strong className="text-slate-900 font-bold">CS Fine Interchem & PIL Chemicals</strong>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenInquiryModal(`Retrofitting: ${selectedTech.name}`);
                }}
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all transform hover:scale-105 flex items-center gap-1.5 shadow-md shadow-amber-400/20 border border-amber-300"
              >
                <span>Audit Your Structure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
