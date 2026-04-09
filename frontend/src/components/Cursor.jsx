import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Bypass React state for raw mouse coordinates to achieve 120fps tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Extremely tight spring for butter-smooth but instant feeling tracking
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // 18px offset to perfectly center the new 36x36 wrapper
      cursorX.set(e.clientX - 18);
      cursorY.set(e.clientY - 18);
    };

    const handleMouseOver = (e) => {
      // Avoid expensive document.elementFromPoint calls
      // Use native event bubbling to detect hover state without layout thrashing
      const interactive = e.target.closest(
        'a, button, input, textarea, select, [role="button"], .interactive, h1, h2, h3, h4, h5, h6, .font-heading, p, img'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide entirely on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Outer Ring Wrapper */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          width: '36px',
          height: '36px',
          mixBlendMode: 'difference',
          zIndex: 9999,
        }}
        initial={false}
        animate={{
          border: isHovered ? '0px solid rgba(255,255,255,0)' : '1px solid rgba(255,255,255,0.8)',
        }}
        transition={{
          border: { duration: 0.2, ease: "easeInOut" }
        }}
      >
        {/* Inner Solid Dot */}
        <motion.div
          className="rounded-full flex-shrink-0"
          style={{ width: '12px', height: '12px' }}
          initial={false}
          animate={{
            scale: isHovered ? 14 : 1,
            backgroundColor: isHovered ? '#ffffff' : '#ccff00',
          }}
          transition={{
            scale: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
            backgroundColor: { duration: 0.2, ease: "easeInOut" }
          }}
        />
      </motion.div>
    </>
  );
};

export default Cursor;
