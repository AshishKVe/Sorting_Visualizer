import React from 'react';
import { useVisualizer } from '../context/VisualizerContext';
import { algorithms } from '../utils/algorithms';
import { Home } from 'lucide-react';

const LearnMoreScreen: React.FC = () => {
  const { selectedAlgorithm, setCurrentView } = useVisualizer();
  const algorithm = algorithms[selectedAlgorithm];
  
  // Convert markdown-like description to JSX
  const formatDescription = (text: string) => {
    // Split by line breaks
    return text.split('\n').map((line, index) => {
      // Convert **bold** text
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        parts.push(line.substring(lastIndex, match.index));
        parts.push(<strong key={`bold-${index}-${match.index}`}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      
      parts.push(line.substring(lastIndex));
      
      // Handle headings (lines that start with '# ')
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={`line-${index}`} className="text-xl font-bold mb-3 text-purple-400">
            {parts}
          </h3>
        );
      }
      
      // Empty lines become paragraph breaks
      if (line.trim() === '') {
        return <br key={`line-${index}`} />;
      }
      
      // Regular paragraph
      return (
        <p key={`line-${index}`} className="mb-2">
          {parts}
        </p>
      );
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 md:p-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
            onClick={() => setCurrentView('menu')}
          >
            <Home size={20} className="mr-2" />
            Back to Menu
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg border border-purple-600 p-6 animate-slideIn">
          <h2 className="text-2xl font-orbitron text-center text-purple-400 mb-6">
            {algorithm.name}
          </h2>
          
          <div className="prose prose-invert prose-purple max-w-none">
            {formatDescription(algorithm.description)}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              className="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow"
              onClick={() => setCurrentView('visualization')}
            >
              Visualize {algorithm.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreScreen;