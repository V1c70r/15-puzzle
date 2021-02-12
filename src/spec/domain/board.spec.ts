import { range } from 'lodash';

import { isSolvable } from 'src/domain/solvable';
import { BoardState } from 'src/domain/contract';
import { Board, BoardConfig } from 'src/domain/board';

class TestBoard extends Board {
  public readonly config!: BoardConfig;
  public readonly numbers!: number[][];
  public x!: number;
  public y!: number;

  public createRandomState(): BoardState {
    return super.createRandomState();
  }

  public getNumber(x: number, y: number): number {
    return super.getNumber(x, y);
  }

  public getNumberOrUndefined(x: number, y: number): number | undefined {
    return super.getNumberOrUndefined(x, y);
  }

  public setNumber(x: number, y: number, number: number): void {
    super.setNumber(x, y, number);
  }

  public isValidCoordinate(coordinate: number): boolean {
    return super.isValidCoordinate(coordinate);
  }

  public isValidCoordinates(x: number, y: number): boolean {
    return super.isValidCoordinates(x, y);
  }

  public checkCoordinates(x: number, y: number): void {
    return super.checkCoordinates(x, y);
  }

  public swap(x0: number, y0: number, x1: number, y1: number): void {
    super.swap(x0, y0, x1, y1);
  }
}

function flatMapSort(numbers: number[][]): number[] {
  return numbers.flatMap(rows => rows).sort((a, b) => a - b);
}

