import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Medal } from 'lucide-react';

interface AwardItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  type: 'award' | 'certificate' | 'achievement';
  description?: string;
}

const awards: AwardItem[] = [
  {
    id: 1,
    title: 'Best Web Application',
    issuer: 'Aptech Vision',
    date: '2025',
    type: 'award',
    description: 'First place for innovative full-stack application development.',
  },
  {
    id: 2,
    title: 'React Developer Certification',
    issuer: 'Meta',
    date: '2024',
    type: 'certificate',
    description: 'Professional certification in React.js development.',
  },
  {
    id: 3,
    title: 'JavaScript Algorithms',
    issuer: 'freeCodeCamp',
    date: '2023',
    type: 'certificate',
    description: 'Data structures and algorithms in JavaScript.',
  },
  {
    id: 4,
    title: 'Hackathon Finalist',
    issuer: 'DevCon 2024',
    date: '2024',
    type: 'achievement',
    description: 'Top 5 finish in 48-hour coding challenge.',
  },
];

const getIcon = (type: AwardItem['type']) => {
  switch (type) {
    case 'award':
      return Trophy;
    case 'certificate':
      return Award;
    case 'achievement':
      return Medal;
  }
};

const AwardsSection: React.FC = () => {
  return (
    <div id="awards" className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-foreground">
          <span className="text-accent font-mono text-lg">02.1</span> Awards & Certificates
        </h3>
        <p className="text-muted-foreground font-mono text-sm">
          $ ls achievements/
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {awards.map((award, index) => {
          const Icon = getIcon(award.type);
          
          return (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative group"
            >
              {/* Card with glass effect */}
              <div className="glass-card p-5 h-full border-l-2 border-l-accent/50 group-hover:border-l-accent transition-colors">
                {/* Header row */}
                <div className="flex items-start gap-4">
                  {/* Icon container */}
                  <div className="shrink-0 p-3 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-heading font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                        {award.title}
                      </h4>
                      <span className="absolute bottom-2 right-2 text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground shrink-0">
                        {award.date}
                      </span>
                    </div>
                    
                    <p className="text-sm text-accent font-mono">
                      @ {award.issuer}
                    </p>
                    
                    {award.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Type badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent/60 bg-accent/5 px-2 py-0.5 rounded">
                    {award.type}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AwardsSection;
