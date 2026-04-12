import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Cursor from '../components/Cursor';

// ── All Project Data ─────────────────────────────────────────
const allProjects = [
  // ── Featured (from homepage) ──
  {
    id: 1,
    title: 'AI Code Intel Pro',
    category: 'AI / Developer Tools',
    description:
      'An advanced engineering tool that performs deep structural and security analysis on source code using Large Language Models, providing automated documentation and vulnerability detection.',
    tags: ['Next.js', 'OpenAI', 'Node.js', 'Prism.js'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#00FFFF',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'MedicalVLM',
    category: 'AI / Healthcare',
    description:
      'A medical visual language model platform for X-ray analysis using LLaVA-1.5. Features GradCAM heatmaps, structured PDF report generation, and a React dashboard with Supabase auth.',
    tags: ['LLaVA-1.5', 'FastAPI', 'React', 'Supabase'],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#B599FF',
    link: '#',
    github: 'https://github.com/Divya241181/MedicalVLM',
    featured: true,
  },
  {
    id: 3,
    title: 'EcoTrack Dashboard',
    category: 'Fullstack / Data',
    description:
      'A comprehensive carbon footprint tracking platform built for enterprise clients. Features real-time data ingestion, predictive modeling, and automated ESG report generation.',
    tags: ['React', 'Express', 'MongoDB', 'D3.js'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#CCFF00',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 4,
    title: '3D Model Web UI',
    category: 'Frontend / 3D',
    description:
      'An interactive 3D model showcase website with real-time rendering, dynamic lighting controls, and gesture-based model manipulation built with modern web technologies.',
    tags: ['Three.js', 'CSS3', 'JavaScript', 'WebGL'],
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#FF00FF',
    link: '#',
    github: 'https://github.com/Divya241181/3D-Model-Web-Design',
    featured: true,
  },
  // ── Additional Projects ──
  {
    id: 5,
    title: 'SnapPDF',
    category: 'Fullstack / Utility',
    description:
      'A direct PDF generating web application that runs entirely in the browser — no local installation required. Built with a clean UI and deployed on Vercel for instant access.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Vercel'],
    image:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#FF6B6B',
    link: 'https://snappdf-phi.vercel.app',
    github: 'https://github.com/Divya241181/SnapPDF',
    featured: false,
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    category: 'Fullstack / Web',
    description:
      'A full-featured e-commerce storefront with product catalog, shopping cart, and checkout flow. Built with responsive design and modern HTML/CSS/JS.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#FFD700',
    link: '#',
    github: 'https://github.com/Divya241181/E-commerce',
    featured: false,
  },
  {
    id: 7,
    title: 'Quick Notes',
    category: 'Frontend / Utility',
    description:
      'A lightweight, browser-based note-taking application. Take quick notes with a clean, distraction-free interface — no sign-up required.',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    image:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#4ECDC4',
    link: '#',
    github: 'https://github.com/Divya241181/Quick-Notes',
    featured: false,
  },
  {
    id: 8,
    title: 'Movie Slider',
    category: 'Frontend / UI',
    description:
      'A visually engaging movie poster carousel with smooth sliding transitions. Built as a pure frontend exercise showcasing CSS animations and DOM manipulation.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Animation'],
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#E040FB',
    link: '#',
    github: 'https://github.com/Divya241181/Movie-Slider',
    featured: false,
  },
  {
    id: 9,
    title: 'PDF Maker',
    category: 'Frontend / Utility',
    description:
      'An online PDF creation tool that lets users compose and export documents directly from the browser, eliminating the need for desktop software.',
    tags: ['JavaScript', 'HTML', 'CSS', 'PDF API'],
    image:
      'https://images.unsplash.com/photo-1618044619888-009e412ff12a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#7C4DFF',
    link: '#',
    github: 'https://github.com/Divya241181/PDF-Maker',
    featured: false,
  },
  {
    id: 10,
    title: 'Portfolio V1',
    category: 'Frontend / Web',
    description:
      'My first personal portfolio website — a fully responsive site built with pure HTML and CSS, showcasing my early projects and learnings.',
    tags: ['HTML', 'CSS', 'Responsive', 'GitHub Pages'],
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    accent: '#00E5FF',
    link: '#',
    github: 'https://github.com/Divya241181/Portfolio',
    featured: false,
  },
];

// ── Extract unique categories ──
const categories = ['All', ...new Set(allProjects.map((p) => p.category))];

