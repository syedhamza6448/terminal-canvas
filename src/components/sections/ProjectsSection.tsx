import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, XCircle } from 'lucide-react';

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
    name: 'Inquizzitive',
    description: 'Full-stack quiz platform with real-time gameplay, scoring logic, and result tracking.',
    date: '08-2025',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Blade', 'Laravel', 'MySQL', 'REST APIs'],
    link: 'https://www.inquizzitive.io',
  },
  {
    id: 2,
    name: 'Cyber Portfolio',
    description: 'React-based frontend project exploring component-driven UI and state management.',
    date: '12-2025',
    status: 'archived',
    category: 'frontend',
    techStack: ['React', 'JavaScript', 'Tailwind'],
    link: null,
  },
  {
    id: 3,
    name: 'Task Management System',
    description: 'Collaborative project management tool with kanban boards and team analytics.',
    date: '08-2024',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Next.js', 'Python', 'OpenAI', 'WebSocket'],
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
    link: null,
  },
  {
    id: 5,
    name: 'Weather Widget',
    description: 'A minimalist weather widget with location detection and animated icons.',
    date: '06-2024',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['React', 'API Integration'],
    link: null,
  },
  {
    id: 6,
    name: 'E-Commerce API',
    description: 'RESTful API for an e-commerce platform with authentication and payment integration.',
    date: '01-2025',
    status: 'in-progress',
    category: 'full-stack',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Stripe'],
    link: null,
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
    className={`px-4 py-2 text-sm font-mono rounded-lg transition-all duration-300 border ${
      active
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
            <span className="text-accent">03.</span> Projects
          </h2>
          <div className="w-24 h-1 bg-accent" />
        </motion.div>

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
      </div>
    </section>
  );
};

export default ProjectsSection;
