import React from 'react';
import { motion } from 'framer-motion';

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    company: 'Mini Solutions',
    role: 'Senior Full-Stack Engineer',
    duration: '12-2024 - Present',
    description: [
      'Built robust frontend and backend architectures.',
      'Led end-to-end development of scalable web applications.',
      'Mentored junior developers and established coding standards.',
    ],
  },
];

const TimelineItem: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className="glass-card p-6">
          <span className="inline-block px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded mb-3">
            {experience.duration}
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground mb-1">
            {experience.role}
          </h3>
          <h4 className="text-accent font-mono text-sm mb-4">
            @ {experience.company}
          </h4>
          <ul className={`space-y-2 ${isEven ? 'md:text-right' : ''}`}>
            {experience.description.map((item, i) => (
              <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="text-accent shrink-0">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline Point */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background accent-glow z-10" />
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 overflow-hidden"
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
            <span className="text-accent">04.</span> Experience
          </h2>
          <div className="w-24 h-1 bg-accent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
