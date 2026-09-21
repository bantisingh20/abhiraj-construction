import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Layers, 
  ArrowRight,
  RefreshCw,
  Eye,
  Sliders,
  Sparkles,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface DefectSpecimen {
  id: string;
  name: string;
  brochureReference: string;
  observedCondition: string;
  ndtMethod: string;
  initialUPV: string; // Ultrasonic Pulse Velocity
  carbonationDepth: string;
  remedyTechnique: string;
  finalStrengthGain: string;
  safetyFactorBefore: string;
  safetyFactorAfter: string;
  color: string;
}

const DEFECT_SPECIMENS: DefectSpecimen[] = [
  {
    id: 'spalled-rebar',
    name: 'Spalled Concrete & Exposed Reinforcement',
    brochureReference: 'CS Fine Interchem & PIL Chemicals Audits (Page 8 & 10)',
    observedCondition: 'Severe spalling of outer concrete cover, oxidized steel rebars losing 35% cross-sectional area under vibrating reactor load.',
    ndtMethod: 'Ultrasonic Pulse Velocity (ASTM C597) & Rebar Covermeter Scan',
    initialUPV: '2.32 km/s (Doubtful / Porous)',
    carbonationDepth: '48 mm (Exceeding Cover)',
    remedyTechnique: 'Sandblasting rust removal, zinc-rich anodic primer, PMM rebuilding, aerospace CFRP wrap.',
    finalStrengthGain: '+310% Tensile Restoration',
    safetyFactorBefore: '0.78 (CRITICAL RISK)',
    safetyFactorAfter: '2.85 (CERTIFIED SAFE)',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'beam-honeycombing',
    name: 'Beam Honeycombing & Consolidation Voids',
    brochureReference: 'Industrial Plant Beam Audit (Brochure Page 8)',
    observedCondition: 'Deep interior consolidation voids and aggregate segregation along tension zone of 25-yr industrial beam, reducing shear capacity.',
    ndtMethod: 'Direct Transmission Pundit Ultrasound & Core Micro-Drilling',
    initialUPV: '2.85 km/s (Internal Porosity)',
    carbonationDepth: '32 mm',
    remedyTechnique: 'High-pressure low-viscosity epoxy injection grouting & polymer-modified micro-concrete casing.',
    finalStrengthGain: '+240% Shear Capacity',
    safetyFactorBefore: '0.92 (FAILING)',
    safetyFactorAfter: '2.60 (OPTIMAL)',
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 'cover-delamination',
    name: 'Delamination of Concrete Cover Flanks',
    brochureReference: 'Chemical Complex Superstructure (Brochure Page 8)',
    observedCondition: 'Hollow sounding layers detaching along horizontal beam flanks due to chemical acid vapor ingress and thermal cycling.',
    ndtMethod: 'Acoustic Sounding Impact Echo & Half-Cell Potential Test',
    initialUPV: '3.10 km/s (Subsurface Split)',
    carbonationDepth: '52 mm (Complete Penetration)',
    remedyTechnique: 'Mechanical breakout of loose matrix, sacrificial zinc anodes, multi-layer bidirectional carbon fiber warp.',
    finalStrengthGain: '+285% Flexural Rigidity',
    safetyFactorBefore: '1.05 (MARGINAL)',
    safetyFactorAfter: '2.95 (HIGH RESILIENCE)',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'structural-cracks',
    name: 'Structural & Shear Tensile Cracks',
    brochureReference: 'PIL Chemicals 25-Yr Plant Revamp (Brochure Page 10)',
    observedCondition: 'Diagonal shear cracking exceeding 2.4 mm width at beam-column junctions caused by added industrial machinery weight.',
    ndtMethod: 'Crack Depth Ultrasonic Gauge & Optical Deflection Monitoring',
    initialUPV: '2.15 km/s (Discontinuous Wave)',
    carbonationDepth: '40 mm',
    remedyTechnique: 'MS Structural Steel Jacketing + Polyurethane deep fissure seal + External post-tensioned CFRP laminates.',
    finalStrengthGain: '+350% Dynamic Load Tolerance',
    safetyFactorBefore: '0.65 (UNSTABLE)',
    safetyFactorAfter: '3.10 (EXCEEDS IS 456)',
    color: 'from-amber-600 to-yellow-600'
  },
];

