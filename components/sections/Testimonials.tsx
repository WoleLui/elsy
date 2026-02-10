'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    id: 1,
    text: "Une découverte incroyable ! Les croissants de Praluse sont tout simplement les meilleurs que j'aie jamais goûtés. Le beurre fond en bouche, la pâte est parfaitement feuilletée. Je ne peux plus m'en passer !",
    name: 'Marie-Claire Dubois',
    title: 'Cliente fidèle depuis 2018',
    rating: 5,
  },
  {
    id: 2,
    text: "Le gâteau au chocolat commandé pour l'anniversaire de ma fille était une œuvre d'art. Non seulement magnifique, mais d'une saveur incomparable. Toute la famille en redemande !",
    name: 'Jean-Philippe Martin',
    title: 'Client fidèle depuis 2020',
    rating: 5,
  },
  {
    id: 3,
    text: "J'ai organisé un événement professionnel avec les pâtisseries de Praluse. Tous mes convives ont été émerveillés. Le service est impeccable et la qualité toujours au rendez-vous. Merci pour cette excellence !",
    name: 'Sophie Lemaire',
    title: 'Cliente fidèle depuis 2019',
    rating: 5,
  },
];

export function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

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
    <section className="py-20 md:py-32 bg-background" ref={ref}>
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
            Témoignages
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary"
          >
            Ce Que Disent Nos Clients
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <motion.div
                    animate={{
                      scale: index === selectedIndex ? 1 : 0.95,
                      opacity: index === selectedIndex ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card glass className="p-8 h-full">
                      <div className="flex items-center justify-between mb-6">
                        <Quote className="w-10 h-10 text-primary opacity-50" />
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                              <Star className="w-5 h-5 fill-primary text-primary" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <p className="font-inter text-text-primary leading-relaxed mb-6 text-sm md:text-base">
                        « {testimonial.text} »
                      </p>

                      <div className="border-t border-border pt-4">
                        <p className="font-playfair font-semibold text-text-primary">
                          {testimonial.name}
                        </p>
                        <p className="font-inter text-sm text-text-secondary">
                          {testimonial.title}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-primary'
                    : 'bg-text-secondary/30 hover:bg-text-secondary/50'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
