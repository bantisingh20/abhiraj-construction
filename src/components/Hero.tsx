import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, ArrowRight, 
  Activity, Building2, Sparkles, CheckCircle2, ChevronDown, Layers, 
  MapPin, Globe, Award, Sliders, Eye, X, Phone, MessageSquare, 
  Clock, Compass, Radio, Gauge, Film, Terminal, Zap, RefreshCw,
  HardHat, Wrench, ArrowUpRight, Camera
} from 'lucide-react';
import { COMPANY_DETAILS, STATS } from '../data/companyData';
import { playClickSound, playScanSound } from '../utils/audioFx';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenInquiryModal: () => void;
}

const CHANNELS = [
  {
    id: 'industrial-engineering',
    title: 'Heavy Industrial Engineering',
    site: 'Chemical Plants & Heavy Foundations • Vapi GIDC',
    tag: 'FOUNDATIONS',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-crane-working-on-a-construction-site-41559-large.mp4',
    backupVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/projects/cs-fine-tower-before.jpg',
    stats: '25-Yr Plant Revamp • Chemical Resistance'
  },
  {
    id: 'structural-retrofitting',
    title: 'CFRP & Structural Rehabilitation',
    site: 'Chemisynth & PIL Chemicals NDT Audits',
    tag: 'AEROSPACE COMPOSITE',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-workers-and-cranes-41560-large.mp4',
    backupVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: '/projects/delamination-propping.jpg',
    stats: '+310% Strength • Zero Demolition'
  },
  {
    id: 'highrise-waterproofing',
    title: 'G+21 High-Rise Commercial & Residential',
    site: 'Supreme Eptimo Chembur & High Towers',
    tag: 'WATERPROOFING',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-facade-against-the-sky-41484-large.mp4',
    backupVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/projects/supreme-eptimo-chembur-1.jpg',
    stats: '10-Yr Guarantee • Multi-Storey Seepage Cure'
  },
  {
    id: 'luxury-architecture',
    title: 'Turnkey Luxury Bungalows & Havelis',
    site: 'Mohini Bunglow & Silvassa Heritage Estates',
    tag: 'TURNKEY HAVELI',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-architect-looking-at-a-construction-model-41556-large.mp4',
    backupVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: '/projects/haveli-silvassa-porch.jpg',
    stats: 'Bespoke Architecture • Master Craftsmanship'
  }
];

