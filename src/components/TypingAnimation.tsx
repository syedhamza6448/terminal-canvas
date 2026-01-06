import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  roles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  roles,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setTimeout(() => {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          }, typingSpeed);
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, deletingSpeed);
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1 w-0.5 h-6 md:h-8 bg-accent inline-block"
      />
    </span>
  );
};

export default TypingAnimation;
