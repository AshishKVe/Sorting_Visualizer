import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Box, Cpu, Database, Check, X } from 'lucide-react';
import { algorithms } from '../utils/algorithms';
import { useVisualizer } from '../context/VisualizerContext';

const AlgorithmInfo = () => {
  const { selectedAlgorithm } = useVisualizer();
  const algorithm = algorithms[selectedAlgorithm];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-600/30"
    >
      <h3 className="text-xl font-orbitron text-purple-400 mb-4">Algorithm Details</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="text-purple-400" size={20} />
            <div>
              <h4 className="text-sm font-semibold text-gray-300">Time Complexity</h4>
              <p className="text-xs text-gray-400">
                Best: {algorithm.timeComplexity.best}<br />
                Average: {algorithm.timeComplexity.average}<br />
                Worst: {algorithm.timeComplexity.worst}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Database className="text-purple-400" size={20} />
            <div>
              <h4 className="text-sm font-semibold text-gray-300">Space Complexity</h4>
              <p className="text-xs text-gray-400">{algorithm.spaceComplexity}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Box className="text-purple-400" size={20} />
            <div>
              <h4 className="text-sm font-semibold text-gray-300">Stability</h4>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                {algorithm.stable ? (
                  <>
                    <Check size={16} className="text-green-400" />
                    Stable
                  </>
                ) : (
                  <>
                    <X size={16} className="text-red-400" />
                    Unstable
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="text-purple-400" size={20} />
            <h4 className="text-sm font-semibold text-gray-300">Real-world Applications</h4>
          </div>
          <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
            {algorithm.realWorldUse.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-900/50 rounded border border-purple-600/20">
        <p className="text-sm text-gray-300 font-fira-code">
          <span className="text-purple-400">Tip:</span> {algorithm.description}
        </p>
      </div>
    </motion.div>
  );
};

export default AlgorithmInfo;