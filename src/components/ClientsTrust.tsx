import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { ClientVectorLogo } from './BrandLogos';

interface ClientItem {
  id: 'pidilite' | 'chemiesynth' | 'purecotz' | 'ami' | 'nocil';
  name: string;
  sector: string;
  relationship: string;
  brochurePage: string;
  badge: string;
}

const CLIENT_LIST: ClientItem[] = [
  {
    id: 'chemiesynth',
    name: 'CS Fine Interchem (Chemisynth Group)',
    sector: 'Specialty Chemicals & Pharma Intermediates',
    relationship: 'Entrusted Abhiraj Construction with complete 25-year structural rehabilitation, chemical plant terrace waterproofing, and CFRP beam strengthening.',
    brochurePage: 'Page 7, 8, 9 & 15',
    badge: 'Anchor Chemical Client',
  },
  {
    id: 'pidilite',
    name: 'Pidilite Industries',
    sector: 'Construction Chemicals & Adhesives (Dr. Fixit)',
    relationship: 'Premier technical collaborator for specialized chemical membranes, high-build polymer mortars, and advanced crystal waterproofing.',
    brochurePage: 'Page 15 (Direct Client)',
    badge: 'Industry Titan',
  },
  {
    id: 'purecotz',
    name: 'Purecotz Lifestyle Pvt. Ltd.',
    sector: 'Textile Manufacturing & Apparel Infrastructure',
    relationship: 'Executed complete factory roof replacement in Umargaon using radiant bubble insulation sheets and heavy-duty UPVC daylight panels.',
    brochurePage: 'Page 11 & 15',
    badge: 'Umargaon Campus',
  },
  {
    id: 'ami',
    name: 'AMI (Ami Life Sciences)',
    sector: 'Pharmaceuticals & API Manufacturing',
    relationship: 'Specialized civil plant engineering, structural maintenance, cleanroom integrity, and anti-corrosion flooring works.',
    brochurePage: 'Page 15 (Direct Client)',
    badge: 'Pharma Corporate',
  },
  {
    id: 'nocil',
    name: 'NOCIL Limited (Arvind Mafatlal Group)',
    sector: 'Rubber Chemicals & Heavy Polymers',
    relationship: 'Structural civil engineering, plant maintenance, acid-resistant bunding, and high-tensile concrete works.',
    brochurePage: 'Page 15 (Direct Client)',
    badge: 'Industrial Leader',
  },
];

export const ClientsTrust: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="clients" className="py-28 bg-[#FFFDF5] relative border-t border-amber-100 text-slate-900 overflow-hidden">
      {/* CAD grid pattern & yellow ambient glows */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-yellow-300/[0.15] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-amber-900 text-xs font-mono uppercase tracking-widest font-bold shadow-xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Official Client Endorsements</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Trusted by Leaders in <br />
            <span className="text-amber-600 font-serif italic">Chemicals, Textiles & High-Rise Estates</span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            The exact institutional clients featured on <strong>Page 15 of Abhiraj Construction's official dossier</strong>, showcasing our vetted execution capability across critical plants and industrial assets.
          </p>
        </motion.div>

        {/* 5 Official Client Cards with Vector Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
          {CLIENT_LIST.map((client, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={client.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isHovered
                    ? 'bg-white border-yellow-400 shadow-xl shadow-yellow-400/20 -translate-y-2'
                    : 'bg-white/80 backdrop-blur-md border-amber-200/70 hover:border-yellow-400/80 shadow-sm'
                }`}
              >
                {/* Yellow Top Indicator Strip on Hover */}
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 transition-opacity ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                <div>
                  {/* Verified Client Logo from PDF Page 15 */}
                  <div className="mb-5 p-2 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center justify-center">
                    <ClientVectorLogo clientId={client.id} className="h-12 w-full text-slate-900" />
                  </div>

                  {/* Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-amber-800 border border-yellow-300">
                      {client.badge}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 font-medium">
                      {client.brochurePage}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {client.name}
                  </h3>

                  <p className="text-[11px] font-mono text-slate-500 mt-1">
                    {client.sector}
                  </p>
                </div>

                {/* Scope Description */}
                <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-amber-100 leading-relaxed font-normal">
                  {client.relationship}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quality & Execution Warranty Assurance Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50/60 to-white border-2 border-yellow-400/60 p-8 sm:p-12 shadow-xl relative overflow-hidden"
        >
          {/* Subtle Decorative Pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Sparkles className="w-72 h-72 text-yellow-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>OFFICIAL EXECUTION WARRANTY CLAUSE</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-slate-950 leading-snug">
                "We deliver quality output — bringing complete confidence to provide long-term warranties on our structural works."
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                "As said earlier, we not only execute, but we also monitor and ensure that we have given quality output, and that brings confidence in us to give long term warranty on the works we have done. <strong className="text-amber-800 font-bold">ABHIRAJ CONSTRUCTIONS makes you feel your structure is safe in its hands.</strong>"
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-4 rounded-2xl bg-white border border-yellow-300 shadow-md flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm">
                  10Y
                </div>
                <div>
                  <strong className="text-xs font-black text-slate-900 block">10-Year Execution Warranty</strong>
                  <span className="text-[10.5px] text-amber-700 font-mono font-bold">100% Guaranteed Structural Safety</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shadow-sm border border-emerald-300">
                  100%
                </div>
                <div>
                  <strong className="text-xs font-black text-slate-900 block">Vetted Quality Assurance</strong>
                  <span className="text-[10.5px] text-slate-600 font-mono font-medium">ASTM & IS 456 Validated Testing</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
