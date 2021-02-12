import {
  isSolvable,
  countInversion,
  sortAndCountInversions,
  mergeAndCountInversions,
} from 'src/domain/solvable';

describe('isSolvable', () => {
  function getIndexAndNumbers(numbers: number[][]): [number, number[]] {
    const flatNumbers = numbers.flatMap(row => row);
    return [flatNumbers.indexOf(0), flatNumbers.filter(v => v !== 0)];
  }

  it('returns true if array is solvable', () => {
    // see https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/

    expect(
      isSolvable(
        ...getIndexAndNumbers([
          [1, 8, 2],
          [0, 4, 3],
          [7, 6, 5],
        ]),
      ),
    ).toBe(true);

    expect(
      isSolvable(
        ...getIndexAndNumbers([
          [13, 2, 10, 3],
          [1, 12, 8, 4],
          [5, 0, 9, 6],
          [15, 14, 11, 7],
        ]),
      ),
    ).toBe(true);

    expect(
      isSolvable(
        ...getIndexAndNumbers([
          [6, 13, 7, 10],
          [8, 9, 11, 0],
          [15, 2, 12, 5],
          [14, 3, 1, 4],
        ]),
      ),
    ).toBe(true);

    expect(
      isSolvable(
        ...getIndexAndNumbers([
          [3, 9, 1, 15],
          [14, 11, 4, 6],
          [13, 0, 10, 12],
          [2, 7, 8, 5],
        ]),
      ),
    ).toBe(false);

    expect(
      isSolvable(
        ...getIndexAndNumbers([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 0, 14, 15],
        ]),
      ),
    ).toBe(true);

    expect(
      isSolvable(
        ...getIndexAndNumbers([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 0, 15, 14],
        ]),
      ),
    ).toBe(false);
  });

  it('should not change original array', () => {
    const array = [
      [1, 8, 2],
      [0, 4, 3],
      [7, 6, 5],
    ];

    expect(isSolvable(...getIndexAndNumbers(array))).toBe(true);
    expect(array).toEqual(array);
  });
});

describe('countInversion', () => {
  it('returns numbers of inversion in permutation', () => {
    expect(countInversion([])).toEqual(0);
    expect(countInversion([1])).toEqual(0);
    expect(countInversion([2, 1])).toEqual(1);

    expect(countInversion([1, 2, 3, 4, 5, 6])).toEqual(0);
    expect(countInversion([2, 1, 3, 4, 6, 5])).toEqual(2);
    expect(countInversion([0, 3, 2, 1, 4, 5])).toEqual(3);

    expect(countInversion([4, 3, 1, 2])).toEqual(5);
    expect(countInversion([1, 4, 3, 2])).toEqual(3);
    expect(countInversion([1, 3, 4, 2])).toEqual(2);
  });

  it('should not change original array', () => {
    const array = [4, 3, 1, 2];

    expect(countInversion(array)).toEqual(5);
    expect(array).toEqual(array);
  });
});

describe('sortAndCountInversions', () => {
  it('returns numbers of inversion in permutation', () => {
    expect(sortAndCountInversions([])).toEqual({ count: 0, array: [] });
    expect(sortAndCountInversions([1])).toEqual({ count: 0, array: [1] });
    expect(sortAndCountInversions([2, 1])).toEqual({ count: 1, array: [1, 2] });

    expect(sortAndCountInversions([1, 2, 3, 4, 5, 6])).toEqual({
      count: 0,
      array: [1, 2, 3, 4, 5, 6],
    });
    expect(sortAndCountInversions([2, 1, 3, 4, 6, 5])).toEqual({
      count: 2,
      array: [1, 2, 3, 4, 5, 6],
    });
    expect(sortAndCountInversions([0, 3, 2, 1, 4, 5])).toEqual({
      count: 3,
      array: [0, 1, 2, 3, 4, 5],
    });

    expect(sortAndCountInversions([4, 3, 1, 2])).toEqual({ count: 5, array: [1, 2, 3, 4] });
    expect(sortAndCountInversions([1, 4, 3, 2])).toEqual({ count: 3, array: [1, 2, 3, 4] });
    expect(sortAndCountInversions([1, 3, 4, 2])).toEqual({ count: 2, array: [1, 2, 3, 4] });
  });

  it('should not change original array', () => {
    const array = [4, 3, 1, 2];

    expect(sortAndCountInversions(array)).toEqual({ count: 5, array: [1, 2, 3, 4] });
    expect(array).toEqual(array);
  });
});

describe('mergeAndCountInversions', () => {
  it('merge two array in one sorted array and calculate inversions', () => {
    expect(mergeAndCountInversions([1, 2, 3], [4, 5, 6, 7, 8, 9, 10])).toEqual({
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      count: 0,
    });

    expect(mergeAndCountInversions([4, 5], [1, 2, 3])).toEqual({
      array: [1, 2, 3, 4, 5],
      count: 6,
    });

    expect(mergeAndCountInversions([1, 4, 5], [2, 3])).toEqual({
      array: [1, 2, 3, 4, 5],
      count: 4,
    });

    expect(mergeAndCountInversions([1, 2, 4], [3, 5, 6, 7])).toEqual({
      array: [1, 2, 3, 4, 5, 6, 7],
      count: 1,
    });

    expect(mergeAndCountInversions([1, 4, 5], [2, 3, 6, 7])).toEqual({
      array: [1, 2, 3, 4, 5, 6, 7],
      count: 4,
    });

    expect(mergeAndCountInversions([1, 2, 3, 5], [4, 6, 7])).toEqual({
      array: [1, 2, 3, 4, 5, 6, 7],
      count: 1,
    });
  });
});
