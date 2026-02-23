import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, XCircle, Github, LayoutGrid, List, Star } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import ProjectModal from '@/components/ProjectModal';
import { projects, sortProjectsByDate, type Project, type ProjectStatus, type ProjectCategory } from '@/data/projects';

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
    case 'completed': return 'bg-green-500';
    case 'in-progress': return 'bg-yellow-500';
    case 'archived': return 'bg-gray-500';
  }
};

const getStatusText = (status: ProjectStatus) => {
  switch (status) {
    case 'completed': return 'Completed';
    case 'in-progress': return 'In Progress';
    case 'archived': return 'Archived';
  }
};

const getCategoryText = (category: ProjectCategory) => {
  switch (category) {
    case 'full-stack': return 'Full-Stack';
    case 'frontend': return 'Frontend';
    case 'mini-projects': return 'Mini Project';
  }
};

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onClick: () => void;
  isFeatured?: boolean;
}> = ({ project, index, onClick, isFeatured }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`glass-card p-6 h-full flex flex-col cursor-pointer transition-all duration-300 hover:border-accent/40 ${
        isFeatured ? 'md:col-span-2 border-accent/30 ring-1 ring-accent/10' : ''
      }`}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
          <span className="text-xs font-mono text-accent">Featured Project</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {project.favicon && (
            <img src={project.favicon} alt="" className="w-6 h-6 rounded object-contain" />
          )}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-muted-foreground">{project.date}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 w-fit">
              {getCategoryText(project.category)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusClass(project.status)}`} />
          <span className="text-xs font-mono text-muted-foreground">{getStatusText(project.status)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{project.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, isFeatured ? undefined : 4).map((tech) => (
          <span key={tech} className="px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded border border-accent/20">
            {tech}
          </span>
        ))}
        {!isFeatured && project.techStack.length > 4 && (
          <span className="px-2 py-1 text-xs font-mono text-muted-foreground">+{project.techStack.length - 4}</span>
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-accent text-sm font-mono hover:underline group"
          >
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span>Live</span>
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-mono">
            <XCircle className="w-4 h-4" />
            <span>Not Deployed</span>
          </div>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent text-sm font-mono transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectListItem: React.FC<{
  project: Project;
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3, delay: index * 0.03 }}
    onClick={onClick}
    className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:border-accent/40 transition-all"
  >
    {project.favicon && (
      <img src={project.favicon} alt="" className="w-6 h-6 rounded object-contain flex-shrink-0" />
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h3 className="font-heading font-bold text-foreground truncate">{project.name}</h3>
        {project.featured && <Star className="w-3 h-3 text-accent fill-accent flex-shrink-0" />}
      </div>
      <p className="text-muted-foreground text-xs truncate">{project.description}</p>
    </div>
    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 hidden sm:block">{project.date}</span>
    <div className="flex items-center gap-1 flex-shrink-0">
      <div className={`w-2 h-2 rounded-full ${getStatusClass(project.status)}`} />
      <span className="text-xs font-mono text-muted-foreground hidden md:block">{getStatusText(project.status)}</span>
    </div>
    <div className="flex gap-2 flex-shrink-0">
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-accent hover:opacity-70">
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-accent transition-colors">
          <Github className="w-4 h-4" />
        </a>
      )}
    </div>
  </motion.div>
);

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const sortedProjects = useMemo(() => sortProjectsByDate(projects), []);

  const featuredProject = useMemo(() => sortedProjects.find((p) => p.featured), [sortedProjects]);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      if (featuredProject && project.id === featuredProject.id) return false; // shown separately
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
      return matchesStatus && matchesCategory;
    });
  }, [sortedProjects, statusFilter, categoryFilter, featuredProject]);

  const openModal = (project: Project) => {
    if (project.modalEnabled === false) return;
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative min-h-screen py-24 overflow-hidden">
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

        {/* Controls: Filters + View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-mono text-muted-foreground mr-2">Status:</span>
              {statusFilters.map((filter) => (
                <FilterButton key={filter.value} active={statusFilter === filter.value} onClick={() => setStatusFilter(filter.value)}>
                  {filter.label}
                </FilterButton>
              ))}
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono text-muted-foreground self-center mr-2">Category:</span>
            {categoryFilters.map((filter) => (
              <FilterButton key={filter.value} active={categoryFilter === filter.value} onClick={() => setCategoryFilter(filter.value)}>
                {filter.label}
              </FilterButton>
            ))}
          </div>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-8">
            <ProjectCard
              project={featuredProject}
              index={0}
              onClick={() => openModal(featuredProject)}
              isFeatured
            />
          </div>
        )}

        {/* Projects */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            viewMode === 'grid' ? (
              <motion.div layout className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} onClick={() => openModal(project)} />
                ))}
              </motion.div>
            ) : (
              <motion.div layout className="flex flex-col gap-3">
                {filteredProjects.map((project, index) => (
                  <ProjectListItem key={project.id} project={project} index={index} onClick={() => openModal(project)} />
                ))}
              </motion.div>
            )
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              <p className="text-muted-foreground font-mono">No projects match the selected filters.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />

        {/* Testimonials Sub-section */}
        <TestimonialsSection />
      </div>
    </section>
  );
};

export default ProjectsSection;
