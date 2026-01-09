import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Star } from 'lucide-react';

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
    issuer: 'University Tech Fest',
    date: '2024',
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

const getTypeColor = (type: AwardItem['type']) => {
  switch (type) {
    case 'award':
      return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
    case 'certificate':
      return 'text-accent bg-accent/10 border-accent/30';
    case 'achievement':
      return 'text-purple-500 bg-purple-500/10 border-purple-500/30';
  }
};

const AwardsSection: React.FC = () => {
  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-foreground">
          <span className="text-accent font-mono text-lg">04.1</span> Awards & Certificates
        </h3>
        <p className="text-muted-foreground font-mono text-sm">
          $ ls achievements/
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {awards.map((award, index) => {
          const Icon = getIcon(award.type);
          const colorClass = getTypeColor(award.type);
          
          return (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-5 flex gap-4 group"
            >
              {/* Icon */}
              <div className={`shrink-0 p-3 rounded-lg border ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-heading font-bold text-foreground group-hover:text-accent transition-colors">
                    {award.title}
                  </h4>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {award.date}
                  </span>
                </div>
                <p className="text-sm text-accent font-mono mt-0.5">
                  @ {award.issuer}
                </p>
                {award.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {award.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AwardsSection;
