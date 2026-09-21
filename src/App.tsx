import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { StructuralDefectDiagnosticLab } from './components/StructuralDefectDiagnosticLab';
import { RetrofittingInteractiveTech } from './components/RetrofittingInteractiveTech';
import { PdfProjectGallery } from './components/PdfProjectGallery';
import { ProjectsPortfolio } from './components/ProjectsPortfolio';
import { ClientsTrust } from './components/ClientsTrust';
import { InteractiveEstimateCalculator } from './components/InteractiveEstimateCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { CustomCursor } from './components/CustomCursor';
import { Phone, MessageSquare, Calculator } from 'lucide-react';
import { COMPANY_DETAILS } from './data/companyData';
import { playClickSound } from './utils/audioFx';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('');
  const [initialContactMsg, setInitialContactMsg] = useState('');

  // Top window scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenEstimator = () => {
    playClickSound();
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = (subject?: string) => {
    playClickSound();
    setModalSubject(subject || 'General Consultation');
    setModalOpen(true);
  };

  const handleSelectServiceForEstimate = (serviceTitle: string) => {
    handleOpenEstimator();
  };

  const handleOpenInquiryWithEstimateData = (summary: string) => {
    setModalSubject(`Technical Scope: ${summary}`);
    setInitialContactMsg(`Project Scope details: ${summary}`);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-yellow-400 selection:text-slate-950 relative font-sans">
      
      {/* 1. Custom Interactive Glow Cursor */}
      <CustomCursor />

      {/* 2. Window Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 z-[999] origin-left shadow-md shadow-yellow-500/50"
      />

      {/* 3. Top Navbar */}
      <Navbar 
        onOpenEstimator={handleOpenEstimator}
        onOpenInquiryModal={() => handleOpenInquiry('Executive Architectural Consultation')}
      />

      {/* 4. Main Page Flow */}
      <main>
        {/* Hero with Kinetic Typography and White & Yellow HUD */}
        <Hero 
          onOpenEstimator={handleOpenEstimator}
          onOpenInquiryModal={() => handleOpenInquiry('Project Proposal Request')}
        />

        {/* Corporate Identity & Official Registration */}
        <AboutSection 
          onOpenInquiryModal={() => handleOpenInquiry('On-Site Structural Audit')}
        />

        {/* Comprehensive Services Matrix with Interactive Chemical Simulator */}
        <ServicesSection 
          onSelectServiceForEstimate={handleSelectServiceForEstimate}
          onOpenInquiryModal={(svc) => handleOpenInquiry(svc ? `Service Scope: ${svc}` : undefined)}
        />

        {/* 25-Yr Industrial Structure: NDT Ultrasound Defect & CFRP Restoration Lab */}
        <StructuralDefectDiagnosticLab 
          onOpenInquiryModal={(subject) => handleOpenInquiry(subject)}
        />

        {/* Futuristic Retrofitting & CFRP Interactive Lab with Split Slider */}
        <RetrofittingInteractiveTech 
          onOpenInquiryModal={(tech) => handleOpenInquiry(tech)}
        />

        {/* Interactive Site Gallery with Authentic PDF Dossier Photos & Full Lightbox */}
        <PdfProjectGallery 
          onOpenInquiryModal={(project) => handleOpenInquiry(project ? `Inquiry regarding PDF Project: ${project}` : undefined)}
        />

        {/* Authentic Case Studies & Projects Portfolio */}
        <ProjectsPortfolio 
          onOpenInquiryModal={(project) => handleOpenInquiry(project ? `Inquiry for Project: ${project}` : undefined)}
        />

        {/* Corporate Clients & Execution Warranty */}
        <ClientsTrust />

        {/* Interactive Project Scope & Cost Estimator */}
        <InteractiveEstimateCalculator 
          onOpenInquiryWithData={handleOpenInquiryWithEstimateData}
        />

        {/* Official Contact & Terminal */}
        <ContactSection initialMessage={initialContactMsg} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modal */}
      <InquiryModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefillSubject={modalSubject}
      />

      {/* Floating Action Island for Direct Hotline & WhatsApp */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
        {/* Estimator Quick Jump */}
        <button
          onClick={handleOpenEstimator}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 hover:bg-yellow-50 text-slate-900 border-2 border-yellow-400 text-xs font-mono shadow-xl backdrop-blur-xl transition-all hover:scale-105 cursor-pointer font-bold"
          title="Jump to Estimator"
        >
          <Calculator className="w-4 h-4 text-amber-600" />
          <span>Scope Estimator</span>
        </button>

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/91${COMPANY_DETAILS.rawPhone}?text=Hello%20Mr.%20Abhinay%20Palkar%20(Abhiraj%20Construction),%20I%20would%20like%20to%20consult%20on%20an%20engineering%20project.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickSound}
          className="flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 cursor-pointer"
          title="Direct WhatsApp Chat"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Director</span>
        </a>

        {/* Direct Phone Call Button */}
        <a
          href={`tel:${COMPANY_DETAILS.rawPhone}`}
          onClick={playClickSound}
          className="flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-yellow-500/30 transition-all hover:scale-105 cursor-pointer"
          title="Direct Call Hotline"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">{COMPANY_DETAILS.phone}</span>
        </a>
      </div>

    </div>
  );
}
