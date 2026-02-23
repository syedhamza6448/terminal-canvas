import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, open, onOpenChange }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  if (!project) return null;

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  const nextScreenshot = () => {
    if (hasScreenshots) {
      setCurrentScreenshot((prev) => (prev + 1) % project.screenshots!.length);
    }
  };

  const prevScreenshot = () => {
    if (hasScreenshots) {
      setCurrentScreenshot((prev) => (prev - 1 + project.screenshots!.length) % project.screenshots!.length);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto glass-card border-accent/20 p-0">
        <DialogTitle className="sr-only">{project.name}</DialogTitle>
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {project.favicon && (
                <img
                  src={project.favicon}
                  alt={`${project.name} logo`}
                  className="w-8 h-8 rounded object-contain"
                />
              )}
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground">{project.name}</h3>
                <span className="text-xs font-mono text-muted-foreground">{project.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots Carousel */}
        {hasScreenshots && (
          <div className="px-6 pt-4">
            <div className="relative rounded-lg overflow-hidden border border-border bg-background">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentScreenshot}
                  src={project.screenshots![currentScreenshot]}
                  alt={`${project.name} screenshot ${currentScreenshot + 1}`}
                  className="w-full h-48 object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              {project.screenshots!.length > 1 && (
                <>
                  <button
                    onClick={prevScreenshot}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextScreenshot}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {project.screenshots!.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentScreenshot(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentScreenshot ? 'bg-accent' : 'bg-muted-foreground/50'}`}
                        aria-label={`Go to screenshot ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="px-6 pt-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className="px-6 pt-4">
          <h4 className="text-xs font-mono text-muted-foreground mb-2">
            <span className="text-accent">$</span> tech_stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded border border-accent/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Fonts */}
        {project.fonts && project.fonts.length > 0 && (
          <div className="px-6 pt-4">
            <h4 className="text-xs font-mono text-muted-foreground mb-2">
              <span className="text-accent">$</span> fonts
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.fonts.map((font) => (
                <span
                  key={font}
                  className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded border border-border"
                >
                  {font}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="px-6 py-4 flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity border border-border"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
