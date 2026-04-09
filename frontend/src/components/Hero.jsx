import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

// Split text into individual letter spans for staggered 3D animation
const Letter3D = ({ char, delay = 0, baseColor = 'text-white' }) => (
  <motion.span
    className={`inline-block ${baseColor}`}
    initial={{ opacity: 0, y: 80, rotateX: -90, z: -200 }}
    animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
    transition={{
      duration: 1.0,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
    whileHover={{
      z: 40,
      y: -8,
      textShadow: '0 20px 40px rgba(0,0,0,0.5)',
      transition: { duration: 0.2 }
    }}
    style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

const Hero = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics for smooth mouse tracking
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
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const line1 = 'FULL STACK'.split('');
  const line2 = 'WEB DEV'.split('');

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-transparent z-10 w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
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
            {/* Line 1: FULL STACK */}
            <div
              className="text-[13vw] sm:text-[10vw] lg:text-[7rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase m-0 p-0 font-sans block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="block mb-2">
                {line1.map((char, i) => (
                  <Letter3D
                    key={`l1-${i}`}
                    char={char}
                    delay={3.0 + i * 0.05}
                    baseColor="text-white"
                  />
                ))}
              </div>

              {/* Line 2: WEB DEV — gradient + stagger */}
              <div
                className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-accent-purple to-accent-magenta"
                style={{ backgroundSize: '200% auto' }}
              >
                <motion.div
                  className="inline"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  {line2.map((char, i) => (
                    <motion.span
                      key={`l2-${i}`}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-accent-purple to-accent-magenta"
                      style={{ backgroundSize: '300% auto' }}
                      initial={{ opacity: 0, y: 80, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.15 } }}
                      transition={{
                        duration: 1.0,
                        delay: 3.0 + line1.length * 0.05 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Subtle 3D depth layer — a ghost copy shifted back in Z */}
            <div
              className="absolute inset-0 text-[13vw] sm:text-[10vw] lg:text-[7rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase pointer-events-none select-none opacity-[0.04] text-accent-neon blur-[1px]"
              style={{ transform: 'translateZ(-40px)', transformStyle: 'preserve-3d' }}
              aria-hidden
            >
              <div className="block mb-2">FULL STACK</div>
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

        {/* Right 3D Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 3.4 }}
          className="relative flex justify-center items-center shrink-0 w-full lg:w-auto"
        >
          <motion.div
            className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[360px] lg:h-[360px]"
            animate={{
              y: [-12, 12, -12],
              rotateX: [5, -5, 5],
              rotateY: [-5, 5, -5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            {/* Dynamic Ambient Shadow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-neon via-accent-purple to-accent-magenta blur-3xl opacity-20 hover:opacity-40 transition-opacity duration-700"></div>

            {/* Glowing Orbit Rings */}
            <motion.div
              className="absolute -inset-3 sm:-inset-6 border border-accent-neon/30 rounded-full pointer-events-none"
              animate={{ rotateZ: 360, rotateX: 20 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            ></motion.div>
            <motion.div
              className="absolute -inset-6 sm:-inset-12 border border-accent-magenta/20 rounded-full pointer-events-none"
              animate={{ rotateZ: -360, rotateY: 20 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            ></motion.div>

            {/* The Profile Image */}
            <div className="absolute inset-0 rounded-full overflow-hidden border border-zinc-700 shadow-2xl bg-[#09090b] interactive cursor-pointer group">
              <img
                src="/profile.jpg"
                alt="Divya Patel"
                className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
