import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-0 pb-16 lg:pb-24 overflow-hidden bg-transparent z-10 w-full">
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Typography Column */}
        <div className="flex-1 flex flex-col justify-center text-left w-full lg:max-w-[60%] xl:max-w-[65%]">
           
           {/* Intro Tag */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 2.9 }}
             className="flex items-center gap-4 mb-8"
           >
             <div className="w-12 h-[1px] bg-zinc-600"></div>
             <span className="text-zinc-400 font-light tracking-widest uppercase text-sm">Hello, I'm Divya Patel</span>
           </motion.div>

           {/* Kinetic Main Header */}
           <div className="relative z-20">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.0 }}
                className="text-[14vw] sm:text-[10vw] lg:text-[7rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase m-0 p-0 font-sans block"
              >
                <span className="block text-white mb-2">FULL STACK</span>
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-accent-purple to-accent-magenta"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  WEB DEVELOPER
                </motion.span>
              </motion.h1>
           </div>

           {/* Animated Paragraph */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 3.2 }}
             className="mt-8 md:mt-12 max-w-3xl relative z-10"
           >
              <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 font-medium leading-relaxed uppercase tracking-tight">
                Engineering high-performance 
                <motion.span 
                  animate={{ color: ["#ffffff", "#ccff00", "#ffffff"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="mx-2 inline-block font-black text-white"
                >
                  FULL-STACK
                </motion.span> 
                applications. Focused on scalable architectures and 
                <motion.span 
                  animate={{ textShadow: ["0px 0px 0px rgba(0,255,255,0)", "0px 0px 25px rgba(0,255,255,0.8)", "0px 0px 0px rgba(0,255,255,0)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="mx-2 inline-block font-black text-accent-neon"
                >
                  HIGH-IMPACT
                </motion.span> 
                digital solutions.
              </p>
           </motion.div>
        </div>

        {/* Right 3D Image Column */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 1, delay: 3.4 }}
           className="relative flex justify-center items-center shrink-0 w-full lg:w-auto mt-8 lg:mt-0"
        >
           <motion.div
             className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]"
             animate={{ 
               y: [-15, 15, -15],
               rotateX: [6, -6, 6],
               rotateY: [-6, 6, -6]
             }}
             transition={{
               duration: 8,
               repeat: Infinity,
               ease: "easeInOut"
             }}
             style={{ transformStyle: "preserve-3d", perspective: 1000 }}
           >
             {/* Dynamic Ambient Shadow */}
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-neon via-accent-purple to-accent-magenta blur-3xl opacity-20 hover:opacity-40 transition-opacity duration-700"></div>
             
             {/* Glowing Orbit Rings */}
             <motion.div 
               className="absolute -inset-4 sm:-inset-8 border border-accent-neon/30 rounded-full pointer-events-none"
               animate={{ rotateZ: 360, rotateX: 20 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             ></motion.div>
             <motion.div 
               className="absolute -inset-8 sm:-inset-16 border border-accent-magenta/20 rounded-full pointer-events-none"
               animate={{ rotateZ: -360, rotateY: 20 }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
