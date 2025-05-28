import { AnimationStep, ArrayBar } from '../../types';

export const heapSortDescription = `
Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. 
It builds a max-heap from the array and repeatedly extracts the maximum element to create 
a sorted array.

Time Complexity:
- Best Case: O(n log n)
- Average Case: O(n log n)
- Worst Case: O(n log n)

Space Complexity: O(1) - Heap sort is an in-place algorithm

Characteristics:
- Efficient for large datasets
- In-place sorting algorithm
- Not stable (doesn't preserve the relative order of equal elements)
- Uses heap data structure
`;

export const heapSortRealWorldUse = [
  "Priority Queues in Operating Systems",
  "Task Scheduling in Real-time Systems",
  "Memory Management in Systems",
  "K-way Merge Operations",
  "Finding K Largest/Smallest Elements"
];

// Helper function to get left child index
const getLeftChild = (i: number) => 2 * i + 1;

// Helper function to get right child index
const getRightChild = (i: number) => 2 * i + 2;

// Helper function to heapify a subtree rooted at index i
const heapify = (
  array: ArrayBar[],
  n: number,
  i: number,
  steps: AnimationStep[]
): void => {
  let largest = i;
  const left = getLeftChild(i);
  const right = getRightChild(i);

  // Compare with left child
  if (left < n) {
    array[largest].isComparing = true;
    array[left].isComparing = true;
    
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      description: `Comparing ${array[largest].value} with left child ${array[left].value}`,
      type: "comparison"
    });
    
    if (array[left].value > array[largest].value) {
      largest = left;
    }
    
    array[largest].isComparing = false;
    array[left].isComparing = false;
  }

  // Compare with right child
  if (right < n) {
    array[largest].isComparing = true;
    array[right].isComparing = true;
    
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      description: `Comparing ${array[largest].value} with right child ${array[right].value}`,
      type: "comparison"
    });
    
    if (array[right].value > array[largest].value) {
      largest = right;
    }
    
    array[largest].isComparing = false;
    array[right].isComparing = false;
  }

  // If largest is not root
  if (largest !== i) {
    array[i].isSwapping = true;
    array[largest].isSwapping = true;
    
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      description: `Swapping ${array[i].value} with ${array[largest].value}`,
      type: "swap"
    });
    
    // Swap
    const temp = array[i].value;
    array[i].value = array[largest].value;
    array[largest].value = temp;
    
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      description: `Swapped ${array[largest].value} with ${array[i].value}`,
      type: "swap"
    });
    
    array[i].isSwapping = false;
    array[largest].isSwapping = false;
    
    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, steps);
  }
};

export const generateHeapSortSteps = (inputArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = inputArray.map(value => ({ 
    value, 
    isComparing: false, 
    isSwapping: false,
    isSorted: false
  }));
  
  // Initial state
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Starting Heap Sort algorithm",
    type: "comparison"
  });

  const n = array.length;

  // Build max heap
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Building max heap",
    type: "comparison"
  });
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, steps);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    array[0].isSwapping = true;
    array[i].isSwapping = true;
    
    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      description: `Moving root element ${array[0].value} to position ${i}`,
      type: "swap"
    });
    
    const temp = array[0].value;
    array[0].value = array[i].value;
    array[i].value = temp;
    
    array[0].isSwapping = false;
    array[i].isSwapping = false;

    // Heapify reduced heap
    heapify(array, i, 0, steps);
  }

  // Final state - mark as complete
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Array is now sorted!",
    type: "complete"
  });
  
  return steps;
};