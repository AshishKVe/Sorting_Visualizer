import React, { useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { useVisualizer } from '../context/VisualizerContext';

const CompletionConfetti: React.FC = () => {
  const { isSortingComplete } = useVisualizer();
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Only show confetti when sorting is complete
    if (isSortingComplete) {
      setShowConfetti(true);
      
      // Hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSortingComplete]);
  
  if (!showConfetti) return null;
  
  const particleOptions = {
    particles: {
      number: {
        value: 100,
      },
      color: {
        value: ["#7C3AED", "#A78BFA", "#4F46E5", "#EC4899", "#F59E0B"]
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      size: {
        value: 8,
        random: true,
      },
      move: {
        enable: true,
        speed: 5,
        direction: "bottom",
        random: true,
        straight: false,
        outModes: "out",
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: true,
          mode: "repulse",
        },
        onHover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          distance: 200,
          size: 15,
          duration: 2,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Particles options={particleOptions} />
    </div>
  );
};

export default CompletionConfetti;