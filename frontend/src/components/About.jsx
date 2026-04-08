import React, { useRef, useEffect } from 'react';
import { motion, animate, useInView, useMotionValue, useTransform } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiFigma, SiSpotify } from 'react-icons/si';

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
    <section id="about" className="py-24 px-4 bg-transparent z-10 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Kinetic Typography Bio Start */}
        <div className="mb-32 relative">
          
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

          <div className="flex items-center gap-4 mb-20 px-4 md:px-0">
            <div className="w-12 h-[1px] bg-zinc-600"></div>
            <span className="text-white text-xl font-bold tracking-widest uppercase">About <span className="text-accent-neon">Me</span></span>
          </div>
          
          {/* Massive Staggered Typography */}
          <div className="mb-24 space-y-2 md:space-y-4 px-4 md:px-0">
             <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10vw] md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-white leading-[0.85] m-0"
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
                  className="text-[10vw] md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-magenta leading-[0.85] m-0"
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
                  className="text-[10vw] md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-lime to-accent-neon leading-[0.85] m-0"
                >
                  IMPACT AND A.I.
                </motion.h2>
             </div>
          </div>

          {/* Details & Education Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 px-4 md:px-0">
             
             {/* Left: Bio Details */}
             <div className="md:col-span-5 flex flex-col justify-end">
               <motion.p 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="text-zinc-400 text-lg mb-12 leading-relaxed font-light"
               >
                 Currently pursuing a B.Tech in Information Technology. I focus on building robust applications combining clean architectural structures with deeply immersive, award-winning frontends.
               </motion.p>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.5 }}
               >
                 <a href="#" className="inline-flex items-center gap-4 bg-accent-lime text-black font-bold px-8 py-4 rounded-full group hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300 interactive shadow-sm">
                   Download Resume 
                   <div className="bg-black text-accent-lime rounded-full p-1 group-hover:-rotate-45 transition-transform duration-300">
                     <ArrowRight />
                   </div>
                 </a>
               </motion.div>
             </div>

             {/* Right: Interactive Education Tree */}
             <div className="md:col-span-7 flex flex-col gap-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent-purple"></div>
                  <span className="text-zinc-500 font-bold tracking-widest text-xs uppercase pt-0.5">Academic History</span>
                </div>
                
                <motion.div 
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.3 }}
                   className="p-8 rounded-[24px] bg-[#09090b] border border-zinc-800/80 hover:border-accent-magenta/50 relative overflow-hidden group interactive cursor-pointer shadow-sm"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-accent-magenta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                           <span className="w-1.5 h-1.5 rounded-full bg-accent-magenta group-hover:animate-ping"></span>
                           <span className="text-accent-magenta font-mono text-[10px] uppercase tracking-widest pt-0.5">Aug 2023 - 2027</span>
                        </div>
                        <h4 className="text-white font-bold text-2xl group-hover:text-accent-magenta transition-colors">B.Tech - Information Tech.</h4>
                        <p className="text-zinc-400 text-sm mt-2">Drs. Kiran & Pallavi Patel Global University</p>
                      </div>
                      <div className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-accent-magenta group-hover:text-black group-hover:border-accent-magenta transition-all duration-500 shrink-0 transform group-hover:scale-110">
                         <MapPin />
                      </div>
                   </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.4 }}
                   className="p-8 rounded-[24px] bg-[#09090b] border border-zinc-800/80 hover:border-accent-lime/50 relative overflow-hidden group interactive cursor-pointer shadow-sm"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-accent-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                           <span className="w-1.5 h-1.5 rounded-full bg-accent-lime group-hover:animate-ping"></span>
                           <span className="text-accent-lime font-mono text-[10px] uppercase tracking-widest pt-0.5">May 2021 - 2023</span>
                        </div>
                        <h4 className="text-white font-bold text-2xl group-hover:text-accent-lime transition-colors">Higher Secondary (Science)</h4>
                        <p className="text-zinc-400 text-sm mt-2">Krishna School of Science</p>
                      </div>
                      <div className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-accent-lime group-hover:text-black group-hover:border-accent-lime transition-all duration-500 shrink-0 transform group-hover:scale-110">
                         <MapPin />
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-[1px] bg-zinc-600"></div>
          <span className="text-white text-xl font-bold tracking-widest uppercase">Expertise & <span className="text-accent-purple">History</span></span>
        </div>
        {/* Main Grid: Using flex column wrappers for masonry-like masonry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* COLUMN 1 (Location + Social) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Location Card */}
            <div className="bg-[#09090b] h-[280px] rounded-[24px] border border-zinc-800/80 p-5 relative overflow-hidden flex flex-col justify-between">
               {/* Map Background Layer */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale opacity-20"></div>
               <div className="absolute inset-0 bg-black/40"></div>
               {/* Glowing Dot */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-500/30 blur-2xl rounded-full"></div>
               
               <div className="relative z-10 w-full flex justify-start">
                 <Badge icon={<MapPin />} text="Location" />
               </div>
               
               <div className="relative z-10 w-8 h-8 rounded-full bg-black/80 border border-zinc-800 flex items-center justify-center text-zinc-400">
                 —
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
            <div className="bg-[#09090b] flex-1 rounded-[24px] border border-zinc-800/80 p-6 flex flex-col relative overflow-hidden group">
              <Badge icon={<Briefcase />} text="Featured work" />
              <h3 className="text-2xl font-semibold text-white mb-2 z-10 mt-2">Bookmarked</h3>
              <p className="text-zinc-400 text-sm leading-relaxed z-10 max-w-[90%]">
                Effortlessly save and organize your favorite tweets in Notion using a Telegram bot.
              </p>
              
              {/* Mockup visual */}
              <div className="relative mt-8 flex-1 w-full bg-gradient-to-b from-zinc-400/20 to-transparent rounded-xl border border-zinc-700/50 p-2 overflow-hidden shadow-2xl scale-105 group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg shadow-black/50 shadow-lg">
                  <div className="w-10 h-10 bg-zinc-900 rounded-md border border-zinc-700 flex items-center justify-center text-zinc-400">
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

            {/* Discover Projects Pill */}
            <a href="#projects" className="bg-[#09090b] h-[72px] rounded-[24px] border border-zinc-800/80 px-6 flex items-center justify-between group hover:bg-zinc-900 transition-colors cursor-pointer">
              <span className="font-medium text-white text-sm">Discover more projects</span>
              <ArrowRight className="text-zinc-400 group-hover:text-white transition-colors" />
            </a>
            
          </div>

          {/* COLUMN 3 (Spotify + Typing Speed) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Spotify Editorial Vibe */}
            <div 
              className="group bg-[#09090b] h-[130px] rounded-[24px] border border-zinc-800/80 relative overflow-hidden flex items-center p-6 cursor-pointer interactive shadow-sm"
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
            <div className="bg-[#09090b] flex-1 rounded-[24px] border border-zinc-800/80 p-6 relative overflow-hidden flex flex-col justify-between">
              <Badge icon={<Keyboard />} text="Typing speed" />
              
              {/* Massive background number */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                <AnimatedNumber value={142} className="text-[12rem] font-bold text-zinc-800/20" />
              </div>

              <div className="relative z-10 mt-4">
                <div className="flex items-end gap-2 text-white">
                  <AnimatedNumber value={142} className="text-6xl font-semibold leading-none tracking-tight" />
                  <span className="text-xl text-zinc-400 mb-1">wpm</span>
                </div>
                
                <div className="flex gap-4 mt-6 text-zinc-500 text-xs font-mono font-medium">
                  <span className="flex items-center gap-1">⏱ 15s</span>
                  <span className="flex items-center gap-1">🎯 100%</span>
                  <span className="flex items-center gap-1">A EN</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM ROW (Github + Tech Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          
          {/* Github Activity */}
          <div className="lg:col-span-7 bg-[#09090b] rounded-[24px] border border-zinc-800/80 p-6 flex flex-col justify-between overflow-hidden group">
            <div className="flex justify-between items-center mb-6">
              <Badge icon={<GithubIcon />} text="Github activity" />
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest hidden sm:block">Live Sync</span>
            </div>
            
            <div className="w-full overflow-x-auto no-scrollbar pb-2 opacity-80 group-hover:opacity-100 transition-opacity">
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
          <div className="lg:col-span-5 bg-[#09090b] rounded-[24px] border border-zinc-800/80 p-6 flex flex-col">
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
                         <SiFigma className="w-7 h-7 hover:text-[#F24E1E] transition-colors cursor-pointer shrink-0 text-zinc-500" />
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
