import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "AI Code Intel Pro",
    date: "01 • 2026",
    description: "An advanced engineering tool that performs deep structural and security analysis on source code using Large Language Models, providing automated documentation and vulnerability detection.",
    tags: ["Next.js", "OpenAI", "Node.js", "Prism.js"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "EcoTrack Dashboard",
    date: "02 • 2025",
    description: "A comprehensive carbon footprint tracking platform built for enterprise clients. Features real-time data ingestion, predictive modeling, and automated ESG report generation.",
    tags: ["React", "Express", "MongoDB", "D3.js"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "#",
    github: "#"
  }
];

const ArrowUpRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-transparent z-10 relative">
      <div className="max-w-[1400px] mx-auto pt-20">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-24 px-4 md:px-0">
          <div className="w-12 h-[1px] bg-zinc-600"></div>
          <span className="text-white text-xl font-bold tracking-widest uppercase">Selected <span className="text-accent-purple">Works</span></span>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-40 lg:gap-64">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-0`}
              >
                
                {/* Project Image: Large & Angled */}
                <motion.div 
                  initial={{ x: isEven ? -100 : 100, rotateY: isEven ? 10 : -10, opacity: 0 }}
                  whileInView={{ x: 0, rotateY: isEven ? 5 : -5, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-[70%] relative group perspective-1000"
                >
                  {/* Background Aura */}
                  <div className={`absolute -inset-10 bg-gradient-to-tr ${isEven ? 'from-accent-neon/20' : 'from-accent-purple/20'} to-transparent blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10`}></div>
                  
                  {/* Image Card */}
                  <div className="relative aspect-[16/9] rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.02] transition-transform duration-700">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Floating Tech Badges on Image */}
                    <div className="absolute bottom-6 left-6 flex gap-2">
                       {project.tags.slice(0, 2).map(tag => (
                         <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-white uppercase tracking-widest font-bold">{tag}</span>
                       ))}
                    </div>
                  </div>
                </motion.div>

                {/* Content Card: Floating & Overlapping */}
                <motion.div 
                  initial={{ x: isEven ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`w-full lg:w-[45%] bg-zinc-950/90 backdrop-blur-2xl p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl relative z-20 lg:mt-0 ${isEven ? 'lg:ml-[-15%]' : 'lg:mr-[-15%]'} hover:border-white/20 transition-colors duration-500 overflow-hidden`}
                >
                   {/* Refined date/index info */}
                   <div className="flex items-center gap-6 mb-8 text-xs font-mono tracking-[0.3em] uppercase text-zinc-500">
                      <span className="text-accent-gold">Project {index + 1}</span>
                      <div className="h-[1px] w-8 bg-zinc-800"></div>
                      <span>{project.date.split('•')[1]}</span>
                   </div>

                   <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                     {project.title}
                   </h2>

                   <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md">
                     {project.description}
                   </p>

                   {/* Functional Actions */}
                   <div className="flex flex-wrap items-center gap-6">
                      <a href={project.link} className="group flex items-center gap-3 text-white font-bold text-lg hover:text-accent-lime transition-colors">
                        <span className="pb-1 border-b-2 border-accent-lime/0 group-hover:border-accent-lime tracking-tight">Live Demo</span>
                        <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-accent-lime group-hover:border-accent-lime group-hover:text-black transition-all duration-300">
                           <ArrowUpRight />
                        </div>
                      </a>
                   </div>

                   {/* Subtle decoration */}
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <div className="text-9xl font-black">{index + 1}</div>
                   </div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
