import React from 'react';
import { VisualizerProvider, useVisualizer } from './context/VisualizerContext';
import MainMenu from './components/MainMenu';
import VisualizationScreen from './components/VisualizationScreen';
import LearnMoreScreen from './components/LearnMoreScreen';
import '@fontsource/orbitron';
import '@fontsource/inter';

// Main app container
const AppContent: React.FC = () => {
  const { currentView } = useVisualizer();
  
  return (
    <div className="font-inter bg-gray-900 min-h-screen text-white">
      {currentView === 'menu' && <MainMenu />}
      {currentView === 'visualization' && <VisualizationScreen />}
      {currentView === 'learn' && <LearnMoreScreen />}
    </div>
  );
};

// Root component with provider
const App: React.FC = () => {
  return (
    <VisualizerProvider>
      <AppContent />
    </VisualizerProvider>
  );
};

export default App;