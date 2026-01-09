import React, { useState, useEffect } from 'react';
import { Moon, Sun, ChevronDown, Terminal, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
  subLinks?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { 
    name: 'About', 
    href: '#about',
    subLinks: [
      { name: 'Services', href: '#services' },
    ]
  },
  { 
    name: 'Experience', 
    href: '#experience',
    subLinks: [
      { name: 'Awards', href: '#awards' },
    ]
  },
  { 
    name: 'Projects', 
    href: '#projects',
    subLinks: [
      { name: 'Testimonials', href: '#testimonials' },
    ]
  },
  { name: 'Contact', href: '#contact' },
];

const accentColors = [
  { name: 'Emerald', value: 'emerald' as const, class: 'bg-emerald-400' },
  { name: 'Cyan', value: 'cyan' as const, class: 'bg-cyan-400' },
  { name: 'Indigo', value: 'indigo' as const, class: 'bg-indigo-400' },
  { name: 'Rose', value: 'rose' as const, class: 'bg-rose-400' },
  { name: 'Amber', value: 'amber' as const, class: 'bg-amber-400' },
];

const Navbar: React.FC = () => {
  const { theme, accentColor, toggleTheme, setAccentColor } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-card border-b border-border/50' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 text-accent font-heading font-bold text-xl"
              whileHover={{ scale: 1.05 }}
            >
              <Terminal className="w-6 h-6" />
              <span className="hidden sm:inline"><em>SHI</em></span>
            </motion.a>

            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <a
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-mono transition-colors flex items-center gap-1 ${
                      activeSection === link.href.slice(1)
                        ? 'text-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="text-accent/70 mr-1">./</span>
                    {link.name.toLowerCase()}
                    {link.subLinks && <ChevronDown className="w-3 h-3 opacity-50" />}
                    {activeSection === link.href.slice(1) && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                  {link.subLinks && (
                    <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="glass-card py-1 rounded-lg min-w-[140px]">
                        {link.subLinks.map((subLink) => (
                          <a
                            key={subLink.name}
                            href={subLink.href}
                            className="block px-4 py-2 text-sm font-mono text-muted-foreground hover:text-accent hover:bg-secondary/50 transition-colors"
                          >
                            <span className="text-accent/50 mr-1">└</span>
                            {subLink.name.toLowerCase()}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-accent" />
                )}
              </motion.button>

              {/* Color Picker Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-4 h-4 rounded-full ${
                    accentColors.find(c => c.value === accentColor)?.class
                  }`} />
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    isColorDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </motion.button>

                <AnimatePresence>
                  {isColorDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 glass-card p-2 rounded-lg min-w-[140px]"
                    >
                      {accentColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => {
                            setAccentColor(color.value);
                            setIsColorDropdownOpen(false);
                          }}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-mono transition-colors ${
                            accentColor === color.value
                              ? 'bg-secondary text-foreground'
                              : 'hover:bg-secondary/50 text-muted-foreground'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${color.class}`} />
                          {color.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-accent" />
                ) : (
                  <Menu className="w-5 h-5 text-accent" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-64 glass-card border-l border-border"
            >
              <div className="flex flex-col pt-20 px-6">
                {navLinks.map((link, index) => (
                  <div key={link.name}>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleMobileNavClick(link.href)}
                      className={`text-left w-full py-4 text-lg font-mono border-b border-border/50 transition-colors ${
                        activeSection === link.href.slice(1)
                          ? 'text-accent'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <span className="text-accent/70 mr-2">./</span>
                      {link.name.toLowerCase()}
                    </motion.button>
                    {link.subLinks && (
                      <div className="pl-6 border-b border-border/50">
                        {link.subLinks.map((subLink, subIndex) => (
                          <motion.button
                            key={subLink.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + subIndex * 0.05 }}
                            onClick={() => handleMobileNavClick(subLink.href)}
                            className="text-left w-full py-3 text-base font-mono text-muted-foreground hover:text-accent transition-colors"
                          >
                            <span className="text-accent/50 mr-2">└</span>
                            {subLink.name.toLowerCase()}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
