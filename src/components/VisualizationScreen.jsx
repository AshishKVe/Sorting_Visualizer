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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 lg:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-orbitron text-center text-purple-400 mb-6">
          {algorithm.name} Visualization
        </h2>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Pseudocode */}
          <div className="lg:col-span-3">
            <PseudocodeDisplay />
          </div>

          {/* Middle Column - Visualization */}
          <div className="lg:col-span-6 space-y-4">
            <InfoBox />
            <VisualizationChart />
            <ControlPanel />
          </div>

          {/* Right Column - Algorithm Info */}
          <div className="lg:col-span-3">
            <AlgorithmInfo />
          </div>
        </div>
      </div>

      <CompletionConfetti />
    </div>
  );
};

export default VisualizationScreen;