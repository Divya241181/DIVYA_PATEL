import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

// ── Word-level slide-up animation with elastic spring ──────────
const AnimatedWord = ({ word, delay = 0, className = '' }) => (
  <span className="inline-block overflow-hidden">
    <motion.span
      className={`inline-block ${className}`}
      initial={{ y: '120%', rotateZ: 8, opacity: 0 }}
      animate={{ y: '0%', rotateZ: 0, opacity: 1 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1.2, 0.36, 1], // elastic overshoot
      }}
      whileHover={{
        y: -6,
        color: '#ccff00',
        transition: { duration: 0.2 }
      }}
      style={{ display: 'inline-block' }}
    >
      {word}
    </motion.span>
  </span>
);

// ── Holographic ID Badge ──────────────────────────────────────
// Concept: a premium "access card" that the dev carries. The photo sits
// inside a sleek badge with holographic prismatic reflections, a chip,
// scan-line texture, and real-time mouse-driven tilt + light refraction.
// Nothing circular, no orbits, no cliché shapes.

const HoloBadge = () => {
  const cardRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const [scanned, setScanned] = useState(false);

  // Spring-smoothed tilt angles
  const tiltX = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 120, damping: 18 });

  // Holographic gradient origin tracks mouse
  const holoX = useTransform(mx, [0, 1], [0, 100]);
  const holoY = useTransform(my, [0, 1], [0, 100]);

  const handleMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  // Trigger "scan complete" after entry animation
  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 4800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-[280px] h-[380px] sm:w-[300px] sm:h-[410px] md:w-[320px] md:h-[440px] lg:w-[340px] lg:h-[470px] cursor-default"
      initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Card body ── */}
        <div className="absolute inset-0 rounded-[24px] bg-[#0c0c0c] border border-zinc-800/90 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* Holographic prismatic overlay — moves with mouse */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100"
            style={{
              background: useTransform(
                [holoX, holoY],
                ([x, y]) =>
                  `conic-gradient(from ${x * 3.6}deg at ${x}% ${y}%, 
                    rgba(0,255,255,0.18), 
                    rgba(181,153,255,0.18), 
                    rgba(255,0,255,0.12), 
                    rgba(204,255,0,0.15), 
                    rgba(0,255,255,0.18))`
              ),
            }}
          />

          {/* Scan-line texture */}
          <div
            className="absolute inset-0 z-20 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, transparent 3px)',
            }}
          />

          {/* ── Top chip bar ── */}
          <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-3">
            {/* Chip */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-6 rounded-[4px] bg-gradient-to-br from-[#d4af37] via-[#f5e6a3] to-[#b8982b] shadow-inner relative overflow-hidden">
                <div className="absolute inset-[2px] border border-[#a07a1a]/40 rounded-[2px]" />
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-[#a07a1a]/60" />
                <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-[#a07a1a]/60" />
                <div className="absolute top-1/2 left-[3px] -translate-y-1/2 w-[1px] h-[60%] bg-[#a07a1a]/60" />
                <div className="absolute top-1/2 right-[3px] -translate-y-1/2 w-[1px] h-[60%] bg-[#a07a1a]/60" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-zinc-600 tracking-[0.25em] uppercase leading-none">DEV//</span>
                <span className="text-[8px] font-mono text-zinc-700 tracking-[0.15em] uppercase leading-none">ACCESS</span>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor: scanned ? '#39FF14' : '#FF4444',
                  boxShadow: scanned
                    ? ['0 0 4px #39FF14', '0 0 12px #39FF14', '0 0 4px #39FF14']
                    : '0 0 4px #FF4444',
                }}
                transition={{ duration: 1.5, repeat: scanned ? 0 : Infinity }}
              />
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                {scanned ? 'Verified' : 'Scanning'}
              </span>
            </div>
          </div>

          {/* ── Photo area ── */}
          <div className="relative z-10 mx-5 mt-1 aspect-[4/3.4] rounded-[14px] overflow-hidden bg-zinc-900 group/photo">
            {/* Initial scan sweep animation */}
            <motion.div
              className="absolute inset-0 z-30 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 4.6 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-neon to-transparent shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                initial={{ top: '0%' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.8, delay: 3.5, times: [0, 0.5, 1] }}
              />
            </motion.div>

            {/* Photo with reveal */}
            <motion.img
              src="/profile.jpg"
              alt="Divya Patel"
              className="w-full h-full object-cover object-top"
              initial={{ filter: 'brightness(0) contrast(2)' }}
              animate={{ filter: 'brightness(1) contrast(1)' }}
              transition={{ duration: 1.5, delay: 4.2, ease: 'easeOut' }}
            />

            {/* Bottom-fade overlay  */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0c0c0c] to-transparent z-10" />

            {/* Corner brackets on hover */}
            <div className="absolute inset-3 pointer-events-none z-20 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent-neon/60" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-neon/60" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-neon/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent-neon/60" />
            </div>
          </div>

          {/* ── Identity info ── */}
          <div className="relative z-10 px-5 pt-4 pb-3 flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-white font-black text-lg tracking-tight font-heading">DIVYA PATEL</h3>
              <span className="text-[9px] font-mono text-accent-neon tracking-widest">LVL ∞</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-accent-purple/40 text-accent-purple tracking-widest">
                FULL STACK
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-accent-neon/30 text-accent-neon tracking-widest">
                MERN
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-[#3776AB]/40 text-[#6ca6d9] tracking-widest">
                PYTHON
              </span>
            </div>
          </div>

          {/* ── Bottom barcode strip ── */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-5 py-3 border-t border-zinc-800/50 flex items-center justify-between">
            {/* Barcode-style decoration */}
            <div className="flex items-end gap-[1px] h-4">
              {[3,5,2,4,6,3,5,2,6,4,3,5,7,2,4,6,3,5,2,4,6,3,5,2,3,5,4,6,3,5].map((h, i) => (
                <div
                  key={i}
                  className="w-[1.5px] bg-zinc-600/80 rounded-full"
                  style={{ height: `${h * 2}px` }}
                />
              ))}
            </div>
            <span className="text-[8px] font-mono text-zinc-600 tracking-[0.2em]">
              DP–{new Date().getFullYear()}–001
            </span>
          </div>

          {/* ── Edge highlight on hover ── */}
          <motion.div
            className="absolute inset-0 rounded-[24px] pointer-events-none z-40"
            style={{
              boxShadow: useTransform(
                [holoX, holoY],
                ([x, y]) =>
                  `inset 0 1px 1px rgba(255,255,255,${0.02 + Math.abs(y - 50) * 0.002}), 0 0 ${30 + x * 0.4}px rgba(0,255,255,${0.02 + x * 0.001})`
              ),
            }}
          />
        </div>

        {/* ── Reflection plane beneath card ── */}
        <div
          className="absolute -bottom-4 left-4 right-4 h-12 rounded-[20px] blur-xl opacity-30"
          style={{
            background: 'linear-gradient(to right, rgba(0,255,255,0.15), rgba(181,153,255,0.12), rgba(204,255,0,0.1))',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// ── Main Hero Component ──────────────────────────────────────
const Hero = () => {
  const containerRef = useRef(null);

  // Spring physics for smooth mouse tracking (headlines)
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  // Transform mouse position to subtle 3D rotation
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-600, 600], [-8, 8]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-transparent z-10 w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-6"
        ref={containerRef}
      >
        {/* Left Typography Column */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left w-full lg:max-w-[60%] xl:max-w-[65%]">

          {/* Intro Tag — subtle slide in */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.9 }}
            className="flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8"
          >
            <div className="w-8 md:w-12 h-[1px] bg-zinc-600"></div>
            <span className="text-zinc-400 font-light tracking-widest uppercase text-xs md:text-sm">Hello, I'm Divya Patel</span>
          </motion.div>

          {/* 3D Mouse-Tracking Headline */}
          <motion.div
            className="relative z-20"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
          >
            {/* Line 1: FULL STACK — word-level elastic slide-up */}
            <div
              className="font-heading block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-[13vw] sm:text-[10vw] lg:text-[7rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase text-white block mb-1">
                <AnimatedWord word="FULL" delay={3.0} />
                <span className="inline-block w-[0.3em]" />
                <AnimatedWord word="STACK" delay={3.15} />
              </div>

              {/* Line 2: WEB DEV — elastic slide-up + shimmer gradient */}
              <motion.div
                className="text-[13vw] sm:text-[10vw] lg:text-[7rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase block text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-accent-purple to-accent-magenta"
                style={{ backgroundSize: '200% auto' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <AnimatedWord word="WEB" delay={3.3} className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-accent-purple to-accent-magenta" />
                <span className="inline-block w-[0.3em]" />
                <AnimatedWord word="DEV" delay={3.45} className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-accent-purple to-accent-magenta" />
              </motion.div>
            </div>

            {/* Subtle 3D depth layer — ghost copy shifted back in Z */}
            <div
              className="absolute inset-0 text-[13vw] sm:text-[10vw] lg:text-[7rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase pointer-events-none select-none opacity-[0.04] text-accent-neon blur-[1px] font-heading"
              style={{ transform: 'translateZ(-40px)', transformStyle: 'preserve-3d' }}
              aria-hidden
            >
              <div className="block mb-1">FULL STACK</div>
              <div className="block">WEB DEV</div>
            </div>
          </motion.div>

          {/* Animated Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.7 }}
            className="mt-6 md:mt-10 max-w-xl mx-auto lg:mx-0 relative z-10"
          >
            <p className="text-base md:text-lg lg:text-xl text-zinc-400 font-medium leading-relaxed">
              Engineering high-performance{' '}
              <motion.span
                animate={{ color: ['#ffffff', '#ccff00', '#ffffff'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-1 inline-block font-black text-white"
              >
                full-stack
              </motion.span>{' '}
              applications. Focused on scalable architectures and{' '}
              <motion.span
                animate={{ textShadow: ['0px 0px 0px rgba(0,255,255,0)', '0px 0px 20px rgba(0,255,255,0.7)', '0px 0px 0px rgba(0,255,255,0)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="mx-1 inline-block font-black text-accent-neon"
              >
                high-impact
              </motion.span>{' '}
              digital solutions.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.9 }}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <motion.a
              href="#projects"
              className="px-7 py-3 rounded-full bg-accent-lime text-black font-bold text-sm"
              whileHover={{ scale: 1.08, y: -3, boxShadow: '0 12px 30px rgba(204,255,0,0.4)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-7 py-3 rounded-full border border-zinc-700 text-white font-medium text-sm"
              whileHover={{ scale: 1.06, borderColor: 'rgba(255,255,255,0.4)', y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right: Holographic ID Badge ── */}
        <div className="relative flex justify-center items-center shrink-0 w-full lg:w-auto">
          <HoloBadge />
        </div>
      </div>
    </section>
  );
};

export default Hero;
