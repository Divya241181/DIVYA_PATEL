import React from 'react';

// ── Global floating background — visible, organic, performant ──
// Pure CSS animations only. Fixed layer behind all content.

const BackgroundEffects = () => (
  <div
    className="fixed inset-0 pointer-events-none overflow-hidden"
    style={{ zIndex: 0 }}
    aria-hidden="true"
  >
    {/* ── Large Floating Rings ── */}
    <div
      className="absolute w-[400px] h-[400px] rounded-full border-[1.5px] border-[#B599FF]/[0.03]"
      style={{
        top: '5%', left: '2%',
        animation: 'bgFloat1 22s ease-in-out infinite',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-[300px] h-[300px] rounded-full border-[1.5px] border-[#00FFFF]/[0.05]"
      style={{
        top: '45%', right: '3%',
        animation: 'bgFloat2 18s ease-in-out infinite 3s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-[220px] h-[220px] rounded-full border border-[#CCFF00]/[0.04]"
      style={{
        top: '78%', left: '12%',
        animation: 'bgFloat3 20s ease-in-out infinite 5s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-[180px] h-[180px] rounded-full border border-[#FF6B6B]/[0.04]"
      style={{
        top: '25%', right: '15%',
        animation: 'bgFloat1 26s ease-in-out infinite 8s',
        willChange: 'transform',
      }}
    />

    {/* ── Floating Dots ── */}
    <div
      className="absolute w-3 h-3 rounded-full bg-[#CCFF00]/[0.06] shadow-[0_0_12px_rgba(204,255,0,0.06)]"
      style={{
        top: '10%', right: '18%',
        animation: 'bgDot1 15s ease-in-out infinite',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-2.5 h-2.5 rounded-full bg-[#B599FF]/[0.06] shadow-[0_0_10px_rgba(181,153,255,0.06)]"
      style={{
        top: '38%', left: '6%',
        animation: 'bgDot2 12s ease-in-out infinite 2s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-3.5 h-3.5 rounded-full bg-[#00FFFF]/[0.05] shadow-[0_0_14px_rgba(0,255,255,0.05)]"
      style={{
        top: '62%', right: '10%',
        animation: 'bgDot3 17s ease-in-out infinite 4s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-2 h-2 rounded-full bg-white/[0.05] shadow-[0_0_8px_rgba(255,255,255,0.05)]"
      style={{
        top: '22%', left: '42%',
        animation: 'bgDot1 19s ease-in-out infinite 6s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-2 h-2 rounded-full bg-[#CCFF00]/[0.05] shadow-[0_0_8px_rgba(204,255,0,0.05)]"
      style={{
        top: '88%', left: '52%',
        animation: 'bgDot2 14s ease-in-out infinite 1s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-2 h-2 rounded-full bg-[#FF6B6B]/[0.05] shadow-[0_0_8px_rgba(255,107,107,0.05)]"
      style={{
        top: '50%', left: '30%',
        animation: 'bgDot3 16s ease-in-out infinite 7s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-1.5 h-1.5 rounded-full bg-[#B599FF]/[0.06] shadow-[0_0_6px_rgba(181,153,255,0.06)]"
      style={{
        top: '72%', right: '35%',
        animation: 'bgDot1 13s ease-in-out infinite 3s',
        willChange: 'transform',
      }}
    />

    {/* ── Floating Cross / Plus shapes ── */}
    <div
      className="absolute"
      style={{
        top: '15%', right: '28%',
        animation: 'bgCross1 25s ease-in-out infinite 2s',
        willChange: 'transform',
      }}
    >
      <div className="relative w-7 h-7">
        <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#CCFF00]/[0.06] -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-[1.5px] bg-[#CCFF00]/[0.06] -translate-x-1/2" />
      </div>
    </div>
    <div
      className="absolute"
      style={{
        top: '48%', left: '4%',
        animation: 'bgCross2 20s ease-in-out infinite 7s',
        willChange: 'transform',
      }}
    >
      <div className="relative w-6 h-6">
        <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#B599FF]/[0.06] -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-[1.5px] bg-[#B599FF]/[0.06] -translate-x-1/2" />
      </div>
    </div>
    <div
      className="absolute"
      style={{
        top: '80%', right: '22%',
        animation: 'bgCross1 23s ease-in-out infinite 4s',
        willChange: 'transform',
      }}
    >
      <div className="relative w-5 h-5">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00FFFF]/[0.05] -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#00FFFF]/[0.05] -translate-x-1/2" />
      </div>
    </div>
    <div
      className="absolute"
      style={{
        top: '33%', left: '55%',
        animation: 'bgCross2 28s ease-in-out infinite 10s',
        willChange: 'transform',
      }}
    >
      <div className="relative w-5 h-5">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.04] -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/[0.04] -translate-x-1/2" />
      </div>
    </div>

    {/* ── Diamond shapes ── */}
    <div
      className="absolute w-5 h-5 border-[1.5px] border-[#00FFFF]/[0.06] rotate-45"
      style={{
        top: '28%', right: '7%',
        animation: 'bgDiamond1 16s ease-in-out infinite 3s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-4 h-4 border-[1.5px] border-[#CCFF00]/[0.05] rotate-45"
      style={{
        top: '68%', left: '22%',
        animation: 'bgDiamond2 21s ease-in-out infinite 8s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-6 h-6 border border-[#B599FF]/[0.05] rotate-45"
      style={{
        top: '42%', right: '38%',
        animation: 'bgDiamond1 19s ease-in-out infinite 1s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-3 h-3 border border-[#FF6B6B]/[0.04] rotate-45"
      style={{
        top: '55%', left: '45%',
        animation: 'bgDiamond2 24s ease-in-out infinite 6s',
        willChange: 'transform',
      }}
    />

    {/* ── Thin Floating Lines ── */}
    <div
      className="absolute w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#B599FF]/[0.06] to-transparent"
      style={{
        top: '20%', left: '25%',
        animation: 'bgLine1 18s ease-in-out infinite 2s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#00FFFF]/[0.06] to-transparent"
      style={{
        top: '58%', right: '15%',
        animation: 'bgLine2 22s ease-in-out infinite 5s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-28 h-[1px] bg-gradient-to-r from-transparent via-[#CCFF00]/[0.05] to-transparent"
      style={{
        top: '85%', left: '35%',
        animation: 'bgLine1 16s ease-in-out infinite 9s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-16 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
      style={{
        top: '35%', right: '30%',
        animation: 'bgLine2 20s ease-in-out infinite 12s',
        willChange: 'transform',
      }}
    />

    {/* ── Glow Orbs (ambient depth) ── */}
    <div
      className="absolute w-[450px] h-[450px] rounded-full bg-[#B599FF]/[0.04] blur-[80px]"
      style={{
        top: '0%', right: '-8%',
        animation: 'bgOrb1 30s ease-in-out infinite',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-[400px] h-[400px] rounded-full bg-[#00FFFF]/[0.03] blur-[70px]"
      style={{
        top: '45%', left: '-10%',
        animation: 'bgOrb2 25s ease-in-out infinite 4s',
        willChange: 'transform',
      }}
    />
    <div
      className="absolute w-[350px] h-[350px] rounded-full bg-[#CCFF00]/[0.025] blur-[60px]"
      style={{
        bottom: '5%', right: '5%',
        animation: 'bgOrb1 28s ease-in-out infinite 8s',
        willChange: 'transform',
      }}
    />
  </div>
);

export default BackgroundEffects;
