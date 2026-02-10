import { Variants, Transition } from 'framer-motion';

const easeOut: Transition['ease'] = 'easeOut';
const easeIn: Transition['ease'] = 'easeIn';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easeOut } 
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: easeOut } 
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: easeOut } 
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: easeOut } 
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    } 
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: easeOut } 
  }
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: easeOut
    }
  })
};

export const slideInFromBottom: Variants = {
  hidden: { y: '100%' },
  visible: { 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: easeOut 
    } 
  },
  exit: { 
    y: '100%', 
    transition: { 
      duration: 0.3, 
      ease: easeIn 
    } 
  }
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: easeOut }
};

export const tapScale = {
  scale: 0.98
};
