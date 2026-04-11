import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── Project Data ─────────────────────────────────────────────
const projects = [
  {
    id: 1,
    index: '01',
    title: 'AI Code Intel Pro',
    category: 'AI / DEVELOPER TOOLS',
    description:
      'An advanced engineering tool that performs deep structural and security analysis on source code using Large Language Models, providing automated documentation and vulnerability detection.',
    tags: ['Next.js', 'OpenAI', 'Node.js', 'Prism.js'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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

// ── Single Project Card ──────────────────────────────────────
const ProjectCard = ({ project }) => (
  <div className="relative w-[80vw] md:w-[60vw] lg:w-[48vw] h-[50vh] md:h-[56vh] shrink-0 group">
    <div
      className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-zinc-800/80 transition-all duration-700 cursor-pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accent}50`;
        e.currentTarget.style.boxShadow = `0 0 60px ${project.accent}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Full Image Background */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
      />

      {/* Gradient overlay — thin strip at bottom by default, expands on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 group-hover:via-black/60 transition-all duration-700" />

      {/* Category pill — top right, hidden by default, visible on hover */}
      <div className="absolute top-12 right-8 md:top-14 md:right-10 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
        <span className="px-4 py-2 bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/50 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
          {project.category}
        </span>
      </div>

      {/* ── Content Container — anchored to bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14 flex flex-col justify-end">

        {/* Index — hidden by default, slides in on hover */}
        <span
          className="text-sm font-mono tracking-widest mb-3 block opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75"
          style={{ color: project.accent }}
        >
          /{project.index}
        </span>

        {/* Title — always visible, shifts up on hover to make room */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white font-heading leading-[0.9] mb-0 group-hover:mb-5 transition-all duration-500">
          {project.title}
        </h3>

        {/* ── Hover-reveal content ── */}
        <div className="max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* Description */}
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
            {project.description}
          </p>

          {/* Bottom bar: tags + action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-zinc-800 text-zinc-500 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Link */}
            <a
              href={project.link}
              className="flex items-center gap-3 shrink-0 group/btn"
            >
              <span className="text-white font-bold text-sm uppercase tracking-wider">
                View Project
              </span>
              <div
                className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 text-white"
                style={{
                  borderColor: `${project.accent}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = project.accent;
                  e.currentTarget.style.borderColor = project.accent;
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = `${project.accent}40`;
                  e.currentTarget.style.color = '';
                }}
              >
                <ArrowUpRight />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Ghost number watermark */}
      <span
        className="absolute top-1/2 right-8 md:right-14 -translate-y-1/2 text-[12rem] md:text-[18rem] font-black select-none pointer-events-none leading-none font-heading opacity-[0.03]"
        style={{ color: project.accent }}
      >
        {project.index}
      </span>
    </div>
  </div>
);

// ── "View All" End Card ──────────────────────────────────────
const ViewAllCard = () => (
  <div className="relative w-[45vw] md:w-[30vw] lg:w-[25vw] h-[50vh] md:h-[56vh] shrink-0 flex items-center justify-center">
    <a
      href="https://github.com/Divya241181"
      target="_blank"
      rel="noreferrer"
      className="group/all flex flex-col items-center justify-center gap-8 w-full h-full rounded-[3rem] border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm hover:border-accent-lime/50 hover:bg-zinc-900/60 transition-all duration-700 cursor-pointer"
    >
      <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-heading group-hover/all:text-accent-lime transition-colors duration-500">
        VIEW ALL
      </span>
      <div className="w-16 h-16 rounded-full border-2 border-zinc-700 group-hover/all:border-accent-lime flex items-center justify-center transition-all duration-500 group-hover/all:scale-110">
        <ArrowUpRight />
      </div>
      <span className="text-zinc-600 text-xs font-mono uppercase tracking-[0.3em] group-hover/all:text-zinc-400 transition-colors">
        ( GitHub Archive )
      </span>
    </a>
  </div>
);

// ── Main Projects Section ────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = React.useState(0);

  // Measure the horizontal track once images load / resize
  React.useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const clientW = window.innerWidth;
        setTrackWidth(scrollW - clientW);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    const timer = setTimeout(measure, 500); // re-measure after images
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, []);

  // Track how far we've scrolled through this pinned section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll (0→1) to horizontal translation (0 → -trackWidth px)
  const x = useTransform(scrollYProgress, [0, 1], [0, -trackWidth]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-transparent z-10"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Section Header — pinned at top */}
        <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8 md:pt-12 pb-8 md:pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-12 h-[1px] bg-zinc-600" />
              <span className="text-white text-xl font-bold tracking-widest uppercase font-heading">
                Selected <span className="text-accent-purple">Works</span>
              </span>
            </div>

            {/* Massive Typography */}
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85] font-heading"
              >
                FEATURED
              </motion.h2>
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[12vw] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-lime to-accent-neon leading-[0.85] font-heading"
              >
                WORK
              </motion.h2>
            </div>
          </div>

          {/* Scroll hint — right side */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden md:flex flex-col items-end gap-1 pb-2"
          >
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.3em]">Work</span>
            <span className="text-accent-lime text-[10px] font-mono tracking-[0.2em]">( Scroll )</span>
          </motion.div>
        </div>

        {/* Horizontal Track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-6 md:gap-8 pl-4 md:pl-8 pr-8"
            style={{ x }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <ViewAllCard />
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default Projects;

