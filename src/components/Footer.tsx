import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Heart, Coffee, Code, Terminal, Gamepad2, FileCode, Sparkles } from 'lucide-react';
import TerminalGame from './TerminalGame';

const socialLinks = [
  { icon: Github, href: 'https://github.com/syedhamza6448', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/syedhamza6448/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/s.yedhamza/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:hsyed6448@gmail.com', label: 'Email' },
];

const codeSnippets = [
  'while(alive) { code(); coffee(); repeat(); }',
  'if(bug) { blame(coffee); } else { celebrate(); }',
  'const life = () => code() + sleep() + repeat();',
  '// TODO: Take a break... never!',
  'git commit -m "fixed the unfixable"',
  'console.log("Built with ❤️ and lots of ☕");',
];

type AsciiTab = 'rocket' | 'code' | 'coffee' | 'game';

const asciiArt: Record<Exclude<AsciiTab, 'game'>, string> = {
  rocket: `
       /\\
      /  \\
     /    \\
    |  SH  |
    |      |
   /|      |\\
  / |      | \\
 /  |      |  \\
/___|______|___\\
    |  ||  |
    |  ||  |
   /|  ||  |\\
  /_|__||__|_\\
     /__\\
    /____\\
   🔥🔥🔥
  `,
  code: `
    _____
   /     \\
  |  < >  |
  | CODE  |
  |  IS   |
  | POETRY|
   \\_____/
      |
   ___|___
  |       |
  | PUSH  |
  |_______|
  `,
  coffee: `
      )  (
     (   ) )
      ) ( (
    _______)_
 .-'---------|  
( C|/\\/\\/\\/\\/|
 '-./\\/\\/\\/\\/|
   '_________'
    '-------'
  `,
};

const tabIcons: { id: AsciiTab; icon: React.ElementType; label: string }[] = [
  { id: 'rocket', icon: Sparkles, label: 'Rocket' },
  { id: 'code', icon: FileCode, label: 'Code' },
  { id: 'coffee', icon: Coffee, label: 'Coffee' },
  { id: 'game', icon: Gamepad2, label: 'Snake' },
];

const Footer: React.FC = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [activeAsciiTab, setActiveAsciiTab] = useState<AsciiTab>('rocket');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCoffeeClick = () => {
    setCoffeeCount((prev) => prev + 1);
  };

  return (
    <footer className="relative py-16 overflow-hidden border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            hsl(var(--accent) / 0.1) 50px,
            hsl(var(--accent) / 0.1) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            hsl(var(--accent) / 0.1) 50px,
            hsl(var(--accent) / 0.1) 51px
          )`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Terminal-style code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-4 mb-12 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs font-mono text-muted-foreground ml-2">~ terminal</span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-accent">$ </span>
            <motion.span
              key={currentSnippet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-foreground"
            >
              {codeSnippets[currentSnippet]}
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-accent ml-1"
            >
              █
            </motion.span>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Left - Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-accent" />
              <span className="font-heading text-xl font-bold text-foreground">Syed Hamza</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-Stack Developer crafting digital experiences with clean code and creative solutions.
            </p>
          </motion.div>

          {/* Center - Interactive Coffee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <motion.button
              onClick={handleCoffeeClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 10 }}
              className="relative p-4 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors group"
            >
              <Coffee className="w-8 h-8 text-accent group-hover:animate-pulse" />
              {coffeeCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-mono px-2 py-0.5 rounded-full"
                >
                  {coffeeCount}
                </motion.span>
              )}
            </motion.button>
            <p className="text-muted-foreground text-xs font-mono mt-3">
              {coffeeCount === 0 && "Buy me a virtual coffee?"}
              {coffeeCount > 0 && coffeeCount < 5 && "Thanks! Keep 'em coming!"}
              {coffeeCount >= 5 && coffeeCount < 10 && "You're amazing! ☕"}
              {coffeeCount >= 10 && "I'm fully caffeinated! 🚀"}
            </p>
          </motion.div>

          {/* Right - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-end"
          >
            <span className="text-xs font-mono text-muted-foreground mb-4">Connect with me</span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center hover:bg-accent/20 hover:border-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-accent" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ASCII Art Terminal with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-card max-w-md mx-auto mb-12 overflow-hidden"
        >
          {/* Terminal Header with Tabs */}
          <div className="flex items-center justify-between bg-secondary/50 px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            {/* Tab Bookmarks */}
            <div className="flex gap-1">
              {tabIcons.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveAsciiTab(tab.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1 transition-colors ${
                    activeAsciiTab === tab.id
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

          {/* Content Area */}
          <div className="p-4 bg-terminal min-h-[280px] flex items-center justify-center">
            {activeAsciiTab === 'game' ? (
              <TerminalGame />
            ) : (
              <motion.pre
                key={activeAsciiTab}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-accent text-xs font-mono whitespace-pre"
              >
                {asciiArt[activeAsciiTab]}
              </motion.pre>
            )}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground font-mono text-sm flex items-center gap-2">
            <Code className="w-4 h-4 text-accent" />
            <span className="text-accent">{'<'}</span>
            Designed & Built by Syed Hamza Imran
            <span className="text-accent">{' />'}</span>
          </p>

          <p className="text-muted-foreground/60 font-mono text-xs flex items-center gap-2">
            Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" /> and lots of{' '}
            <Coffee className="w-3 h-3 text-accent" />
          </p>

          <p className="text-muted-foreground/60 font-mono text-xs">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
