import React from 'react';
import { motion } from 'framer-motion';

// ── Experience Data ──────────────────────────────────────────
const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    type: 'Freelance',
    company: 'Self-Employed',
    period: 'Jan 2025 — Present',
    status: 'current',
    accent: '#00FFFF',
    description:
      'Designing and developing premium, full-stack web applications for clients — from AI-powered code analysis tools to editorial portfolio sites. Focused on performance, animation, and scalable MERN architecture.',
    highlights: ['Client Projects', 'MERN Stack', 'UI/UX Design', 'API Development'],
  },
  {
    id: 2,
    role: 'AI / ML Research Intern',
    type: 'Internship',
    company: 'MedicalVLM Project',
    period: 'Oct 2024 — Dec 2024',
    status: 'completed',
    accent: '#B599FF',
    description:
      'Built a medical visual language model (VLM) platform for X-ray analysis using LLaVA-1.5. Integrated GradCAM heatmaps, structured PDF report generation, and a React dashboard with Supabase auth.',
    highlights: ['LLaVA-1.5', 'FastAPI', 'GradCAM', 'Supabase'],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    type: 'Project-Based',
    company: 'University & Personal',
    period: 'Aug 2023 — Sep 2024',
    status: 'completed',
    accent: '#CCFF00',
    description:
      'Developed multiple web projects including 3D model-integrated UI, e-commerce platforms, and interactive dashboards. Focused on learning modern frameworks, responsive design, and motion engineering.',
    highlights: ['React', 'Three.js', 'CSS Animations', 'REST APIs'],
  },
];

// ── Timeline Dot ─────────────────────────────────────────────
const TimelineDot = ({ accent, isCurrent }) => (
  <div className="relative flex items-center justify-center">
    {/* Pulse ring for current */}
    {isCurrent && (
      <motion.div
        className="absolute w-8 h-8 rounded-full border"
        style={{ borderColor: `${accent}40` }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}
    <div
      className="w-4 h-4 rounded-full border-2 z-10 transition-all duration-500"
      style={{
        borderColor: accent,
        backgroundColor: isCurrent ? accent : 'transparent',
        boxShadow: isCurrent ? `0 0 12px ${accent}80` : 'none',
      }}
    />
  </div>
);

// ── Experience Card ──────────────────────────────────────────
const ExperienceCard = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div className="p-6 md:p-8 rounded-[24px] bg-zinc-950/80 border border-zinc-800/80 hover:border-opacity-60 relative overflow-hidden cursor-default transition-all duration-500"
        style={{
          '--card-accent': exp.accent,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${exp.accent}60`;
          e.currentTarget.style.boxShadow = `0 0 35px ${exp.accent}18`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {/* Ghost index number */}
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[8rem] font-black select-none pointer-events-none leading-none font-heading opacity-[0.04]"
          style={{ color: exp.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Gradient sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${exp.accent}08 0%, transparent 60%)`,
          }}
        />

        {/* Top edge shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(to right, transparent, ${exp.accent}40, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {/* Status badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border"
                  style={{
                    color: exp.accent,
                    borderColor: `${exp.accent}30`,
                    backgroundColor: `${exp.accent}10`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: exp.accent,
                      animation: exp.status === 'current' ? 'pulse 2s infinite' : 'none',
                    }}
                  />
                  {exp.type}
                </span>
                <span className="text-xs text-zinc-600 font-mono">· {exp.period}</span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-black tracking-tight font-heading transition-colors duration-300 group-hover:text-opacity-100"
                style={{ color: 'white' }}
                onMouseEnter={(e) => (e.target.style.color = exp.accent)}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                {exp.role}
              </h3>
              <p className="text-zinc-500 text-sm font-medium mt-1">{exp.company}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-[90%]">
            {exp.description}
          </p>

          {/* Highlight Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.highlights.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Experience Section ──────────────────────────────────
const Experience = () => {
  return (
    <section id="experience" className="pt-5 md:pt-10 pb-10 md:pb-20 px-4 bg-transparent z-10 relative">
      <div className="max-w-[1400px] mx-auto pt-3 md:pt-8">

        {/* Section Header — matches other sections */}
        <div className="flex items-center gap-4 mb-10 md:mb-16 px-4 md:px-0">
          <div className="w-12 h-[1px] bg-zinc-600"></div>
          <span className="text-white text-xl font-bold tracking-widest uppercase font-heading">
            My <span className="text-accent-neon">Experience</span>
          </span>
        </div>

        {/* Massive Staggered Typography — matches About section pattern */}
        <div className="mb-16 md:mb-24 space-y-2 md:space-y-4 px-4 md:px-0">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10vw] md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter text-white leading-[0.85] font-heading m-0"
            >
              WHERE I'VE
            </motion.h2>
          </div>
          <div className="overflow-hidden sm:flex justify-end pr-[10%]">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[10vw] md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter text-transparent font-heading bg-clip-text bg-gradient-to-r from-accent-neon to-accent-purple leading-[0.85] m-0"
            >
              BUILT & SHIPPED
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative px-4 md:px-0">
          {/* Vertical timeline line */}
          <div className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-[1px] bg-zinc-800/80" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex gap-6 md:gap-8">
                {/* Timeline dot column */}
                <div className="relative pt-8 shrink-0">
                  <TimelineDot accent={exp.accent} isCurrent={exp.status === 'current'} />
                </div>

                {/* Card */}
                <div className="flex-1">
                  <ExperienceCard exp={exp} index={index} />
                </div>
              </div>
            ))}
          </div>

          {/* Timeline end marker */}
          <div className="flex items-center gap-6 md:gap-8 mt-8 pl-[15px] md:pl-[19px]">
            <div className="w-4 h-4 rounded-full border-2 border-zinc-700 bg-zinc-900 shrink-0" />
            <span className="text-zinc-600 text-xs font-mono uppercase tracking-widest">The journey continues...</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
