import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Instagram, Mail, ArrowUpRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

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

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    // Reset status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      setSubmitStatus('success');
      toast({
        title: "Message sent! ✨",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-screen py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 id="contact-heading" className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent" aria-hidden="true">04.</span> Get In Touch
          </h2>
          <div className="w-24 h-1 bg-accent" aria-hidden="true" />
        </motion.header>

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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 rounded-lg font-mono flex items-center justify-center gap-2 transition-all duration-500 ${
                  submitStatus === 'success'
                    ? 'bg-green-500 text-white'
                    : submitStatus === 'error'
                    ? 'bg-red-500 text-white'
                    : isPowered 
                      ? 'bg-accent text-accent-foreground accent-glow' 
                      : 'bg-muted text-muted-foreground'
                }`}
                disabled={!isPowered || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Try Again</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{isPowered ? 'Send Message' : 'Complete form to send'}</span>
                  </>
                )}
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
      </div>
    </section>
  );
};

export default ContactSection;
