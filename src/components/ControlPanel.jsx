import React from 'react';
import { useVisualizer } from '../context/VisualizerContext';
import { Play, Pause, SkipBack, SkipForward, Home } from 'lucide-react';

const ControlPanel = () => {
  const { 
    isPlaying, 
    togglePlayPause, 
    stepForward, 
    stepBackward,
    playbackSpeed,
    setPlaybackSpeed,
    setCurrentView, // <-- This is the function
    currentStepIndex,
    animationSteps
  } = useVisualizer();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === animationSteps.length - 1;

  const buttonClasses = "flex items-center justify-center h-12 w-12 rounded-full bg-purple-800 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-110 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50";
  const disabledButtonClasses = "flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 text-gray-500 cursor-not-allowed";

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setPlaybackSpeed(newSpeed);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-purple-600">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center"
          onClick={() => setCurrentView('menu')} // <-- This call changes the view
        >
          <Home size={20} className="mr-1" />
          <span>Back to Menu</span>
        </button>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button 
          className={isFirstStep ? disabledButtonClasses : buttonClasses}
          onClick={stepBackward}
          disabled={isFirstStep}
          aria-label="Step backward"
        >
          <SkipBack size={24} />
        </button>

        <button 
          className={buttonClasses}
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button 
          className={isLastStep ? disabledButtonClasses : buttonClasses}
          onClick={stepForward}
          disabled={isLastStep}
          aria-label="Step forward"
        >
          <SkipForward size={24} />
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor="speed-slider" className="block text-center text-gray-300 mb-2">
          Animation Speed: {playbackSpeed}x
        </label>
        <input
          id="speed-slider"
          type="range"
          min="0.25"
          max="1.75"
          step="0.25"
          value={playbackSpeed}
          onChange={handleSpeedChange}
          className="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0.25x</span>
          <span>1x</span>
          <span>1.75x</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;