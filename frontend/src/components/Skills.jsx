import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiFramer,
  SiFigma, SiExpress, SiJavascript, SiPython, SiDjango, SiGit,
  SiPostman, SiVite, SiTypescript
} from 'react-icons/si';

const techCategories = [
  {
    id: '01',
    label: 'Frontend & Design',
    accent: '#00FFFF',
    accentVar: 'accent-neon',
    description: 'Crafting pixel-perfect, high-performance interfaces with a strong eye for motion and micro-interactions.',
    icons: [
      { Icon: SiReact, color: '#61DAFB', label: 'React' },
      { Icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind' },
      { Icon: SiFramer, color: '#ffffff', label: 'Framer' },
      { Icon: SiFigma, color: '#F24E1E', label: 'Figma' },
      { Icon: SiJavascript, color: '#F7DF1E', label: 'JS' },
      { Icon: SiTypescript, color: '#3178C6', label: 'TS' },
    ],
    skills: [
      { name: 'React / Next.js', pct: 90 },
      { name: 'Tailwind CSS', pct: 92 },
      { name: 'Framer Motion', pct: 80 },
      { name: 'Figma / UI Design', pct: 75 },
    ],
    tags: ['Next.js', 'TypeScript', 'Three.js', 'UI/UX', 'Responsive'],
    span: 'lg:col-span-7',
  },
  {
    id: '02',
    label: 'Backend & APIs',
    accent: '#B599FF',
    accentVar: 'accent-purple',
    description: 'Engineering robust, scalable server-side systems with RESTful APIs and efficient data management.',
    icons: [
      { Icon: SiNodedotjs, color: '#339933', label: 'Node' },
      { Icon: SiExpress, color: '#ffffff', label: 'Express' },
      { Icon: SiMongodb, color: '#47A248', label: 'MongoDB' },
      { Icon: SiPython, color: '#3776AB', label: 'Python' },
      { Icon: SiDjango, color: '#44B78B', label: 'Django' },
    ],
    skills: [
      { name: 'Node.js / Express', pct: 85 },
      { name: 'MongoDB', pct: 82 },
      { name: 'Python / Django', pct: 72 },
      { name: 'REST API Design', pct: 88 },
    ],
    tags: ['REST API', 'JWT Auth', 'Firebase', 'GraphQL'],
    span: 'lg:col-span-5',
  },
  {
    id: '03',
    label: 'Dev Tooling',
    accent: '#CCFF00',
    accentVar: 'accent-lime',
    description: 'Efficient workflow with modern build tools and version control.',
    icons: [
      { Icon: SiGit, color: '#F05032', label: 'Git' },
      { Icon: SiPostman, color: '#FF6C37', label: 'Postman' },
      { Icon: SiVite, color: '#646CFF', label: 'Vite' },
    ],
    skills: [
      { name: 'Git / GitHub', pct: 88 },
      { name: 'Vite / Webpack', pct: 78 },
    ],
    tags: ['Git', 'Postman', 'VSCode', 'Vercel'],
    span: 'lg:col-span-5',
  },
  {
    id: '→',
    label: 'Currently Learning',
    accent: '#FF6B6B',
    accentVar: 'accent-magenta',
    description: 'Always growing — actively exploring new tools and paradigms.',
    icons: [],
    skills: [],
    tags: ['GraphQL', 'Docker', 'AWS', 'Three.js'],
    span: 'lg:col-span-7',
    learning: true,
  },
];

const SkillBar = ({ name, pct, accent, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-zinc-400 text-xs font-mono">{name}</span>
        <span className="text-zinc-500 text-xs font-mono">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden bg-transparent">
      {/* Ambient auras */}
      <div className="absolute top-[10%] left-[-15%] w-[55vw] h-[55vw] bg-accent-neon/4 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45vw] h-[45vw] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="w-12 h-[1px] bg-zinc-600" />
          <span className="text-white text-xl font-bold tracking-widest uppercase">
            Tech Stack <span className="text-zinc-600">//</span> <span className="text-accent-gold">Tools</span>
          </span>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: ci * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`${cat.span} group relative rounded-[28px] border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl overflow-hidden cursor-default transition-all duration-500 hover:border-current`}
              style={{ '--hover-color': cat.accent }}
            >
              {/* Top shimmer edge */}
              <div
                className="absolute top-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `linear-gradient(to right, transparent, ${cat.accent}60, transparent)` }}
              />

              {/* Corner glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: cat.accent }}
              />

              {/* Ghost number */}
              <div
                className="absolute -bottom-4 -right-2 text-[8rem] font-black select-none pointer-events-none leading-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                style={{ color: cat.accent }}
              >
                {cat.id}
              </div>

              <div className="relative z-10 p-7 md:p-8 h-full flex flex-col gap-5">

                {/* Card header */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300"
                      style={{ color: cat.accent }}
                    >
                      {cat.learning ? '🔥 Active' : `Category ${cat.id}`}
                    </span>
                    <h3 className="text-white font-black text-xl md:text-2xl tracking-tight group-hover:text-white transition-colors">
                      {cat.label}
                    </h3>
                  </div>

                  {/* Icon cluster */}
                  {cat.icons.length > 0 && (
                    <div className="flex flex-wrap justify-end gap-2 max-w-[140px]">
                      {cat.icons.map(({ Icon, color, label }) => (
                        <div
                          key={label}
                          className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group/icon hover:scale-125 transition-transform duration-200 cursor-default"
                          title={label}
                        >
                          <Icon style={{ color }} className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed">{cat.description}</p>

                {/* Skill bars */}
                {cat.skills.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {cat.skills.map((s, si) => (
                      <SkillBar
                        key={s.name}
                        name={s.name}
                        pct={s.pct}
                        accent={cat.accent}
                        delay={0.3 + si * 0.1}
                      />
                    ))}
                  </div>
                )}

                {/* Learning cards */}
                {cat.learning && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
                    {cat.tags.map((t) => (
                      <div
                        key={t}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-[#FF6B6B]/40 transition-colors duration-300 group/lt"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse" />
                        <span className="text-zinc-300 text-xs font-mono text-center">{t}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tag pills */}
                {!cat.learning && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {cat.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-zinc-900 border border-zinc-800/80 rounded-full text-[11px] font-mono text-zinc-400 group-hover:border-current transition-colors duration-300"
                        style={{ '--tw-border-opacity': 0.3 }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Marquee Belt ── */}
      <div className="relative mt-24">
        <div
          className="flex overflow-hidden w-full h-36 md:h-44 items-center bg-zinc-950/60 border-y border-zinc-800/50 rotate-[-1.5deg] scale-105"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <motion.div
            className="flex whitespace-nowrap items-center gap-14"
            animate={{ x: [0, '-50%'] }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-14">
                {[
                  { text: 'REACT', color: '#61DAFB' },
                  { text: '✦', color: '#00FFFF', small: true },
                  { text: 'NODE.JS', color: '#339933' },
                  { text: '✦', color: '#B599FF', small: true },
                  { text: 'MONGODB', color: '#47A248' },
                  { text: '✦', color: '#CCFF00', small: true },
                  { text: 'TAILWIND', color: '#06B6D4' },
                  { text: '✦', color: '#FF6B6B', small: true },
                  { text: 'PYTHON', color: '#3776AB' },
                  { text: '✦', color: '#44B78B', small: true },
                  { text: 'DJANGO', color: '#44B78B' },
                  { text: '✦', color: '#B599FF', small: true },
                  { text: 'FIGMA', color: '#F24E1E' },
                  { text: '✦', color: '#CCFF00', small: true },
                ].map(({ text, color, small }, j) => (
                  <span
                    key={j}
                    className={small
                      ? 'text-3xl animate-pulse'
                      : 'text-5xl md:text-7xl font-black text-zinc-300/30 hover:text-zinc-100 transition-colors duration-300 cursor-default select-none'
                    }
                    style={color ? { color } : {}}
                  >
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
