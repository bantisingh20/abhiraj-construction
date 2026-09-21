import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.4 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer ambient glow halo in sunny yellow */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 68 : 40,
          height: isHovered ? 68 : 40,
          background: isHovered
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(251, 191, 36, 0.1) 50%, rgba(245, 158, 11, 0) 70%)'
            : 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0) 70%)',
          border: isHovered
            ? '2px solid rgba(217, 119, 6, 0.7)'
            : '1.5px solid rgba(245, 158, 11, 0.4)',
          boxShadow: isHovered ? '0 0 20px rgba(245, 158, 11, 0.3)' : 'none',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border 0.2s ease-out'
        }}
      />
      {/* Center pinpoint */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-amber-500 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(245,158,11,0.9)] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 0.6 : 1,
          transition: 'scale 0.15s ease-out'
        }}
      />
    </div>
  );
};