// ── Single Project Card ──────────────────────────────────────
const ProjectGridCard = ({ project, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    className="group relative rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-950/50 backdrop-blur-sm hover:border-opacity-80 transition-all duration-700"
    style={{
      '--card-accent': project.accent,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${project.accent}40`;
      e.currentTarget.style.boxShadow = `0 0 40px ${project.accent}12`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '';
      e.currentTarget.style.boxShadow = '';
    }}
  >
    {/* Image */}
    <div className="relative h-52 md:h-56 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent-lime/20 border border-accent-lime/40 rounded-full text-[10px] font-mono uppercase tracking-widest text-accent-lime">
            Featured
          </span>
        </div>
      )}

      {/* Category pill */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/50 rounded-full text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-400">
          {project.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-tight mb-3 group-hover:text-white/90 transition-colors">
        {project.title}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed mb-5 line-clamp-3">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-500 uppercase tracking-widest"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action links */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
        {project.github && project.github !== '#' && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 text-xs font-mono uppercase tracking-wider"
          >
            <FaGithub size={14} />
            Source
          </a>
        )}
        {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 text-xs font-mono uppercase tracking-wider ml-auto"
          >
            Live Demo
            <ExternalLink size={14} />
          </a>
        )}
        {(!project.link || project.link === '#') &&
          (!project.github || project.github === '#') && (
            <span className="text-zinc-700 text-xs font-mono uppercase tracking-wider">
              Coming Soon
            </span>
          )}
      </div>
    </div>
  </motion.div>
);

// ── Main Page Component ──────────────────────────────────────
const AllProjects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(
        allProjects.filter((p) => p.category === activeFilter)
      );
    }
  }, [activeFilter]);

  return (
    <div className="relative w-full overflow-x-clip min-h-screen">
      <Cursor />
    <div className="min-h-screen bg-background text-white relative">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-neon/[0.03] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-8 md:py-12">
        {/* ── Back Link ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-zinc-500 hover:text-accent-lime transition-colors duration-300 mb-12 md:mb-16 group/back"
          >
            <div className="w-10 h-10 rounded-full border border-zinc-800 group-hover/back:border-accent-lime/50 flex items-center justify-center transition-all duration-300">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-mono uppercase tracking-widest">
              Back to Home
            </span>
          </Link>
        </motion.div>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-zinc-600" />
            <span className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">
              Complete Archive
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white font-heading leading-[0.9] mb-6">
            ALL{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-lime to-accent-neon">
              PROJECTS
            </span>
          </h1>

          <p className="text-zinc-500 text-base md:text-lg max-w-2xl leading-relaxed">
            A comprehensive collection of everything I've built — from
            full-stack applications and AI-powered tools to frontend experiments
            and utility apps.
          </p>
        </motion.div>

        {/* ── Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-10 md:mb-14 overflow-x-auto pb-2 scrollbar-hide"
        >
          <SlidersHorizontal size={14} className="text-zinc-600 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-[0.15em] whitespace-nowrap border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-accent-lime/10 border-accent-lime/40 text-accent-lime'
                  : 'bg-zinc-950/50 border-zinc-800/60 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Project Count ── */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-zinc-600 text-xs font-mono uppercase tracking-widest">
            Showing {filteredProjects.length} of {allProjects.length} projects
          </span>
        </div>

        {/* ── Project Grid ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectGridCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 md:mt-28 text-center pb-12"
        >
          <div className="w-16 h-[1px] bg-zinc-800 mx-auto mb-8" />
          <p className="text-zinc-600 text-sm font-mono uppercase tracking-widest mb-6">
            Want to see more?
          </p>
          <a
            href="https://github.com/Divya241181"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-700 bg-zinc-950/50 text-white font-bold text-sm uppercase tracking-wider hover:border-accent-lime/50 hover:bg-accent-lime/5 transition-all duration-500 group/gh"
          >
            <FaGithub size={18} />
            <span>View GitHub Profile</span>
            <ArrowUpRight
              size={16}
              className="group-hover/gh:translate-x-1 group-hover/gh:-translate-y-1 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* ── Massive Typography Footer ── */}
        <div className="w-full flex flex-col items-center justify-end overflow-hidden pt-16 md:pt-28 pb-0">
          <svg 
            className="w-full h-auto text-[#e8e4d9] select-none cursor-default" 
            viewBox="0 0 1000 180" 
            preserveAspectRatio="none"
            style={{ transform: 'scale(1.06, 1.6)', transformOrigin: 'bottom center', marginBottom: '-0.5%' }}
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
              DivyaPatel
            </text>
          </svg>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-5 mb-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-zinc-500 font-medium text-xs uppercase tracking-widest border-t border-zinc-800/80 mt-0 relative z-20 max-w-[1400px] mx-auto px-6 md:px-10">
          <p><span className="font-bold text-zinc-300">Divya Patel</span> ©2026 - Privacy Policy</p>
          <p className="font-bold text-zinc-300">Gujarat, India</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AllProjects;
