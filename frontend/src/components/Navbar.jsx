import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', id: 'home', label: 'Home' },
    { href: '#about', id: 'about', label: 'About Me' },
    { href: '#skills', id: 'skills', label: 'Tech Stack' },
    { href: '#projects', id: 'projects', label: 'Projects' },
    { href: '#contact', id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-5 flex items-center justify-between z-50 relative top-0"
      >
        {/* Left Profile Pill */}
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 px-2 py-2 pr-5 rounded-full cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/80 transition-all group"
          aria-label="Reload site"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img src="/profile.jpg" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-medium text-sm tracking-wide">Divya Patel</span>
        </button>

        {/* Center Nav Pills — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 px-6 py-3 rounded-full">
          <a href="#home" className="group button-calypso text-sm px-4 py-1.5 transition-colors duration-300" style={{ '--hover-bg': '#B599FF' }}>
             <span className={`calypso-text flex items-center gap-2 font-medium transition-colors duration-300 ${activeSection === 'home' ? 'text-white' : 'text-zinc-400 group-hover:text-black'}`}>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
               Home
             </span>
          </a>
          <a href="#projects" className="group button-calypso text-sm px-4 py-1.5 transition-colors duration-300" style={{ '--hover-bg': '#FFD700' }}>
             <span className={`calypso-text flex items-center gap-2 font-medium transition-colors duration-300 ${activeSection === 'projects' ? 'text-white' : 'text-zinc-400 group-hover:text-black'}`}>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
               My Projects
             </span>
          </a>
          <a href="#about" className="group button-calypso text-sm px-4 py-1.5 transition-colors duration-300" style={{ '--hover-bg': '#00FFFF' }}>
             <span className={`calypso-text flex items-center gap-2 font-medium transition-colors duration-300 ${activeSection === 'about' ? 'text-white' : 'text-zinc-400 group-hover:text-black'}`}>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               About Me
             </span>
          </a>
        </div>

        {/* Right Side: Contact Link + Hamburger on Mobile */}
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden sm:flex group button-calypso bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 px-5 py-2.5 cursor-pointer" style={{ '--hover-bg': '#0ea5e9' }}>
            <span className="calypso-text flex items-center gap-3 text-white text-sm font-medium">
               <span className="relative flex items-center justify-center shrink-0">
                  <span className="absolute w-3.5 h-3.5 bg-[#39FF14] rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60"></span>
                  <span className="relative w-2.5 h-2.5 bg-[#39FF14] rounded-full shadow-[0_0_8px_rgba(57,255,20,0.8)]"></span>
               </span>
               <span className="tracking-wide">Let's Connect</span>
            </span>
          </a>

          {/* Hamburger Button — only on mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 gap-1.5"
            aria-label="Toggle Menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-5 h-0.5 bg-white origin-center transition-all" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-white" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-5 h-0.5 bg-white origin-center transition-all" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto pt-24 pb-10"
          >
            <div className="flex flex-col items-center justify-center w-full min-h-full gap-8 my-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-4xl font-black uppercase tracking-tighter text-zinc-400 font-heading hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-2 px-10 py-4 bg-accent-lime text-black font-black text-lg rounded-full uppercase tracking-wider shrink-0"
              >
                Let's Connect
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

