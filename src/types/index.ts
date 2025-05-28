export type AlgorithmType = 'bubble' | 'selection' | 'merge' | 'quick' | 'insertion' | 'heap';

export interface ArrayBar {
  value: number;
  isComparing: boolean;
  isSwapping: boolean;
  isSorted: boolean;
  isPivot?: boolean;
}

export interface AnimationStep {
  array: ArrayBar[];
  description: string;
  type: 'comparison' | 'swap' | 'complete' | 'partition' | 'heap';
  comparingIndices?: number[];
  swappingIndices?: number[];
  pivotIndex?: number;
}

export interface SortingAlgorithm {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  realWorldUse: string[];
  generateSteps: (array: number[]) => AnimationStep[];
}

export interface AlgorithmExample {
  title: string;
  description: string;
  initialArray: number[];
  steps: {
    array: number[];
    explanation: string;
  }[];
}