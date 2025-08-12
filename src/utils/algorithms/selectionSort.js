export const selectionSortDescription = `
Selection Sort works by repeatedly finding the minimum element from the unsorted part of the array 
and putting it at the beginning. This algorithm divides the input array into two parts: 
the sorted subarray and the unsorted subarray.

Time Complexity:
- Best Case: O(n²)
- Average Case: O(n²)
- Worst Case: O(n²)

Space Complexity: O(1) - Selection sort is an in-place algorithm

Characteristics:
- Simple implementation
- Performs better than Bubble Sort in some cases
- Unstable sort (may change the relative order of equal elements)
- Makes the minimum number of swaps (n-1) among all sorting algorithms
`;

export const generateSelectionSortSteps = (inputArray) => {
  const steps = [];
  const array = inputArray.map(value => ({ value, isComparing: false, isSwapping: false }));

  // Initial state
  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Starting Selection Sort algorithm",
    type: "comparison"
  });

  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find the minimum element in the unsorted part
    for (let j = i + 1; j < n; j++) {
      // Reset previous comparison
      array.forEach(bar => {
        bar.isComparing = false;
      });

      // Mark current minimum
      array[minIndex].isComparing = true;
      // Mark element being compared with current minimum
      array[j].isComparing = true;

      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Comparing current minimum ${array[minIndex].value} with ${array[j].value}`,
        type: "comparison"
      });

      if (array[j].value < array[minIndex].value) {
        array[minIndex].isComparing = false;
        minIndex = j;
        array[minIndex].isComparing = true;

        steps.push({
          array: JSON.parse(JSON.stringify(array)),
          description: `Found new minimum: ${array[minIndex].value}`,
          type: "comparison"
        });
      }
    }

    // Reset comparison highlights
    array.forEach(bar => {
      bar.isComparing = false;
    });

    // If the minimum element is not at position i, swap
    if (minIndex !== i) {
      // Mark elements being swapped
      array[i].isSwapping = true;
      array[minIndex].isSwapping = true;

      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Swapping ${array[i].value} and ${array[minIndex].value}`,
        type: "swap"
      });

      // Perform the swap
      const temp = array[i].value;
      array[i].value = array[minIndex].value;
      array[minIndex].value = temp;

      // Add post-swap step
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Swapped ${array[minIndex].value} and ${array[i].value}`,
        type: "swap"
      });

      // Reset swap highlights
      array[i].isSwapping = false;
      array[minIndex].isSwapping = false;
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