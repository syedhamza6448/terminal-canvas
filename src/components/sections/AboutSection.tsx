import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, User, Sparkles, Code2 } from 'lucide-react';
import PixelAlien from '../PixelAlien';
import { 
  SiReact, 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiLaravel, 
  SiDotnet, 
  SiMysql, 
  SiMongodb,
  SiGit, 
  SiFigma,
  SiAngular, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiBootstrap, 
  SiWordpress, 
  SiElementor, 
} from 'react-icons/si';

type AboutTab = 'alien' | 'stats' | 'fun-facts';

const tabIcons: { id: AboutTab; icon: React.ElementType; label: string }[] = [
  { id: 'alien', icon: Gamepad2, label: 'Alien' },
  { id: 'stats', icon: Code2, label: 'Stats' },
  { id: 'fun-facts', icon: Sparkles, label: 'Facts' },
];

const funFacts = [
  { emoji: '☕', fact: 'Coffee consumed', value: '1000+', unit: 'cups' },
  { emoji: '💻', fact: 'Lines of code', value: '500K+', unit: 'lines' },
  { emoji: '🐛', fact: 'Bugs squashed', value: '∞', unit: 'bugs' },
  { emoji: '🎮', fact: 'Gaming hours', value: '2000+', unit: 'hours' },
  { emoji: '📚', fact: 'Docs read', value: '999+', unit: 'pages' },
  { emoji: '🚀', fact: 'Projects deployed', value: '50+', unit: 'apps' },
];

const codingStats = [
  { label: 'Frontend', percentage: 90 },
  { label: 'Backend', percentage: 85 },
  { label: 'Database', percentage: 80 },
  { label: 'UI/UX', percentage: 75 },
];

const techStacks = [
  { name: 'React', category: 'frontend', icon: SiReact },
  { name: 'TypeScript', category: 'frontend', icon: SiTypescript },
  { name: 'JavaScript', category: 'frontend', icon: SiJavascript },
  { name: 'Next.js', category: 'frontend', icon: SiNextdotjs },
  { name: 'Tailwind CSS', category: 'frontend', icon: SiTailwindcss },
  { name: 'Bootstrap', category: 'frontend', icon: SiBootstrap },
  { name: 'Node.js', category: 'backend', icon: SiNodedotjs },
  { name: 'Laravel', category: 'backend', icon: SiLaravel },
  { name: 'ASP.NET Core', category: 'backend', icon: SiDotnet },
  { name: 'MySQL', category: 'database', icon: SiMysql },
  { name: 'MongoDB', category: 'database', icon: SiMongodb },
  { name: 'Angular', category: 'frontend', icon: SiAngular },
  { name: 'HTML', category: 'frontend', icon: SiHtml5 },
  { name: 'CSS', category: 'frontend', icon: SiCss3 },
  { name: 'Git', category: 'devops', icon: SiGit },
  { name: 'Figma', category: 'design', icon: SiFigma },
  { name: 'Wordpress', category: 'CMS', icon: SiWordpress },
  { name: 'Elementor', category: 'CMS', icon: SiElementor },
];

const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AboutTab>('alien');
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
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
            <span className="text-accent">01.</span> About Me
          </h2>
          <div className="w-24 h-1 bg-accent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="terminal-window">
              <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                  <span className="ml-4 text-xs text-muted-foreground font-mono">
                    ~/about/{activeTab}.exe
                  </span>
                </div>
                
                {/* Tab Bookmarks */}
                <div className="flex gap-1">
                  {tabIcons.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-accent/10 text-muted-foreground hover:text-accent'
                      }`}
                    >
                      <tab.icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-terminal scanlines relative h-[300px] md:h-[350px] overflow-hidden">
                {activeTab === 'alien' && <PixelAlien />}
                
                {activeTab === 'stats' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col justify-center space-y-4 px-4"
                  >
                    {codingStats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredStat(index)}
                        onMouseLeave={() => setHoveredStat(null)}
                        className="space-y-1"
                      >
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-accent">{stat.label}</span>
                          <span className="text-muted-foreground">{stat.percentage}%</span>
                        </div>
                        <div className="h-2 bg-accent/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full rounded-full transition-all ${
                              hoveredStat === index ? 'bg-accent accent-glow' : 'bg-accent/70'
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                
                {activeTab === 'fun-facts' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full grid grid-cols-2 gap-3 p-2 content-center"
                  >
                    {funFacts.map((item, index) => (
                      <motion.div
                        key={item.fact}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="bg-accent/5 border border-accent/20 rounded-lg p-3 text-center cursor-default hover:border-accent/50 transition-colors"
                      >
                        <span className="text-2xl block mb-1">{item.emoji}</span>
                        <span className="text-accent font-bold text-lg font-mono">{item.value}</span>
                        <span className="text-muted-foreground text-xs block font-mono">{item.fact}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hello! I'm <span className="text-accent font-semibold">Syed Hamza Imran</span>, 
              a passionate developer who loves creating digital experiences that live at the 
              intersection of design and technology.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in development started with curiosity about how things work on the web. 
              Today, I specialize in building scalable, performant applications with modern 
              technologies. I believe in writing clean, maintainable code that stands the test of time.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>

            {/* Tech Stack */}
            <div className="pt-4">
              <h3 className="text-sm font-mono text-accent mb-3">$ ls tech-stack/</h3>
              <div className="flex flex-wrap gap-2">
                {techStacks.map((tech, index) => {
                  const IconComponent = tech.icon;
                  return (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-accent/10 text-accent border border-accent/30 rounded hover:bg-accent/20 transition-colors cursor-default"
                    >
                      <IconComponent className="w-4 h-4" />
                      {tech.name}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-mono rounded-lg hover:opacity-90 transition-opacity accent-glow group"
              >
                Let's Connect
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
