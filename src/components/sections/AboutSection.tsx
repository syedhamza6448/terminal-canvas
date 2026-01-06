import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const asciiArt = `
  ╔══════════════════════════════════════╗
  ║  $ whoami                            ║
  ║  > syed_hamza_imran                  ║
  ║                                      ║
  ║  $ cat skills.txt                    ║
  ║  > React, TypeScript, Node.js        ║
  ║  > Python, PostgreSQL, AWS           ║
  ║  > UI/UX Design, System Design       ║
  ║                                      ║
  ║  $ echo $PASSION                     ║
  ║  > "Building things that matter"     ║
  ║                                      ║
  ║  $ uptime                            ║
  ║  > 5+ years in development           ║
  ╚══════════════════════════════════════╝
`;

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent">01.</span> About Me
          </h2>
          <div className="w-24 h-1 bg-accent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">
                  ~/about/hamza.sh
                </span>
              </div>
              <div className="p-6 bg-terminal scanlines relative">
                <pre className="text-xs md:text-sm font-mono text-accent whitespace-pre overflow-x-auto">
                  {asciiArt}
                </pre>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-accent">$</span>
                  <span className="text-muted-foreground typing-cursor">_</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hello! I'm <span className="text-accent font-semibold">Syed Hamza Imran</span>, 
              a passionate developer who loves creating digital experiences that live at the 
              intersection of design and technology.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in development started with curiosity about how things work on the web. 
              Today, I specialize in building scalable, performant applications with modern 
              technologies. I believe in writing clean, maintainable code that stands the test of time.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-mono rounded-lg hover:opacity-90 transition-opacity accent-glow group"
              >
                Let's Connect
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
