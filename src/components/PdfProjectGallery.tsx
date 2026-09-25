import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, MapPin, X, ShieldAlert, CheckCircle2, ArrowUpRight, 
  Award, Eye, ZoomIn, ChevronLeft, ChevronRight, Layers, Camera, FileText
} from 'lucide-react';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface GalleryPhoto {
  id: string;
  title: string;
  project: string;
  location: string;
  category: 'chemical' | 'highrise' | 'luxury' | 'industrial';
  categoryName: string;
  brochurePage: string;
  image: string;
  description: string;
  techniques: string[];
}

const PDF_PHOTOS: GalleryPhoto[] = [
  // Page 7: CS Fine Interchem
  {
    id: 'cs-fine-1',
    title: '25-Yr Chemical Plant Tower Before Restoration',
    project: 'CS Fine Interchem Pvt. Ltd. (Chemisynth Group)',
    location: 'Vapi GIDC, Gujarat',
    category: 'chemical',
    categoryName: 'Chemical Plant',
    brochurePage: 'Brochure Page 7',
    image: '/projects/cs-fine-tower-before.jpg',
    description: '25-year-old chemical reactor tower subjected to severe acid vapor attack, carbonation cracking, and structural section loss before engineering intervention.',
    techniques: ['Investigation & Auditing', 'Structural Health Scan', 'Deterioration Mapping']
  },
  {
    id: 'cs-fine-2',
    title: 'Multi-Tier Scaffolding & High-Altitude Structural Grouting',
    project: 'CS Fine Interchem Pvt. Ltd. (Chemisynth Group)',
    location: 'Vapi GIDC, Gujarat',
    category: 'chemical',
    categoryName: 'Chemical Plant',
    brochurePage: 'Brochure Page 7',
    image: '/projects/cs-fine-tower-scaffolding.jpg',
    description: 'Zero-downtime execution with perimeter scaffolding, MS structural tiebacks, high-build PMM rebuilding, and red anti-corrosive protective topcoat.',
    techniques: ['RCC Jacketing', 'PMM Structural Repair', 'CFRP Carbon Fiber Wrap', 'Anti-Corrosion Topcoat']
  },

  // Page 8: Defect Diagnostics
  {
    id: 'defect-propping',
    title: 'Heavy Pipe Propping & Delaminated Concrete Breakout',
    project: 'CS Fine Interchem Structural Audit',
    location: 'Vapi GIDC, Gujarat',
    category: 'chemical',
    categoryName: 'Structural Retrofit',
    brochurePage: 'Brochure Page 8',
    image: '/projects/delamination-propping.jpg',
    description: 'Mechanical breakout of hollow concrete cover, installation of heavy steel shoring props, and surface sandblasting to expose rebar matrices.',
    techniques: ['Heavy Shoring Propping', 'Delamination Breakout', 'Anodic Zinc Primer']
  },
  {
    id: 'beam-honeycombing',
    title: 'Beam Honeycombing, Spalled Rebar & Consolidation Voids',
    project: 'Industrial Chemical Complex Audit',
    location: 'Vapi GIDC, Gujarat',
    category: 'chemical',
    categoryName: 'Structural Retrofit',
    brochurePage: 'Brochure Page 8',
    image: '/projects/beam-honeycombing-defect.jpg',
    description: 'Deep interior consolidation voids and oxidized steel reinforcement under vibrating industrial machinery restored via pressure epoxy injection.',
    techniques: ['Epoxy Grout Injection', 'Polymer Modified Micro-Concrete', 'MS Plate Jacketing']
  },

  // Page 9: CS Fine Waterproofing
  {
    id: 'cs-waterproofing-terrace',
    title: 'Chemical Membrane Terrace Waterproofing',
    project: 'CS Fine Interchem Pvt. Ltd.',
    location: 'Vapi GIDC, Gujarat',
    category: 'chemical',
    categoryName: 'Chemical Plant',
    brochurePage: 'Brochure Page 9',
    image: '/projects/cs-fine-terrace-work.jpg',
    description: 'Multi-stage terrace waterproofing combining deep penetration chemical sealers and high-build elastomeric coats to prevent water ingress into plant operations.',
    techniques: ['Chemical Membrane Hybrid', 'Pressure Injection', 'Ponding Test']
  },
  {
    id: 'cs-waterproofing-drain',
    title: 'Parapet Waterproofing & Acid Drainage Gutter',
    project: 'CS Fine Interchem Pvt. Ltd.',
    location: 'Vapi GIDC, Gujarat',
    category: 'chemical',
    categoryName: 'Chemical Plant',
    brochurePage: 'Brochure Page 9',
    image: '/projects/cs-fine-drain-channel.jpg',
    description: 'Engineered gradient stormwater discharge trough and parapet flashing coated with acid-resistant polyurethane barrier.',
    techniques: ['Acid-Resistant Bunding', 'Slope Correction', 'Joint Sealing']
  },
  {
    id: 'cs-waterproofing-finish',
    title: 'Reflective White Elastomeric Waterproofing Finish',
    project: 'CS Fine Interchem Pvt. Ltd.',
    location: 'Vapi GIDC, Gujarat',
    category: 'chemical',
    categoryName: 'Chemical Plant',
    brochurePage: 'Brochure Page 9',
    image: '/projects/cs-fine-waterproofing-finished.jpg',
    description: 'Finished terrace slab with high-albedo solar reflective white topcoat and 100% monolithic water barrier under 10-Year Execution Warranty.',
    techniques: ['Solar Reflective Topcoat', '10-Year Guarantee', 'Thermal Barrier']
  },

  // Page 10: PIL Chemicals Vapi
  {
    id: 'pil-plant-building',
    title: 'PIL Chemicals 25-Year Plant Superstructure',
    project: 'PIL Chemicals Ltd.',
    location: 'GIDC Vapi, Gujarat',
    category: 'chemical',
    categoryName: 'Chemical Plant',
    brochurePage: 'Brochure Page 10',
    image: '/projects/pil-chemicals-plant-building.jpg',
    description: 'Extensive multi-bay chemical facility undergoing plant-wide structural rehabilitation while maintaining uninterrupted chemical synthesis.',
    techniques: ['Plant Structural Health Audit', 'Seismic Ductile Detailing', 'Zero Plant Shutdown']
  },
  {
    id: 'pil-corroded-beam',
    title: 'Severe Rebar Corrosion & Carbonation Deterioration',
    project: 'PIL Chemicals Ltd.',
    location: 'GIDC Vapi, Gujarat',
    category: 'chemical',
    categoryName: 'Structural Retrofit',
    brochurePage: 'Brochure Page 10',
    image: '/projects/pil-chemicals-corroded-beam.jpg',
    description: 'Excessive carbonation and accelerated rebar oxidation in ceiling beams restored using carbonation arrest chemistry and CFRP laminates.',
    techniques: ['Carbonation Reversal', 'CFRP Laminate Bonding', 'High-Yield Jacketing']
  },
  {
    id: 'pil-jacketing-support',
    title: 'Precision Jacketing Support Jacks & Steel Bracing',
    project: 'PIL Chemicals Ltd.',
    location: 'GIDC Vapi, Gujarat',
    category: 'chemical',
    categoryName: 'Structural Retrofit',
    brochurePage: 'Brochure Page 10',
    image: '/projects/pil-chemicals-jacketing-support.jpg',
    description: 'Hydraulic jacking and temporary load transfer enabling safe concrete encasement and high-strength micro-concrete pouring.',
    techniques: ['Hydraulic Load Transfer', 'Micro-Concrete Encasement', 'MS Bracing']
  },

  // Page 11: Purecotz Lifestyle Umargaon
  {
    id: 'purecotz-daylight',
    title: 'Heavy-Duty UPVC Daylight Roof Panels',
    project: 'Purecotz Lifestyle Pvt. Ltd.',
    location: 'Umargaon Industrial Campus, Gujarat',
    category: 'industrial',
    categoryName: 'Industrial Roof',
    brochurePage: 'Brochure Page 11',
    image: '/projects/purecotz-daylight-sheets.jpg',
    description: 'Replacement of aged, brittle FRP panels with shatterproof, UV-resistant UPVC daylight panels ensuring natural illumination without thermal heat buildup.',
    techniques: ['UPVC Daylight Panels', 'Weather-Tight Fasteners', 'Shatterproof Grade']
  },
  {
    id: 'purecotz-bubble-insulation',
    title: 'Radiant Bubble Insulation Thermal Barrier',
    project: 'Purecotz Lifestyle Pvt. Ltd.',
    location: 'Umargaon Industrial Campus, Gujarat',
    category: 'industrial',
    categoryName: 'Industrial Roof',
    brochurePage: 'Brochure Page 11',
    image: '/projects/purecotz-bubble-insulation.jpg',
    description: 'High-performance radiant heat reflective bubble insulation under factory roof purlins, significantly reducing indoor factory temperature for workers.',
    techniques: ['Radiant Barrier Insulation', 'Thermal Heat Reduction', 'Purlin Reinforcement']
  },
  {
    id: 'purecotz-roof-exterior',
    title: 'Industrial Weather-Tight Flashing & Roofline',
    project: 'Purecotz Lifestyle Pvt. Ltd.',
    location: 'Umargaon Industrial Campus, Gujarat',
    category: 'industrial',
    categoryName: 'Industrial Roof',
    brochurePage: 'Brochure Page 11',
    image: '/projects/purecotz-roof-exterior.jpg',
    description: 'Complete exterior roof refurbishment with customized ridge capping and precision guttering resisting monsoon storm winds.',
    techniques: ['Ridge Flashing System', 'Storm Drainage Gutters', 'Corrosion-Free Coated Screws']
  },

  // Page 12: Supreme Eptimo Chembur
  {
    id: 'supreme-chembur-1',
    title: 'G+21 Storey High-Rise Multi-Level Elevation',
    project: 'Supreme Eptimo Residential Tower',
    location: 'Chembur, Mumbai',
    category: 'highrise',
    categoryName: 'High-Rise Tower',
    brochurePage: 'Brochure Page 12',
    image: '/projects/supreme-eptimo-chembur-1.jpg',
    description: 'G+21 luxury high-rise tower facing persistent rainwater seepage on two exterior shear walls, threatening multi-crore luxury apartments.',
    techniques: ['G+21 Altitude Access', 'Shear Wall Waterproofing', 'Hydrophobic Sealant']
  },
  {
    id: 'supreme-chembur-2',
    title: 'Full-Height Scaffold & High-Altitude Chemical Cure',
    project: 'Supreme Eptimo Residential Tower',
    location: 'Chembur, Mumbai',
    category: 'highrise',
    categoryName: 'High-Rise Tower',
    brochurePage: 'Brochure Page 12',
    image: '/projects/supreme-eptimo-chembur-2.jpg',
    description: 'Multi-level suspended staging enabling precision elastomeric injection and external rainscreen coating defying Mumbai coastal winds.',
    techniques: ['Suspended Cradle Work', 'Flexible Polymer Coating', '100% Seepage Cure']
  },

  // Page 13: Haveli Silvassa
  {
    id: 'haveli-silvassa-porch',
    title: 'Grand Classical Haveli Entrance & Ornate Porch',
    project: 'Royal Haveli Estate',
    location: 'Silvassa, DNH',
    category: 'luxury',
    categoryName: 'Luxury Haveli',
    brochurePage: 'Brochure Page 13',
    image: '/projects/haveli-silvassa-porch.jpg',
    description: 'Turnkey architectural waterproofing and facade preservation for grand classical columns, entrance architraves, and terrace balustrades.',
    techniques: ['Heritage Facade Restoration', 'Ornate Masonry Sealing', 'Bespoke Architectural Finish']
  },
  {
    id: 'haveli-silvassa-cornice',
    title: 'Artisanal Waterproofing of White Architectural Cornices',
    project: 'Royal Haveli Estate',
    location: 'Silvassa, DNH',
    category: 'luxury',
    categoryName: 'Luxury Haveli',
    brochurePage: 'Brochure Page 13',
    image: '/projects/haveli-silvassa-cornice-work.jpg',
    description: 'Hand-crafted micro-crystalline waterproofing along carved classical friezes and pediments, preventing moisture staining without altering white plaster detail.',
    techniques: ['Breathable Micro-Crystalline Seal', 'Decorative Frieze Coating', 'Master Craftsman Work']
  },
  {
    id: 'haveli-silvassa-roof',
    title: 'Terracotta Clay Tile Waterproofing & Valley Seal',
    project: 'Royal Haveli Estate',
    location: 'Silvassa, DNH',
    category: 'luxury',
    categoryName: 'Luxury Haveli',
    brochurePage: 'Brochure Page 13',
    image: '/projects/haveli-silvassa-roof-tiles.jpg',
    description: 'Specialized waterproof membrane beneath ornamental terracotta roofing tiles, sealing hip joints and rainwater valleys.',
    techniques: ['Tile Sub-Membrane', 'Ridge Joint Sealant', 'Weatherproof Underlayment']
  },

  // Page 14: Mohini Bunglow Vapi
  {
    id: 'mohini-brickbat',
    title: 'Traditional Brick-Bat Coba Slope & Pressure Curing',
    project: 'Mohini Bunglow (Ayush Hospital)',
    location: 'Balitha, Vapi, Gujarat',
    category: 'luxury',
    categoryName: 'Turnkey Architecture',
    brochurePage: 'Brochure Page 14',
    image: '/projects/mohini-bunglow-brickbat-waterproofing.jpg',
    description: 'Time-tested brick-bat coba terrace waterproofing laid to precise rainwater gradients and cured with continuous water flooding.',
    techniques: ['Brick-Bat Coba', 'Hydrostatic Slope Curing', 'Integral Waterproofing Compound']
  },
  {
    id: 'mohini-slurry',
    title: 'Polymer Slurry Waterproofing Barrier Membrane',
    project: 'Mohini Bunglow (Ayush Hospital)',
    location: 'Balitha, Vapi, Gujarat',
    category: 'luxury',
    categoryName: 'Turnkey Architecture',
    brochurePage: 'Brochure Page 14',
    image: '/projects/mohini-bunglow-slurry-coat.jpg',
    description: 'High-build polymer modified cementitious slurry applied in cross-directional coats to form an impermeable subterranean and terrace barrier.',
    techniques: ['Two-Coat Slurry Membrane', 'Corner Fillet Sealing', 'Crack Bridging']
  },
  {
    id: 'mohini-framing-1',
    title: 'Multi-Storey RCC Framing & Brick Masonry Angle 1',
    project: 'Mohini Bunglow (Ayush Hospital)',
    location: 'Balitha, Vapi, Gujarat',
    category: 'luxury',
    categoryName: 'Turnkey Architecture',
    brochurePage: 'Brochure Page 14',
    image: '/projects/mohini-bunglow-framing-angle1.jpg',
    description: 'Turnkey structural civil engineering: seismic ductile detailing, precision beam-column casting, and high-quality masonry walls.',
    techniques: ['IS 456 Structural Frame', 'High-Strength Rebar Cage', 'Precision Leveling']
  },
  {
    id: 'mohini-framing-2',
    title: 'Structural Slab Cast & Terrace Construction Angle 2',
    project: 'Mohini Bunglow (Ayush Hospital)',
    location: 'Balitha, Vapi, Gujarat',
    category: 'luxury',
    categoryName: 'Turnkey Architecture',
    brochurePage: 'Brochure Page 14',
    image: '/projects/mohini-bunglow-framing-angle2.jpg',
    description: 'Complete multi-level structural framework execution showcasing clean slab finishes, cantilevered balcony projections, and robust column lines.',
    techniques: ['Turnkey Civil Construction', 'Cantilever Casting', 'Quality Inspected Concrete']
  },
];

