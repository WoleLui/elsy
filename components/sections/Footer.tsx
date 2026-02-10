'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Heart } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useInView } from 'react-intersection-observer';

const footerLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Nos Créations', href: '#creations' },
  { label: 'À Propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <footer className="bg-background border-t border-border" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="py-12 md:py-16"
        >
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            <div className="text-center md:text-left">
              <a href="#accueil" className="font-playfair text-3xl font-bold text-primary inline-block mb-4">
                Praluse
              </a>
              <p className="font-inter text-text-secondary text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                L&apos;art de la gourmandise depuis 2010. Pâtisserie artisanale 
                au cœur de Paris.
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-4">
                Navigation
              </h4>
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-inter text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-playfair text-lg font-semibold text-text-primary mb-4">
                Contact
              </h4>
              <div className="font-inter text-sm text-text-secondary space-y-1">
                <p>27 Rue du Faubourg Saint-Honoré</p>
                <p>75008 Paris, France</p>
                <p className="text-primary">+33 1 42 68 31 00</p>
              </div>
              
              <div className="flex justify-center md:justify-end gap-3 mt-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-surface border border-border hover:bg-primary hover:text-black hover:border-primary flex items-center justify-center text-text-secondary transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-surface border border-border hover:bg-primary hover:text-black hover:border-primary flex items-center justify-center text-text-secondary transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-inter text-sm text-text-secondary">
              © 2024 Praluse. Tous droits réservés.
            </p>
            <p className="font-inter text-sm text-text-secondary flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-primary fill-primary" /> à Paris
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
