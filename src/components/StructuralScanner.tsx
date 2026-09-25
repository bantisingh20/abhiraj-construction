import React, { useState } from 'react';
import { Sliders, Activity, ShieldCheck, Zap, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export const StructuralScanner: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(55);
  const [loadTons, setLoadTons] = useState<number>(45);

  // Computed stress values
  const unreinforcedSafetyFactor = Math.max(0.6, Number((30 / loadTons).toFixed(2)));
  const cfrpSafetyFactor = Number(((30 * 2.8) / loadTons).toFixed(2));
  const isOverstressed = unreinforcedSafetyFactor < 1.0;

  return (
    <section id="scanner" className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Structural Health Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            X-Ray Beam Scanner: <br />
            <span className="text-gold-gradient font-serif italic">Before Deterioration vs. After CFRP Retrofit</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Drag the interactive laser divider below to inspect the structural interior of a 25-year-old industrial beam from our CS Fine Interchem & PIL Chemicals audits.
          </p>
        </div>

        {/* Interactive Scanner Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Cutaway Box (Left 8 Cols) */}
          <div className="lg:col-span-8 glass-panel-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-800 uppercase">
                  Specimen: 25-Yr Industrial Beam Section
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  IS 456 / ACI 440.2R
                </span>
              </div>
              <span className="text-xs font-mono text-amber-700 font-semibold">
                Drag slider or use range bar
              </span>
            </div>

            {/* Split Screen Image / Graphic Simulator */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 select-none bg-slate-900 shadow-inner">
              
              {/* Layer 1 (Full): Retrofitted Restored State (Right Side) */}
              <div className="absolute inset-0 bg-[#0F172A] flex flex-col justify-center p-6 text-white">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="max-w-xs ml-auto space-y-2 text-right">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    RETROFITTED WITH CFRP + PMM
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    Reinforced Structural State
                  </h4>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    Carbon fiber epoxy matrix + self-compacting micro-concrete. 100% moisture sealed, zero carbonation ingress.
                  </p>
                  <div className="pt-2 text-xs font-mono text-amber-300">
                    Tensile Modulus: &gt; 230 GPa • Load: +280%
                  </div>
                </div>

                {/* Simulated Visual Beam Grid Graphic */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 w-48 h-28 border-2 border-emerald-400/80 rounded-lg bg-emerald-950/30 flex items-center justify-center p-3 text-center">
                  <span className="text-[11px] font-mono text-emerald-300 font-semibold">
                    AEROSPACE CARBON FIBER WRAP (CFRP)
                  </span>
                </div>
              </div>

              {/* Layer 2 (Clipped): Damaged Spalled Concrete State (Left Side) */}
              <div
                className="absolute inset-0 bg-[#3F1A1A] flex flex-col justify-center p-6 text-white border-r-2 border-amber-400 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="max-w-xs space-y-2 text-left">
                  <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    PRE-AUDIT DETERIORATION (PAGE 8)
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    Severe Concrete Spalling
                  </h4>
                  <p className="text-xs text-rose-200/90 font-mono leading-relaxed">
                    Honeycombing, exposed corroded rebar, delamination of concrete cover, high carbonation fissures.
                  </p>
                  <div className="pt-2 text-xs font-mono text-rose-300">
                    Safety Factor: CRITICAL DEFICIT
                  </div>
                </div>

                {/* Simulated Damaged Graphic */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-44 h-28 border-2 border-dashed border-rose-400/80 rounded-lg bg-rose-950/40 flex items-center justify-center p-3 text-center">
                  <span className="text-[10px] font-mono text-rose-300 font-semibold">
                    EXPOSED CORRODED REBAR • DEEP CRACKS
                  </span>
                </div>
              </div>

              {/* Interactive Laser Sweep Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 cursor-ew-resize shadow-[0_0_15px_#f59e0b] z-20"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl border border-amber-500 flex items-center justify-center text-xs font-bold font-mono">
                  ↔
                </div>
              </div>

            </div>

            {/* Slider Range Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-600">
                <span className="text-rose-600 font-semibold">← 25-Yr Deteriorated State</span>
                <span className="text-emerald-700 font-semibold">Abhiraaj CFRP Restored →</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

          </div>

          {/* Real-time Load & Deflection Testing Terminal (Right 4 Cols) */}
          <div className="lg:col-span-4 glass-panel-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                Stress Simulation
              </span>
              <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                DYNAMIC FEA
              </span>
            </div>

            {/* Load Adjustment Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono text-slate-700">Applied Structural Load:</label>
                <span className="text-sm font-mono font-bold text-slate-900">{loadTons} Metric Tons</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={loadTons}
                onChange={(e) => setLoadTons(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>10T (Light)</span>
                <span>45T (Normal Plant)</span>
                <span>80T (Heavy Crane)</span>
              </div>
            </div>

            {/* Real-Time Safety Factor Comparison */}
            <div className="space-y-3 text-xs font-mono">
              
              {/* Unreinforced */}
              <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-slate-600 block text-[11px]">Unreinforced Old Beam:</span>
                  <span className="text-[10px] text-slate-500">Subject to shear failure</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${isOverstressed ? 'text-rose-600' : 'text-slate-800'}`}>
                    SF: {unreinforcedSafetyFactor}
                  </span>
                  <span className="text-[10px] block text-rose-600 font-semibold">
                    {isOverstressed ? 'DANGER / FAILS' : 'Marginal'}
                  </span>
                </div>
              </div>

              {/* Abhiraaj CFRP Reinforcement */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center">
                <div>
                  <span className="text-emerald-900 font-semibold block text-[11px]">With Abhiraaj CFRP Wrap:</span>
                  <span className="text-[10px] text-emerald-700">High-tensile epoxy jacket</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-bold text-sm">
                    SF: {cfrpSafetyFactor}
                  </span>
                  <span className="text-[10px] block text-emerald-600 font-semibold">
                    OPTIMAL / CERTIFIED
                  </span>
                </div>
              </div>

            </div>

            {/* Ultrasonic Velocity Readout */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs font-mono">
              <span className="text-[10px] text-slate-500 uppercase block tracking-wider">
                Ultrasonic Pulse Velocity (NDT Audit)
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-800 font-semibold">Concrete Health Grade:</span>
                <span className="text-amber-600 font-bold text-sm">4,620 m/s (Excellent)</span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                Replaces void-filled honeycombing with dense micro-concrete, arresting corrosion completely.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
