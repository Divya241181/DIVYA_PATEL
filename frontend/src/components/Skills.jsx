import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-accent-gold/10 blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8 border-b border-zinc-800 pb-4">
          Tech Stack // Tools
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 inner-glow"
          >
            <h3 className="text-2xl font-bold text-accent-neon mb-4 font-mono">01. Frontend / Design</h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              I specialize in crafting pixel-perfect interfaces utilizing <strong className="text-white">React</strong>, <strong className="text-white">Framer Motion</strong>, and deeply customized <strong className="text-white">Tailwind CSS</strong>. With tools like <strong className="text-white">Figma</strong>, I design dynamic experiences that prioritize both aesthetics and functionality.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 inner-glow"
          >
            <h3 className="text-2xl font-bold text-accent-purple mb-4 font-mono">02. Backend / Architecture</h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Robost structural engineering using <strong className="text-white">Node.js</strong> and <strong className="text-white">Express</strong>. I efficiently handle data layers and state integrations securely via <strong className="text-white">MongoDB</strong> architectures.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* The Infinite Marquee (High Contrast) */}
      <div className="relative flex overflow-x-hidden border-y border-white/5 py-10 bg-black/50 rotate-[-2deg] scale-110">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent mx-8 mix-blend-plus-lighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>REACT</span>
              <span className="text-accent-neon mx-8 text-4xl">✦</span>
              <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent mx-8 mix-blend-plus-lighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>NODE.JS</span>
              <span className="text-accent-purple mx-8 text-4xl">✦</span>
              <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent mx-8 mix-blend-plus-lighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>MONGODB</span>
              <span className="text-accent-gold mx-8 text-4xl">✦</span>
              <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent mx-8 mix-blend-plus-lighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>TAILWIND CSS</span>
              <span className="text-accent-magenta mx-8 text-4xl">✦</span>
              <span className="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent mx-8 mix-blend-plus-lighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>FIGMA</span>
              <span className="text-accent-neon mx-8 text-4xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
