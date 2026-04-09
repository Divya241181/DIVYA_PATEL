import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [focused, setFocused] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const fields = [
    { id: 'name', label: '01 — Name', type: 'text', placeholder: 'Divya Patel', accentColor: '#B599FF' },
    { id: 'email', label: '02 — Email', type: 'email', placeholder: 'hello@example.com', accentColor: '#00FFFF' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-4 overflow-hidden"
    >
      {/* Layered background ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-[140px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent-neon/8 blur-[120px]"
          animate={{ scale: [1, 1.3, 1], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto">

        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-24 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-[1px] bg-zinc-600" />
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">Get in touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] sm:text-[10vw] md:text-[8rem] font-black uppercase leading-[0.82] tracking-tighter text-white"
          >
            Let's{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon to-accent-purple inline-block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% auto' }}
            >
              Talk.
            </motion.span>
          </motion.h2>
        </div>

        {/* ── Main Layout: 2-col on desktop ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start"
        >

          {/* LEFT — Info panel */}
          <div className="flex flex-col gap-8">

            {/* Availability tag */}
            <div className="inline-flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]" />
              </span>
              <span className="text-zinc-300 text-xs font-mono uppercase tracking-widest">Open to opportunities</span>
            </div>

            {/* Tagline */}
            <div>
              <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed">
                Whether it's a project, collaboration, or just a casual hello — my inbox is always open.
              </p>
              <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
                I typically respond within <span className="text-white font-medium">24 hours</span> on weekdays.
              </p>
            </div>

            {/* Direct email */}
            <div className="flex flex-col gap-2">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Direct email</span>
              <a
                href="mailto:divya@example.com"
                className="group inline-flex items-center gap-3 text-white font-bold text-base hover:text-accent-neon transition-colors duration-300"
              >
                <span className="w-8 h-[1px] bg-zinc-700 group-hover:w-12 group-hover:bg-accent-neon transition-all duration-300" />
                divyapatel2411@gmail.com
              </a>
            </div>

            {/* Social quick links */}
            <div className="flex gap-3 pt-2">
              {[
                { label: 'GitHub', href: 'https://github.com/Divya241181', color: '#ffffff' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/divya-patel2411', color: '#0A66C2' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-950 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest transition-all duration-300"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
            {/* Subtle top shimmer */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-600/60 to-transparent" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((field, i) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex flex-col gap-2"
                  >
                    <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                      {field.label}
                    </label>
                    <div
                      className="relative border-b-2 transition-colors duration-300"
                      style={{ borderColor: focused === field.id ? field.accentColor : 'rgba(63,63,70,0.8)' }}
                    >
                      <input
                        type={field.type}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-transparent py-3 text-white text-base md:text-lg font-medium placeholder-zinc-700 outline-none"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-2"
              >
                <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                  03 — Message
                </label>
                <div
                  className="relative border-b-2 transition-colors duration-300"
                  style={{ borderColor: focused === 'message' ? '#ccff00' : 'rgba(63,63,70,0.8)' }}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project or idea..."
                    required
                    rows={4}
                    className="w-full bg-transparent py-3 text-white text-base md:text-lg font-light placeholder-zinc-700 outline-none resize-none"
                  />
                </div>
              </motion.div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2"
              >
                {/* Status message */}
                <div className="h-5 flex items-center">
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[#39FF14] font-mono text-xs tracking-widest flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] inline-block" />
                      Message sent — I'll be in touch!
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-400 font-mono text-xs tracking-widest flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                      Something went wrong. Try again.
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'Sending...'}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group w-full sm:w-auto overflow-hidden bg-white text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_30px_rgba(181,153,255,0.4)] transition-shadow duration-500"
                >
                  {/* Hover fill */}
                  <span className="absolute inset-0 bg-accent-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                    {status === 'Sending...' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
                        />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>

            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
