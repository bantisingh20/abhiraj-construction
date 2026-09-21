import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Sparkles, Magnet, Compass, Eye, ShieldAlert, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface PhysicsNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  label: string;
  sublabel: string;
  category: 'structural' | 'client' | 'stat' | 'spec';
  color: string;
  isDragging?: boolean;
}

const INITIAL_ITEMS: Omit<PhysicsNode, 'x' | 'y' | 'vx' | 'vy'>[] = [
  {
    id: '1',
    label: 'CFRP Carbon Matrix',
    sublabel: 'Tensile +300% • Aerospace Grade',
    category: 'structural',
    color: '#D97706',
    width: 190,
    height: 64,
  },
  {
    id: '2',
    label: 'CS Fine Interchem',
    sublabel: '25-Yr Plant Revamp • Chemisynth',
    category: 'client',
    color: '#0284C7',
    width: 210,
    height: 64,
  },
  {
    id: '3',
    label: 'Mr. Abhinay Palkar',
    sublabel: 'Managing Director & Lead Engineer',
    category: 'spec',
    color: '#0F172A',
    width: 200,
    height: 64,
  },
  {
    id: '4',
    label: 'Supreme Eptimo G+21',
    sublabel: 'High-Rise Wall Waterproofing',
    category: 'client',
    color: '#059669',
    width: 195,
    height: 64,
  },
  {
    id: '5',
    label: '10-Yr Execution Warranty',
    sublabel: 'Certified Safe Structural Guarantee',
    category: 'stat',
    color: '#B45309',
    width: 215,
    height: 64,
  },
  {
    id: '6',
    label: 'NDT Ultrasonic Pulse',
    sublabel: 'Non-Destructive In-Situ Health Audit',
    category: 'structural',
    color: '#6366F1',
    width: 210,
    height: 64,
  },
  {
    id: '7',
    label: 'GST: 24CHEPP6508H1ZB',
    sublabel: 'Govt. Validated Engineering Entity',
    category: 'spec',
    color: '#475569',
    width: 210,
    height: 64,
  },
  {
    id: '8',
    label: 'Pidilite Partner Spec',
    sublabel: 'Advanced Chemical Membrane',
    category: 'client',
    color: '#EA580C',
    width: 190,
    height: 64,
  },
  {
    id: '9',
    label: 'PIL Chemicals Vapi',
    sublabel: 'Beam Carbonation & Corrosion Arrest',
    category: 'client',
    color: '#0284C7',
    width: 205,
    height: 64,
  },
  {
    id: '10',
    label: 'RCC Jacketing & PMM',
    sublabel: 'Compressive Load Restoration',
    category: 'structural',
    color: '#D97706',
    width: 190,
    height: 64,
  },
];

