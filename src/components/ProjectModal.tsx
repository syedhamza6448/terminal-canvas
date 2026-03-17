import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const c = project.colors;
  const hasColors = !!c;
  const primary = c?.primary;                        // background
  const secondary = c?.secondary || c?.primary;      // buttons / highlights
  const accent = c?.accent || c?.secondary || c?.primary; // text

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

  // Inline styles for dynamic HEX colors, fallback to theme tokens
  const modalBg = hasColors ? { backgroundColor: primary } : {};
  const accentColor = hasColors ? { color: accent } : {};
  const secondaryBg = hasColors ? { backgroundColor: secondary, color: '#fff' } : {};
  const secondaryBorder = hasColors ? { borderColor: `${secondary}33` } : {};
  const techTagStyle = hasColors
    ? { backgroundColor: `${secondary}1a`, color: accent, borderColor: `${secondary}33` }
    : {};
  const dotActiveStyle = hasColors ? { backgroundColor: secondary } : {};
  const descStyle = hasColors ? { color: `${accent}cc` } : {};
  const dateStyle = hasColors ? { color: `${accent}99` } : {};
  const fontTagStyle = hasColors
    ? { backgroundColor: `${secondary}1a`, color: accent, borderColor: `${secondary}33` }
    : {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-w-2xl max-h-[85vh] overflow-y-auto p-0 ${hasColors ? 'border' : 'glass-card border-accent/20'}`}
        style={{ ...modalBg, ...secondaryBorder }}
      >
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
                <h3
                  className={`font-heading text-2xl font-bold ${!hasColors ? 'text-foreground' : ''}`}
                  style={accentColor}
                >
                  {project.name}
                </h3>
                <span
                  className={`text-xs font-mono ${!hasColors ? 'text-muted-foreground' : ''}`}
                  style={dateStyle}
                >
                  {project.date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots Carousel */}
        {hasScreenshots && (
          <div className="px-6 pt-4">
            <div className="relative rounded-lg overflow-hidden border border-border bg-black/20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentScreenshot}
                  src={project.screenshots![currentScreenshot]}
                  alt={`${project.name} screenshot ${currentScreenshot + 1}`}
                  className="w-full object-contain max-h-[400px]"
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={hasColors ? { backgroundColor: `${secondary}cc`, color: '#fff' } : undefined}
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextScreenshot}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={hasColors ? { backgroundColor: `${secondary}cc`, color: '#fff' } : undefined}
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {project.screenshots!.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentScreenshot(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${!hasColors ? (i === currentScreenshot ? 'bg-accent' : 'bg-muted-foreground/50') : ''}`}
                        style={hasColors ? (i === currentScreenshot ? dotActiveStyle : { backgroundColor: `${accent}40` }) : undefined}
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
          <p
            className={`text-sm leading-relaxed ${!hasColors ? 'text-muted-foreground' : ''}`}
            style={descStyle}
          >
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="px-6 pt-4">
          <h4 className={`text-xs font-mono mb-2 ${!hasColors ? 'text-muted-foreground' : ''}`} style={dateStyle}>
            <span className={!hasColors ? 'text-accent' : ''} style={accentColor}>$</span> tech_stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 text-xs font-mono rounded border ${!hasColors ? 'bg-accent/10 text-accent border-accent/20' : ''}`}
                style={techTagStyle}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Fonts */}
        {project.fonts && project.fonts.length > 0 && (
          <div className="px-6 pt-4">
            <h4 className={`text-xs font-mono mb-2 ${!hasColors ? 'text-muted-foreground' : ''}`} style={dateStyle}>
              <span className={!hasColors ? 'text-accent' : ''} style={accentColor}>$</span> fonts
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.fonts.map((font) => (
                <span
                  key={font}
                  className={`px-2 py-1 text-xs font-mono rounded border ${!hasColors ? 'bg-secondary text-secondary-foreground border-border' : ''}`}
                  style={fontTagStyle}
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
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-lg hover:opacity-90 transition-opacity ${!hasColors ? 'bg-accent text-accent-foreground' : ''}`}
              style={secondaryBg}
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
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-lg hover:opacity-90 transition-opacity border ${!hasColors ? 'bg-secondary text-secondary-foreground border-border' : ''}`}
              style={hasColors ? { backgroundColor: `${secondary}1a`, color: accent, borderColor: `${secondary}33` } : undefined}
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
