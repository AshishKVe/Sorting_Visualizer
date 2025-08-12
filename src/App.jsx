import React from 'react';
import { VisualizerProvider, useVisualizer } from './context/VisualizerContext';
import MainMenu from './components/MainMenu';
import VisualizationScreen from './components/VisualizationScreen';
import LearnMoreScreen from './components/LearnMoreScreen';
import '@fontsource/orbitron';
import '@fontsource/inter';

// Main app container
const AppContent = () => {
  const { currentView } = useVisualizer();

  return (
    <div className="font-inter bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {currentView === 'menu' && <MainMenu />}
      {currentView === 'visualization' && <VisualizationScreen />}
      {currentView === 'learn' && <LearnMoreScreen />}
    </div>
  );
};

// Root component with provider
const App = () => {
  return (
    <VisualizerProvider>
      <AppContent />
    </VisualizerProvider>
  );
};

export default App;