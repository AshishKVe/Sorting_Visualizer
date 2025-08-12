import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { algorithms, generateRandomArray } from '../utils/algorithms';

export const VisualizerContext = createContext(undefined);

export const VisualizerProvider = ({ children }) => {
  // Algorithm and array settings
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [array, setArray] = useState([]);

  // Animation and control state
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // UI state
  const [currentView, setCurrentView] = useState('menu');

  // Animation loop reference
  const animationRef = useRef(null);

  // Generate a new random array
  const resetArray = useCallback(() => {
    const newArray = generateRandomArray(10, 5, 100);
    setArray(newArray);

    // Reset animation state
    setAnimationSteps([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  // Initialize the array
  useEffect(() => {
    resetArray();
  }, [resetArray]);

  // Start visualization
  const startVisualization = useCallback(() => {
    // Generate steps based on selected algorithm
    const steps = algorithms[selectedAlgorithm].generateSteps(array);
    setAnimationSteps(steps);
    setCurrentStepIndex(0);
    setCurrentView('visualization');
  }, [array, selectedAlgorithm]);

  // Step forward in the animation
  const stepForward = useCallback(() => {
    if (currentStepIndex < animationSteps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    } else {
      setIsPlaying(false); // Stop if we've reached the end
    }
  }, [animationSteps.length, currentStepIndex]);

  // Step backward in the animation
  const stepBackward = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  }, [currentStepIndex]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prevState => !prevState);
  }, []);

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = window.setTimeout(() => {
        stepForward();
      }, 1000 / playbackSpeed);
    } else if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isPlaying, stepForward, playbackSpeed]);

  // Check if sorting is complete
  const isSortingComplete = animationSteps.length > 0 &&
    currentStepIndex === animationSteps.length - 1 &&
    animationSteps[currentStepIndex]?.type === 'complete';

  const value = {
    selectedAlgorithm,
    setSelectedAlgorithm,
    array,
    resetArray,

    animationSteps,
    currentStepIndex,
    isPlaying,
    playbackSpeed,

    startVisualization,
    stepForward,
    stepBackward,
    togglePlayPause,
    setPlaybackSpeed,

    currentView,
    setCurrentView,

    isSortingComplete
  };

  return (
    <VisualizerContext.Provider value={value}>
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = () => {
  const context = React.useContext(VisualizerContext);
  if (context === undefined) {
    throw new Error('useVisualizer must be used within a VisualizerProvider');
  }
  return context;
};