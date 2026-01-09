import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow Inc.',
    content: 'Working with Hamza was an absolute pleasure. His attention to detail and ability to translate complex requirements into elegant solutions exceeded our expectations.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Torres',
    role: 'Startup Founder',
    company: 'LaunchPad',
    content: 'Hamza delivered our MVP in record time without compromising on quality. His full-stack expertise and proactive communication made the entire process seamless.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Creative Director',
    company: 'DesignHub',
    content: 'The UI/UX implementation was pixel-perfect. Hamza understood our vision from day one and brought it to life with clean, maintainable code.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-foreground">
          <span className="text-accent font-mono text-lg">03.1</span> Testimonials
        </h3>
        <p className="text-muted-foreground font-mono text-sm">
          $ cat client_feedback.log
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="glass-card p-8 relative overflow-hidden">
          {/* Quote icon */}
          <Quote className="absolute top-4 right-4 w-12 h-12 text-accent/10" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-lg text-foreground leading-relaxed italic">
                "{current.content}"
              </p>
              
              {/* Author */}
              <div className="pt-4 border-t border-border/50">
                <p className="font-heading font-bold text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {current.role} @ {current.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/30">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-accent w-6'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors border border-accent/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors border border-accent/20"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
