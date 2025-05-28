import { AnimationStep, ArrayBar } from '../../types';

export const bubbleSortDescription = `
Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, 
comparing adjacent elements, and swapping them if they are in the wrong order. This process continues 
until no more swaps are needed, which indicates the list is sorted.

Time Complexity:
- Best Case: O(n) when the array is already sorted
- Average Case: O(n²)
- Worst Case: O(n²) when the array is reverse sorted

Space Complexity: O(1) - Bubble sort is an in-place algorithm

Characteristics:
- Simple implementation
- Poor performance on large datasets
- Stable sort (doesn't change the relative order of equal elements)
`;

export const generateBubbleSortSteps = (inputArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = inputArray.map(value => ({ value, isComparing: false, isSwapping: false }));
  
  // Initial state
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Starting Bubble Sort algorithm",
    type: "comparison"
  });

  const n = array.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Reset previous step
      array.forEach(bar => {
        bar.isComparing = false;
        bar.isSwapping = false;
      });
      
      // Mark elements being compared
      array[j].isComparing = true;
      array[j + 1].isComparing = true;
      
      // Add comparison step
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Comparing ${array[j].value} and ${array[j + 1].value}`,
        type: "comparison"
      });
      
      if (array[j].value > array[j + 1].value) {
        // Mark elements being swapped
        array[j].isSwapping = true;
        array[j + 1].isSwapping = true;
        
        // Add pre-swap step
        steps.push({
          array: JSON.parse(JSON.stringify(array)),
          description: `Swapping ${array[j].value} and ${array[j + 1].value}`,
          type: "swap"
        });
        
        // Perform the swap
        const temp = array[j].value;
        array[j].value = array[j + 1].value;
        array[j + 1].value = temp;
        
        // Add post-swap step
        steps.push({
          array: JSON.parse(JSON.stringify(array)),
          description: `Swapped ${array[j + 1].value} and ${array[j].value}`,
          type: "swap"
        });
        
        swapped = true;
      }
      
      // Reset current comparison
      array[j].isComparing = false;
      array[j + 1].isComparing = false;
      array[j].isSwapping = false;
      array[j + 1].isSwapping = false;
    }
    
    if (!swapped) {
      break;
    }
  }
  
  // Final state - mark as complete
  array.forEach(bar => {
    bar.isComparing = false;
    bar.isSwapping = false;
  });
  
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Array is now sorted!",
    type: "complete"
  });
  
  return steps;
};