interface DiagnosticLabProps {
  onOpenInquiryModal: (subject?: string) => void;
}

export const StructuralDefectDiagnosticLab: React.FC<DiagnosticLabProps> = ({ onOpenInquiryModal }) => {
  const [activeDefectId, setActiveDefectId] = useState<string>(DEFECT_SPECIMENS[0].id);
  const [activePhase, setActivePhase] = useState<'scan' | 'remedy' | 'cfpr'>('cfpr');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const activeDefect = DEFECT_SPECIMENS.find((d) => d.id === activeDefectId) || DEFECT_SPECIMENS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section id="scanner" className="py-28 bg-white relative border-t border-amber-200 text-slate-900 overflow-hidden">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />

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
            <Activity className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>NDT Ultrasound Diagnostic Lab</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            25-Yr Industrial Structure: <br />
            <span className="text-gold-gradient font-serif italic">NDT Ultrasound Defect & CFRP Restoration Lab</span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Directly modeled from our audits at <strong>CS Fine Interchem (Chemisynth Group)</strong> and <strong>PIL Chemicals Vapi</strong>. Select an observed defect to explore non-destructive ultrasonic diagnosis and certified restoration phases.
          </p>
        </motion.div>

        {/* Interactive Defect Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {DEFECT_SPECIMENS.map((specimen) => {
            const isSelected = specimen.id === activeDefectId;
            return (
              <button
                key={specimen.id}
                onClick={() => {
                  playClickSound();
                  setActiveDefectId(specimen.id);
                }}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 relative group overflow-hidden ${
                  isSelected
                    ? 'bg-amber-100/90 border-amber-500 shadow-md shadow-amber-400/20 scale-[1.02]'
                    : 'bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50/70 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
                  }`}>
                    IS 456 AUDIT
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-amber-600 animate-ping' : 'bg-slate-300'}`} />
                </div>
                
                <h4 className={`text-xs sm:text-sm font-bold leading-snug tracking-tight mb-1.5 transition-colors ${
                  isSelected ? 'text-amber-950' : 'text-slate-950 group-hover:text-amber-800'
                }`}>
                  {specimen.name}
                </h4>

                <p className={`text-[11px] font-mono font-bold ${
                  isSelected ? 'text-amber-900' : 'text-slate-500'
                }`}>
                  Gain: {specimen.finalStrengthGain}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Diagnostic Visualizer Bench */}
        <div className="rounded-3xl bg-white border-2 border-amber-300 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Phase Switcher Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200 pb-6 mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-800 uppercase font-black tracking-wider">
                ACTIVE SPECIMEN AUDIT REPORT
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-slate-950">
                {activeDefect.name}
              </h3>
              <p className="text-xs font-mono text-slate-500">
                Reference: {activeDefect.brochureReference}
              </p>
            </div>

            {/* 3 Step Interactive Buttons */}
            <div className="flex items-center p-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-mono font-bold">
              <button
                onClick={() => {
                  playClickSound();
                  setActivePhase('scan');
                }}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activePhase === 'scan'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>1. Defect Scan</span>
              </button>
              
              <button
                onClick={() => {
                  playClickSound();
                  setActivePhase('remedy');
                }}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activePhase === 'remedy'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>2. Surgical Grout</span>
              </button>

              <button
                onClick={() => {
                  playScanSound();
                  setActivePhase('cfpr');
                }}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activePhase === 'cfpr'
                    ? 'bg-emerald-600 text-white shadow-md font-bold'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>3. Aerospace CFRP</span>
              </button>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 Cols: Interactive Animated Beam Cross-Section Stage */}
            <div className="lg:col-span-7">
              <div 
                onMouseMove={handleMouseMove}
                className="relative h-72 sm:h-96 rounded-2xl bg-slate-950 border-2 border-amber-300 p-6 flex flex-col justify-between overflow-hidden shadow-2xl group cursor-crosshair select-none"
              >
                {/* Engineering Grid Pattern */}
                <div className="absolute inset-0 bg-cad-grid-yellow opacity-30 pointer-events-none" />
                
                {/* Interactive Mouse Hover Spotlight */}
                <div 
                  className="absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-75 blur-3xl opacity-30"
                  style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    background: activePhase === 'scan' ? '#EF4444' : activePhase === 'remedy' ? '#F59E0B' : '#10B981',
                  }}
                />

                {/* Top HUD Overlay */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>ULTRASONIC PULSE FREQUENCY: 54 kHz</span>
                  </div>
                  <span className="text-amber-400 font-bold">
                    {activePhase === 'scan' ? 'DIAGNOSTIC SCAN MODE' : activePhase === 'remedy' ? 'POLYMER GROUTING' : 'CFRP JACKETED'}
                  </span>
                </div>

                {/* Animated Beam Visual Representation */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-4">
                  {/* Concrete Beam Graphic */}
                  <div className="relative w-full max-w-md h-28 sm:h-32 rounded-xl border-2 border-amber-400/60 bg-slate-900/90 overflow-hidden flex items-center justify-center shadow-2xl">
                    
                    {/* Laser Scanline Beam */}
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-laser-yellow shadow-[0_0_15px_rgba(250,204,21,0.8)]" />

                    {/* Stage visual representations */}
                    {activePhase === 'scan' && (
                      <div className="text-center p-4 space-y-1">
                        <div className="text-rose-400 text-xs font-mono font-bold flex items-center justify-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          <span>ULTRASONIC ANOMALY DETECTED</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Carbonation Depth: {activeDefect.carbonationDepth} • Wave Velocity: {activeDefect.initialUPV}
                        </p>
                      </div>
                    )}

                    {activePhase === 'remedy' && (
                      <div className="text-center p-4 space-y-1">
                        <div className="text-amber-400 text-xs font-mono font-bold flex items-center justify-center gap-1.5">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>POLYMER-MODIFIED MORTAR INJECTION</span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-mono">
                          Micro-Concrete Casing (IS 456) • Rust Converter Applied
                        </p>
                      </div>
                    )}

                    {activePhase === 'cfpr' && (
                      <div className="text-center p-4 space-y-1">
                        <div className="text-emerald-400 text-xs font-mono font-bold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>AEROSPACE CFRP MATRIX ENCASED (3,500 MPa)</span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-mono">
                          {activeDefect.finalStrengthGain} • Safety Factor: {activeDefect.safetyFactorAfter}
                        </p>
                      </div>
                    )}

                  </div>
                </div>

                {/* Bottom Crosshair Coordinates */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>X: {Math.round(mousePos.x * 10)} mm • Y: {Math.round(mousePos.y * 10)} mm</span>
                  <span className="text-amber-400 font-bold">STANDARDS: ASTM C597 • IS 13311 (Part 1)</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Technical Specs & Remediation Dossier */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <span className="text-[10px] font-mono text-amber-900 uppercase tracking-wider block font-black">
                  NON-DESTRUCTIVE TEST (NDT) RESULTS
                </span>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-amber-200 pb-1.5">
                    <span className="text-slate-600">Diagnostic Method:</span>
                    <span className="text-slate-900 font-bold text-right truncate max-w-[200px]">{activeDefect.ndtMethod}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-200 pb-1.5">
                    <span className="text-slate-600">Initial UPV Velocity:</span>
                    <span className="text-rose-600 font-bold">{activeDefect.initialUPV}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-200 pb-1.5">
                    <span className="text-slate-600">Carbonation Depth:</span>
                    <span className="text-amber-800 font-bold">{activeDefect.carbonationDepth}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-200 pb-1.5">
                    <span className="text-slate-600">Safety Factor Before:</span>
                    <span className="text-rose-600 font-bold">{activeDefect.safetyFactorBefore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Safety Factor Restored:</span>
                    <span className="text-emerald-700 font-black">{activeDefect.safetyFactorAfter}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-amber-300 space-y-2 shadow-sm">
                <div className="text-xs font-mono text-amber-900 font-black uppercase">
                  RECOMMENDED SURGICAL INTERVENTION
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activeDefect.remedyTechnique}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    {activeDefect.finalStrengthGain}
                  </span>
                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenInquiryModal(`NDT Audit for: ${activeDefect.name}`);
                    }}
                    className="text-xs font-mono font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
                  >
                    <span>Request Audit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
