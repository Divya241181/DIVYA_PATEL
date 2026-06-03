import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

// ── Fallback Project Data ────────────────────────────────────
const fallbackProjects = [
  {
    id: 1,
    index: '01',
    title: 'AI Code Intel Pro',
    category: 'AI / DEVELOPER TOOLS',
    description:
      'An advanced engineering tool that performs deep structural and security analysis on source code using Large Language Models, providing automated documentation and vulnerability detection.',
    tags: ['Next.js', 'OpenAI', 'Node.js', 'Prism.js'],
    image: '/SnapPDF home Image.jpeg',
    accent: '#00FFFF',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    index: '02',
    title: 'MedicalVLM',
    category: 'AI / HEALTHCARE',
    description:
      'A medical visual language model platform for X-ray analysis using LLaVA-1.5. Features GradCAM heatmaps, structured PDF report generation, and a React dashboard with Supabase auth.',
    tags: ['LLaVA-1.5', 'FastAPI', 'React', 'Supabase'],
    image: '/Med VLM.png',
    accent: '#B599FF',
    link: '#',
    github: 'https://github.com/Divya241181',
  },
  {
    id: 3,
    index: '03',
    title: 'EcoTrack Dashboard',
    category: 'FULLSTACK / DATA',
    description:
      'A comprehensive carbon footprint tracking platform built for enterprise clients. Features real-time data ingestion, predictive modeling, and automated ESG report generation.',
    tags: ['React', 'Express', 'MongoDB', 'D3.js'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    accent: '#CCFF00',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    index: '04',
    title: '3D Model Web UI',
    category: 'FRONTEND / 3D',
    description:
      'An interactive 3D model showcase website with real-time rendering, dynamic lighting controls, and gesture-based model manipulation built with modern web technologies.',
    tags: ['Three.js', 'CSS3', 'JavaScript', 'WebGL'],
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    accent: '#FF00FF',
    link: '#',
    github: 'https://github.com/Divya241181/3D-Model-Web-Design',
  },
];

// Default images for projects without images
const defaultImages = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
];

// ── Arrow Icon ───────────────────────────────────────────────
const ArrowUpRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);



// ── Single Project Card (Cinematic) ──────────────────────────
const ProjectCard = ({ project, index, isEven }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      {/* ── Image Side ── */}
      <div
        className="relative w-full lg:w-[58%] group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow border — pure CSS transition */}
        <div
          className="absolute -inset-[2px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
          style={{
            background: `linear-gradient(135deg, ${project.accent}50, transparent 40%, ${project.accent}30, transparent 70%, ${project.accent}50)`,
            filter: 'blur(8px)',
          }}
        />

        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800/60 group-hover:border-zinc-700/60 transition-colors duration-700">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out grayscale-[30%] brightness-90 group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-[1.06]"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at 50% 80%, ${project.accent}30, transparent 70%)`,
              }}
            />
          </div>

          {/* Floating index number inside image */}
          <span
            className="absolute top-6 left-8 text-[8rem] md:text-[10rem] font-black font-heading leading-none select-none pointer-events-none transition-opacity duration-500"
            style={{ color: project.accent, opacity: isHovered ? 0.12 : 0.04 }}
          >
            {project.index}
          </span>

          {/* Category pill */}
          <div className="absolute top-6 right-6">
            <span
              className="px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] border backdrop-blur-md"
              style={{
                color: project.accent,
                borderColor: `${project.accent}30`,
                background: 'rgba(0,0,0,0.5)',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Bottom image gradient bar with accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 origin-left transition-transform duration-500 ease-out"
            style={{ background: project.accent, transform: isHovered ? 'scaleX(1)' : 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* ── Content Side ── */}
      <div className={`w-full lg:w-[42%] flex flex-col gap-6 ${isEven ? 'lg:pl-0' : 'lg:pr-0'}`}>
        {/* Index + line */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span
            className="text-sm font-mono font-bold tracking-[0.3em]"
            style={{ color: project.accent }}
          >
            {project.index}
          </span>
          <div className="flex-1 h-[1px] bg-zinc-800" />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white font-heading leading-[0.9]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-3 py-1.5 rounded-full border text-zinc-500 uppercase tracking-widest hover:text-white transition-colors duration-300 cursor-default"
              style={{
                borderColor: 'rgba(63,63,70,0.5)',
                background: 'rgba(9,9,11,0.6)',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA Row */}
        <motion.div
          className="flex items-center gap-5 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <a
            href={project.link}
            className="group/btn flex items-center gap-3"
          >
            <span className="text-white font-bold text-sm uppercase tracking-wider group-hover/btn:tracking-[0.2em] transition-all duration-500">
              View Project
            </span>
            <div
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-white hover:text-black hover:scale-110 transition-all duration-500"
              style={{ borderColor: `${project.accent}40` }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = project.accent; e.currentTarget.style.borderColor = project.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.borderColor = `${project.accent}40`; }}
            >
              <ArrowUpRight />
            </div>
          </a>

          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors duration-300 border-b border-zinc-800 hover:border-zinc-500 pb-0.5"
            >
              Source ↗
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};


// ── Main Projects Section ────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });
  const { works, loading: portfolioLoading } = usePortfolioData();

  // Transform API works data to the format expected by ProjectCard
  const projects = React.useMemo(() => {
    if (works && works.length > 0) {
      return works.map((w, i) => ({
        id: w._id || i + 1,
        index: String(i + 1).padStart(2, '0'),
        title: w.title,
        category: (w.category || '').toUpperCase(),
        description: w.desc,
        tags: w.tags || [],
        image: w.image || defaultImages[i % defaultImages.length],
        accent: w.accent || '#00FFFF',
        link: w.link || '#',
        github: w.github || '#',
      }));
    }
    return fallbackProjects;
  }, [works]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* ── Ambient Background — static CSS, no JS animation ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-purple/[0.04] blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent-neon/[0.03] blur-[80px]" />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-10">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="mb-20 md:mb-32">
          {/* Label */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-[2px] bg-gradient-to-r from-accent-lime to-transparent" />
            <span className="text-zinc-400 text-sm font-mono uppercase tracking-[0.3em]">
              Selected Works
            </span>
            <span
              className="px-3 py-1 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-[10px] font-mono font-bold tracking-widest"
            >
              {String(projects.length).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden">
            <motion.h2
              className="text-[13vw] sm:text-[10vw] md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85] font-heading"
              initial={{ y: '110%' }}
              animate={isHeaderInView ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Featured
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-[13vw] sm:text-[10vw] md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] font-heading"
              style={{
                WebkitTextStroke: '2px rgba(204,255,0,0.6)',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ y: '110%' }}
              animate={isHeaderInView ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Projects
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-zinc-500 text-base md:text-lg max-w-xl mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            A curated showcase of my most impactful work — from AI-powered platforms to immersive web experiences.
          </motion.p>
        </div>


        {/* ── Project Cards ── */}
        <div className="flex flex-col gap-24 md:gap-36 lg:gap-44">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isEven={i % 2 === 0}
            />
          ))}
        </div>



      </div>
    </section>
  );
};

export default Projects;
