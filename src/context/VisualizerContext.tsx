import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { AlgorithmType, AnimationStep } from '../types';
import { algorithms, generateRandomArray } from '../utils/algorithms';

interface VisualizerContextType {
  // Algorithm and array data
  selectedAlgorithm: AlgorithmType;
  setSelectedAlgorithm: (algorithm: AlgorithmType) => void;
  array: number[];
  resetArray: () => void;
  
  // Animation steps and control
  animationSteps: AnimationStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  
  // Control methods
  startVisualization: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  togglePlayPause: () => void;
  setPlaybackSpeed: (speed: number) => void;
  
  // UI state
  currentView: 'menu' | 'visualization' | 'learn';
  setCurrentView: (view: 'menu' | 'visualization' | 'learn') => void;
  
  // Completion state
  isSortingComplete: boolean;
}

export const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export const VisualizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Algorithm and array settings
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble');
  const [array, setArray] = useState<number[]>([]);
  
  // Animation and control state
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  
  // UI state
  const [currentView, setCurrentView] = useState<'menu' | 'visualization' | 'learn'>('menu');
  
  // Animation loop reference
  const animationRef = useRef<number | null>(null);
  
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