interface GalleryProps {
  onOpenInquiryModal: (subject?: string) => void;
}

export const PdfProjectGallery: React.FC<GalleryProps> = ({ onOpenInquiryModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'all', label: `All Authentic Photos (${PDF_PHOTOS.length})` },
    { id: 'chemical', label: 'Chemical Plants & CFRP (9)' },
    { id: 'highrise', label: 'Supreme Eptimo G+21 (2)' },
    { id: 'industrial', label: 'Purecotz Roof (3)' },
    { id: 'luxury', label: 'Havelis & Mohini Bunglow (7)' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? PDF_PHOTOS
    : PDF_PHOTOS.filter((p) => p.category === activeCategory);

  const handleNext = () => {
    if (!selectedPhoto) return;
    playClickSound();
    const idx = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIdx = (idx + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIdx]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    playClickSound();
    const idx = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIdx = (idx - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIdx]);
  };

  return (
    <section id="gallery" className="py-28 bg-[#FFFDF5] relative border-t border-amber-200 text-slate-900 overflow-hidden">
      {/* Warm yellow blueprint grid & ambient radial glow */}
      <div className="absolute inset-0 bg-cad-grid-yellow opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[600px] h-[500px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono uppercase tracking-widest font-bold shadow-xs">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>Verified Site Photographic Evidence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Official Project Gallery: <br />
              <span className="text-gold-gradient font-serif italic">Every Site Photo From Official Dossier</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Authentic on-site photographs directly extracted from <strong>Pages 7 to 14 of Abhiraaj Construction's Corporate Dossier</strong>. Click any photograph to inspect engineering techniques and site scope in high resolution.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setActiveCategory(cat.id);
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    isSelected
                      ? 'text-slate-950 shadow-md'
                      : 'bg-white text-slate-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 shadow-md shadow-amber-400/20 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Masonry-Style Interactive Photo Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={photo.id}
                onClick={() => {
                  playScanSound();
                  setSelectedPhoto(photo);
                }}
                className="group cursor-pointer rounded-3xl bg-white border border-amber-200 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-400/15 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Zoom Reveal */}
                <div className="relative h-56 overflow-hidden bg-amber-50">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badge: Brochure Page */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-amber-900 border border-amber-300 text-[10px] font-mono font-bold shadow-xs">
                      {photo.brochurePage}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-amber-400 text-slate-950 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[10px] font-mono text-amber-300 font-bold uppercase truncate">
                      {photo.project}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-200 font-mono">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 font-normal leading-relaxed">
                      {photo.description}
                    </p>
                  </div>

                  {/* Technique Pills */}
                  <div className="pt-2 border-t border-amber-100 flex flex-wrap gap-1.5">
                    {photo.techniques.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[10px] font-mono border border-amber-200 font-medium">
                        {t}
                      </span>
                    ))}
                    {photo.techniques.length > 2 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono">
                        +{photo.techniques.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-1 flex items-center justify-between text-xs font-mono text-amber-700 font-bold group-hover:text-amber-800">
                    <span>Inspect Photo Details</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed High-Resolution Lightbox Modal (portaled to body) */}
        {createPortal(
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playClickSound();
                setSelectedPhoto(null);
              }}
              className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-36 pb-8 bg-slate-950/80 backdrop-blur-xl overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-4xl w-full mx-auto p-6 sm:p-8 shadow-2xl relative max-h-[calc(100vh-11rem)] overflow-y-auto border-2 border-amber-300 text-slate-900"
              >
                {/* Modal Header Bar */}
                <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-mono text-xs font-bold border border-amber-300">
                      {selectedPhoto.brochurePage}
                    </span>
                    <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                      ● Official Abhiraajj Construction Engineering Archive
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 border border-amber-200 transition-colors"
                      title="Previous Photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 border border-amber-200 transition-colors"
                      title="Next Photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        playClickSound();
                        setSelectedPhoto(null);
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors ml-2"
                      title="Close Lightbox"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Photo Display (7 Cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 max-h-[440px] flex items-center justify-center shadow-lg">
                      <img
                        src={selectedPhoto.image}
                        alt={selectedPhoto.title}
                        className="w-full h-auto max-h-[440px] object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
                      <span>Image: {selectedPhoto.image.replace('/projects/', '')}</span>
                      <span className="text-emerald-700 font-bold">Verified Authentic Site Photo</span>
                    </div>
                  </div>

                  {/* Photo Information & Scope (5 Cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    <div>
                      <div className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider mb-1">
                        {selectedPhoto.project}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                        {selectedPhoto.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-600 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{selectedPhoto.location}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                      <span className="text-xs font-mono text-amber-900 font-bold uppercase block">
                        Observed Conditions & Technical Scope
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {selectedPhoto.description}
                      </p>
                    </div>

                    {/* Techniques deployed */}
                    <div>
                      <span className="text-xs font-mono text-slate-800 font-bold block mb-2 uppercase tracking-wider">
                        Engineering Methodologies Deployed:
                      </span>
                      <div className="space-y-1.5">
                        {selectedPhoto.techniques.map((t, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-3 border-t border-amber-200 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          const projectScope = selectedPhoto.project + ' - ' + selectedPhoto.title;
                          setSelectedPhoto(null);
                          onOpenInquiryModal(projectScope);
                        }}
                        className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-transform hover:scale-[1.02] shadow-md shadow-amber-400/20 text-center"
                      >
                        Inquire on This Specific Project
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
