import { AnimationStep, ArrayBar } from '../../types';

export const mergeSortDescription = `
Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, 
recursively sorts them, and then merges the sorted halves. The key operation is the merging 
of two sorted subarrays into a single sorted array.

Time Complexity:
- Best Case: O(n log n)
- Average Case: O(n log n)
- Worst Case: O(n log n)

Space Complexity: O(n) - Merge sort requires additional space proportional to the input size

Characteristics:
- Stable sort (doesn't change the relative order of equal elements)
- Predictable performance regardless of input data
- Not an in-place algorithm (requires extra memory)
- Efficient for large datasets
`;

export const generateMergeSortSteps = (inputArray: number[]): AnimationStep[] => {
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
    description: "Starting Merge Sort algorithm",
    type: "comparison"
  });

  // This is a simplified version that doesn't show the recursive nature
  // but demonstrates the merging process for visualization purposes
  const n = array.length;
  
  // Simulating the divide phase
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Dividing the array into smaller subarrays",
    type: "comparison"
  });
  
  // For visualization purposes, we'll create artificial steps to show sorting
  // In a real implementation, we'd use the actual recursive mergeSort
  
  // Simulate sorting and merging
  for (let currSize = 1; currSize < n; currSize = 2 * currSize) {
    for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
      const mid = Math.min(leftStart + currSize - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);
      
      // Simulate merging of two sorted subarrays
      const left = leftStart;
      const right = mid + 1;
      
      // Mark the subarrays being merged
      for (let i = left; i <= mid; i++) {
        array[i].isComparing = true;
      }
      for (let i = right; i <= rightEnd; i++) {
        array[i].isComparing = true;
      }
      
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Merging subarrays [${left}...${mid}] and [${right}...${rightEnd}]`,
        type: "comparison"
      });
      
      // Reset comparison highlights
      array.forEach(bar => {
        bar.isComparing = false;
      });
      
      // Create a temporary array to perform the merge
      const temp: ArrayBar[] = [];
      let i = left;
      let j = right;
      
      while (i <= mid && j <= rightEnd) {
        // Compare elements
        array[i].isComparing = true;
        array[j].isComparing = true;
        
        steps.push({
          array: JSON.parse(JSON.stringify(array)),
          description: `Comparing ${array[i].value} and ${array[j].value}`,
          type: "comparison"
        });
        
        // Reset comparison highlights
        array[i].isComparing = false;
        array[j].isComparing = false;
        
        if (array[i].value <= array[j].value) {
          temp.push({ ...array[i] });
          i++;
        } else {
          temp.push({ ...array[j] });
          j++;
        }
      }
      
      // Copy remaining elements
      while (i <= mid) {
        temp.push({ ...array[i] });
        i++;
      }
      
      while (j <= rightEnd) {
        temp.push({ ...array[j] });
        j++;
      }
      
      // Copy back to original array
      for (let i = 0; i < temp.length; i++) {
        array[left + i] = temp[i];
        array[left + i].isSwapping = true;
      }
      
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Merged subarray from [${left}] to [${rightEnd}]`,
        type: "swap"
      });
      
      // Reset swap highlights
      array.forEach(bar => {
        bar.isSwapping = false;
      });
    }
  }
  
  // Final state - mark as complete
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Array is now sorted!",
    type: "complete"
  });
  
  return steps;
};