describe('Board', () => {
  let config: BoardConfig;
  beforeEach(() => {
    config = {
      sideSize: 4,
      maxNumber: 15,
    };
  });

  describe('test with random board', () => {
    let board: TestBoard;
    beforeEach(() => {
      board = new TestBoard({ config });
    });

    describe('constructor', () => {
      it('set a config', () => {
        expect(board.config).toBe(config);
      });

      it('set a new random state if there is no given state', () => {
        const spyOnCreateRandomState = jest.spyOn(TestBoard.prototype, 'createRandomState');
        const board2 = new TestBoard({ config });

        expect(flatMapSort(board.numbers)).toEqual(range(16));
        expect(flatMapSort(board2.numbers)).toEqual(range(16));

        expect(board2.x).toBe(spyOnCreateRandomState.mock.results[0].value.x);
        expect(board2.y).toBe(spyOnCreateRandomState.mock.results[0].value.y);

        expect(board.numbers).not.toEqual(board2.numbers);
        expect(spyOnCreateRandomState).toHaveBeenCalledTimes(1);
      });
    });

    describe('createRandomState', () => {
      it('returns numbers in a range', () => {
        expect(flatMapSort(board.createRandomState().numbers)).toEqual(range(16));
      });

      it('returns numbers with needed shape', () => {
        expect(board.createRandomState().numbers.map(rows => rows.length)).toEqual([4, 4, 4, 4]);
      });

      it('returns emptiness coordinates', () => {
        const state = board.createRandomState();

        expect(state.x).toEqual(expect.any(Number));
        expect(state.x).toBe(state.numbers.find(rows => rows.includes(0))?.indexOf(0));

        expect(state.y).toEqual(expect.any(Number));
        expect(state.y).toBe(state.numbers.findIndex(rows => rows.includes(0)));
      });

      it('returns random numbers', () => {
        expect(board.createRandomState().numbers).not.toEqual(board.createRandomState().numbers);
      });

      it('returns only solvable numbers', () => {
        for (let i = 0; i < 10; i++) {
          const numbers = board.createRandomState().numbers.flatMap(rows => rows);
          expect(
            isSolvable(
              numbers.indexOf(0),
              numbers.filter(v => v !== 0),
            ),
          ).toBe(true);
        }
      });
    });
  });

  describe('test with fixed board', () => {
    let state: BoardState;
    let board: TestBoard;

    beforeEach(() => {
      state = {
        x: 1,
        y: 2,
        numbers: [
          [1, 2, 3, 4],
          [5, 6, 10, 7],
          [8, 0, 9, 11],
          [12, 13, 14, 15],
        ],
      };

      board = new TestBoard({ config, state });
    });

    it('set given state if there is given state', () => {
      expect(board.x).toBe(state.x);
      expect(board.y).toBe(state.y);
      expect(board.numbers).toBe(state.numbers);
    });

    describe('move', () => {
      it('returns false for invalid numbers', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(0)).toBe(false);
        expect(board.move(-10)).toBe(false);
        expect(board.move(16)).toBe(false);
        expect(board.move(100)).toBe(false);
      });

      it('does not change state for invalid numbers', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.move(0);
        board.move(-10);
        board.move(16);
        board.move(100);

        expect(board.x).toBe(1);
        expect(board.y).toBe(2);
        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 6, 10, 7],
          [8, 0, 9, 11],
          [12, 13, 14, 15],
        ]);
      });

      it('returns false for not movable numbers', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(1)).toBe(false);
        expect(board.move(3)).toBe(false);
        expect(board.move(5)).toBe(false);
        expect(board.move(7)).toBe(false);
        expect(board.move(10)).toBe(false);
        expect(board.move(11)).toBe(false);
        expect(board.move(12)).toBe(false);
        expect(board.move(14)).toBe(false);
      });

      it('does not change state for not movable numbers', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(1)).toBe(false);
        expect(board.move(7)).toBe(false);
        expect(board.move(10)).toBe(false);

        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 6, 10, 7],
          [8, 0, 9, 11],
          [12, 13, 14, 15],
        ]);
      });

      it('can move a number up', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.move(13);

        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 6, 10, 7],
          [8, 13, 9, 11],
          [12, 0, 14, 15],
        ]);
      });

      it('can move a number down', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.move(6);

        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 0, 10, 7],
          [8, 6, 9, 11],
          [12, 13, 14, 15],
        ]);
      });

      it('can move a number left', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.move(8);

        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 6, 10, 7],
          [0, 8, 9, 11],
          [12, 13, 14, 15],
        ]);
      });

      it('can move a number right', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.move(9);

        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 6, 10, 7],
          [8, 9, 0, 11],
          [12, 13, 14, 15],
        ]);
      });

      it('returns true if a number is movable', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(6)).toBe(true);
        expect(board.move(10)).toBe(true);
        expect(board.move(3)).toBe(true);
        expect(board.move(4)).toBe(true);
      });
    });

    describe('canMove', () => {
      it('returns false if a number can not be move', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(4)).toBe(false);
        expect(board.move(5)).toBe(false);
        expect(board.move(7)).toBe(false);
        expect(board.move(10)).toBe(false);
        expect(board.move(12)).toBe(false);
        expect(board.move(14)).toBe(false);
      });

      it('returns true if a number can not be up', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(13)).toBe(true);
      });

      it('returns true if a number can not be down', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(6)).toBe(true);
      });

      it('returns true if a number can not be right', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(8)).toBe(true);
      });

      it('returns true if a number can not be left', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.move(9)).toBe(true);
      });
    });

    describe('getNumber', () => {
      it('returns a number for valid coordinates', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.getNumber(0, 0)).toBe(1);
        expect(board.getNumber(0, 2)).toBe(8);
        expect(board.getNumber(1, 2)).toBe(0);
        expect(board.getNumber(1, 3)).toBe(13);
        expect(board.getNumber(3, 3)).toBe(15);
      });

      it('throws an error for invalid coordinates', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(() => board.getNumber(-1, 0)).toThrow('Wrong coordinates (-1, 0).');
        expect(() => board.getNumber(0, -1)).toThrow('Wrong coordinates (0, -1).');
        expect(() => board.getNumber(-10, -10)).toThrow('Wrong coordinates (-10, -10).');
        expect(() => board.getNumber(4, 0)).toThrow('Wrong coordinates (4, 0).');
        expect(() => board.getNumber(0, 4)).toThrow('Wrong coordinates (0, 4).');
        expect(() => board.getNumber(40, 40)).toThrow('Wrong coordinates (40, 40).');
      });
    });

    describe('getNumberOrUndefined', () => {
      it('returns a number for valid coordinates', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.getNumberOrUndefined(0, 0)).toBe(1);
        expect(board.getNumberOrUndefined(0, 2)).toBe(8);
        expect(board.getNumberOrUndefined(1, 2)).toBe(0);
        expect(board.getNumberOrUndefined(1, 3)).toBe(13);
        expect(board.getNumberOrUndefined(3, 3)).toBe(15);
      });

      it('returns undefined for invalid coordinates', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        expect(board.getNumberOrUndefined(-1, 0)).toBeUndefined();
        expect(board.getNumberOrUndefined(0, -1)).toBeUndefined();
        expect(board.getNumberOrUndefined(-10, -10)).toBeUndefined();
        expect(board.getNumberOrUndefined(4, 0)).toBeUndefined();
        expect(board.getNumberOrUndefined(0, 4)).toBeUndefined();
        expect(board.getNumberOrUndefined(40, 40)).toBeUndefined();
      });
    });

    describe('setNumber', () => {
      it('set a number in a board for valid coordinates', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.setNumber(1, 2, 10);
        board.setNumber(2, 1, 0);

        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 6, 0, 7],
          [8, 10, 9, 11],
          [12, 13, 14, 15],
        ]);
      });

      it('throws an error for invalid coordinates', () => {
        expect(() => board.setNumber(10, 10, 10)).toThrow('Wrong coordinates (10, 10).');
      });
    });

    describe('isValidCoordinate', () => {
      it('returns true for a valid coordinate', () => {
        expect(board.isValidCoordinate(0)).toBe(true);
        expect(board.isValidCoordinate(1)).toBe(true);
        expect(board.isValidCoordinate(2)).toBe(true);
        expect(board.isValidCoordinate(3)).toBe(true);
      });

      it('returns false for an invalid coordinate', () => {
        expect(board.isValidCoordinate(-10)).toBe(false);
        expect(board.isValidCoordinate(-1)).toBe(false);
        expect(board.isValidCoordinate(4)).toBe(false);
        expect(board.isValidCoordinate(10)).toBe(false);
      });
    });

    describe('isValidCoordinates', () => {
      it('returns true for a valid coordinates', () => {
        expect(board.isValidCoordinates(0, 0)).toBe(true);
        expect(board.isValidCoordinates(1, 2)).toBe(true);
        expect(board.isValidCoordinates(3, 3)).toBe(true);
      });

      it('returns false for an invalid coordinates', () => {
        expect(board.isValidCoordinates(0, -1)).toBe(false);
        expect(board.isValidCoordinates(4, 2)).toBe(false);
        expect(board.isValidCoordinates(-5, 10)).toBe(false);
      });
    });

    describe('checkCoordinates', () => {
      it('throws an error for an invalid coordinates', () => {
        expect(() => board.checkCoordinates(-1, 0)).toThrow('Wrong coordinates (-1, 0).');
        expect(() => board.checkCoordinates(1, 4)).toThrow('Wrong coordinates (1, 4).');
        expect(() => board.checkCoordinates(5, 10)).toThrow('Wrong coordinates (5, 10).');
      });

      it('does not throw an error for an valid coordinates', () => {
        expect(() => board.checkCoordinates(0, 0)).not.toThrow();
        expect(() => board.checkCoordinates(2, 1)).not.toThrow();
        expect(() => board.checkCoordinates(3, 3)).not.toThrow();
      });
    });

    describe('swap', () => {
      it('swaps two numbers in the board state', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.swap(2, 1, 0, 3);

        expect(board.numbers).toEqual([
          [1, 2, 3, 4],
          [5, 6, 12, 7],
          [8, 0, 9, 11],
          [10, 13, 14, 15],
        ]);
      });

      it('updates the emptiness coordinates', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.swap(1, 2, 0, 3);

        // state after swap:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 12, 9, 11]
        // [0, 13, 14, 15]

        expect(board.x).toBe(0);
        expect(board.y).toBe(3);

        board.swap(0, 2, 0, 3);

        expect(board.x).toBe(0);
        expect(board.y).toBe(2);
      });

      it('throws an error for an invalid coordinates', () => {
        expect(() => board.swap(-1, 1, 2, 3)).toThrow('Wrong coordinates (-1, 1).');
        expect(() => board.swap(0, 4, 2, 3)).toThrow('Wrong coordinates (0, 4).');
        expect(() => board.swap(0, 1, 10, 3)).toThrow('Wrong coordinates (10, 3).');
        expect(() => board.swap(0, 1, 2, -3)).toThrow('Wrong coordinates (2, -3).');
      });
    });

    describe('getState', () => {
      it('returns the current state of the board', () => {
        expect(board.getState()).toEqual({
          x: 1,
          y: 2,
          numbers: [
            [1, 2, 3, 4],
            [5, 6, 10, 7],
            [8, 0, 9, 11],
            [12, 13, 14, 15],
          ],
        });
      });
    });

    describe('isCompleted', () => {
      it('returns true if the puzzle is completed', () => {
        expect(board.isCompleted()).toBe(false);
      });

      it('returns false if the puzzle is not completed yet', () => {
        // initial state:
        // [1, 2, 3, 4]
        // [5, 6, 10, 7]
        // [8, 0, 9, 11]
        // [12, 13, 14, 15]

        board.move(9);

        expect(board.isCompleted()).toBe(false);

        board.move(10);

        expect(board.isCompleted()).toBe(true);
      });
    });
  });
});
