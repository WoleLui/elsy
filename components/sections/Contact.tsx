'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  message: string;
}

interface FormErrors {
  nom?: string;
  email?: string;
  message?: string;
}

const contactInfo = [
  { icon: MapPin, label: 'Adresse', value: '27 Rue du Faubourg Saint-Honoré, 75008 Paris' },
  { icon: Phone, label: 'Téléphone', value: '+33 1 42 68 31 00' },
  { icon: Mail, label: 'Email', value: 'contact@praluse.fr' },
  { icon: Clock, label: 'Horaires', value: 'Mar-Dim: 7h - 19h' },
];

export function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState<FormData>({ nom: '', email: '', telephone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ nom: '', email: '', telephone: '', message: '' });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (name: keyof FormData) => cn(
    'w-full px-4 py-3 bg-surface border rounded-xl font-inter text-text-primary placeholder:text-text-secondary/50 transition-all duration-300 outline-none',
    errors[name as keyof FormErrors]
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
  );

  return (
    <section id="contact" className="py-20 md:py-32 bg-surface" ref={ref}>
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
            Contactez-Nous
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary"
          >
            Restons en Contact
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    onFocus={() => setFocused('nom')}
                    onBlur={() => setFocused(null)}
                    placeholder="Votre nom"
                    className={inputClasses('nom')}
                  />
                  {errors.nom && (
                    <p className="mt-1 text-sm text-red-500 font-inter">{errors.nom}</p>
                  )}
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="votre@email.com"
                    className={inputClasses('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 font-inter">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  onFocus={() => setFocused('telephone')}
                  onBlur={() => setFocused(null)}
                  placeholder="+33 6 00 00 00 00"
                  className={inputClasses('telephone')}
                />
              </div>

              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Votre message..."
                  rows={5}
                  className={cn(inputClasses('message'), 'resize-none')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 font-inter">{errors.message}</p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-inter font-medium text-green-600 dark:text-green-400">
                        Message envoyé !
                      </p>
                      <p className="font-inter text-sm text-green-600/70 dark:text-green-400/70">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
                    Envoyer le message
                  </Button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-text-secondary">{item.label}</p>
                    <p className="font-inter font-medium text-text-primary">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-inter text-sm text-text-secondary mb-4">Suivez-nous</p>
              <div className="flex gap-3">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary hover:text-black flex items-center justify-center text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary hover:text-black flex items-center justify-center text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border">
              <div className="h-[200px] bg-surface relative flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-inter text-sm text-text-secondary">
                    27 Rue du Faubourg Saint-Honoré
                  </p>
                  <p className="font-inter text-sm text-text-secondary">
                    75008 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
