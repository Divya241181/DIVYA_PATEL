import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Reveal text, hold, then fire completion
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient glows similar to ref */}
      <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] bg-accent-neon/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-accent-purple/5 rounded-full blur-[120px]"></div>

      <motion.h1 
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-accent-purple to-accent-lime z-10"
      >
        કેમ છો Developer ?
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