const KINETIC_PHRASES = [
  'AEROSPACE CFRP RETROFITTING',
  'HEAVY INDUSTRIAL CHEMICAL PLANTS',
  'G+21 HIGH-RISE STRUCTURES',
  'TURNKEY HERITAGE ARCHITECTURE'
];

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator, onOpenInquiryModal }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeChannelIdx, setActiveChannelIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState<boolean>(false);
  const [phraseIdx, setPhraseIdx] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Hologram Interactive Canvas
  const holoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  const activeChannel = CHANNELS[activeChannelIdx];

  // Cycling kinetic phrases
  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % KINETIC_PHRASES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Interactive CAD Blueprint Canvas in Yellow & Amber
  useEffect(() => {
    const canvas = holoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 1,
      color: Math.random() > 0.4 ? 'rgba(217, 119, 6,' : 'rgba(234, 179, 8,'
    }));

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.015;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Warm Architectural Yellow Grid Lines
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 65;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Vertical Laser Scanner Wave in Vibrant Yellow
      const scanY = (Math.sin(time * 0.7) * 0.5 + 0.5) * h;
      const grad = ctx.createLinearGradient(0, scanY - 24, 0, scanY + 24);
      grad.addColorStop(0, 'rgba(245, 158, 11, 0)');
      grad.addColorStop(0.5, 'rgba(250, 204, 21, 0.2)');
      grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 24, w, 48);

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.5)';
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.stroke();

      // 3. Floating Engineering Nodes with Connection Lines
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Attraction to mouse cursor (playful interactive feel)
        if (mousePosRef.current.x > 0) {
          const dx = mousePosRef.current.x - p.x;
          const dy = mousePosRef.current.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 170 && d > 10) {
            p.x += (dx / d) * 0.4;
            p.y += (dy / d) * 0.4;
          }
        }

        ctx.fillStyle = `${p.color}0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(217, 119, 6, ${(1 - dist / 110) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // Target crosshair near cursor
      if (mousePosRef.current.x > 0) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(mx - 24, my);
        ctx.lineTo(mx + 24, my);
        ctx.moveTo(mx, my - 24);
        ctx.lineTo(mx, my + 24);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleSwitchChannel = (idx: number) => {
    playScanSound();
    setActiveChannelIdx(idx);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    playClickSound();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] lg:min-h-screen pt-32 sm:pt-40 pb-20 flex flex-col justify-between overflow-hidden bg-white text-slate-900 select-none"
    >
      {/* 1. CINEMATIC VIDEO BACKGROUND WITH WARM ARCHITECTURAL OVERLAY */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          key={activeChannel.video}
          autoPlay
          loop
          muted
          playsInline
          poster={activeChannel.poster}
          className="w-full h-full object-cover filter brightness-[0.9] contrast-105 opacity-25 transition-opacity duration-1000"
        >
          <source src={activeChannel.video} type="video/mp4" />
          <source src={activeChannel.backupVideo} type="video/mp4" />
        </video>

        {/* Crisp White & Radiant Yellow Architectural Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:via-white/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.2),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.12),transparent_60%)]" />
      </div>

      {/* 2. INTERACTIVE CAD BLUEPRINT CANVAS */}
      <canvas 
        ref={holoCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
      />

      {/* 3. HERO CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Kinetic Typography & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Slogan Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-100/90 border-2 border-amber-300 text-amber-900 text-xs font-mono tracking-wider uppercase shadow-md shadow-amber-400/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span className="font-black">{COMPANY_DETAILS.tagline.toUpperCase()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-slate-800 font-bold">ESTD 2025</span>
            </div>

            {/* Main Headline with Kinetic Word Shifter */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.05]">
                Enduring Structures, <br />
                <span className="text-gold-gradient font-serif italic">
                  Industrial Realities.
                </span>
              </h1>
              
              {/* Dynamic Animated Sub-concept Badge */}
              <div className="h-9 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phraseIdx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-amber-900 uppercase tracking-widest bg-amber-200/80 px-3.5 py-1.5 rounded-xl border border-amber-400 shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                    <span>{KINETIC_PHRASES[phraseIdx]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Official Narrative */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              From heavy chemical processing plants for <strong>Chemisynth & PIL Chemicals</strong>, to multi-level high-rise waterproofing (Supreme Eptimo Chembur) and turnkey luxury havelis in Silvassa — our multidisciplinary engineers deliver certified certainty.
            </p>

            {/* High-Contrast Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => {
                  playClickSound();
                  onOpenInquiryModal();
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-xl shadow-amber-400/30 flex items-center gap-3 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 border-2 border-amber-300"
              >
                <span>Consult Architect & Engineer</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenEstimator();
                }}
                className="px-7 py-4 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500 text-amber-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all hover:scale-105 shadow-md shadow-amber-400/10"
              >
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Scope & Cost Estimator</span>
              </button>
            </div>

            {/* 4 Stats Chips with White & Yellow Theme */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6">
              {STATS.map((stat, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70 transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-700 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 uppercase tracking-tight mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono line-clamp-1 mt-0.5">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Architectural Video Stream Switcher & Live HUD */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Stream Channel Card HUD in Crisp White Glass with Yellow Accents */}
            <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border-2 border-amber-300 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold">
                  <Film className="w-4 h-4 text-amber-600" />
                  <span>CAD ARCHITECTURAL STREAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 hover:text-amber-800 transition-colors border border-amber-200"
                    title={isPlaying ? 'Pause Reel' : 'Play Reel'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsCinemaModalOpen(true)}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 hover:text-amber-800 transition-colors border border-amber-200"
                    title="Fullscreen Cinema Mode"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Active Stream Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="text-amber-700 font-bold uppercase tracking-wider">{activeChannel.tag}</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE 1080p FEED
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-950 leading-tight">
                  {activeChannel.title}
                </h3>
                <p className="text-xs text-slate-600">
                  {activeChannel.site}
                </p>
                <div className="text-[11px] font-mono text-amber-900 font-semibold pt-1">
                  Scope: {activeChannel.stats}
                </div>
              </div>

              {/* 4 Interactive Stream Tabs */}
              <div className="space-y-2 pt-2 border-t border-amber-200">
                <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-bold">
                  Switch Verified Engineering Project Feed:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CHANNELS.map((ch, idx) => {
                    const isSelected = idx === activeChannelIdx;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => handleSwitchChannel(idx)}
                        className={`p-2.5 rounded-xl text-left text-xs font-mono transition-all border ${
                          isSelected
                            ? 'bg-amber-100/80 border-amber-500 text-amber-950 font-bold shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-amber-50/50'
                        }`}
                      >
                        <div className="font-bold truncate text-slate-900">{ch.tag}</div>
                        <div className="text-[9px] text-slate-500 truncate">{ch.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Telemetry Info */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-[10px] font-mono text-slate-700">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {currentTime}
                </span>
                <span className="text-amber-800 font-bold">
                  LAT 20.3893° N • LNG 72.9106° E
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* 4. BOTTOM SCROLL INDICATOR */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pt-8 flex justify-between items-center text-xs font-mono text-slate-500 border-t border-amber-200">
        <span className="hidden sm:inline font-bold text-amber-900">OFFICIAL ARCHITECTURAL FIRM DOSSIER</span>
        <a 
          href="#about"
          onClick={playClickSound}
          className="flex items-center gap-2 text-amber-700 font-bold hover:text-amber-900 transition-colors mx-auto sm:mx-0"
        >
          <span>EXPLORE ABHIRAJ CONSTRUCTION</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-600" />
        </a>
        <span className="hidden sm:inline font-semibold">VAPI • DAMAN • SILVASSA • MUMBAI</span>
      </div>

      {/* Cinema Fullscreen Modal */}
      <AnimatePresence>
        {isCinemaModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border-2 border-amber-400 bg-black shadow-2xl">
              <button
                onClick={() => setIsCinemaModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
              <video
                autoPlay
                controls
                className="w-full max-h-[80vh] object-contain"
                src={activeChannel.video}
              />
              <div className="p-4 bg-slate-950 flex justify-between items-center text-xs font-mono text-slate-300">
                <span className="font-bold text-amber-400">{activeChannel.title}</span>
                <span>{activeChannel.site}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