export const AntigravityCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<PhysicsNode[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const [zeroGravity, setZeroGravity] = useState<boolean>(true);
  const [magneticCursor, setMagneticCursor] = useState<boolean>(true);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean; lastX: number; lastY: number }>({
    x: -1000,
    y: -1000,
    isDown: false,
    lastX: 0,
    lastY: 0,
  });

  // Initialize nodes
  const initNodes = useCallback((width: number, height: number) => {
    const cols = Math.max(2, Math.floor(width / 240));
    nodesRef.current = INITIAL_ITEMS.map((item, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cellW = width / cols;
      const x = col * cellW + (cellW - item.width) / 2 + (Math.random() * 20 - 10);
      const y = 80 + row * 90 + (Math.random() * 20 - 10);
      return {
        ...item,
        x: Math.max(10, Math.min(width - item.width - 10, x)),
        y: Math.max(10, Math.min(height - item.height - 10, y)),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      };
    });
  }, []);

  // Setup Canvas & Resize Observer
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      if (nodesRef.current.length === 0) {
        initNodes(rect.width, rect.height);
      } else {
        // Keep inside bounds
        nodesRef.current.forEach((n) => {
          n.x = Math.max(10, Math.min(rect.width - n.width - 10, n.x));
          n.y = Math.max(10, Math.min(rect.height - n.height - 10, n.y));
        });
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    return () => ro.disconnect();
  }, [initNodes]);

  // Main Physics Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with subtle blueprint grid
      ctx.clearRect(0, 0, width, height);

      // Draw faint architectural grid lines
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.6)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Physics parameters
      const gravity = zeroGravity ? 0 : 420;
      const damping = zeroGravity ? 0.985 : 0.96;
      const mouse = mouseRef.current;

      // Update & Draw Nodes
      const nodes = nodesRef.current;

      // Collision between nodes & physics update
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!n.isDragging) {
          // Gravity
          n.vy += gravity * dt;

          // Gentle buoyancy in zero-g
          if (zeroGravity) {
            n.vx += (Math.random() - 0.5) * 5 * dt;
            n.vy += (Math.random() - 0.5) * 5 * dt;
          }

          // Magnetic attraction / repulsion to cursor
          if (magneticCursor && mouse.x > 0 && mouse.y > 0) {
            const centerX = n.x + n.width / 2;
            const centerY = n.y + n.height / 2;
            const dx = mouse.x - centerX;
            const dy = mouse.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 260 && dist > 10) {
              // Repel slightly so it parts like fluid
              const force = (1 - dist / 260) * 120;
              n.vx -= (dx / dist) * force * dt;
              n.vy -= (dy / dist) * force * dt;
            }
          }

          // Apply velocity
          n.x += n.vx * dt * 60;
          n.y += n.vy * dt * 60;

          // Damping
          n.vx *= damping;
          n.vy *= damping;

          // Boundary bouncing
          const bounce = 0.65;
          if (n.x < 10) {
            n.x = 10;
            n.vx = -n.vx * bounce;
          } else if (n.x + n.width > width - 10) {
            n.x = width - n.width - 10;
            n.vx = -n.vx * bounce;
          }

          if (n.y < 10) {
            n.y = 10;
            n.vy = -n.vy * bounce;
          } else if (n.y + n.height > height - 10) {
            n.y = height - n.height - 10;
            n.vy = -n.vy * bounce;
            n.vx *= 0.85; // friction on floor
          }
        }

        // Connecting lines between nearby nodes (Architectural Truss effect)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const c1x = n.x + n.width / 2;
          const c1y = n.y + n.height / 2;
          const c2x = other.x + other.width / 2;
          const c2y = other.y + other.height / 2;
          const d = Math.hypot(c1x - c2x, c1y - c2y);

          if (d < 180) {
            ctx.save();
            ctx.strokeStyle = `rgba(217, 119, 6, ${Math.max(0.04, (1 - d / 180) * 0.25)})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(c1x, c1y);
            ctx.lineTo(c2x, c2y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw the Architectural Card
        ctx.save();
        
        // Card Shadow
        ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
        ctx.shadowBlur = 16;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 6;

        // Card Background (Porcelain White with crisp hairline border)
        ctx.fillStyle = n.isDragging ? '#FFFFFF' : '#FFFFFF';
        ctx.strokeStyle = n.isDragging ? '#D97706' : 'rgba(226, 232, 240, 0.9)';
        ctx.lineWidth = n.isDragging ? 2 : 1;

        // Rounded Rect
        const radius = 12;
        ctx.beginPath();
        ctx.roundRect(n.x, n.y, n.width, n.height, radius);
        ctx.fill();
        ctx.stroke();

        // Accent indicator bar on left
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.roundRect(n.x + 3, n.y + 8, 3.5, n.height - 16, 2);
        ctx.fill();

        // Label Text
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 12px "Outfit", "Plus Jakarta Sans", sans-serif';
        ctx.fillText(n.label, n.x + 14, n.y + 26);

        // Sublabel Text
        ctx.fillStyle = '#64748B';
        ctx.font = '500 9.5px "JetBrains Mono", monospace';
        ctx.fillText(n.sublabel, n.x + 14, n.y + 44);

        // Interactive Corner Grip dots
        ctx.fillStyle = '#CBD5E1';
        ctx.beginPath();
        ctx.arc(n.x + n.width - 12, n.y + 14, 1.5, 0, Math.PI * 2);
        ctx.arc(n.x + n.width - 12, n.y + 20, 1.5, 0, Math.PI * 2);
        ctx.arc(n.x + n.width - 18, n.y + 14, 1.5, 0, Math.PI * 2);
        ctx.arc(n.x + n.width - 18, n.y + 20, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [zeroGravity, magneticCursor]);

  // Pointer event handlers (Desktop & Touch Mobile)
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCanvasCoords(e);
    mouseRef.current.isDown = true;
    mouseRef.current.lastX = x;
    mouseRef.current.lastY = y;
    mouseRef.current.x = x;
    mouseRef.current.y = y;

    // Check hit test from top to bottom
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (x >= n.x && x <= n.x + n.width && y >= n.y && y <= n.y + n.height) {
        n.isDragging = true;
        setDraggedNodeId(n.id);
        break;
      }
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCanvasCoords(e);
    const last = mouseRef.current;
    const dx = x - last.lastX;
    const dy = y - last.lastY;

    last.x = x;
    last.y = y;
    last.lastX = x;
    last.lastY = y;

    // Move dragged node
    const dragged = nodesRef.current.find((n) => n.isDragging);
    if (dragged) {
      dragged.x += dx;
      dragged.y += dy;
      dragged.vx = dx * 15; // impulse for flinging
      dragged.vy = dy * 15;
    }
  };

  const handlePointerUp = () => {
    mouseRef.current.isDown = false;
    nodesRef.current.forEach((n) => {
      n.isDragging = false;
    });
    setDraggedNodeId(null);
  };

  const handleReset = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    initNodes(rect.width, rect.height);
  };

  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-md">
      
      {/* Top Interactive Physics Command Header */}
      <div className="px-5 py-4 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-bold">
            <Cpu className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase">
                Antigravity Physics Lab
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-semibold">
                INTERACTIVE 60FPS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
              Drag, throw & float Abhiraj Construction architectural nodes
            </p>
          </div>
        </div>

        {/* Physics Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {/* Zero-G Toggle */}
          <button
            onClick={() => setZeroGravity(!zeroGravity)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-semibold ${
              zeroGravity
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{zeroGravity ? 'Zero-G: Active' : 'Gravity: Earth'}</span>
          </button>

          {/* Magnetic Cursor Toggle */}
          <button
            onClick={() => setMagneticCursor(!magneticCursor)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-semibold ${
              magneticCursor
                ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Magnet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Magnetic Field</span>
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Reset Coordinates"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Physics Canvas Stage */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="w-full h-[400px] sm:h-[480px] relative cursor-grab active:cursor-grabbing touch-none select-none bg-radial-gradient-light overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Floating Hint Pill */}
        <div className="absolute bottom-3 left-4 pointer-events-none px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-mono text-slate-600 flex items-center gap-1.5 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          <span>Fling nodes with touch / cursor to test structural kinetic response</span>
        </div>

        {/* Real-time Status telemetry */}
        <div className="absolute bottom-3 right-4 pointer-events-none hidden sm:flex items-center gap-3 text-[10px] font-mono text-slate-500">
          <span>Active Entities: {INITIAL_ITEMS.length}</span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold">IS 456-2000 Benchmark</span>
        </div>
      </div>

    </div>
  );
};
