import React from 'react';
import { motion } from 'framer-motion';

export const RevealBlock = ({ children, delay = 0, duration = 0.8, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          duration: duration,
          ease: [0.16, 1, 0.3, 1], // Custom slow ease out
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
