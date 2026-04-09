import { motion } from 'framer-motion';

/**
 * Bi-directional scroll-triggered text arrival effect.
 * Inspired by minhpham.design — text slides up from behind a clip mask
 * (overflow: hidden). Re-triggers every time the element enters the
 * viewport, so it works during both scrolling UP and DOWN.
 */
export const RevealBlock = ({ children, delay = 0, className = '' }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      whileInView={{ y: '0%', opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  </div>
);
