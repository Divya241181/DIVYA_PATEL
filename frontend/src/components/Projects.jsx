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
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
            >
              
              {/* Left Column: Image Wrapper */}
              <div className="lg:col-span-7 relative group">
                <div className="absolute inset-0 bg-accent-neon/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                <div className="relative aspect-[16/10] bg-zinc-900 rounded-2xl md:rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="lg:col-span-5 flex flex-col px-4 md:px-0">
                 {/* Top Index */}
                 <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 w-fit mb-8 shadow-inner">
                    <span className="text-accent-gold font-bold text-xs tracking-wider">{project.date}</span>
                 </div>

                 {/* Title */}
                 <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                   {project.title}
                 </h2>

                 {/* Description */}
                 <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg">
                   {project.description}
                 </p>

                 {/* Tech Tags */}
                 <div className="flex flex-wrap gap-2 mb-12">
                   {project.tags.map(tag => (
                     <span key={tag} className="px-4 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-sm font-medium tracking-wide">
                       {tag}
                     </span>
                   ))}
                 </div>

                 {/* Actions */}
                 <div className="flex items-center gap-4">
                    <a href={project.link} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent-lime text-black font-bold hover:scale-105 transition-transform">
                      Live Demo <ArrowUpRight />
                    </a>
                    <a href={project.github} className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent border border-zinc-700 text-white hover:bg-zinc-800 transition-colors font-medium">
                      Source Code
                    </a>
                 </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
