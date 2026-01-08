import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import TypingAnimation from '../TypingAnimation';
import { Slider } from '../ui/slider';

const developerRoles = [
  'Full-Stack Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Code Craftsman',
  'Make everything works!',
];

const HomeSection: React.FC = () => {
  const [halftoneIntensity, setHalftoneIntensity] = useState(70);

  const dotSize = 1 + (halftoneIntensity / 100) * 3;
  const gridSize = 4 + (halftoneIntensity / 100) * 4;
  const opacity = 0.2 + (halftoneIntensity / 100) * 0.6;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines"
    >
      {/* Background noise */}
      <div className="absolute inset-0 noise" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-accent/30 bg-accent/5"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-mono text-accent">Available for opportunities</span>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4">
              <span className="text-foreground">Syed</span>
              <span className="text-accent text-glow"> Hamza</span>
              <br />
              <span className="text-foreground">Imran</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-muted-foreground font-mono mb-8"
            >
              <span className="text-accent">{'>'}</span>{' '}
              <TypingAnimation roles={developerRoles} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Crafting digital experiences with clean code and creative solutions.
              Turning complex problems into elegant, user-friendly applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-mono rounded-lg hover:opacity-90 transition-opacity accent-glow"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent text-accent font-mono rounded-lg hover:bg-accent/10 transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image with Halftone */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex flex-col items-center lg:items-end gap-6"
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />

              {/* Image container with dynamic halftone */}
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass-card"
                style={{
                  '--halftone-dot-size': `${dotSize}px`,
                  '--halftone-grid-size': `${gridSize}px`,
                  '--halftone-opacity': opacity,
                } as React.CSSProperties}
              >
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center">
                  <img 
                    src="img/Me-bg.png" 
                    alt="Syed Hamza Imran" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Dynamic halftone overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, hsl(var(--accent)) ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    mixBlendMode: 'screen',
                    opacity: opacity,
                  }}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-accent" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-accent" />
            </div>

            {/* Halftone Intensity Slider */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="w-64 md:w-80 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-muted-foreground">halftone_intensity:</span>
                <span className="text-xs font-mono text-accent">{halftoneIntensity}%</span>
              </div>
              <Slider
                value={[halftoneIntensity]}
                onValueChange={(value) => setHalftoneIntensity(value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm font-mono text-muted-foreground">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;
