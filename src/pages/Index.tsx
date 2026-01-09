import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CRTLoader from '@/components/CRTLoader';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Enable smooth scrolling for anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <CRTLoader onComplete={handleLoadingComplete} />}
      <div className={`relative min-h-screen bg-background scroll-smooth ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
        <CustomCursor />
        <Navbar />
        <main>
          <HomeSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
