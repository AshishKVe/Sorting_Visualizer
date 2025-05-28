import React, { useState, useEffect } from 'react';
import { useVisualizer } from '../context/VisualizerContext';
import { ChevronDown, BarChart2 } from 'lucide-react';
import { algorithms } from '../utils/algorithms';

const MainMenu: React.FC = () => {
  const { 
    selectedAlgorithm, 
    setSelectedAlgorithm, 
    startVisualization, 
    setCurrentView,
    resetArray
  } = useVisualizer();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([40, 25, 70, 50, 10]);
  
  // Animation for the menu graphic
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new random values for the animated bars
      const newValues = Array.from({ length: 5 }, () => 
        Math.floor(Math.random() * 70) + 10
      );
      setAnimatedValues(newValues);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle algorithm selection
  const handleAlgorithmSelect = (algorithm: string) => {
    setSelectedAlgorithm(algorithm as any);
    setIsDropdownOpen(false);
    resetArray(); // Reset array when changing algorithm
  };
  
  // Handle visualization start
  const handleStartVisualization = () => {
    startVisualization();
  };
  
  // Handle learn more button click
  const handleLearnMore = () => {
    setCurrentView('learn');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-4xl md:text-5xl font-orbitron text-center text-purple-400 mb-8 animate-fadeIn">
          SortSavvy Visualizer
        </h1>
        
        <div className="bg-gray-800 rounded-lg shadow-lg border border-purple-600 p-6 mb-8 animate-slideIn">
          {/* Algorithm Selection Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Select Algorithm</label>
            <div className="relative">
              <button
                className="w-full px-4 py-3 bg-gray-900 border border-purple-600 rounded-lg text-left flex justify-between items-center hover:border-purple-400 transition-colors duration-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{algorithms[selectedAlgorithm].name}</span>
                <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-purple-600 rounded-lg shadow-lg overflow-hidden">
                  {Object.entries(algorithms).map(([key, algo]) => (
                    <button
                      key={key}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors duration-200 ${
                        selectedAlgorithm === key ? 'bg-purple-900 text-white' : 'text-gray-200'
                      }`}
                      onClick={() => handleAlgorithmSelect(key)}
                    >
                      {algo.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Animated Bars Graphic */}
          <div className="h-32 mb-6 flex items-end justify-center space-x-2">
            {animatedValues.map((value, index) => (
              <div
                key={index}
                className="w-10 bg-purple-600 rounded-t-md transition-all duration-1000 ease-in-out animate-pulse"
                style={{ height: `${value}%` }}
              ></div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              className="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow flex items-center justify-center"
              onClick={handleStartVisualization}
            >
              <BarChart2 className="mr-2" />
              Start Visualization
            </button>
            
            <button
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow"
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-400">
          Select an algorithm and visualize how it sorts an array of values.
        </p>
      </div>
    </div>
  );
};

export default MainMenu;