import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useVisualizer } from '../context/VisualizerContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const VisualizationChart: React.FC = () => {
  const { animationSteps, currentStepIndex } = useVisualizer();
  const chartRef = useRef<ChartJS<'bar'>>(null);
  
  const currentStep = animationSteps[currentStepIndex] || { 
    array: [], 
    description: '', 
    type: 'comparison' 
  };
  
  const labels = currentStep.array.map((_, index) => `${index}`);
  const values = currentStep.array.map(bar => bar.value);
  
  const backgroundColor = currentStep.array.map(bar => {
    if (bar.isSwapping) return '#10B981';
    if (bar.isComparing) return '#EF4444';
    return '#7C3AED';
  });
  
  const borderColor = currentStep.array.map(bar => {
    if (bar.isSwapping) return '#059669';
    if (bar.isComparing) return '#DC2626';
    return '#6D28D9';
  });
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Value',
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 300,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => `Value: ${context.raw}`,
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: 'white',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value: number) => value.toString(),
        offset: 4,
        padding: 4
      }
    },
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-purple-600 mb-4 h-[400px]">
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default VisualizationChart;