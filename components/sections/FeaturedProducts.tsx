'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useInView } from 'react-intersection-observer';

const products = [
  {
    id: 1,
    name: 'Croissants Dorés',
    description: 'Lot de 6 croissants pur beurre croustillants',
    price: '12€',
    image: '/images/croissants.jpg',
  },
  {
    id: 2,
    name: 'Muffins Pépites',
    description: 'Moelleux aux pépites de chocolat fondantes',
    price: '4€',
    image: '/images/muffin-single.jpg',
  },
  {
    id: 3,
    name: 'Entremets Matcha',
    description: 'Mousse légère au thé vert japonais premium',
    price: '38€',
    image: '/images/matcha-cake.jpg',
  },
  {
    id: 4,
    name: 'Brownies Fondants',
    description: 'Lot de 4 brownies au chocolat noir intense',
    price: '16€',
    image: '/images/brownies-stack.jpg',
  },
];

export function FeaturedProducts() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="vedettes" className="py-20 md:py-32 bg-surface" ref={ref}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block font-inter text-primary text-sm tracking-[0.2em] uppercase mb-3"
          >
            Nos Spécialités
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary"
          >
            Créations Vedettes
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {products.map((product, index) => {
                const isActive = index === selectedIndex;
                return (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pl-4"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.9,
                        opacity: isActive ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="mx-2">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-4 right-4 bg-primary text-black font-inter font-bold px-3 py-1 rounded-full text-sm">
                            {product.price}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-playfair text-xl font-semibold text-text-primary mb-2">
                            {product.name}
                          </h3>
                          <p className="font-inter text-text-secondary text-sm">
                            {product.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:bg-surface transition-colors"
            aria-label="Produit précédent"
          >
            <ChevronLeft className="w-6 h-6 text-text-primary" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:bg-surface transition-colors"
            aria-label="Produit suivant"
          >
            <ChevronRight className="w-6 h-6 text-text-primary" />
          </button>
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-8 bg-primary'
                  : 'bg-text-secondary/30 hover:bg-text-secondary/50'
              }`}
              aria-label={`Aller au produit ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
