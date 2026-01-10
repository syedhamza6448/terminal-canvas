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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-card border-b border-border/50' : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav className="container mx-auto px-6 py-4" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 text-accent font-heading font-bold text-xl"
              whileHover={{ scale: 1.05 }}
              aria-label="Syed Hamza Imran - Go to home"
            >
              <Terminal className="w-6 h-6" aria-hidden="true" />
              <span className="hidden sm:inline"><em>SHI</em></span>
            </motion.a>

            {/* Center Navigation - Desktop */}
            <ul className="hidden md:flex items-center gap-1" role="menubar">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group" role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                    aria-haspopup={link.subLinks ? 'true' : undefined}
                    className={`relative px-4 py-2 text-sm font-mono transition-colors flex items-center gap-1 ${
                      activeSection === link.href.slice(1)
                        ? 'text-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="text-accent/70 mr-1" aria-hidden="true">./</span>
                    {link.name.toLowerCase()}
                    {link.subLinks && <ChevronDown className="w-3 h-3 opacity-50" aria-hidden="true" />}
                    {activeSection === link.href.slice(1) && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                  {link.subLinks && (
                    <ul 
                      className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                      role="menu"
                      aria-label={`${link.name} submenu`}
                    >
                      <li className="glass-card py-1 rounded-lg min-w-[140px]" role="none">
                        {link.subLinks.map((subLink) => (
                          <a
                            key={subLink.name}
                            href={subLink.href}
                            role="menuitem"
                            className="block px-4 py-2 text-sm font-mono text-muted-foreground hover:text-accent hover:bg-secondary/50 transition-colors"
                          >
                            <span className="text-accent/50 mr-1" aria-hidden="true">└</span>
                            {subLink.name.toLowerCase()}
                          </a>
                        ))}
                      </li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-accent" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5 text-accent" aria-hidden="true" />
                )}
              </motion.button>

              {/* Color Picker Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  aria-expanded={isColorDropdownOpen}
                  aria-haspopup="listbox"
                  aria-label="Choose accent color"
                >
                  <div 
                    className={`w-4 h-4 rounded-full ${
                      accentColors.find(c => c.value === accentColor)?.class
                    }`} 
                    aria-hidden="true"
                  />
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${isColorDropdownOpen ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                  />
                </motion.button>

                <AnimatePresence>
                  {isColorDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 glass-card p-2 rounded-lg min-w-[140px]"
                      role="listbox"
                      aria-label="Accent color options"
                    >
                      {accentColors.map((color) => (
                        <li key={color.value} role="option" aria-selected={accentColor === color.value}>
                          <button
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
                            <div className={`w-3 h-3 rounded-full ${color.class}`} aria-hidden="true" />
                            {color.name}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-accent" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5 text-accent" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-64 glass-card border-l border-border"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col pt-20 px-6">
                {navLinks.map((link, index) => (
                  <li key={link.name}>
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
                      aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                    >
                      <span className="text-accent/70 mr-2" aria-hidden="true">./</span>
                      {link.name.toLowerCase()}
                    </motion.button>
                    {link.subLinks && (
                      <ul className="pl-6 border-b border-border/50">
                        {link.subLinks.map((subLink, subIndex) => (
                          <li key={subLink.name}>
                            <motion.button
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + subIndex * 0.05 }}
                              onClick={() => handleMobileNavClick(subLink.href)}
                              className="text-left w-full py-3 text-base font-mono text-muted-foreground hover:text-accent transition-colors"
                            >
                              <span className="text-accent/50 mr-2" aria-hidden="true">└</span>
                              {subLink.name.toLowerCase()}
                            </motion.button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
