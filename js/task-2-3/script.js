let arr = [4, 67, 90, 0.5, -4, 67, 9.7, -77, 109, 66.8];
console.log('original array: ',arr);

// array.sort()
const arr1 = [...arr].sort(compareFn);

function compareFn(a, b) {
  return a - b;
}
console.log('array.sort(): ', arr1);

// Bubble Sort
const arr2 = [...arr];

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++){
    for (let j = 0; j < array.length-i-1; j++) {
      if (array[j+1] < array[j]) {
        // Swapping the elements
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j+1] = tmp;
      }
    }
  }
  return array;
}

bubbleSort(arr2);
console.log('Bubble Sort: ', arr2);

// Sort by choice
const arr3 = [...arr];

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i+1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min != i) {
      // Swapping the elements
      let tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;
    }
  }
  return array;
}

selectionSort(arr3);
console.log('Sort by choice: ', arr3);

// Insertion Sort
const arr4 = [...arr];

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    // Choosing the first element in our unsorted subarray
    let current = array[i];
    // The last element of our sorted subarray
    let j = i-1;
    while ((j > -1) && (current < array[j])) {
      array[j+1] = array[j];
      j--;
    }
    array[j+1] = current;
  }
  return array;
}

insertionSort(arr4);
console.log('Insertion Sort: ', arr4);

// Quicksort (recursive)
const arr5 = [...arr];

function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  let pivot = array[0];

  let left = [];
  let right = [];

  for (let i = 1; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
  }

  return quickSort(left).concat(pivot, quickSort(right));
};

console.log('Quicksort: ', quickSort(arr5));

// Merge Sort
const arr6 = [...arr];

function mergeArrays(leftArray, rightArray) {
  let array = []
  while (leftArray.length && rightArray.length) {
    if (leftArray[0] < rightArray[0]) {
      array.push(leftArray.shift())
    } else {
      array.push(rightArray.shift())
    }
  }
  return [ ...array, ...leftArray, ...rightArray ]
}

function mergeSort(unsortedArray) {
  const midleIndex = unsortedArray.length / 2
  if(unsortedArray.length < 2){
    return unsortedArray
  }

  const leftArray = unsortedArray.splice(0, midleIndex)
  return mergeArrays(mergeSort(leftArray), mergeSort(unsortedArray))
}

console.log('Merge Sort: ', mergeSort(arr6));
