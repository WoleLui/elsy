'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import { useInView } from 'react-intersection-observer';

export function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="apropos" className="py-20 md:py-32 bg-surface overflow-hidden" ref={ref}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <motion.div
                animate={inView ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Image
                  src="/images/chef.jpg"
                  alt="Notre chef pâtissier préparant des créations gourmandes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-6 shadow-2xl hidden md:block">
              <div className="text-center">
                <span className="font-playfair text-4xl font-bold text-black">14+</span>
                <p className="font-inter text-sm text-black/70 mt-1">Années d&apos;expérience</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block font-inter text-primary text-sm tracking-[0.2em] uppercase mb-3"
            >
              Notre Histoire
            </motion.span>
            
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-6"
            >
              La Passion du Goût
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-4 font-inter text-text-secondary leading-relaxed">
              <p>
                Fondée en 2010 au cœur de Paris, Praluse est née d&apos;une passion 
                inébranlable pour l&apos;art de la pâtisserie. Notre maison conjugue 
                le respect des traditions françaises avec une touche d&apos;innovation 
                qui fait notre signature unique.
              </p>
              <p>
                Chaque création qui sort de nos ateliers est le fruit d&apos;un 
                savoir-faire transmis de génération en génération. Nous sélectionnons 
                rigoureusement nos ingrédients auprès de producteurs locaux, privilégiant 
                toujours la qualité et la fraîcheur.
              </p>
              <p>
                De la finesse de nos croissants pur beurre à la richesse de nos gâteaux 
                au chocolat, nous mettons tout notre cœur dans chaque bouchée pour vous 
                offrir un moment de pur bonheur gourmand.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-playfair text-2xl text-primary">P</span>
                </div>
                <div>
                  <p className="font-playfair text-lg font-semibold text-text-primary">
                    Pierre Delacroix
                  </p>
                  <p className="font-inter text-sm text-text-secondary">
                    Chef Pâtissier & Fondateur
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
