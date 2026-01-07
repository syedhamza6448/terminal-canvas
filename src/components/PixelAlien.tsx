import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PixelAlien: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  // Pixel art pattern for space invader alien (16x12 grid)
  const alienPattern = [
    [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,0,1,1,1,1,0,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0],
    [0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0],
    [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
  ];

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

  const pixelSize = 12;

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
        {/* Glow effect behind alien */}
        <motion.div
          className="absolute inset-0 blur-2xl"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)',
            transform: 'scale(1.5)',
          }}
          animate={{
            opacity: isHovering ? [0.4, 0.7, 0.4] : 0.3,
            scale: isHovering ? [1.5, 1.8, 1.5] : 1.5,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />

        {/* Pixel Grid Alien */}
        <div 
          className="relative grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(16, ${pixelSize}px)`,
          }}
        >
          {alienPattern.map((row, rowIndex) =>
            row.map((pixel, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={`${pixel ? 'bg-accent' : 'bg-transparent'}`}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  boxShadow: pixel ? '0 0 8px hsl(var(--accent) / 0.6)' : 'none',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: pixel ? 1 : 0, 
                  scale: pixel ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: (rowIndex * 16 + colIndex) * 0.01,
                }}
                whileHover={pixel ? {
                  scale: 1.2,
                  boxShadow: '0 0 16px hsl(var(--accent) / 0.9)',
                } : {}}
              />
            ))
          )}
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-accent"
            style={{
              left: `${10 + i * 12}%`,
              top: `${-20 + Math.random() * 140}%`,
              boxShadow: '0 0 6px hsl(var(--accent) / 0.8)',
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-5, 5, -5],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>

      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-accent"
            style={{ top: `${i * 7}%` }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.04,
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

export default PixelAlien;
