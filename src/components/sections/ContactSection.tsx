import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';

interface SocialLink {
  name: string;
  username: string;
  icon: React.FC<{ className?: string }>;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    username: '@syedhamza6448',
    icon: Github,
    href: 'https://github.com/syedhamza6448',
  },
  {
    name: 'LinkedIn',
    username: '/in/syedhamza6448',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/syedhamza6448/',
  },
  {
    name: 'Instagram',
    username: '@s.yedhamza',
    icon: Instagram,
    href: 'https://www.instagram.com/s.yedhamza/',
  },
  {
    name: 'Email',
    username: 'hsyed6448@gmail.com',
    icon: Mail,
    href: 'mailto:hsyed6448@gmail.com',
  },
];

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const isPowered = useMemo(() => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.message.trim() !== '';
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section
      id="contact"
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
            <span className="text-accent">05.</span> Get In Touch
          </h2>
          <div className="w-24 h-1 bg-accent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-8 text-lg">
              Have a project in mind or just want to say hello? 
              I'd love to hear from you. Fill out the form and I'll get back to you as soon as possible.
            </p>

            <form 
              onSubmit={handleSubmit}
              className={`space-y-6 transition-all duration-500 ${
                isPowered ? 'form-powered' : 'form-unpowered'
              }`}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                  <span className="text-accent">$</span> name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input w-full terminal-input bg-transparent text-foreground"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-2">
                  <span className="text-accent">$</span> email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input w-full terminal-input bg-transparent text-foreground"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                  <span className="text-accent">$</span> message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input w-full terminal-input bg-transparent text-foreground resize-none"
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-mono flex items-center justify-center gap-2 transition-all duration-500 ${
                  isPowered 
                    ? 'bg-accent text-accent-foreground accent-glow' 
                    : 'bg-muted text-muted-foreground'
                }`}
                disabled={!isPowered}
              >
                <Send className="w-4 h-4" />
                <span>{isPowered ? 'Send Message' : 'Complete form to send'}</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-heading text-2xl font-bold mb-6 text-foreground">
              Or find me here
            </h3>

            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
                className="glass-card p-4 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <social.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-mono text-foreground block">{social.name}</span>
                    <span className="text-sm text-muted-foreground">{social.username}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground font-mono text-sm">
            <span className="text-accent">{'<'}</span>
            Designed & Built by Syed Hamza Imran
            <span className="text-accent">{' />'}</span>
          </p>
          <p className="text-muted-foreground/60 font-mono text-xs mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
