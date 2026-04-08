import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.8 }} // Waits for loader
      className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-6 flex items-center justify-between z-50 relative top-0"
    >
      {/* Left Profile Pill */}
      <div className="flex items-center gap-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 px-2 py-2 pr-6 rounded-full">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 shrink-0">
          <img src="/profile.jpg" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-medium text-sm tracking-wide">Divya Patel</span>
      </div>

      {/* Center Nav Pills (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 px-6 py-3 rounded-full">
        <a href="#home" className="text-zinc-400 hover:text-white transition-colors text-sm px-4 py-1 rounded-full flex items-center gap-2">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
           Home
        </a>
        <a href="#projects" className="text-zinc-400 hover:text-white transition-colors text-sm px-4 py-1 rounded-full flex items-center gap-2">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
           My Projects
        </a>
        <a href="#about" className="text-zinc-400 hover:text-white transition-colors text-sm px-4 py-1 rounded-full flex items-center gap-2">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
           About Me
        </a>
      </div>

      {/* Right Contact Pill */}
      <a href="#contact" className="bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md border border-zinc-800/80 px-6 py-3 rounded-full text-white text-sm font-medium transition-colors">
        Contact Me
      </a>
    </motion.nav>
  );
};

export default Navbar;
