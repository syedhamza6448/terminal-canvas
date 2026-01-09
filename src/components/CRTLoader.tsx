import React, { useState, useEffect } from 'react';

type LoaderPhase = 'loading' | 'line' | 'expand' | 'done';

const CRTLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<LoaderPhase>('loading');
  const [progress, setProgress] = useState(0);

  // Progress bar animation
  useEffect(() => {
    if (phase !== 'loading') return;

    const duration = 2500; // 2.5 seconds total
    const interval = 30;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 0.5; // Slight randomness
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [phase]);

  // Transition from loading to line phase
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      const timer = setTimeout(() => setPhase('line'), 200);
      return () => clearTimeout(timer);
    }
  }, [progress, phase]);

  // Transition from line to expand phase
  useEffect(() => {
    if (phase === 'line') {
      const timer = setTimeout(() => setPhase('expand'), 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Transition from expand to done
  useEffect(() => {
    if (phase === 'expand') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="crt-loader-container">
      {/* Scanlines overlay */}
      <div className="crt-scanlines" />
      
      {/* Noise overlay */}
      <div className="crt-noise" />

      {/* Phase 1: Loading */}
      {phase === 'loading' && (
        <div className="crt-loading-content">
          {/* Terminal text */}
          <div className="crt-terminal-text">
            <span className="crt-prompt">&gt; INITIALIZING SYSTEM</span>
            <span className="crt-blink">_</span>
          </div>
          
          {/* Progress bar container */}
          <div className="crt-progress-container">
            <div 
              className="crt-progress-bar"
              style={{ width: `${progress}%` }}
            />
            <div className="crt-progress-glow" style={{ width: `${progress}%` }} />
          </div>
          
          {/* Percentage */}
          <div className="crt-percentage">
            {Math.floor(progress).toString().padStart(3, '0')}%
          </div>
        </div>
      )}

      {/* Phase 2 & 3: Line and Expand */}
      {(phase === 'line' || phase === 'expand') && (
        <div 
          className={`crt-line ${phase === 'expand' ? 'crt-line-expand' : ''}`}
        />
      )}

      {/* Final flicker effect */}
      {phase === 'expand' && <div className="crt-flicker" />}
    </div>
  );
};

export default CRTLoader;
