'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const categories = ['Tous', 'Gâteaux', 'Viennoiseries', 'Petits Plaisirs'];

const galleryItems = [
  { id: 1, image: '/images/chocolate-layer-cake.jpg', title: 'Layer Cake Chocolat', category: 'Gâteaux', span: 'col-span-2 row-span-2' },
  { id: 2, image: '/images/croissants.jpg', title: 'Croissants Artisanaux', category: 'Viennoiseries', span: 'col-span-1 row-span-1' },
  { id: 3, image: '/images/muffins-group.jpg', title: 'Muffins Assortis', category: 'Petits Plaisirs', span: 'col-span-1 row-span-1' },
  { id: 4, image: '/images/matcha-cake.jpg', title: 'Entremets Matcha', category: 'Gâteaux', span: 'col-span-1 row-span-2' },
  { id: 5, image: '/images/donut-chocolate.jpg', title: 'Donuts Glacés', category: 'Petits Plaisirs', span: 'col-span-1 row-span-1' },
  { id: 6, image: '/images/chocolate-cake-slice.jpg', title: 'Gâteau Chocolat Noir', category: 'Gâteaux', span: 'col-span-1 row-span-1' },
  { id: 7, image: '/images/brownies-stack.jpg', title: 'Brownies Fondants', category: 'Petits Plaisirs', span: 'col-span-1 row-span-1' },
  { id: 8, image: '/images/marble-cake.jpg', title: 'Marbré Vanille-Chocolat', category: 'Gâteaux', span: 'col-span-1 row-span-1' },
  { id: 9, image: '/images/brownies-flat.jpg', title: 'Brownie Praliné', category: 'Petits Plaisirs', span: 'col-span-2 row-span-1' },
];

export function Gallery() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeCategory === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  return (
    <section id="creations" className="py-20 md:py-32 bg-background" ref={ref}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block font-inter text-primary text-sm tracking-[0.2em] uppercase mb-3"
          >
            Notre Savoir-Faire
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8"
          >
            Galerie de Créations
          </motion.h2>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-5 py-2 rounded-full font-inter text-sm font-medium transition-all duration-300',
                  activeCategory === category
                    ? 'bg-primary text-black'
                    : 'bg-surface text-text-secondary hover:bg-primary/20'
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'relative rounded-xl overflow-hidden cursor-pointer group',
                  item.span
                )}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-playfair text-white text-lg font-semibold">
                    {item.title}
                  </h3>
                  <span className="font-inter text-primary text-sm">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <AnimatePresence>
        {lightboxOpen && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-[90vw] aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <h3 className="font-playfair text-white text-2xl font-semibold mb-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <span className="font-inter text-primary">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
