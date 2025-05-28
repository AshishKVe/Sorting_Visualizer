import React from 'react';
import { useVisualizer } from '../context/VisualizerContext';

const InfoBox: React.FC = () => {
  const { animationSteps, currentStepIndex } = useVisualizer();
  
  if (animationSteps.length === 0) {
    return null;
  }
  
  const currentStep = animationSteps[currentStepIndex];
  
  let textColor = 'text-white';
  if (currentStep.type === 'comparison') {
    textColor = 'text-red-400';
  } else if (currentStep.type === 'swap') {
    textColor = 'text-green-400';
  } else if (currentStep.type === 'complete') {
    textColor = 'text-purple-400';
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-purple-600 mb-4">
      <p className={`text-center font-medium ${textColor} transition-colors duration-300`}>
        {currentStep.description}
      </p>
      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>Step: {currentStepIndex + 1} / {animationSteps.length}</span>
        <span>{currentStep.type ? currentStep.type.charAt(0).toUpperCase() + currentStep.type.slice(1) : ''}</span>
      </div>
    </div>
  );
};

export default InfoBox;