import React, { useRef, useEffect } from 'react';
import { motion, animate, useInView, useMotionValue, useTransform } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiFigma, SiSpotify, SiPython, SiDjango } from 'react-icons/si';

// --- Small SVG Icons ---
const MapPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const Briefcase = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const Keyboard = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"></path></svg>;
const GithubIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const StackIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
const SpotifyIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.84-.12-.96-.54-.12-.42.12-.84.54-.96 4.56-1.02 8.52-.6 11.64 1.32.42.18.6.66.36 1.08zm1.44-3.18c-.3.48-.9.66-1.38.36-3.24-2.04-8.16-2.64-11.94-1.44-.54.18-1.08-.12-1.26-.66-.18-.54.12-1.08.66-1.26 4.32-1.38 9.72-.72 13.56 1.62.48.3.66.9.36 1.38zm.12-3.36c-3.9-2.28-10.26-2.52-14.04-1.38-.66.18-1.32-.18-1.5-.84-.18-.66.18-1.32.84-1.5 4.38-1.26 11.4-.96 15.9 1.68.6.36.78 1.14.42 1.74-.36.6-.96.78-1.62.42z"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const Bookmark = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;

// Brand Keycaps
const BrandX = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>;

const BrandFigma = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path className="group-hover:fill-[#F24E1E] group-hover:stroke-none transition-colors duration-300" d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
  <path className="group-hover:fill-[#F24E1E] group-hover:stroke-none transition-colors duration-300" d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
  <path className="group-hover:fill-[#1ABCFE] group-hover:stroke-none transition-colors duration-300" d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1 -7 0z"></path>
  <path className="group-hover:fill-[#0ACF83] group-hover:stroke-none transition-colors duration-300" d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1 -7 0z"></path>
  <path className="group-hover:fill-[#A259FF] group-hover:stroke-none transition-colors duration-300" d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
</svg>;

const BrandCode = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>;

const Badge = ({ icon, text }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-medium text-zinc-300 shadow-sm w-fit mb-4">
    {icon} {text}
  </div>
);

const AnimatedNumber = ({ value, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        type: "tween",
        duration: 3.5, // 3.5s sequence
        ease: "circOut" // Starts extremely fast, gradually slows down heavily at the end
      });
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
};

