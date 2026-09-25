import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon' | 'badge';
  light?: boolean;
}

/**
 * Official Abhiraaj Construction Logo matching PDF Brochure Pages 1-6
 * Features: Heavy Excavator with yellow boom, cabin, tracks, city skyline silhouette, 
 * and yellow/gold-black brand banner with "Abhiraaj CONSTRUCTION" & "BUILDING DREAMS INTO REALITY"
 */
export const AbhiraajLogo: React.FC<LogoProps> = ({ 
  className = "h-12", 
  variant = 'full',
  light = false 
}) => {
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Hexagonal Gold Badge */}
          <polygon points="50,4 92,26 92,74 50,96 8,74 8,26" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <polygon points="50,10 86,29 86,71 50,90 14,71 14,29" fill="#0F172A" />
          
          {/* Skyline Silhouette */}
          <rect x="36" y="32" width="6" height="24" fill="#F59E0B" opacity="0.8" />
          <rect x="44" y="24" width="8" height="32" fill="#FBBF24" />
          <rect x="54" y="28" width="6" height="28" fill="#F59E0B" opacity="0.8" />
          
          {/* Excavator Arm & Bucket Graphic */}
          <path d="M22 62 L38 38 L52 46 L68 34 L78 44" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="78,40 88,48 82,54 74,48" fill="#F59E0B" stroke="#0F172A" strokeWidth="1.5" />
          
          {/* Cabin & Tracks */}
          <rect x="30" y="50" width="22" height="15" rx="3" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
          <rect x="34" y="53" width="7" height="6" rx="1" fill="#0F172A" />
          <rect x="22" y="66" width="38" height="8" rx="4" fill="#0F172A" stroke="#FBBF24" strokeWidth="1.5" />
          
          {/* Brand Letter A */}
          <text x="50" y="85" textAnchor="middle" fill="#FBBF24" fontFamily="Cinzel, serif" fontWeight="900" fontSize="14" letterSpacing="1">
            Abhiraaj
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Brand Logo Image */}
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
        <img
          src="/pdf-images/Abhiraaj Logo.png"
          alt="Abhiraaj Construction logo"
          className="w-full h-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif tracking-widest font-black text-base sm:text-lg uppercase ${
            light ? 'text-white' : 'text-slate-950'
          }`}>
            Abhiraaj
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold bg-amber-400 text-slate-950 tracking-wider">
            CONSTRUCTION
          </span>
        </div>
        <span className={`text-[10px] font-mono tracking-wider font-semibold uppercase ${
          light ? 'text-amber-300' : 'text-amber-800'
        }`}>
          Building Dreams Into Reality
        </span>
        {variant === 'full' && (
          <span className={`text-[8.5px] font-mono tracking-tight hidden sm:block ${
            light ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Specialized Engineering & Construction Co.
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Verified Client Logos from PDF Page 15
 * Exact vector representations for:
 * 1. Chemiesynth Group
 * 2. Pidilite
 * 3. Purecotz
 * 4. AMI (Ami Life Sciences)
 * 5. NOCIL
 */
interface ClientLogoProps {
  clientId: 'chemiesynth' | 'pidilite' | 'purecotz' | 'ami' | 'nocil';
  className?: string;
}

export const ClientVectorLogo: React.FC<ClientLogoProps> = ({ clientId, className = "h-10" }) => {
  switch (clientId) {
    case 'pidilite':
      // Pidilite: Yellow half sun, curved blue swoosh, bold blue "Pidilite"
      return (
        <div className={`flex items-center justify-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all ${className}`}>
          <svg viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 max-w-full">
            {/* Yellow Sun */}
            <circle cx="85" cy="12" r="7" fill="#FACC15" />
            {/* Dynamic Blue Water/Brush Curve */}
            <path d="M35 24 C60 16, 110 16, 145 27 C120 23, 75 23, 40 26 Z" fill="#0284C7" />
            {/* Pidilite Text in Royal Blue */}
            <text x="90" y="44" textAnchor="middle" fill="#0369A1" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.5">
              Pidilite
            </text>
          </svg>
        </div>
      );

    case 'chemiesynth':
      // Chemiesynth Group: Blue test tube / flask with green spiral DNA/fluid band + "Chemiesynth Group" with dots
      return (
        <div className={`flex items-center justify-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all ${className}`}>
          <svg viewBox="0 0 190 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 max-w-full">
            {/* Chemistry Beaker with green wrap */}
            <g transform="translate(10, 6)">
              <rect x="6" y="2" width="10" height="28" rx="5" fill="#0284C7" />
              <path d="M4 14 C12 8, 14 20, 20 16" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
              <path d="M4 22 C12 16, 14 28, 20 24" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            </g>
            {/* Text */}
            <text x="45" y="24" fill="#0284C7" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="16">
              Chemiesynth
            </text>
            <text x="45" y="42" fill="#0284C7" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="14">
              •••••• Group
            </text>
          </svg>
        </div>
      );

    case 'purecotz':
      // Purecotz: Botanical cotton flower emblem + stylized script "Purecotz"
      return (
        <div className={`flex items-center justify-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all ${className}`}>
          <svg viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 max-w-full">
            {/* Cotton flower */}
            <g transform="translate(12, 4)">
              <circle cx="10" cy="12" r="5" fill="#334155" opacity="0.2" />
              <path d="M10 6 C7 3, 3 7, 7 11 C3 14, 6 18, 10 16 C14 18, 18 14, 13 11 C17 7, 13 3, 10 6 Z" stroke="#1E293B" strokeWidth="1.5" fill="#FFFFFF" />
              <path d="M10 16 L10 22 M8 22 L12 22" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            {/* Purecotz Cursive / Handwritten Font */}
            <text x="42" y="32" fill="#1E293B" fontFamily="cursive, Georgia, serif" fontWeight="700" fontSize="22" letterSpacing="0.5">
              Purecotz
            </text>
          </svg>
        </div>
      );

    case 'ami':
      // AMI / Ami Life Sciences: Red angle line, bold black 'M', red dot over 'i', thin baseline
      return (
        <div className={`flex items-center justify-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all ${className}`}>
          <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 max-w-full">
            {/* Red accent slanting stroke */}
            <path d="M22 38 L38 12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            {/* Big M */}
            <path d="M38 38 L48 16 L58 32 L68 16 L78 38" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dot over i */}
            <circle cx="92" cy="12" r="3.5" fill="#EF4444" />
            <line x1="92" y1="20" x2="92" y2="38" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            {/* Baseline */}
            <line x1="12" y1="42" x2="105" y2="42" stroke="#CBD5E1" strokeWidth="1" />
          </svg>
        </div>
      );

    case 'nocil':
      // NOCIL: Hexagonal white/blue badge with crosshairs + bold "NOCIL"
      return (
        <div className={`flex items-center justify-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all ${className}`}>
          <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 max-w-full">
            {/* Hexagon Emblem */}
            <polygon points="25,4 40,12 40,36 25,44 10,36 10,12" fill="#0284C7" />
            <polygon points="25,9 35,15 35,33 25,39 15,33 15,15" fill="#FFFFFF" />
            {/* Crosshair */}
            <line x1="25" y1="9" x2="25" y2="39" stroke="#0284C7" strokeWidth="1.5" />
            <line x1="15" y1="24" x2="35" y2="24" stroke="#0284C7" strokeWidth="1.5" />
            <circle cx="25" cy="24" r="3.5" fill="#0284C7" />
            {/* NOCIL Text */}
            <text x="52" y="32" fill="#0369A1" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1">
              NOCIL
            </text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
