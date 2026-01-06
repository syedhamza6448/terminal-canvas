import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Server, Smartphone, Zap, Database } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Building responsive, performant user interfaces with modern frameworks and best practices.',
    icon: Code,
    features: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 2,
    title: 'Backend Development',
    description: 'Designing robust server-side solutions with scalable architecture and secure APIs.',
    icon: Server,
    features: ['Node.js', 'Laravel', 'ASP.NET Core', 'REST / GraphQL'],
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'Crafting intuitive user experiences with a focus on accessibility and visual appeal.',
    icon: Palette,
    features: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
  },
  {
    id: 4,
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile applications with native-like performance.',
    icon: Smartphone,
    features: ['React Native', 'Expo', 'iOS / Android', 'App Store Deploy'],
  },
  {
    id: 5,
    title: 'Database Design',
    description: 'Architecting efficient data models and optimizing query performance.',
    icon: Database,
    features: ['PostgreSQL', 'MongoDB', 'Redis', 'Data Modeling'],
  },
  {
    id: 6,
    title: 'Performance Optimization',
    description: 'Enhancing application speed through code optimization and caching strategies.',
    icon: Zap,
    features: ['Code Splitting', 'Lazy Loading', 'CDN Setup', 'Core Web Vitals'],
  },
];

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 h-full flex flex-col group"
    >
      {/* Icon Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-heading text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-2">
        {service.features.map((feature) => (
          <span
            key={feature}
            className="px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded border border-accent/20"
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
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
            <span className="text-accent">02.</span> Services
          </h2>
          <div className="w-24 h-1 bg-accent" />
          <p className="text-muted-foreground mt-4 max-w-xl font-mono text-sm">
            $ cat services.txt → Here's what I can help you build_
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
