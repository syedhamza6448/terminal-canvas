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
    company: 'Tech Innovations Inc.',
    role: 'Senior Full-Stack Developer',
    duration: '01-2023 - Present',
    description: [
      'Led development of microservices architecture serving 1M+ users',
      'Mentored junior developers and established coding standards',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
    ],
  },
  {
    id: 2,
    company: 'Digital Solutions Ltd.',
    role: 'Full-Stack Developer',
    duration: '06-2021 - 12-2022',
    description: [
      'Built responsive web applications using React and Node.js',
      'Optimized database queries improving performance by 40%',
      'Collaborated with design team to implement pixel-perfect UIs',
    ],
  },
  {
    id: 3,
    company: 'StartUp Hub',
    role: 'Frontend Developer',
    duration: '01-2020 - 05-2021',
    description: [
      'Developed interactive dashboards with real-time data visualization',
      'Implemented state management using Redux and Context API',
      'Created reusable component library used across multiple projects',
    ],
  },
  {
    id: 4,
    company: 'Freelance',
    role: 'Web Developer',
    duration: '06-2019 - 12-2019',
    description: [
      'Delivered 10+ client projects ranging from portfolios to e-commerce',
      'Managed full project lifecycle from requirements to deployment',
      'Built lasting client relationships through quality deliverables',
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
            <span className="text-accent">03.</span> Experience
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
