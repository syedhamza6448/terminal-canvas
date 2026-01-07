import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'archived';
  techStack: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Inquizzitive',
    description: 'Full-stack quiz platform with real-time gameplay, scoring logic, and result tracking.',
    date: '08-2025',
    status: 'completed',
    techStack: ['Blade', 'Laravel', 'MySQL', 'REST APIs'],
    link: 'https://www.inquizzitive.io',
  },
  {
    id: 2,
    name: 'Cyber Portfolio',
    description: 'React-based frontend project exploring component-driven UI and state management.',
    date: '12-2025',
    status: 'archived',
    techStack: ['React', 'JavaScript', 'Tailwind'],
    link: '#',
  },
  {
    id: 3,
    name: 'Task Management System',
    description: 'Collaborative project management tool with kanban boards and team analytics.',
    date: '08-2024',
    status: 'completed',
    techStack: ['Next.js', 'Python', 'OpenAI', 'WebSocket'],
    link: '#',
  },
  {
    id: 4,
    name: 'Portfolio v2',
    description: 'Previous iteration of my personal portfolio website.',
    date: '02-2025',
    status: 'completed',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
];

const getStatusClass = (status: Project['status']) => {
  switch (status) {
    case 'completed':
      return 'status-completed';
    case 'in-progress':
      return 'status-in-progress';
    case 'archived':
      return 'status-archived';
  }
};

const getStatusText = (status: Project['status']) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'archived':
      return 'Archived';
  }
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-mono text-muted-foreground">{project.date}</span>
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
      <a
        href={project.link}
        className="inline-flex items-center gap-2 text-accent text-sm font-mono hover:underline group"
      >
        <span>View Project</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
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

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
