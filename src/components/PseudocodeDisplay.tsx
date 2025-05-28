import React from 'react';
import { useVisualizer } from '../context/VisualizerContext';
import { Code2 } from 'lucide-react';

interface PseudocodeLine {
  code: string;
  indentation: number;
  highlightConditions: {
    type: string;
    descriptions: string[];
  }[];
}

const PseudocodeDisplay: React.FC = () => {
  const { selectedAlgorithm, animationSteps, currentStepIndex } = useVisualizer();
  
  const currentStep = animationSteps[currentStepIndex];
  
  const algorithmPseudocode: Record<string, PseudocodeLine[]> = {
    bubble: [
      { 
        code: "procedure bubbleSort(array)", 
        indentation: 0,
        highlightConditions: [{ type: "start", descriptions: ["Starting Bubble Sort algorithm"] }]
      },
      { 
        code: "n = length(array)", 
        indentation: 1,
        highlightConditions: [{ type: "start", descriptions: ["Starting Bubble Sort algorithm"] }]
      },
      { 
        code: "for i from 0 to n-1", 
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing"] }]
      },
      { 
        code: "for j from 0 to n-i-1", 
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing"] }]
      },
      { 
        code: "if array[j] > array[j+1]", 
        indentation: 3,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing"] }]
      },
      { 
        code: "swap(array[j], array[j+1])", 
        indentation: 4,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      }
    ],
    insertion: [
      { 
        code: "procedure insertionSort(array)", 
        indentation: 0,
        highlightConditions: [{ type: "start", descriptions: ["Starting Insertion Sort algorithm"] }]
      },
      { 
        code: "for i from 1 to length(array)", 
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Inserting element"] }]
      },
      { 
        code: "key = array[i]", 
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Inserting element"] }]
      },
      { 
        code: "j = i - 1", 
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing"] }]
      },
      { 
        code: "while j >= 0 and array[j] > key", 
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing"] }]
      },
      { 
        code: "array[j + 1] = array[j]", 
        indentation: 3,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      },
      { 
        code: "j = j - 1", 
        indentation: 3,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      },
      { 
        code: "array[j + 1] = key", 
        indentation: 2,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      }
    ],
    selection: [
      {
        code: "procedure selectionSort(array)",
        indentation: 0,
        highlightConditions: [{ type: "start", descriptions: ["Starting Selection Sort algorithm"] }]
      },
      {
        code: "n = length(array)",
        indentation: 1,
        highlightConditions: [{ type: "start", descriptions: ["Starting Selection Sort algorithm"] }]
      },
      {
        code: "for i from 0 to n-1",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Finding minimum", "Comparing current minimum"] }]
      },
      {
        code: "minIndex = i",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Found new minimum", "Current minimum"] }]
      },
      {
        code: "for j from i+1 to n",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing"] }]
      },
      {
        code: "if array[j] < array[minIndex]",
        indentation: 3,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing", "Found new minimum"] }]
      },
      {
        code: "minIndex = j",
        indentation: 4,
        highlightConditions: [{ type: "comparison", descriptions: ["Found new minimum"] }]
      },
      {
        code: "swap(array[i], array[minIndex])",
        indentation: 2,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      }
    ],
    quick: [
      {
        code: "procedure quickSort(array, low, high)",
        indentation: 0,
        highlightConditions: [{ type: "start", descriptions: ["Starting Quick Sort algorithm"] }]
      },
      {
        code: "if low < high",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Starting partition", "Partitioning array"] }]
      },
      {
        code: "pivot = partition(array, low, high)",
        indentation: 2,
        highlightConditions: [{ type: "partition", descriptions: ["Selected pivot", "Partitioning array"] }]
      },
      {
        code: "quickSort(array, low, pivot - 1)",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Recursively sorting left partition"] }]
      },
      {
        code: "quickSort(array, pivot + 1, high)",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Recursively sorting right partition"] }]
      },
      {
        code: "procedure partition(array, low, high)",
        indentation: 1,
        highlightConditions: [{ type: "partition", descriptions: ["Starting partition", "Partitioning array"] }]
      },
      {
        code: "pivot = array[high]",
        indentation: 2,
        highlightConditions: [{ type: "partition", descriptions: ["Selected pivot", "Moving pivot"] }]
      },
      {
        code: "i = low - 1",
        indentation: 2,
        highlightConditions: [{ type: "partition", descriptions: ["Partitioning array"] }]
      },
      {
        code: "for j from low to high - 1",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing"] }]
      },
      {
        code: "if array[j] <= pivot",
        indentation: 3,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing with pivot", "Comparing"] }]
      },
      {
        code: "i = i + 1",
        indentation: 4,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      },
      {
        code: "swap(array[i], array[j])",
        indentation: 4,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      }
    ],
    merge: [
      {
        code: "procedure mergeSort(array)",
        indentation: 0,
        highlightConditions: [{ type: "start", descriptions: ["Starting Merge Sort algorithm"] }]
      },
      {
        code: "if length(array) <= 1",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Checking array length", "Dividing array"] }]
      },
      {
        code: "return array",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Array is sorted"] }]
      },
      {
        code: "mid = length(array) / 2",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Dividing array"] }]
      },
      {
        code: "left = mergeSort(array[0...mid])",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Sorting left half", "Dividing array"] }]
      },
      {
        code: "right = mergeSort(array[mid+1...end])",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Sorting right half", "Dividing array"] }]
      },
      {
        code: "return merge(left, right)",
        indentation: 1,
        highlightConditions: [{ type: "swap", descriptions: ["Merging subarrays", "Merged subarray"] }]
      },
      {
        code: "procedure merge(left, right)",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Merging subarrays"] }]
      },
      {
        code: "result = []",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Merging subarrays"] }]
      },
      {
        code: "while length(left) > 0 and length(right) > 0",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing elements", "Merging subarrays"] }]
      },
      {
        code: "if left[0] <= right[0]",
        indentation: 3,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing elements"] }]
      },
      {
        code: "result.append(left.removeFirst())",
        indentation: 4,
        highlightConditions: [{ type: "swap", descriptions: ["Moving element", "Merged subarray"] }]
      },
      {
        code: "else",
        indentation: 3,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing elements"] }]
      },
      {
        code: "result.append(right.removeFirst())",
        indentation: 4,
        highlightConditions: [{ type: "swap", descriptions: ["Moving element", "Merged subarray"] }]
      }
    ],
    heap: [
      {
        code: "procedure heapSort(array)",
        indentation: 0,
        highlightConditions: [{ type: "start", descriptions: ["Starting Heap Sort algorithm"] }]
      },
      {
        code: "n = length(array)",
        indentation: 1,
        highlightConditions: [{ type: "start", descriptions: ["Starting Heap Sort algorithm"] }]
      },
      {
        code: "// Build max heap",
        indentation: 1,
        highlightConditions: [{ type: "heap", descriptions: ["Building max heap", "Building heap"] }]
      },
      {
        code: "for i from n/2-1 to 0",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Building heap", "Heapifying"] }]
      },
      {
        code: "heapify(array, n, i)",
        indentation: 2,
        highlightConditions: [{ type: "heap", descriptions: ["Heapifying", "Building heap"] }]
      },
      {
        code: "// Extract elements from heap",
        indentation: 1,
        highlightConditions: [{ type: "heap", descriptions: ["Extracting from heap"] }]
      },
      {
        code: "for i from n-1 to 0",
        indentation: 1,
        highlightConditions: [{ type: "comparison", descriptions: ["Extracting elements"] }]
      },
      {
        code: "swap(array[0], array[i])",
        indentation: 2,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      },
      {
        code: "heapify(array, i, 0)",
        indentation: 2,
        highlightConditions: [{ type: "heap", descriptions: ["Heapifying"] }]
      },
      {
        code: "procedure heapify(array, n, i)",
        indentation: 1,
        highlightConditions: [{ type: "heap", descriptions: ["Heapifying"] }]
      },
      {
        code: "largest = i",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Finding largest"] }]
      },
      {
        code: "left = 2*i + 1",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing with left child"] }]
      },
      {
        code: "right = 2*i + 2",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing with right child"] }]
      },
      {
        code: "if left < n and array[left] > array[largest]",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing with left child"] }]
      },
      {
        code: "largest = left",
        indentation: 3,
        highlightConditions: [{ type: "comparison", descriptions: ["Found new largest"] }]
      },
      {
        code: "if right < n and array[right] > array[largest]",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Comparing with right child"] }]
      },
      {
        code: "largest = right",
        indentation: 3,
        highlightConditions: [{ type: "comparison", descriptions: ["Found new largest"] }]
      },
      {
        code: "if largest != i",
        indentation: 2,
        highlightConditions: [{ type: "comparison", descriptions: ["Checking if swap needed"] }]
      },
      {
        code: "swap(array[i], array[largest])",
        indentation: 3,
        highlightConditions: [{ type: "swap", descriptions: ["Swapping", "Swapped"] }]
      },
      {
        code: "heapify(array, n, largest)",
        indentation: 3,
        highlightConditions: [{ type: "heap", descriptions: ["Heapifying"] }]
      }
    ]
  };

  const isLineHighlighted = (line: PseudocodeLine): boolean => {
    if (!currentStep) return false;
    
    return line.highlightConditions.some(condition => 
      condition.type === currentStep.type &&
      condition.descriptions.some(desc => 
        currentStep.description.toLowerCase().includes(desc.toLowerCase())
      )
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-600/30 h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="text-purple-400" size={20} />
        <h3 className="text-xl font-orbitron text-purple-400">Pseudocode</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
        <div className="font-fira-code text-sm">
          {algorithmPseudocode[selectedAlgorithm]?.map((line, index) => (
            <div
              key={index}
              className={`py-1.5 px-4 rounded transition-colors duration-300 ${
                isLineHighlighted(line)
                  ? 'bg-purple-600/20 text-white font-medium' 
                  : 'text-gray-400'
              }`}
              style={{ paddingLeft: `${line.indentation * 1.5}rem` }}
            >
              {line.code}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PseudocodeDisplay;