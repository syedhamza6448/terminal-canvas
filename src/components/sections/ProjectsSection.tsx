import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, XCircle } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';

type ProjectStatus = 'completed' | 'in-progress' | 'archived';
type ProjectCategory = 'full-stack' | 'frontend' | 'mini-projects';

interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  status: ProjectStatus;
  category: ProjectCategory;
  techStack: string[];
  link: string | null;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Subway Surfers(Fan Tribute)',
    description: 'A nostalgic Subway Surfers fan tribute that brings childhood memories to life with playful motion and game UI.',
    date: '01-2026',
    status: 'in-progress',
    category: 'frontend',
    techStack: ['React', 'TypeScript', 'Tailwind CSS' ],
    link: null,
  },
  {
    id: 2,
    name: 'Inquizzitive',
    description: 'Full-stack quiz platform with real-time gameplay, scoring logic, and result tracking.',
    date: '08-2025',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Blade Template Engine(HTML, CSS, JS)', 'Laravel(PHP)', 'MySQL', 'REST APIs'],
    link: 'https://www.inquizzitive.io',
  },
  {
    id: 3,
    name: 'Cyber Portfolio',
    description: 'React-based frontend project exploring component-driven UI and state management.',
    date: '12-2025',
    status: 'archived',
    category: 'frontend',
    techStack: ['React', 'JavaScript', 'Tailwind'],
    link: null,
  },
  {
    id: 4,
    name: 'Portfolio v2',
    description: 'Previous iteration of my personal portfolio website.',
    date: '02-2025',
    status: 'completed',
    category: 'frontend',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://syedhamza6448.github.io/VCard-Portfolio',
  },
  {
    id: 5,
    name: 'Expense Voyage',
    description: 'Expense Voyage is a travel planning and expense management web app that lets users create trips, set budgets, and track expenses in real time.',
    date: '10-2025',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Blade Template Engine(HTML, CSS, JS)', 'Laravel(PHP)', 'Bootstrap', 'MySQL', 'REST APIs'],
    link: null,
  },
  {
    id: 6,
    name: 'Event Sphere',
    description: 'EventSphere is a centralized web-based event management platform that streamlines college events by enabling seamless event creation, registration, tracking, and engagement. It improves communication, boosts participation, and maintains digital records of all events in one place.',
    date: '10-2025',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Blade Template Engine(HTML, CSS, JS)', 'Laravel(PHP)', 'Bootstrap', 'MySQL', 'REST APIs'],
    link: null,
  },
  {
    id: 7,
    name: 'Wellnex Systems',
    description: 'Wellnex Systems is a unified HealthTech platform combining fitness, mental wellness, and smart digital services. Built to deliver personalized, scalable, and future-ready wellness experiences.',
    date: '11-2025',
    status: 'completed',
    category: 'frontend',
    techStack: ['React', 'Tailwind CSS'],
    link: 'https://wellnex-eight.vercel.app',
  },
  {
    id: 8,
    name: 'Weather Widget',
    description: 'A minimalist weather widget.',
    date: '01-2024',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS', 'API Integration'],
    link: 'https://syedhamza6448.github.io/Weather-App',
  },
  {
    id: 9,
    name: 'Zoro Gallery',
    description: 'A slider component to showcase my favourite anime character',
    date: '02-2024',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://syedhamza6448.github.io/Zoro-Gallery',
  },
  {
    id: 10,
    name: 'Instagram Clone',
    description: 'A clone of Instagram, cloned it in my early days of Web Designing',
    date: '10-2023',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS'],
    link: 'https://syedhamza6448.github.io/Clones/Instagram/source%20files/index.html',
  },
  {
    id: 11,
    name: 'Steam Clone',
    description: 'A clone of Steam, cloned it in my early days of Web Designing',
    date: '11-2023',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS'],
    link: 'https://syedhamza6448.github.io/Clones/Steam/source%20files/index.html',
  },
  {
    id: 12,
    name: 'Netflix Clone',
    description: 'A clone of Netflix, cloned it in my early days of Web Designing',
    date: '12-2023',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS'],
    link: 'https://syedhamza6448.github.io/Clones/Netflix/source%20file/netflix.html',
  },
  {
    id: 13,
    name: 'Portfolio v1',
    description: 'An early portfolio website created with core web technologies. Focused on learning layout, styling, and basic interactivity.',
    date: '11-2024',
    status: 'completed',
    category: 'frontend',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    link: 'https://syedhamza6448.github.io/Portfolio',
  },
];

const statusFilters: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'archived', label: 'Archived' },
];

const categoryFilters: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'full-stack', label: 'Full-Stack' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'mini-projects', label: 'Mini Projects' },
];

const getStatusClass = (status: ProjectStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-yellow-500';
    case 'archived':
      return 'bg-gray-500';
  }
};

const getStatusText = (status: ProjectStatus) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'archived':
      return 'Archived';
  }
};

const getCategoryText = (category: ProjectCategory) => {
  switch (category) {
    case 'full-stack':
      return 'Full-Stack';
    case 'frontend':
      return 'Frontend';
    case 'mini-projects':
      return 'Mini Project';
  }
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-muted-foreground">{project.date}</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 w-fit">
            {getCategoryText(project.category)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusClass(project.status)}`} />
          <span className="text-xs font-mono text-muted-foreground">
            {getStatusText(project.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
          {project.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded border border-accent/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent text-sm font-mono hover:underline group"
        >
          <span>View Project</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      ) : (
        <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-mono">
          <XCircle className="w-4 h-4" />
          <span>Not Deployed</span>
        </div>
      )}
    </motion.div>
  );
};

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-2 text-sm font-mono rounded-lg transition-all duration-300 border ${active
        ? 'bg-accent text-accent-foreground border-accent'
        : 'bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
      }`}
  >
    {children}
  </motion.button>
);

const ProjectsSection: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
      return matchesStatus && matchesCategory;
    });
  }, [statusFilter, categoryFilter]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative min-h-screen py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 id="projects-heading" className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent" aria-hidden="true">03.</span> Featured Projects
          </h2>
          <div className="w-24 h-1 bg-accent" aria-hidden="true" />
        </motion.header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono text-muted-foreground self-center mr-2">Status:</span>
            {statusFilters.map((filter) => (
              <FilterButton
                key={filter.value}
                active={statusFilter === filter.value}
                onClick={() => setStatusFilter(filter.value)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono text-muted-foreground self-center mr-2">Category:</span>
            {categoryFilters.map((filter) => (
              <FilterButton
                key={filter.value}
                active={categoryFilter === filter.value}
                onClick={() => setCategoryFilter(filter.value)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div layout className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground font-mono">No projects match the selected filters.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Sub-section */}
        <TestimonialsSection />
      </div>
    </section>
  );
};

export default ProjectsSection;
