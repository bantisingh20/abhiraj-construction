import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck, Clock, Sparkles, MessageSquare, Zap, IndianRupee } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface EstimatorProps {
  onOpenInquiryWithData: (summary: string) => void;
}

export const InteractiveEstimateCalculator: React.FC<EstimatorProps> = ({ onOpenInquiryWithData }) => {
  const [projectType, setProjectType] = useState<'retrofitting' | 'waterproofing' | 'industrial' | 'luxury'>('retrofitting');
  const [sqft, setSqft] = useState<number>(12000);
  const [ageOfStructure, setAgeOfStructure] = useState<number>(20);
  const [includeNDT, setIncludeNDT] = useState<boolean>(true);
  const [urgency, setUrgency] = useState<'standard' | 'fasttrack'>('standard');

  const getEstimatedTimeline = () => {
    let weeks = Math.max(3, Math.round(sqft / 4000));
    if (urgency === 'fasttrack') weeks = Math.max(2, Math.round(weeks * 0.65));
    return `${weeks} - ${weeks + 2} Weeks`;
  };

  const getEstimatedBudgetBracket = () => {
    let ratePerSqft = 85;
    if (projectType === 'retrofitting') ratePerSqft = 120;
    if (projectType === 'waterproofing') ratePerSqft = 65;
    if (projectType === 'industrial') ratePerSqft = 240;
    if (projectType === 'luxury') ratePerSqft = 350;

    if (includeNDT) ratePerSqft += 8;
    if (urgency === 'fasttrack') ratePerSqft *= 1.15;

    const baseCost = sqft * ratePerSqft;
    const minLakhs = (baseCost * 0.9 / 100000).toFixed(1);
    const maxLakhs = (baseCost * 1.15 / 100000).toFixed(1);

    return `₹${minLakhs}L - ₹${maxLakhs}L`;
  };

  const getPhaseRoadmap = () => {
    switch (projectType) {
      case 'retrofitting':
        return [
          'Phase 1: In-situ NDT Ultrasonic Pulse Audit & Delamination Mapping',
          'Phase 2: Chipping spalled concrete, rebar rust removal & zinc priming',
          'Phase 3: High-build Polymer Modified Mortar (PMM) rebuilding',
          'Phase 4: Aerospace-grade Carbon Fiber (CFRP) wrapping & epoxy curing',
        ];
      case 'waterproofing':
        return [
          'Phase 1: Substrate pressure washing & deep fissure injection',
          'Phase 2: Elastomeric primer coat penetration',
          'Phase 3: Polyurethane / Chemical hybrid membrane application',
          'Phase 4: 72-Hour ponding test & 10-Year warranty certification',
        ];
      case 'industrial':
        return [
          'Phase 1: Architectural drawing review & structural load analysis',
          'Phase 2: Heavy RCC plant foundations & chemical resistant flooring',
          'Phase 3: Thermal roof insulation & heavy-duty daylight UPVC sheeting',
          'Phase 4: Final compliance handover & execution warranty handover',
        ];
      case 'luxury':
        return [
          'Phase 1: Turnkey architectural planning & 3D space visualization',
          'Phase 2: Precision structural frame casting & MEP provisioning',
          'Phase 3: Italian marble, custom granite & architectural facade work',
          'Phase 4: Luxury handover with master craftsmanship signoff',
        ];
    }
  };

  const handleConsult = () => {
    playClickSound();
    const summary = `${projectType.toUpperCase()} | ${sqft.toLocaleString()} sq.ft | Age: ${ageOfStructure} Yrs | NDT: ${includeNDT ? 'Yes' : 'No'} | Budget: ${getEstimatedBudgetBracket()} | Timeline: ${getEstimatedTimeline()}`;
    onOpenInquiryWithData(summary);
  };

  const handleWhatsApp = () => {
    playScanSound();
    const msg = `Hello Mr. Abhinay Palkar (Abhiraj Construction),%0A%0AI used your website Scope Simulator for an estimate:%0A- Scope: ${projectType.toUpperCase()}%0A- Area: ${sqft.toLocaleString()} sq.ft%0A- Structure Age: ${ageOfStructure} Years%0A- NDT Audit Needed: ${includeNDT ? 'Yes' : 'No'}%0A- Estimated Budget: ${getEstimatedBudgetBracket()}%0A- Target Timeline: ${getEstimatedTimeline()}%0A%0APlease provide an architectural technical consultation.`;
    window.open(`https://wa.me/91${COMPANY_DETAILS.rawPhone}?text=${msg}`, '_blank');
  };

  return (
    <section id="estimator" className="py-28 bg-white relative border-t border-amber-100 text-slate-900 overflow-hidden">
      {/* Yellow CAD Grid Background */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-yellow-300/[0.15] rounded-full blur-[140px] pointer-events-none" />

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
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Project Scope & Budget Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Simulate Project Timeline & <br />
            <span className="text-amber-600 font-serif italic">Engineering Execution Roadmap</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Architects, plant heads, and developers can calculate work breakdown phases, budgets, and timelines for projects in Vapi, Gujarat, and across Western India.
          </p>
        </motion.div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Box (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xl shadow-yellow-500/5 space-y-6">
            
            {/* Project Type Selector */}
            <div>
              <label className="text-xs font-mono text-slate-700 font-bold block mb-3 uppercase tracking-wider">
                1. Select Engineering Scope
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'retrofitting', label: 'CFRP & Retrofitting', hint: 'Beam jacketing & crack repair' },
                  { id: 'waterproofing', label: 'Chemical Waterproofing', hint: 'High-rise & plant slab seal' },
                  { id: 'industrial', label: 'Industrial Construction', hint: 'Turnkey plant & roof revamp' },
                  { id: 'luxury', label: 'Luxury Architecture', hint: 'Villas, havelis & estates' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClickSound();
                      setProjectType(item.id as any);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      projectType === item.id
                        ? 'bg-yellow-400/20 border-yellow-500 text-slate-950 shadow-md shadow-yellow-500/15'
                        : 'bg-amber-50/40 border-amber-200/60 text-slate-600 hover:border-yellow-400 hover:bg-yellow-50/40'
                    }`}
                  >
                    <strong className="text-xs font-black block text-slate-900">{item.label}</strong>
                    <span className="text-[10px] text-slate-500 block mt-1 font-mono">{item.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sqft Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono text-slate-700 font-bold uppercase tracking-wider">
                  2. Project Area (Sq.Ft)
                </label>
                <span className="text-sm font-mono font-black text-amber-900 bg-yellow-300 px-3 py-1 rounded-xl border border-yellow-400 shadow-xs">
                  {sqft.toLocaleString()} SQ.FT
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="80000"
                step="500"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2.5 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10.5px] font-mono text-slate-500 mt-2 font-medium">
                <span>1,000 sq.ft (Villa/Section)</span>
                <span>25,000 sq.ft (Mid Plant)</span>
                <span>80,000+ sq.ft (Campus)</span>
              </div>
            </div>

            {/* Structure Age & Speed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-2 uppercase">
                  Structure Age
                </label>
                <select
                  value={ageOfStructure}
                  onChange={(e) => setAgeOfStructure(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-yellow-500 font-medium"
                >
                  <option value={5}>New / Under 5 Years</option>
                  <option value={15}>10 - 15 Years</option>
                  <option value={25}>20 - 25 Years (CS Fine Interchem Benchmark)</option>
                  <option value={40}>30+ Years (Heritage / Aging)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-2 uppercase">
                  Timeline Speed
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setUrgency('standard');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all ${
                      urgency === 'standard' ? 'bg-yellow-400 text-slate-950 font-black border-yellow-500 shadow-xs' : 'bg-amber-50/40 border-amber-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => {
                      playClickSound();
                      setUrgency('fasttrack');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all ${
                      urgency === 'fasttrack' ? 'bg-yellow-400 text-slate-950 font-black border-yellow-500 shadow-xs' : 'bg-amber-50/40 border-amber-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Fast-Track
                  </button>
                </div>
              </div>
            </div>

            {/* NDT Checkbox */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="ndt-audit-check"
                  checked={includeNDT}
                  onChange={(e) => {
                    playClickSound();
                    setIncludeNDT(e.target.checked);
                  }}
                  className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                />
                <label htmlFor="ndt-audit-check" className="text-xs text-slate-800 font-semibold cursor-pointer">
                  Include Ultrasonic Pulse Velocity (UPV) Non-Destructive Health Audit
                </label>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 font-bold shrink-0">
                RECOMMENDED
              </span>
            </div>

          </div>

          {/* Real-Time Calculation & Roadmap (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xl shadow-yellow-500/5 space-y-6">
            
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                COMPUTED METRICS
              </span>
              <span className="text-emerald-700 text-xs font-mono font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <Clock className="w-3.5 h-3.5" />
                OPTIMIZED
              </span>
            </div>

            {/* Estimated Budget Bracket */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-100/50 border border-yellow-300">
              <span className="text-xs font-mono text-amber-800 font-bold block uppercase">Projected Investment Bracket</span>
              <div className="text-3xl font-black text-amber-700 font-mono mt-1">
                {getEstimatedBudgetBracket()}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-normal">
                Estimated turnkey execution costs per IS 456 & PWD standard schedules.
              </p>
            </div>

            {/* Timeline Callout */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <span className="text-xs font-mono text-slate-600 block uppercase font-medium">Projected Delivery Window</span>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                {getEstimatedTimeline()}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-normal">
                Continuous plant operation or staged sectional handover.
              </p>
            </div>

            {/* Phased Execution Roadmap */}
            <div>
              <span className="text-xs font-mono text-amber-800 font-bold block mb-3 uppercase tracking-wider">
                Engineering Execution Roadmap
              </span>
              <div className="space-y-2.5">
                {getPhaseRoadmap().map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-tight font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warranty Guarantee */}
            <div className="pt-2 border-t border-amber-100 flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Includes 10-Year Execution Warranty Guarantee</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleConsult}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 hover:from-yellow-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/25 cursor-pointer"
              >
                <span>Get Formal Scope with This Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Send Estimate Directly on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