const About = () => {
  return (
    <section id="about" className="py-10 md:py-20 px-4 bg-transparent z-10 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Kinetic Typography Bio Start */}
        <div className="mb-8 md:mb-16 relative">
          
          {/* Animated Background Auras */}
          <motion.div 
            className="absolute top-[-10%] right-[10%] w-[40vw] h-[40vw] bg-accent-magenta/10 rounded-full blur-[120px] -z-10 pointer-events-none"
            animate={{ scale: [1, 1.2, 1], x: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-[50%] left-[10%] w-[30vw] h-[30vw] bg-accent-lime/10 rounded-full blur-[120px] -z-10 pointer-events-none"
            animate={{ scale: [1, 1.5, 1], y: [0, -50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <div className="flex items-center gap-4 mb-5 md:mb-10 px-4 md:px-0">
            <div className="w-12 h-[1px] bg-zinc-600"></div>
            <span className="text-white text-xl font-bold tracking-widest uppercase font-heading">About <span className="text-accent-neon">Me</span></span>
          </div>
          
          {/* Massive Staggered Typography */}
          <div className="mb-6 md:mb-12 space-y-2 md:space-y-4 px-4 md:px-0">
             <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[9.5vw] sm:text-[10vw] md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-white leading-[0.85] font-heading m-0"
                >
                  I AM A FULL-STACK
                </motion.h2>
             </div>
             <div className="overflow-hidden sm:flex justify-end pr-[10%]">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[9.5vw] sm:text-[10vw] md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-transparent font-heading bg-clip-text bg-gradient-to-r from-accent-purple to-accent-magenta leading-[0.85] m-0"
                >
                  DEVELOPER DRIVEN BY
                </motion.h2>
             </div>
             <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-[9.5vw] sm:text-[10vw] md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-transparent font-heading bg-clip-text bg-gradient-to-r from-accent-lime to-accent-neon leading-[0.85] m-0"
                >
                  IMPACT AND A.I.
                </motion.h2>
             </div>
          </div>

          {/* ── Bio + Education Rebuild ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 px-4 md:px-0 items-start">

            {/* ───── LEFT: Bio Panel ───── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 md:p-8 rounded-[24px] bg-zinc-950/80 border border-zinc-800/80 hover:border-accent-neon/40 relative overflow-hidden group/bio cursor-default transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,255,0.06)]"
            >
              {/* Ghost index number */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10rem] font-black text-zinc-800/10 select-none pointer-events-none leading-none font-heading">00</span>

              {/* Gradient sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-neon/5 via-transparent to-accent-purple/5 opacity-0 group-hover/bio:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Top edge shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-neon/40 to-transparent opacity-0 group-hover/bio:opacity-100 transition-opacity duration-700" />

              {/* Label header */}
              <div className="relative z-10 flex items-center gap-3 mb-8">
                <div className="w-6 h-6 rounded-full border border-accent-neon/50 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent-neon" />
                </div>
                <span className="text-zinc-400 font-bold tracking-[0.25em] text-xs uppercase font-mono">Dev // Profile</span>
              </div>

              {/* Stat strip */}
              <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-4 mb-8">
                {[
                  { number: '2+', label: 'Years', color: '#B599FF' },
                  { number: '10+', label: 'Projects', color: '#00FFFF' },
                  { number: '100%', label: 'Driven', color: '#CCFF00' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex flex-col items-center justify-center text-center gap-1 p-2 sm:p-3 md:p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors duration-300"
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-black font-heading" style={{ color: stat.color }}>
                      {stat.number}
                    </span>
                    <span className="text-zinc-500 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest leading-tight w-full truncate">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Rich bio paragraph */}
              <div className="relative z-10 space-y-4 mb-8">
                <p className="text-zinc-400 text-lg leading-[1.9] font-light">
                  Currently pursuing a{' '}
                  <span className="text-white font-semibold">B.Tech in Information Technology</span>{' '}
                  at KPGU. I build robust applications that combine{' '}
                  <span className="text-accent-purple font-semibold">clean architecture</span>{' '}
                  with deeply immersive,{' '}
                  <span className="text-accent-neon font-semibold">award-worthy frontends</span>.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  My stack lives in the JavaScript ecosystem — React, Node.js, MongoDB — with a strong eye for motion design and user experience that goes beyond the ordinary.
                </p>
              </div>

              {/* Skill tags */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-8">
                {['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Python', 'Django', 'Framer Motion', 'Figma'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-mono text-zinc-400 border border-zinc-800 rounded-full hover:border-accent-purple/50 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="relative z-10"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-accent-lime text-black font-black px-8 py-4 rounded-full group hover:shadow-[0_0_40px_rgba(204,255,0,0.35)] hover:scale-105 transition-all duration-300 shadow-sm"
                >
                  Download Resume
                  <div className="bg-black text-accent-lime rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight />
                  </div>
                </a>
              </motion.div>
            </motion.div>

            {/* ───── RIGHT: Vertical Timeline ───── */}
            <div className="flex flex-col">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="w-6 h-6 rounded-full border border-accent-purple flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent-purple" />
                </div>
                <span className="text-zinc-400 font-bold tracking-[0.25em] text-xs uppercase">Academic Journey</span>
              </motion.div>

              {/* Timeline items */}
              <div className="relative flex flex-col gap-0 ml-4 md:ml-0 pl-6 md:pl-8 border-l border-zinc-800">

                {/* ── B.Tech ── */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative mb-6 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[33px] top-8 w-4 h-4 rounded-full bg-zinc-950 border-2 border-accent-magenta group-hover:bg-accent-magenta group-hover:shadow-[0_0_12px_rgba(217,70,239,0.8)] transition-all duration-500" />

                  <div className="p-7 rounded-[20px] bg-zinc-950/80 border border-zinc-800/80 hover:border-accent-magenta/60 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.08)] cursor-default">
                    {/* Big ghost number */}
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[6rem] font-black text-zinc-800/20 select-none pointer-events-none leading-none">01</span>
                    {/* Gradient sweep */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-magenta/10 border border-accent-magenta/30 text-accent-magenta font-mono text-[10px] uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-magenta animate-pulse" />
                          Aug 2023 — 2027
                        </span>
                        <span className="text-xs text-zinc-600 font-mono">· Current</span>
                      </div>
                      <h4 className="text-white font-black text-2xl md:text-3xl tracking-tight group-hover:text-accent-magenta transition-colors duration-300 mb-1">
                        B.Tech — Information Tech.
                      </h4>
                      <p className="text-zinc-500 text-sm font-medium">Drs. Kiran &amp; Pallavi Patel Global University</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {['Full Stack Dev', 'DSA', 'AI/ML', 'DBMS'].map(t => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Higher Secondary ── */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[33px] top-8 w-4 h-4 rounded-full bg-zinc-950 border-2 border-accent-lime group-hover:bg-accent-lime group-hover:shadow-[0_0_12px_rgba(204,255,0,0.8)] transition-all duration-500" />

                  <div className="p-7 rounded-[20px] bg-zinc-950/80 border border-zinc-800/80 hover:border-accent-lime/60 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(204,255,0,0.06)] cursor-default">
                    {/* Big ghost number */}
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[6rem] font-black text-zinc-800/20 select-none pointer-events-none leading-none">02</span>
                    {/* Gradient sweep */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-lime/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime font-mono text-[10px] uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                          May 2021 — 2023
                        </span>
                        <span className="text-xs text-zinc-600 font-mono">· Completed</span>
                      </div>
                      <h4 className="text-white font-black text-2xl md:text-3xl tracking-tight group-hover:text-accent-lime transition-colors duration-300 mb-1">
                        Higher Secondary (Science)
                      </h4>
                      <p className="text-zinc-500 text-sm font-medium">Krishna School of Science</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {['Physics', 'Chemistry', 'Maths', 'Computer Sc.'].map(t => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-[1px] bg-zinc-600"></div>
          <span className="text-white text-xl font-bold tracking-widest uppercase font-heading">Expertise & <span className="text-accent-purple">History</span></span>
        </div>
        {/* Main Grid: Using flex column wrappers for masonry-like masonry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* COLUMN 1 (Location + Social) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Location Card */}
            <div className="bg-[#09090b] h-[280px] rounded-[24px] border border-zinc-800/80 relative overflow-hidden flex flex-col justify-between group cursor-default shadow-sm hover:border-accent-neon/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.12)]">
               {/* High-Tech Map Background Layer */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-[0.35] mix-blend-luminosity group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000 ease-out"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent pointer-events-none"></div>
               
               {/* Radar/Pulse Location Marker */}
               <div className="absolute top-[45%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                 <div className="absolute w-32 h-32 bg-accent-neon/10 rounded-full blur-xl group-hover:bg-accent-neon/20 transition-colors duration-500"></div>
                 <div className="absolute w-16 h-16 border border-accent-neon/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                 <div className="absolute w-8 h-8 border border-accent-neon/50 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                 <div className="absolute w-2.5 h-2.5 bg-accent-neon rounded-full shadow-[0_0_15px_rgba(0,255,255,1)]"></div>
               </div>
               
               <div className="relative z-10 w-full flex justify-start p-5 pointer-events-none">
                 <Badge icon={<MapPin />} text="Location" />
               </div>
               
               <div className="relative z-10 w-full flex flex-col p-5 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none">
                 <span className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest mb-1 flex items-center gap-2 group-hover:text-accent-neon transition-colors duration-300">
                   <div className="w-1.5 h-1.5 bg-accent-neon rounded-full animate-pulse"></div> Base of Operations
                 </span>
                 <h4 className="text-white text-2xl font-bold tracking-tight">Bharuch, India</h4>
               </div>
            </div>

            {/* Social Keycaps */}
            <div className="flex gap-4">
              <a href="#" className="group flex-1 aspect-square bg-[#09090b] rounded-[20px] border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:bg-white hover:border-white transition-all duration-300 shadow-sm cursor-pointer">
                <BrandX className="group-hover:text-black transition-colors duration-300" />
              </a>
              <a href="#" className="group flex-1 aspect-square bg-[#09090b] rounded-[20px] border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:bg-[#FFD166] hover:border-[#FFD166] transition-all duration-300 shadow-sm cursor-pointer">
                <BrandCode className="group-hover:text-black transition-colors duration-300" />
              </a>
              <a href="#" className="group flex-1 aspect-square bg-[#09090b] rounded-[20px] border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:bg-[#E0F2FE] hover:border-[#E0F2FE] transition-all duration-300 shadow-sm cursor-pointer">
                <BrandFigma className="transition-colors duration-300" />
              </a>
            </div>
            
          </div>

          {/* COLUMN 2 (Featured Work + Discover) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Featured Work */}
            <div className="bg-[#09090b] flex-1 rounded-[24px] border border-zinc-800/80 hover:border-amber-500/50 p-6 flex flex-col relative overflow-hidden group cursor-default transition-all duration-500 hover:shadow-[0_0_35px_rgba(245,158,11,0.20)]">
              {/* Amber ambient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <Badge icon={<Briefcase />} text="Featured work" />
              <h3 className="text-2xl font-semibold text-white mb-2 z-10 mt-2 group-hover:text-amber-300 transition-colors duration-300">Bookmarked</h3>
              <p className="text-zinc-400 text-sm leading-relaxed z-10 max-w-[90%]">
                Effortlessly save and organize your favorite tweets in Notion using a Telegram bot.
              </p>
              
              {/* Mockup visual */}
              <div className="relative mt-8 flex-1 w-full bg-gradient-to-b from-zinc-400/20 to-transparent rounded-xl border border-zinc-700/50 group-hover:border-amber-500/20 p-2 overflow-hidden shadow-2xl scale-105 group-hover:translate-y-[-10px] transition-all duration-500">
                <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg shadow-black/50 shadow-lg">
                  <div className="w-10 h-10 bg-zinc-900 rounded-md border border-zinc-700 group-hover:border-amber-500/30 group-hover:text-amber-400 flex items-center justify-center text-zinc-400 transition-all duration-300">
                     <Bookmark />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Bookmarked</p>
                    <p className="text-zinc-500 text-xs">Your bookmark has been saved</p>
                  </div>
                  <span className="text-zinc-500 text-xs">Just now</span>
                </div>
              </div>
            </div>

            {/* ── MOBILE ROW: Discover (2/3) + Spotify mini (1/3) ── */}
            <div className="flex gap-3 lg:hidden">

              {/* Discover — 2/3 */}
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-[2] min-w-0 bg-[#09090b] h-[72px] rounded-[24px] border border-zinc-800/80 hover:border-accent-purple/60 px-4 flex items-center justify-between group transition-all duration-400 cursor-pointer relative overflow-hidden hover:shadow-[0_0_30px_rgba(181,153,255,0.12)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="font-bold text-white text-sm relative z-10 group-hover:text-accent-purple transition-colors duration-300 leading-tight">Discover more projects</span>
                <div className="relative z-10 w-7 h-7 shrink-0 rounded-full border border-zinc-800 group-hover:border-accent-purple/60 group-hover:bg-accent-purple/10 flex items-center justify-center transition-all duration-300 ml-2">
                  <ArrowRight className="text-zinc-400 group-hover:text-accent-purple transition-colors duration-300" />
                </div>
              </button>

              {/* Spotify mini — 1/3 */}
              <div
                className="flex-[1] min-w-0 bg-[#09090b] h-[72px] rounded-[24px] border border-zinc-800/80 hover:border-[#1ED760]/50 relative overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-500 hover:shadow-[0_0_20px_rgba(30,215,96,0.25)]"
                onClick={() => window.open('https://open.spotify.com/track/5NK3IhIeIXQmOKK5EiSRra?si=A8MFNweSSnSKjnWsOV_2Vw', '_blank')}
              >
                {/* Blurred background art */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 blur-md group-hover:opacity-35 transition-opacity duration-700"
                  style={{ backgroundImage: `url('https://i.scdn.co/image/ab67616d0000b273c53e5adf9f81693d62f98019')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                {/* Spinning record */}
                <motion.div
                  className="relative w-11 h-11 rounded-full overflow-hidden border border-zinc-800 z-10 shadow-[0_0_12px_rgba(30,215,96,0.15)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <img src="https://i.scdn.co/image/ab67616d0000b273c53e5adf9f81693d62f98019" alt="Album Art" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#09090b] rounded-full -translate-x-1/2 -translate-y-1/2 border border-zinc-800" />
                </motion.div>
                {/* Green dot indicator */}
                <span className="absolute bottom-2 right-2 z-10 w-1.5 h-1.5 rounded-full bg-[#1ED760] shadow-[0_0_6px_rgba(30,215,96,0.9)]" />
              </div>
            </div>

            {/* ── DESKTOP: Discover full-width ── */}
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden lg:flex bg-[#09090b] h-[72px] w-full rounded-[24px] border border-zinc-800/80 hover:border-accent-purple/60 px-6 items-center justify-between group transition-all duration-400 cursor-pointer relative overflow-hidden hover:shadow-[0_0_30px_rgba(181,153,255,0.12)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="font-medium text-white text-sm relative z-10 group-hover:text-accent-purple transition-colors duration-300">Discover more projects</span>
              <div className="relative z-10 w-8 h-8 rounded-full border border-zinc-800 group-hover:border-accent-purple/60 group-hover:bg-accent-purple/10 flex items-center justify-center transition-all duration-300">
                <ArrowRight className="text-zinc-400 group-hover:text-accent-purple transition-colors duration-300" />
              </div>
            </button>
            

          </div>

          {/* COLUMN 3 (Spotify + Typing Speed) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Spotify Editorial Vibe — hidden on mobile (shown in combined row above) */}
            <div 
              className="group bg-[#09090b] h-[130px] rounded-[24px] border border-zinc-800/80 hover:border-[#1ED760]/50 relative overflow-hidden hidden lg:flex items-center p-6 cursor-pointer interactive shadow-sm transition-all duration-500 hover:shadow-[0_0_35px_rgba(30,215,96,0.25)]"
              onClick={() => window.open('https://open.spotify.com/track/5NK3IhIeIXQmOKK5EiSRra?si=A8MFNweSSnSKjnWsOV_2Vw', '_blank')}
            >
               {/* Blurred Background Art */}
               <div 
                 className="absolute inset-0 bg-cover bg-center opacity-[0.15] group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 blur-md"
                 style={{ backgroundImage: `url('https://i.scdn.co/image/ab67616d0000b273c53e5adf9f81693d62f98019')` }}
               ></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none"></div>
               
               <div className="relative z-10 flex items-center w-full justify-between">
                  <div className="flex items-center gap-5 lg:gap-6">
                     {/* Spinning Record Art */}
                     <motion.div 
                        className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full shadow-[0_0_15px_rgba(30,215,96,0.1)] group-hover:shadow-[0_0_30px_rgba(30,215,96,0.5)] transition-shadow duration-500 overflow-hidden border border-zinc-800 shrink-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     >
                        <img src="https://i.scdn.co/image/ab67616d0000b273c53e5adf9f81693d62f98019" alt="Album Art" className="w-full h-full object-cover opacity-90" />
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#09090b] rounded-full -translate-x-1/2 -translate-y-1/2 border border-zinc-800 shadow-inner"></div>
                     </motion.div>

                     {/* Typography */}
                     <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5 opacity-90">
                          <SiSpotify className="text-[#1ED760] w-3 h-3" />
                          <span className="text-[#1ED760] text-[10px] font-mono tracking-widest uppercase mt-0.5">Now Playing</span>
                        </div>
                        <h4 className="text-white font-bold text-lg lg:text-xl tracking-tight leading-none group-hover:text-[#1ED760] transition-colors duration-300 line-clamp-1 max-w-[150px] sm:max-w-[200px]">Run Down The City</h4>
                        <span className="text-zinc-400 font-medium text-xs mt-1.5 line-clamp-1 max-w-[150px] sm:max-w-[200px]">Shashwat Sachdev</span>
                     </div>
                  </div>

                  {/* Equalizer Bars */}
                  <div className="hidden sm:flex items-end gap-1.5 h-8 opacity-80 pl-4">
                     {[...Array(4)].map((_, i) => (
                       <motion.div 
                         key={i}
                         className="w-1.5 bg-[#1ED760] rounded-t-sm"
                         animate={{ height: ["20%", "100%", "30%", "80%", "20%"] }}
                         transition={{
                           duration: 1.5,
                           repeat: Infinity,
                           ease: "easeInOut",
                           delay: i * 0.2
                         }}
                       />
                     ))}
                  </div>
               </div>
            </div>

            {/* Typing Speed */}
            <div className="bg-[#09090b] flex-1 rounded-[24px] border border-zinc-800/80 hover:border-accent-neon/40 p-6 relative overflow-hidden flex flex-col justify-between group cursor-default transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,255,255,0.18)]">
              <Badge icon={<Keyboard />} text="Typing speed" />
              {/* Cyan inner glow */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-accent-neon/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Massive background number */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                <AnimatedNumber value={67} className="text-[12rem] font-bold text-zinc-800/20" />
              </div>

              <div className="relative z-10 mt-4">
                <div className="flex items-end gap-2 text-white">
                  <AnimatedNumber value={67} className="text-6xl font-semibold leading-none tracking-tight group-hover:text-accent-neon transition-colors duration-500" />
                  <span className="text-xl text-zinc-400 mb-1">wpm</span>
                </div>
                
                <div className="flex gap-4 mt-6 text-zinc-500 text-xs font-mono font-medium">
                  <span className="flex items-center gap-1">⏱ 15s</span>
                  <span className="flex items-center gap-1">🎯 95%</span>
                  <span className="flex items-center gap-1">A EN</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM ROW (Github + Tech Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          
          {/* Github Activity */}
          <div className="lg:col-span-7 relative rounded-[24px] border border-zinc-800/80 hover:border-rose-500/80 p-6 flex flex-col justify-between overflow-hidden group transition-all duration-500 shadow-xl shadow-emerald-900/10 hover:shadow-rose-900/40 transform-gpu cursor-default">
            {/* Base Layer */}
            <div className="absolute inset-0 bg-[#09090b] z-0"></div>
            
            {/* Ambient Background Glow (Green) -> Contrasting on hover (Rose/Purple) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-900/10 to-transparent z-0 transition-all duration-700 group-hover:from-rose-500/30 group-hover:via-purple-900/20 group-hover:scale-110"></div>

            <div className="flex justify-between items-center mb-6 relative z-10">
              <a 
                href="https://github.com/Divya241181" 
                target="_blank" 
                rel="noreferrer"
                className="bg-zinc-950 border border-zinc-800 text-zinc-300 px-4 py-1.5 rounded-full flex items-center gap-2 font-bold text-sm font-sans hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <span className="flex items-center justify-center">
                  <GithubIcon />
                </span>
                Github activity
              </a>
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest hidden sm:block">Live Sync</span>
            </div>
            
            <div className="w-full overflow-x-auto no-scrollbar pb-2 opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
              <div className="min-w-fit pr-4">
                <GitHubCalendar 
                  username="divya241181" 
                  colorScheme="dark"
                  theme={{
                     dark: ['#18181b', '#064e3b', '#047857', '#10b981', '#34d399']
                  }}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                />
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="lg:col-span-5 bg-[#09090b] rounded-[24px] border border-zinc-800/80 hover:border-accent-gold/40 p-6 flex flex-col relative overflow-hidden group cursor-default transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,215,0,0.18)]">
             {/* Gold shimmer top edge */}
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <Badge icon={<StackIcon />} text="Tech stack" />
            
            <div className="flex-1 flex flex-col justify-center gap-8 mt-4">
              {/* Logos Infinite Marquee */}
              <div 
                className="flex overflow-hidden relative w-full opacity-60 py-2" 
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
              >
                  <motion.div 
                    className="flex whitespace-nowrap items-center w-max"
                    animate={{ x: [0, "-50%"] }}
                    transition={{ ease: "linear", duration: 12, repeat: Infinity }}
                  >
                     {[...Array(2)].map((_, i) => (
                       <div key={i} className="flex items-center gap-12 px-6">
                         <SiReact className="w-7 h-7 hover:text-[#61DAFB] transition-colors cursor-pointer shrink-0 text-zinc-500" />
                         <SiNodedotjs className="w-7 h-7 hover:text-[#339933] transition-colors cursor-pointer shrink-0 text-zinc-500" />
                         <SiMongodb className="w-7 h-7 hover:text-[#47A248] transition-colors cursor-pointer shrink-0 text-zinc-500" />
                         <SiTailwindcss className="w-7 h-7 hover:text-[#06B6D4] transition-colors cursor-pointer shrink-0 text-zinc-500" />
                         <SiFigma className="w-7 h-7 hover:text-[#F24E1E] transition-colors cursor-pointer shrink-0 text-zinc-500" />`n                          <SiPython className="w-7 h-7 hover:text-[#3776AB] hover:scale-125 transition-all cursor-pointer shrink-0 text-zinc-500" />`n                          <SiDjango className="w-7 h-7 hover:text-[#44B78B] hover:scale-125 transition-all cursor-pointer shrink-0 text-zinc-500" />
                       </div>
                     ))}
                  </motion.div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">Tech stacks I'm familiar with</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Primarily focused on the JavaScript ecosystem, but always eager to explore and learn new technologies.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
