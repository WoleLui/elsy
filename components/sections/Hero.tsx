'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer, letterReveal } from '@/lib/animations';

const title = 'Praluse';

export function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/croissants.jpg"
          alt="Croissants dorés fraîchement sortis du four"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.span
          variants={fadeInUp}
          className="inline-block font-inter text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4"
        >
          Pâtisserie Artisanale
        </motion.span>

        <h1 className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 overflow-hidden">
          {title.split('').map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterReveal}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={fadeInUp}
          className="font-inter text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto"
        >
          L&apos;art de la gourmandise depuis 2010
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Button
            size="lg"
            onClick={() => document.getElementById('creations')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Découvrir nos créations
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.getElementById('vedettes')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Défiler vers le bas"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </section>
  );
}
