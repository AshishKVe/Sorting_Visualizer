import { SortingAlgorithm } from '../../types';
import { bubbleSortDescription, generateBubbleSortSteps } from './bubbleSort';
import { selectionSortDescription, generateSelectionSortSteps } from './selectionSort';
import { mergeSortDescription, generateMergeSortSteps } from './mergeSort';
import { quickSortDescription, generateQuickSortSteps, quickSortRealWorldUse } from './quickSort';
import { insertionSortDescription, generateInsertionSortSteps, insertionSortRealWorldUse } from './insertionSort';
import { heapSortDescription, generateHeapSortSteps, heapSortRealWorldUse } from './heapSort';

export const algorithms: Record<string, SortingAlgorithm> = {
  bubble: {
    name: 'Bubble Sort',
    description: bubbleSortDescription,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    realWorldUse: [
      'Educational purposes for learning sorting concepts',
      'Small datasets where simplicity is preferred',
      'Nearly sorted arrays where only few elements are out of place',
      'When memory space is a constraint'
    ],
    generateSteps: generateBubbleSortSteps
  },
  selection: {
    name: 'Selection Sort',
    description: selectionSortDescription,
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    realWorldUse: [
      'Small arrays where memory is limited',
      'When the number of writes needs to be minimized',
      'When all elements are distinct',
      'Embedded systems with limited memory'
    ],
    generateSteps: generateSelectionSortSteps
  },
  merge: {
    name: 'Merge Sort',
    description: mergeSortDescription,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    realWorldUse: [
      'External sorting of large files',
      'Sorting linked lists',
      'When stable sorting is required',
      'Parallel processing applications'
    ],
    generateSteps: generateMergeSortSteps
  },
  quick: {
    name: 'Quick Sort',
    description: quickSortDescription,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    realWorldUse: quickSortRealWorldUse,
    generateSteps: generateQuickSortSteps
  },
  insertion: {
    name: 'Insertion Sort',
    description: insertionSortDescription,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    realWorldUse: insertionSortRealWorldUse,
    generateSteps: generateInsertionSortSteps
  },
  heap: {
    name: 'Heap Sort',
    description: heapSortDescription,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    realWorldUse: heapSortRealWorldUse,
    generateSteps: generateHeapSortSteps
  }
};

// Helper function to generate random array for visualization
export const generateRandomArray = (size: number, min: number, max: number): number[] => {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};