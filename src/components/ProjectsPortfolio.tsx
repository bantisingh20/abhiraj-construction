import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, X, ShieldAlert, CheckCircle2, ArrowUpRight, Award } from 'lucide-react';
import { PROJECTS } from '../data/companyData';
import { ProjectItem } from '../types';
import { playClickSound } from '../utils/audioFx';

interface ProjectsProps {
  onOpenInquiryModal: (projectName?: string) => void;
}

export const ProjectsPortfolio: React.FC<ProjectsProps> = ({ onOpenInquiryModal }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects (6)' },
    { id: 'retrofitting', label: 'Retrofitting & Rehabilitation' },
    { id: 'industrial', label: 'Industrial Plants' },
    { id: 'residential', label: 'High-Rise & Luxury Architecture' },
  ];

  const filteredProjects = filterCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filterCategory);

  return (
    <section id="projects" className="py-28 bg-[#FFFDF5] relative border-t border-amber-100 text-slate-900 overflow-hidden">
      {/* CAD grid pattern & ambient yellow glow */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-yellow-300/[0.15] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-amber-900 text-xs font-mono uppercase tracking-widest font-bold shadow-xs">
              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
              <span>Authentic Executed Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Engineering Portfolios & <br />
              <span className="text-amber-600 font-serif italic">Structural Milestones</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Explore our verified accomplishments across chemical processing complexes, high-rise residential towers, and luxury private estates.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = filterCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setFilterCategory(cat.id);
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all font-bold cursor-pointer ${
                    isSelected
                      ? 'text-slate-950'
                      : 'bg-white/80 text-slate-600 border border-amber-200 hover:border-yellow-400 hover:text-slate-950'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 shadow-md shadow-yellow-500/20 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                onClick={() => {
                  playClickSound();
                  setSelectedProject(project);
                }}
                className="group cursor-pointer rounded-3xl bg-white/90 backdrop-blur-xl border border-amber-200/80 overflow-hidden shadow-lg hover:border-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Overlay */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-lg bg-yellow-400 text-slate-950 text-[10px] font-mono font-black uppercase shadow-sm">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-end text-white">
                    <div className="flex items-center gap-1.5 text-xs text-yellow-300 font-mono font-bold drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="truncate max-w-[200px]">{project.clientOrLocation}</span>
                    </div>
                    {project.ageOrScale && (
                      <span className="text-[10.5px] font-mono bg-black/70 border border-white/20 px-2 py-0.5 rounded backdrop-blur-sm text-slate-200 font-semibold">
                        {project.ageOrScale}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-wider mb-1">
                      {project.clientOrLocation}
                    </div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-normal">
                      {project.solution}
                    </p>
                  </div>

                  {/* Key Techniques */}
                  <div className="pt-3 border-t border-amber-100 flex flex-wrap gap-1.5">
                    {project.techniques.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-amber-50 text-slate-700 text-[10px] font-mono border border-amber-200/60 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer Button */}
                  <div className="flex items-center justify-between pt-1 text-xs font-mono text-amber-700 font-black group-hover:text-amber-600">
                    <span>Inspect Technical Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-amber-200 text-slate-900"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold uppercase">
                    <span>AUTHENTIC CASE STUDY</span>
                    <span>•</span>
                    <span>{selectedProject.clientOrLocation}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-700 pt-1">
                    <span className="px-2.5 py-1 bg-yellow-100 border border-yellow-300 rounded text-amber-900 font-bold">
                      Category: {selectedProject.categoryLabel}
                    </span>
                    {selectedProject.ageOrScale && (
                      <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-slate-700 font-semibold">
                        Scale: {selectedProject.ageOrScale}
                      </span>
                    )}
                    {selectedProject.highlight && (
                      <span className="px-2.5 py-1 bg-emerald-100 border border-emerald-300 rounded text-emerald-800 font-bold">
                        {selectedProject.highlight}
                      </span>
                    )}
                  </div>
                </div>

                {/* Image banner */}
                <div className="h-60 rounded-2xl overflow-hidden mb-6 relative border border-amber-200">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                    <div className="text-xs font-mono font-bold text-rose-700 uppercase flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>Deterioration / Challenge</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="text-xs font-mono font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Engineered Solution</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Techniques List */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
                    Key Methodologies & Technologies Deployed
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.techniques.map((tech, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Stats */}
                {selectedProject.stats && selectedProject.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                    {selectedProject.stats.map((st, i) => (
                      <div key={i} className="text-center">
                        <span className="text-[10px] font-mono text-slate-600 uppercase block font-semibold">{st.label}</span>
                        <strong className="text-xs font-mono text-amber-800 font-black">{st.value}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {/* Modal Actions */}
                <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      playClickSound();
                      const proj = selectedProject.title;
                      setSelectedProject(null);
                      onOpenInquiryModal(proj);
                    }}
                    className="flex-1 py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 hover:from-yellow-300 hover:to-amber-500 transition-all text-center shadow-lg shadow-yellow-500/25 cursor-pointer"
                  >
                    Consult on Similar Project
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="py-3.5 px-4 rounded-xl text-xs font-mono text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Close Case Study
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
