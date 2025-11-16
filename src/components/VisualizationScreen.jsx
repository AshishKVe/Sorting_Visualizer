import React from 'react';
import { useVisualizer } from '../context/VisualizerContext';
import VisualizationChart from './VisualizationChart';
import InfoBox from './InfoBox';
import ControlPanel from './ControlPanel';
import CompletionConfetti from './CompletionConfetti';
import AlgorithmInfo from './AlgorithmInfo';
import PseudocodeDisplay from './PseudocodeDisplay';
import { algorithms } from '../utils/algorithms';

const VisualizationScreen = () => {
  const { selectedAlgorithm } = useVisualizer();
  const algorithm = algorithms[selectedAlgorithm];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 animate-fadeIn overflow-x-hidden">
      
      
      <div className="max-w-[1450px] mx-auto w-full">
        
        <h2 className="text-2xl font-orbitron text-center text-purple-400 mb-8">
          {algorithm.name} Visualization
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
        
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <PseudocodeDisplay />
          </div>

          
          <div className="w-full lg:flex-1 space-y-4 min-w-0">
            <InfoBox />
            <VisualizationChart />
            <ControlPanel />
          </div>

        
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <AlgorithmInfo />
          </div>

        </div>
      </div>

      <CompletionConfetti />
    </div>
  );
};

export default VisualizationScreen;