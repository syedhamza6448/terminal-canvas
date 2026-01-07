import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const InteractiveAlien: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  const eyeX = useTransform(x, [-100, 100], [-3, 3]);
  const eyeY = useTransform(y, [-100, 100], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main Alien Body */}
        <div className="relative text-[120px] md:text-[150px] leading-none select-none">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 blur-xl opacity-50"
            animate={{
              opacity: isHovering ? [0.5, 0.8, 0.5] : 0.3,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            <span className="text-accent">👾</span>
          </motion.div>
          
          {/* Main emoji with custom eyes overlay */}
          <div className="relative">
            <span className="text-accent drop-shadow-[0_0_20px_hsl(var(--accent))]">👾</span>
            
            {/* Interactive eyes overlay */}
            <motion.div
              className="absolute top-[35%] left-[28%] w-[12%] h-[8%] bg-background rounded-sm"
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.div
              className="absolute top-[35%] right-[28%] w-[12%] h-[8%] bg-background rounded-sm"
              style={{ x: eyeX, y: eyeY }}
            />
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/60"
            style={{
              left: `${20 + i * 12}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-accent"
            style={{ top: `${i * 5}%` }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scaleX: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Terminal prompt */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 text-center font-mono text-xs text-muted-foreground"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {'>'} hover to interact_
      </motion.div>
    </div>
  );
};

export default InteractiveAlien;
