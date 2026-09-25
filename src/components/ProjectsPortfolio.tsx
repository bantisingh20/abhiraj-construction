import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, X, ShieldAlert, CheckCircle2, ArrowUpRight, Award, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const handleNext = () => {
    if (!selectedProject) return;
    playClickSound();
    const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = (idx + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIdx]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    playClickSound();
    const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const prevIdx = (idx - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIdx]);
  };

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

        {/* Detailed Case Study Modal (portaled to body) */}
        {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-36 pb-8 bg-slate-950/80 backdrop-blur-xl overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-4xl mx-auto p-6 sm:p-8 shadow-2xl relative max-h-[calc(100vh-11rem)] overflow-y-auto border-2 border-amber-300 text-slate-900"
              >
                {/* Modal Header Bar */}
                <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-mono text-xs font-bold border border-amber-300 shrink-0">
                      AUTHENTIC CASE STUDY
                    </span>
                    <span className="text-xs font-mono text-slate-500 hidden sm:inline truncate">
                      ● {selectedProject.clientOrLocation}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 border border-amber-200 transition-colors"
                      title="Previous Project"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 border border-amber-200 transition-colors"
                      title="Next Project"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors ml-2"
                      title="Close Case Study"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Image + Methodologies + Stats (7 Cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 max-h-[420px] flex items-center justify-center shadow-lg">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-auto max-h-[420px] object-cover"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 px-1">
                      <span className="px-2.5 py-1 bg-yellow-100 border border-yellow-300 rounded text-amber-900 font-bold">
                        {selectedProject.categoryLabel}
                      </span>
                      {selectedProject.highlight && (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> {selectedProject.highlight}
                        </span>
                      )}
                    </div>

                    {/* Techniques deployed (moved under image) */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-mono text-slate-800 font-bold block mb-2.5 uppercase tracking-wider">
                        Engineering Methodologies Deployed:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                        {selectedProject.techniques.map((tech, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Stats (moved under image) */}
                    {selectedProject.stats && selectedProject.stats.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                        {selectedProject.stats.map((st, i) => (
                          <div key={i} className="text-center">
                            <span className="text-[10px] font-mono text-slate-600 uppercase block font-semibold">{st.label}</span>
                            <strong className="text-xs font-mono text-amber-800 font-black">{st.value}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Information & Scope (5 Cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    <div>
                      <div className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider mb-1">
                        {selectedProject.clientOrLocation}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                        {selectedProject.title}
                      </h3>
                      {selectedProject.ageOrScale && (
                        <p className="text-xs font-mono text-slate-600 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>{selectedProject.ageOrScale}</span>
                        </p>
                      )}
                    </div>

                    {/* Challenge */}
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                      <span className="text-xs font-mono text-rose-700 font-bold uppercase flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        Deterioration / Challenge
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                      <span className="text-xs font-mono text-emerald-800 font-bold uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Engineered Solution
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="pt-3 border-t border-amber-200 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          playClickSound();
                          const proj = selectedProject.title;
                          setSelectedProject(null);
                          onOpenInquiryModal(proj);
                        }}
                        className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-transform hover:scale-[1.02] shadow-md shadow-amber-400/20 text-center cursor-pointer"
                      >
                        Consult on Similar Project
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
        )}

      </div>
    </section>
  );
};
