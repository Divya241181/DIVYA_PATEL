import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Lines to type ──────────────────────────────────────────────
const LINES = [
  "Welcome to the Developer's",
  "Portfolio",
];

// Total chars across all lines (used for timing)
const TOTAL_CHARS = LINES.reduce((s, l) => s + l.length, 0);

// ── Typewriter sound via Web Audio API ────────────────────────
function createKeyClick(ctx) {
  const bufLen = Math.floor(ctx.sampleRate * 0.018); // 18ms noise burst
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) {
    // White noise shaped with a fast decay envelope
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 6);
  }

  const src = ctx.createBufferSource();
  src.buffer = buf;

  // Band-pass filter to give it that clicky typewriter timbre
  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 1800 + Math.random() * 600;
  bpf.Q.value = 0.8;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.28, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

  src.connect(bpf);
  bpf.connect(gain);
  gain.connect(ctx.destination);
  src.start();
}

// ── Component ────────────────────────────────────────────────
const Loader = ({ onLoadingComplete }) => {
  // displayed[lineIndex] = string of chars typed so far on that line
  const [displayed, setDisplayed] = useState(LINES.map(() => ''));
  const [done, setDone]           = useState(false);
  const [exiting, setExiting]     = useState(false);
  const [showCaret, setShowCaret] = useState(true);

  const audioCtxRef = useRef(null);
  const lineRef     = useRef(0);
  const charRef     = useRef(0);
  const rafRef      = useRef(null);
  const nextRef     = useRef(0); // timestamp of next keystroke

  // ── Get or lazily create AudioContext ──────────────────────
  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  // ── Main typing loop ──────────────────────────────────────
  useEffect(() => {
    // Human-like delay per keystroke: base 60ms ± up to 80ms jitter
    const nextDelay = () => 55 + Math.random() * 85;

    function tick(now) {
      if (now < nextRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const li = lineRef.current;
      const ci = charRef.current;

      if (li >= LINES.length) {
        // All done — hold a beat then exit
        setDone(true);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onLoadingComplete(), 700);
        }, 900);
        return;
      }

      const line = LINES[li];

      if (ci < line.length) {
        // Type next char
        const ch = line[ci];
        setDisplayed(prev => {
          const next = [...prev];
          next[li] = next[li] + ch;
          return next;
        });

        // Play click (skip spaces — realistic: typists don't make noise on space bar... well, barely)
        if (ch !== ' ') {
          try { createKeyClick(getCtx()); } catch (_) {}
        }

        charRef.current = ci + 1;
        // Add a slightly longer pause at punctuation / end of word
        const isPunct = "',;:.".includes(ch);
        nextRef.current = now + nextDelay() + (isPunct ? 120 : 0);
      } else {
        // Move to next line — add a short pause between lines
        lineRef.current = li + 1;
        charRef.current = 0;
        nextRef.current = now + 280; // pause between lines
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    nextRef.current = performance.now() + 400; // initial pause before start
    rafRef.current  = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getCtx, onLoadingComplete]);

  // ── Blinking caret ─────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setShowCaret(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Very faint paper-texture overlay for typewriter mood */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.5) 25px)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 select-none">

            {/* Small mono label above */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-[#e8e4d9] text-[11px] uppercase tracking-[0.35em] mb-8"
            >
              &gt; initializing_
            </motion.p>

            {/* Typewriter text block */}
            <div className="font-mono text-left inline-block">
              {LINES.map((line, li) => (
                <div key={li} className={li === 0 ? 'mb-1' : ''}>
                  <span
                    className="text-[clamp(1.6rem,5vw,3.2rem)] font-light tracking-wide leading-snug"
                    style={{ color: '#e8e4d9' }}  /* warm off-white — no multi-color */
                  >
                    {displayed[li]}
                  </span>

                  {/* Caret: only show on the current active line */}
                  {li === lineRef.current && !done && (
                    <span
                      className="inline-block w-[2px] ml-[2px] align-middle"
                      style={{
                        height: 'clamp(1.4rem,4vw,2.8rem)',
                        backgroundColor: '#e8e4d9',
                        opacity: showCaret ? 1 : 0,
                        transition: 'opacity 0.05s',
                        verticalAlign: 'text-bottom',
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Caret stays after done until exit */}
              {done && (
                <span
                  className="inline-block w-[2px] ml-[2px] align-middle"
                  style={{
                    height: 'clamp(1.4rem,4vw,2.8rem)',
                    backgroundColor: '#e8e4d9',
                    opacity: showCaret ? 1 : 0,
                    transition: 'opacity 0.05s',
                    verticalAlign: 'text-bottom',
                  }}
                />
              )}
            </div>

            {/* Bottom status line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 0.28 : 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[#e8e4d9] text-[10px] tracking-widest uppercase mt-10"
            >
              Press any key to continue_
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
