import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SiBehance, SiDribbble, SiDiscord, SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-32 px-4 md:px-8 pb-8 z-10 relative">
      {/* Boxed Container */}
      <div className="max-w-[1400px] mx-auto bg-[#09090b] border border-zinc-800 rounded-[32px] overflow-hidden flex flex-col">
        
        {/* Top Content Area */}
        <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left: Headline */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-3xl lg:text-4xl text-white font-medium leading-snug max-w-[280px]">
              Where <span className="text-[#d946ef]">aesthetics</span> & <br/><span className="text-[#06b6d4]">functionality</span> meet
            </h2>
          </div>

          {/* Middle: Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:gap-12 pl-0 lg:pl-10">
            {/* Explore Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#f97316] font-medium text-lg mb-2">Explore</h3>
              <a href="#home" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium">Home</a>
              <a href="#about" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium">About Me</a>
              <a href="#contact" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium">Contact</a>
            </div>

            {/* Follow Me Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#06b6d4] font-medium text-lg mb-2">Follow Me</h3>
              <a href="#" className="flex items-center gap-3 text-zinc-300 hover:text-white hover:translate-x-1 transition-all group text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-[#0A66C2] flex items-center justify-center shrink-0">
                  <FaLinkedinIn className="text-white w-3 h-3" />
                </div>
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-3 text-zinc-300 hover:text-white hover:translate-x-1 transition-all group text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-[#5865F2] flex items-center justify-center shrink-0">
                  <SiDiscord className="text-white w-3 h-3" />
                </div>
                Discord
              </a>
              <a href="#" className="flex items-center gap-3 text-zinc-300 hover:text-white hover:translate-x-1 transition-all group text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                  <SiGithub className="text-black w-3.5 h-3.5" />
                </div>
                Github
              </a>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <a href="#contact" className="group flex items-center justify-between pb-6 border-b border-zinc-800 cursor-pointer">
               <div>
                 <h4 className="text-lg text-white font-medium group-hover:text-accent-lime transition-colors">Contact Me</h4>
                 <p className="text-zinc-500 text-xs mt-1">Say Hello !</p>
               </div>
               <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-accent-lime transition-colors shrink-0">
                 <ArrowRight className="text-accent-lime w-4 h-4 transform transition-transform duration-300" />
               </div>
            </a>
            
            <a href="#projects" className="group flex items-center justify-between pt-6 text-white cursor-pointer">
               <div>
                 <h4 className="text-lg text-white font-medium group-hover:text-accent-lime transition-colors">My Projects</h4>
                 <p className="text-zinc-500 text-xs mt-1">Explore Projects</p>
               </div>
               <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-accent-lime transition-colors shrink-0">
                 <ArrowRight className="text-accent-lime w-4 h-4 transform transition-transform duration-300" />
               </div>
            </a>
          </div>

        </div>

        {/* Massive Typography */}
        <div className="w-full px-6 flex flex-col items-center justify-end overflow-hidden pt-12 md:pt-16 pb-0">
           <svg 
             className="w-full h-auto text-[#FDFFE6] hover:text-white transition-colors duration-500 select-none cursor-default" 
             viewBox="0 0 1000 180" 
             preserveAspectRatio="none"
             style={{ transform: 'scale(1.09, 1.6)', transformOrigin: 'bottom center', marginBottom: '-0.5%' }}
           >
             <text 
               x="50%" 
               y="165" 
               textAnchor="middle" 
               textLength="1000"
               lengthAdjust="spacingAndGlyphs"
               className="font-black uppercase" 
               fontSize="200"
               fill="currentColor"
             >
               DIVYAPATEL
             </text>
           </svg>
        </div>

        {/* Bottom Bar */}
        <div className="px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 font-medium text-[11px] uppercase tracking-widest border-t border-zinc-800/80 mt-0 relative z-20 bg-[#09090b]">
           <p>Divya Patel ©2025 - Privacy Policy</p>
           <p>Gujarat, India</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
