/**
 * Check if puzzle solvable.
 * @see https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
 * @param numbers A flat array of puzzle numbers without EMPTINESS (0). It must have (N**2)-1 elements.
 */
export function isSolvable(emptinessIndex: number, numberWithoutEmptiness: number[]): boolean {
  const sideSize = Math.ceil(Math.sqrt(numberWithoutEmptiness.length));
  const sizeParity = sideSize % 2;

  const emptinessRowIndex = Math.floor(emptinessIndex / sideSize);
  const emptinessRowParity = (sideSize - emptinessRowIndex) % 2; // counting from the bottom;

  const inversionsParity = countInversion(numberWithoutEmptiness) % 2;

  // is odd
  if (sizeParity === 1) {
    return inversionsParity === 0; // is even
  }

  return inversionsParity !== emptinessRowParity;
}

/**
 * Counts inversions in an array.
 * @example 1,2,3,4 has 0 inversions
 * @example 2,3,1,4 has 2 inversions
 * @param array It will not be changed.
 */
export function countInversion(array: number[]): number {
  return sortAndCountInversions(array).count;
}

/**
 * Sorts an array (merge sort) and count inversion.
 * @param array It will not be changed.
 */
export function sortAndCountInversions(array: number[]): ArrayWithInversionsCount {
  if (array.length <= 1) {
    return { count: 0, array };
  }

  const middleIndex = array.length >> 1;

  const array1 = sortAndCountInversions(array.slice(0, middleIndex));
  const array2 = sortAndCountInversions(array.slice(middleIndex));
  const merged = mergeAndCountInversions(array1.array, array2.array);

  return {
    count: array1.count + array2.count + merged.count,
    array: merged.array,
  };
}

/**
 * Merges already sorted arrays and count inversions.
 * @param array1 Sorted array.
 * @param array2 Sorted array.
 */
export function mergeAndCountInversions(
  array1: number[],
  array2: number[],
): ArrayWithInversionsCount {
  const totalLen = array1.length + array2.length;
  const array: number[] = Array(totalLen);

  let count = 0;
  let index1 = 0;
  let index2 = 0;

  for (let i = 0; i < totalLen; i++) {
    const value1 = array1[index1];
    const value2 = array2[index2];

    if (value1 < value2 || value2 === undefined) {
      array[i] = value1;
      index1++;
    } else {
      array[i] = value2;
      index2++;
      count += array1.length - index1;
    }
  }

  return { array, count };
}

export interface ArrayWithInversionsCount {
  array: number[];
  count: number;
}
