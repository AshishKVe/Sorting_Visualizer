export const insertionSortDescription = `
Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. 
It works by iterating through the array and for each element, it "inserts" that element into its 
correct position in the already sorted portion of the array.

Time Complexity:
- Best Case: O(n)
- Average Case: O(n²)
- Worst Case: O(n²)

Space Complexity: O(1) - Insertion sort is an in-place algorithm

Characteristics:
- Simple implementation
- Efficient for small data sets
- Adaptive: efficient for data sets that are already substantially sorted
- Stable: does not change the relative order of elements with equal keys
`;

export const insertionSortRealWorldUse = [
  'Small datasets where simplicity is preferred',
  'Nearly sorted arrays (adaptive sorting)',
  'Online sorting where elements come one at a time',
  'When additional space is at a premium'
];

export const generateInsertionSortSteps = (inputArray) => {
  const steps = [];
  const array = inputArray.map(value => ({
    value,
    isComparing: false,
    isSwapping: false
  }));

  // Initial state
  steps.push({
    array: array.map(item => ({ ...item })),
    description: "Starting Insertion Sort algorithm",
    type: "comparison"
  });

  // Perform insertion sort
  for (let i = 1; i < array.length; i++) {
    let j = i;

    // Mark current element being inserted
    array[i].isComparing = true;
    steps.push({
      array: array.map(item => ({ ...item })),
      description: `Inserting element ${array[i].value}`,
      type: "comparison"
    });

    while (j > 0 && array[j - 1].value > array[j].value) {
      // Mark elements being compared
      array[j].isComparing = true;
      array[j - 1].isComparing = true;

      steps.push({
        array: array.map(item => ({ ...item })),
        description: `Comparing ${array[j].value} with ${array[j - 1].value}`,
        type: "comparison"
      });

      // Mark elements being swapped
      array[j].isSwapping = true;
      array[j - 1].isSwapping = true;

      steps.push({
        array: array.map(item => ({ ...item })),
        description: `Swapping ${array[j].value} and ${array[j - 1].value}`,
        type: "swap"
      });

      // Perform swap
      const temp = array[j].value;
      array[j].value = array[j - 1].value;
      array[j - 1].value = temp;

      // Reset swap highlights
      array[j].isSwapping = false;
      array[j - 1].isSwapping = false;
      array[j].isComparing = false;
      array[j - 1].isComparing = false;

      j--;
    }

    // Reset comparison highlight for current element
    array[i].isComparing = false;
  }

  // Final state - mark as complete
  steps.push({
    array: array.map(item => ({ ...item })),
    description: "Array is now sorted!",
    type: "complete"
  });

  return steps;
};