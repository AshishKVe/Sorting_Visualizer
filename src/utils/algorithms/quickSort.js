export const quickSortDescription = `
Quick Sort is a highly efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot' 
element and partitioning the array around it, such that smaller elements are moved to the left and 
larger elements to the right.

Time Complexity:
- Best Case: O(n log n)
- Average Case: O(n log n)
- Worst Case: O(n²) when the array is already sorted or reverse sorted

Space Complexity: O(log n) due to recursive calls

Characteristics:
- One of the fastest sorting algorithms in practice
- Unstable sort (may change the relative order of equal elements)
- In-place sorting (doesn't require extra space)
- Widely used in programming languages' standard libraries
`;

export const quickSortRealWorldUse = [
  "Used in programming language standard libraries (e.g., C++'s std::sort)",
  "Database systems for sorting records",
  "File systems for organizing files by size/date",
  "Numerical computations requiring sorted data"
];

export const generateQuickSortSteps = (inputArray) => {
  const steps = [];
  const array = inputArray.map(value => ({
    value,
    isComparing: false,
    isSwapping: false,
    isSorted: false,
    isPivot: false
  }));

  steps.push({
    array: JSON.parse(JSON.stringify(array)),
    description: "Starting Quick Sort algorithm",
    type: "comparison"
  });

  const partition = (low, high) => {
    const pivot = array[high].value;
    array[high].isPivot = true;

    steps.push({
      array: JSON.parse(JSON.stringify(array)),
      description: `Selected pivot: ${pivot}`,
      type: "partition",
      pivotIndex: high
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      array[j].isComparing = true;

      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Comparing ${array[j].value} with pivot ${pivot}`,
        type: "comparison",
        comparingIndices: [j, high]
      });

      if (array[j].value <= pivot) {
        i++;

        if (i !== j) {
          array[i].isSwapping = true;
          array[j].isSwapping = true;

          steps.push({
            array: JSON.parse(JSON.stringify(array)),
            description: `Swapping ${array[i].value} and ${array[j].value}`,
            type: "swap",
            swappingIndices: [i, j]
          });

          const temp = array[i].value;
          array[i].value = array[j].value;
          array[j].value = temp;

          array[i].isSwapping = false;
          array[j].isSwapping = false;
        }
      }

      array[j].isComparing = false;
    }

    array[high].isPivot = false;

    if (i + 1 !== high) {
      array[i + 1].isSwapping = true;
      array[high].isSwapping = true;

      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Moving pivot ${pivot} to its correct position`,
        type: "swap",
        swappingIndices: [i + 1, high]
      });

      const temp = array[i + 1].value;
      array[i + 1].value = array[high].value;
      array[high].value = temp;

      array[i + 1].isSwapping = false;
      array[high].isSwapping = false;
    }

    return i + 1;
  };

  const quickSort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);

      array[pi].isSorted = true;
      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        description: `Element ${array[pi].value} is now in its correct position`,
        type: "partition"
      });

      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };

  quickSort(0, array.length - 1);

  array.forEach(bar => {
    bar.isSorted = true;
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