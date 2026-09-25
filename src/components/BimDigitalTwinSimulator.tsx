import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Building2, Layers, ShieldAlert, Activity, RotateCw, ZoomIn, 
  ZoomOut, Play, Pause, Compass, Eye, Sparkles, Wind, 
  CheckCircle2, Sliders, Info, ShieldCheck, ArrowRight, CornerUpRight
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { playClickSound, playScanSound } from '../utils/audioFx';

type ConstructionPhase = 1 | 2 | 3 | 4;

interface BimSimulatorProps {
  onOpenConsultation?: () => void;
}

export const BimDigitalTwinSimulator: React.FC<BimSimulatorProps> = ({ onOpenConsultation }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // 3D Camera State
  const [yaw, setYaw] = useState<number>(0.75); // horizontal rotation angle in radians
  const [pitch, setPitch] = useState<number>(0.35); // vertical tilt in radians
  const [zoom, setZoom] = useState<number>(1.0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  
  // Interactive Simulation Controls
  const [phase, setPhase] = useState<ConstructionPhase>(4);
  const [seismicActive, setSeismicActive] = useState<boolean>(false);
  const [seismicMagnitude, setSeismicMagnitude] = useState<number>(7.2);
  const [windActive, setWindActive] = useState<boolean>(false);
  const [xRaySlice, setXRaySlice] = useState<number>(100); // 0% to 100% floor height
  const [renderMode, setRenderMode] = useState<'wireframe' | 'solid' | 'stress'>('solid');

  // Telemetry state
  const [baseShear, setBaseShear] = useState<number>(1240);
  const [driftRatio, setDriftRatio] = useState<number>(0.0018);
  const [structuralScore, setStructuralScore] = useState<number>(99.6);

  // Dragging state
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartDistRef = useRef<number | null>(null);

  // Animation frame
  const animFrameIdRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Handle Mouse Drag for 3D rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setYaw(prev => prev + dx * 0.008);
    setPitch(prev => Math.max(-1.1, Math.min(1.1, prev + dy * 0.008)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Handle Touch for Mobile Drag & Pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setAutoRotate(false);
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const dx = e.touches[0].clientX - lastMousePosRef.current.x;
      const dy = e.touches[0].clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      setYaw(prev => prev + dx * 0.01);
      setPitch(prev => Math.max(-1.1, Math.min(1.1, prev + dy * 0.01)));
    } else if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const factor = currentDist / touchStartDistRef.current;
      setZoom(prev => Math.max(0.6, Math.min(2.0, prev * factor)));
      touchStartDistRef.current = currentDist;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchStartDistRef.current = null;
  };

  // Main 3D Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localYaw = yaw;
    let localPitch = pitch;

    const render = () => {
      timeRef.current += 0.02;
      const t = timeRef.current;

      // Handle auto rotation
      if (autoRotate && !isDraggingRef.current) {
        localYaw += 0.005;
        setYaw(localYaw);
      } else {
        localYaw = yaw;
      }
      localPitch = pitch;

      // Handle seismic oscillation
      let seismicOffset = 0;
      if (seismicActive) {
        const freq = 12;
        const amp = (seismicMagnitude / 8.5) * 16;
        seismicOffset = Math.sin(t * freq) * amp * Math.exp(-0.05 * (t % 10));
        setDriftRatio(parseFloat((0.0018 + (amp * 0.0004)).toFixed(4)));
        setBaseShear(Math.round(1240 + Math.abs(seismicOffset) * 85));
        setStructuralScore(parseFloat(Math.max(92.4, 99.6 - (seismicMagnitude * 0.8)).toFixed(1)));
      } else {
        setDriftRatio(0.0018);
        setBaseShear(1240);
        setStructuralScore(99.6);
      }

      // Resize canvas to display size
      const width = canvas.parentElement ? canvas.parentElement.clientWidth : 800;
      const height = Math.min(580, Math.max(380, window.innerWidth < 640 ? 380 : 520));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Gradient Background (High-Tech Engineering Laboratory Dark Canvas)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#090D16');
      bgGrad.addColorStop(1, '#0F172A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Blueprint Grid Floor
      const cx = width / 2;
      const cy = height / 2 + 50;

      // 3D Matrix Projection Helper
      const cosY = Math.cos(localYaw);
      const sinY = Math.sin(localYaw);
      const cosP = Math.cos(localPitch);
      const sinP = Math.sin(localPitch);

      const project = (x: number, y: number, z: number) => {
        // Apply seismic displacement along x
        const curX = x + (y > 0 ? (y / 240) * seismicOffset : 0);
        const curY = y;
        const curZ = z;

        // Rotate around Y (yaw)
        const x1 = curX * cosY - curZ * sinY;
        const z1 = curX * sinY + curZ * cosY;

        // Rotate around X (pitch)
        const y2 = curY * cosP - z1 * sinP;
        const z2 = curY * sinP + z1 * cosP;

        // Perspective projection
        const fov = 480 * zoom;
        const depth = z2 + 650;
        const scale = fov / Math.max(10, depth);

        return {
          px: cx + x1 * scale,
          py: cy - y2 * scale,
          depth,
          scale
        };
      };

      // 1. Draw Grid Base with Laser Radar Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      const gridSize = 280;
      const gridStep = 40;

      for (let gx = -gridSize; gx <= gridSize; gx += gridStep) {
        const p1 = project(gx, 0, -gridSize);
        const p2 = project(gx, 0, gridSize);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }

      for (let gz = -gridSize; gz <= gridSize; gz += gridStep) {
        const p1 = project(-gridSize, 0, gz);
        const p2 = project(gridSize, 0, gz);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }

      // Radar Concentric Circles
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.beginPath();
      for (let r = 80; r <= 240; r += 80) {
        for (let a = 0; a <= Math.PI * 2; a += 0.2) {
          const p = project(Math.cos(a) * r, 0, Math.sin(a) * r);
          if (a === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
      }
      ctx.stroke();
      ctx.restore();

      // 2. Render Building Geometry Based on Construction Phase
      const floors = 7; // Represents multi-tier structural elevations
      const floorHeight = 36;
      const buildingWidth = 140;
      const buildingDepth = 140;
      const maxAllowedY = (xRaySlice / 100) * (floors * floorHeight);

      // PHASE 1: Deep Piling Substructure (Below 0 ground level)
      if (phase >= 1) {
        const pileRadius = 8;
        const pileDepth = 90;
        const pilePositions = [
          [-buildingWidth/2, -buildingDepth/2],
          [buildingWidth/2, -buildingDepth/2],
          [-buildingWidth/2, buildingDepth/2],
          [buildingWidth/2, buildingDepth/2],
          [0, 0],
          [-buildingWidth/2, 0],
          [buildingWidth/2, 0],
          [0, -buildingDepth/2],
          [0, buildingDepth/2],
        ];

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.lineWidth = 2;
        pilePositions.forEach(([px, pz]) => {
          const top = project(px, 0, pz);
          const bottom = project(px, -pileDepth, pz);
          ctx.beginPath();
          ctx.moveTo(top.px, top.py);
          ctx.lineTo(bottom.px, bottom.py);
          ctx.stroke();

          // Anchor rings
          ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
          ctx.beginPath();
          ctx.arc(bottom.px, bottom.py, pileRadius * bottom.scale, 0, Math.PI * 2);
          ctx.fill();
        });

        // Foundation Raft Slab
        const pRaft1 = project(-buildingWidth/2 - 15, 0, -buildingDepth/2 - 15);
        const pRaft2 = project(buildingWidth/2 + 15, 0, -buildingDepth/2 - 15);
        const pRaft3 = project(buildingWidth/2 + 15, 0, buildingDepth/2 + 15);
        const pRaft4 = project(-buildingWidth/2 - 15, 0, buildingDepth/2 + 15);

        ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(pRaft1.px, pRaft1.py);
        ctx.lineTo(pRaft2.px, pRaft2.py);
        ctx.lineTo(pRaft3.px, pRaft3.py);
        ctx.lineTo(pRaft4.px, pRaft4.py);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // PHASE 2 & ABOVE: Structural Steel Rebar Framing & RCC Columns
      if (phase >= 2) {
        const columns = [
          [-buildingWidth/2, -buildingDepth/2],
          [buildingWidth/2, -buildingDepth/2],
          [-buildingWidth/2, buildingDepth/2],
          [buildingWidth/2, buildingDepth/2],
          [0, -buildingDepth/2],
          [0, buildingDepth/2],
          [-buildingWidth/2, 0],
          [buildingWidth/2, 0],
          [0, 0]
        ];

        // Draw Columns up to active floor slice
        columns.forEach(([colX, colZ]) => {
          const colBase = project(colX, 0, colZ);
          const colTop = project(colX, maxAllowedY, colZ);

          if (renderMode === 'stress') {
            // Stress Gradient (red at base, yellow in middle, cyan at top)
            const grad = ctx.createLinearGradient(colBase.px, colBase.py, colTop.px, colTop.py);
            grad.addColorStop(0, '#EF4444');
            grad.addColorStop(0.5, '#F59E0B');
            grad.addColorStop(1, '#06B6D4');
            ctx.strokeStyle = grad;
          } else if (phase === 2) {
            ctx.strokeStyle = '#0284C7'; // Steel blue rebar
          } else if (phase === 3) {
            ctx.strokeStyle = '#F59E0B'; // Carbon fiber amber
          } else {
            ctx.strokeStyle = 'rgba(226, 232, 240, 0.8)'; // Solid modern white/silver
          }

          ctx.lineWidth = phase === 3 ? 4 : 2.5;
          ctx.beginPath();
          ctx.moveTo(colBase.px, colBase.py);
          ctx.lineTo(colTop.px, colTop.py);
          ctx.stroke();

          // PHASE 3: CFRP Carbon Matrix Rings on Columns
          if (phase >= 3) {
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 2;
            for (let y = 10; y < maxAllowedY; y += 22) {
              const ringPt = project(colX, y, colZ);
              ctx.beginPath();
              ctx.arc(ringPt.px, ringPt.py, 5 * ringPt.scale, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        });

        // Draw Floor Slabs
        for (let fl = 1; fl <= floors; fl++) {
          const floorY = fl * floorHeight;
          if (floorY > maxAllowedY) break;

          const pF1 = project(-buildingWidth/2, floorY, -buildingDepth/2);
          const pF2 = project(buildingWidth/2, floorY, -buildingDepth/2);
          const pF3 = project(buildingWidth/2, floorY, buildingDepth/2);
          const pF4 = project(-buildingWidth/2, floorY, buildingDepth/2);

          // Floor fill
          if (renderMode === 'solid') {
            ctx.fillStyle = phase === 4 
              ? 'rgba(15, 23, 42, 0.75)' 
              : phase === 3 
              ? 'rgba(245, 158, 11, 0.15)' 
              : 'rgba(2, 132, 199, 0.15)';
            ctx.beginPath();
            ctx.moveTo(pF1.px, pF1.py);
            ctx.lineTo(pF2.px, pF2.py);
            ctx.lineTo(pF3.px, pF3.py);
            ctx.lineTo(pF4.px, pF4.py);
            ctx.closePath();
            ctx.fill();
          }

          // Floor Perimeter Beams
          ctx.strokeStyle = phase === 3 ? '#F59E0B' : '#38BDF8';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pF1.px, pF1.py);
          ctx.lineTo(pF2.px, pF2.py);
          ctx.lineTo(pF3.px, pF3.py);
          ctx.lineTo(pF4.px, pF4.py);
          ctx.closePath();
          ctx.stroke();

          // Cross Shear Bracing on every alternate floor
          if (fl % 2 === 1 && phase >= 2) {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pF1.px, pF1.py);
            ctx.lineTo(pF3.px, pF3.py);
            ctx.moveTo(pF2.px, pF2.py);
            ctx.lineTo(pF4.px, pF4.py);
            ctx.stroke();
          }
        }
      }

      // PHASE 4: Modern Glass Facade & Architectural Curtain Wall
      if (phase === 4 && renderMode !== 'wireframe') {
        const topY = Math.min(maxAllowedY, floors * floorHeight);
        
        // 4 Facade Polygons
        const corners = [
          [-buildingWidth/2, -buildingDepth/2],
          [buildingWidth/2, -buildingDepth/2],
          [buildingWidth/2, buildingDepth/2],
          [-buildingWidth/2, buildingDepth/2],
        ];

        for (let i = 0; i < 4; i++) {
          const next = (i + 1) % 4;
          const [x1, z1] = corners[i];
          const [x2, z2] = corners[next];

          const pB1 = project(x1, 0, z1);
          const pB2 = project(x2, 0, z2);
          const pT2 = project(x2, topY, z2);
          const pT1 = project(x1, topY, z1);

          // Glass Reflection Gradient
          const glassGrad = ctx.createLinearGradient(pB1.px, pB1.py, pT2.px, pT2.py);
          glassGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
          glassGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
          glassGrad.addColorStop(1, 'rgba(14, 165, 233, 0.28)');

          ctx.fillStyle = glassGrad;
          ctx.beginPath();
          ctx.moveTo(pB1.px, pB1.py);
          ctx.lineTo(pB2.px, pB2.py);
          ctx.lineTo(pT2.px, pT2.py);
          ctx.lineTo(pT1.px, pT1.py);
          ctx.closePath();
          ctx.fill();

          // Mullions (Vertical Glass Dividers)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 0.8;
          for (let frac = 0.25; frac <= 0.75; frac += 0.25) {
            const mx = x1 + (x2 - x1) * frac;
            const mz = z1 + (z2 - z1) * frac;
            const pmB = project(mx, 0, mz);
            const pmT = project(mx, topY, mz);
            ctx.beginPath();
            ctx.moveTo(pmB.px, pmB.py);
            ctx.lineTo(pmT.px, pmT.py);
            ctx.stroke();
          }
        }

        // Roof Crown / Architectural Skylight Node
        if (maxAllowedY >= floors * floorHeight) {
          const crownHeight = 35;
          const pApex = project(0, floors * floorHeight + crownHeight, 0);
          
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2;
          corners.forEach(([cx, cz]) => {
            const pCorner = project(cx, floors * floorHeight, cz);
            ctx.beginPath();
            ctx.moveTo(pCorner.px, pCorner.py);
            ctx.lineTo(pApex.px, pApex.py);
            ctx.stroke();
          });

          // Glowing Aviation Beacon
          const pulse = (Math.sin(t * 8) + 1) / 2;
          ctx.fillStyle = `rgba(239, 68, 68, ${0.4 + pulse * 0.6})`;
          ctx.beginPath();
          ctx.arc(pApex.px, pApex.py, 6 + pulse * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Dynamic Wind Aerodynamic Particle Streamers
      if (windActive) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 18; i++) {
          const streamY = 40 + (i * 14);
          if (streamY > maxAllowedY) continue;
          const phaseOffset = i * 0.4;
          const startX = -260 + ((t * 220 + phaseOffset * 60) % 520);
          
          // Bend streamlines around building
          const distToBldg = Math.abs(startX);
          const bend = distToBldg < 120 ? Math.sin((startX + 120) / 240 * Math.PI) * 45 : 0;
          
          const pStream1 = project(startX, streamY, bend);
          const pStream2 = project(startX + 30, streamY, bend);
          
          ctx.beginPath();
          ctx.moveTo(pStream1.px, pStream1.py);
          ctx.lineTo(pStream2.px, pStream2.py);
          ctx.stroke();
        }
      }

      // 4. Interactive Crosshair Target Node
      const centerNode = project(0, maxAllowedY / 2, 0);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerNode.px, centerNode.py, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerNode.px - 18, centerNode.py);
      ctx.lineTo(centerNode.px + 18, centerNode.py);
      ctx.moveTo(centerNode.px, centerNode.py - 18);
      ctx.lineTo(centerNode.px, centerNode.py + 18);
      ctx.stroke();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [yaw, pitch, zoom, autoRotate, phase, seismicActive, seismicMagnitude, windActive, xRaySlice, renderMode]);

  // Phase Definitions
  const PHASES = [
    {
      num: 1,
      title: 'Deep Piling & Raft',
      sub: 'Soil Tiebacks & Bored Piles',
      desc: 'Deep bored cast-in-situ piling resisting high uplift & hydraulic pressure.',
      badge: 'FOUNDATION'
    },
    {
      num: 2,
      title: 'RCC Core & Rebar Cage',
      sub: 'IS 456 / IS 13920 Ductile Detailing',
      desc: 'High-yield Fe550D rebar matrices engineered for extreme seismic shear.',
      badge: 'RCC STRUCTURAL'
    },
    {
      num: 3,
      title: 'CFRP Carbon Retrofit',
      sub: '3,500 MPa Aerospace Jacketing',
      desc: 'Non-destructive carbon fiber wrapping augmenting column load capacity by +300%.',
      badge: 'RETROFIT MATRIX'
    },
    {
      num: 4,
      title: 'Full Facade & Digital Twin',
      sub: 'Turnkey Architectural Execution',
      desc: 'Finished architectural tower with crystalline waterproofing and glass curtain envelope.',
      badge: 'ARCHITECTURAL'
    },
  ];

  return (
    <div className="w-full bg-slate-950 rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
      
      {/* Top Telemetry Header Bar */}
      <div className="bg-slate-900/90 px-4 sm:px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Title & Live BIM Node */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center font-bold shadow-md">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Interactive 3D Digital Twin Engine
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                60 FPS REAL-TIME
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              4D Construction Phase & Seismic Stress Explorer
            </h3>
          </div>
        </div>

        {/* Right: Real-Time Structural Telemetry Gauges */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono">
          <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-right">
            <div className="text-[10px] text-slate-400">BASE SHEAR</div>
            <div className="font-bold text-amber-400">{baseShear} kN</div>
          </div>
          <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-right">
            <div className="text-[10px] text-slate-400">DRIFT RATIO</div>
            <div className={`font-bold ${driftRatio > 0.0035 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {driftRatio} <span className="text-[9px] text-slate-500">(&lt;0.004 IS1893)</span>
            </div>
          </div>
          <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-right hidden md:block">
            <div className="text-[10px] text-slate-400">STRUCTURAL INTEGRITY</div>
            <div className="font-bold text-cyan-400">{structuralScore}%</div>
          </div>
        </div>

      </div>

      {/* Main Interactive Stage: 3D Canvas with Floating HUD Controls */}
      <div className="relative w-full overflow-hidden select-none bg-slate-950">
        
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-[400px] sm:h-[480px] lg:h-[520px] cursor-grab active:cursor-grabbing touch-none block"
        />

        {/* Floating Camera & View Controls (Top Left) */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2.5 rounded-xl backdrop-blur-md border text-xs font-mono flex items-center gap-2 transition-all ${
              autoRotate 
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20' 
                : 'bg-slate-900/80 text-slate-300 border-white/20 hover:bg-slate-800'
            }`}
            title="Toggle 360° Auto-Orbital Rotation"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{autoRotate ? 'Orbiting 360°' : 'Free 3D Drag'}</span>
          </button>

          {/* Reset View */}
          <button
            onClick={() => {
              setYaw(0.75);
              setPitch(0.35);
              setZoom(1.0);
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-mono flex items-center gap-2 transition-all"
            title="Reset Camera Angle"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Reset Isometric</span>
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-white/20">
            <button
              onClick={() => setZoom(prev => Math.min(2.0, prev + 0.15))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono px-1.5 text-amber-400 font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.max(0.6, prev - 0.15))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Simulation Trigger Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
          
          {/* Seismic Earthquake Trigger */}
          <button
            onClick={() => setSeismicActive(!seismicActive)}
            className={`px-3.5 py-2 rounded-xl backdrop-blur-md border text-xs font-mono flex items-center gap-2 transition-all ${
              seismicActive
                ? 'bg-rose-500 text-white font-bold border-rose-400 shadow-xl shadow-rose-500/40 animate-pulse'
                : 'bg-slate-900/80 text-slate-300 border-white/20 hover:border-rose-400/60 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-rose-400" />
            <span>{seismicActive ? `Seismic Active (M ${seismicMagnitude})` : 'Simulate Earthquake (Richter)'}</span>
          </button>

          {/* Wind Shear Simulator */}
          <button
            onClick={() => setWindActive(!windActive)}
            className={`px-3.5 py-2 rounded-xl backdrop-blur-md border text-xs font-mono flex items-center gap-2 transition-all ${
              windActive
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-xl shadow-cyan-500/40'
                : 'bg-slate-900/80 text-slate-300 border-white/20 hover:border-cyan-400/60 hover:text-white'
            }`}
          >
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>{windActive ? 'Wind Shear: 160 km/h' : 'Cyclone Wind Test'}</span>
          </button>

          {/* Render Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-white/20 text-xs font-mono">
            <button
              onClick={() => setRenderMode('wireframe')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                renderMode === 'wireframe' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              CAD Grid
            </button>
            <button
              onClick={() => setRenderMode('solid')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                renderMode === 'solid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Solid BIM
            </button>
            <button
              onClick={() => setRenderMode('stress')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                renderMode === 'stress' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Stress Heatmap
            </button>
          </div>

        </div>

        {/* Floating Floor X-Ray Slider (Bottom of Canvas) */}
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/85 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white">Floor Slicer & Elevation Cut:</span>
            <span className="text-amber-400 font-mono font-bold">
              {xRaySlice === 100 ? 'Full Elevation (G+21)' : `Floor Cut at ${Math.round((xRaySlice / 100) * 21)} Floors`}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <input
              type="range"
              min="15"
              max="100"
              value={xRaySlice}
              onChange={(e) => setXRaySlice(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <span className="text-xs font-mono text-slate-400 w-10 text-right">{xRaySlice}%</span>
          </div>
        </div>

        {/* Mobile Touch Gesture Instruction Overlay */}
        <div className="absolute bottom-16 right-4 pointer-events-none text-[10px] font-mono text-slate-400/80 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 hidden sm:block">
          ⚡ Drag with mouse or finger to rotate in 3D • Scroll to zoom
        </div>

      </div>

      {/* Construction Phase Selector Ribbon (Brochure & Engineering Lifecycle) */}
      <div className="p-4 sm:p-6 bg-slate-900 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Select 4D Construction Phase Timeline</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click any phase to morph 3D BIM model in real-time
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PHASES.map((p) => {
            const isSelected = phase === p.num;
            return (
              <div
                key={p.num}
                onClick={() => setPhase(p.num as ConstructionPhase)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative group text-left ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-slate-950 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-400'
                  }`}>
                    PHASE 0{p.num}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400">
                    {p.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs font-mono text-slate-400 mb-2">
                  {p.sub}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {p.desc}
                </p>

                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-amber-400/30 flex items-center justify-between text-[11px] font-mono text-amber-300">
                    <span>ACTIVE IN 3D STAGE</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All structural designs audited under <strong>IS 456:2000</strong>, <strong>IS 1893:2016</strong>, and <strong>ACI 440.2R</strong> by Abhiraaj Construction.
            </span>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <span>Consult Chief Structural Engineer</span>
            <CornerUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
