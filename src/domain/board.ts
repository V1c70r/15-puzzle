import { chunk, range, shuffle } from 'lodash';

import { BOARD_MAX_NUMBER, BOARD_SIDE_SIZE } from 'src/config';

/**
 * Class to change and check the board state.
 *
 * The board coordinates system:
 * O -----> x - axis
 * |
 * |
 * |
 * V
 * y - axis
 *
 * 0 is represent the empty space.
 */
export class Board {
  /**
   * Number inside a board.
   * 0 represents an empty space.
   */
  private numbers: number[][];

  /**
   * X position of the empty space.
   */
  private x: number;

  /**
   * Y position of the empty space.
   */
  private y: number;

  public constructor(state?: BoardState) {
    if (!state) {
      state = this.createRandomState();
    }

    this.x = state.x;
    this.y = state.y;
    this.numbers = state.numbers;
  }

  private createRandomState(): BoardState {
    const numbers = chunk(shuffle(range(BOARD_MAX_NUMBER + 1)), BOARD_SIDE_SIZE);

    const [x, y] = numbers.flatMap((rows, y) => {
      const x = rows.indexOf(0);
      return x === -1 ? [] : [x, y];
    });

    return { x, y, numbers };
  }

  /**
   * @param number A number to move.
   * @returns false if a number can't be moved.
   */
  public move(number: number): boolean {
    const isValidNumber = 1 <= number && number <= BOARD_MAX_NUMBER;
    if (!isValidNumber) {
      return false;
    }

    const numberMoveDirection = this.canMove(number);
    if (!numberMoveDirection) {
      return false;
    }

    switch (numberMoveDirection) {
      case MoveDirection.UP: this.swap(this.x, this.y + 1, this.x, this.y); break;
      case MoveDirection.DOWN: this.swap(this.x, this.y - 1, this.x, this.y); break;
      case MoveDirection.LEFT: this.swap(this.x + 1, this.y, this.x, this.y); break;
      case MoveDirection.RIGHT: this.swap(this.x - 1, this.y, this.x, this.y); break;
    }

    return true;
  }

  private canMove(number: number): MoveDirection | undefined {
    if (this.getNumber(this.x, this.y + 1, false) === number) {
      return MoveDirection.UP;
    }

    if (this.getNumber(this.x, this.y - 1, false) === number) {
      return MoveDirection.DOWN;
    }

    if (this.getNumber(this.x + 1, this.y, false) === number) {
      return MoveDirection.LEFT;
    }

    if (this.getNumber(this.x - 1, this.y, false) === number) {
      return MoveDirection.RIGHT;
    }
  }

  /**
   * @throws {Error} Throws an error for wrong coordinates if isThrowsEnabled is true.
   *   Returns NaN for wrong coordinates if isThrowsEnabled is false.
   */
  private getNumber(x: number, y: number, isThrowsEnabled = true): number {
    if (isThrowsEnabled) {
      this.checkCoordinates(x, y);
    } else if (!this.isValidCoordinates(x, y)) {
      return NaN;
    }

    return this.numbers[y][x];
  }

  /**
   * @throws {Error} Throws an error for wrong coordinates.
   */
  private setNumber(x: number, y: number, number: number): void {
    this.checkCoordinates(x, y);

    this.numbers[y][x] = number;
  }

  private isValidCoordinate(coordinate: number): boolean {
    return 0 <= coordinate && coordinate < BOARD_SIDE_SIZE;
  }

  private isValidCoordinates(x: number, y: number): boolean {
    return this.isValidCoordinate(x) && this.isValidCoordinate(y);
  }

  /**
   * @throws {Error} Throws an error for wrong coordinates.
   */
  private checkCoordinates(x: number, y: number) {
    if (!this.isValidCoordinates(x, y)) {
      throw new Error(`Wrong coordinates (${x}, ${y}).`);
    }
  }

  /**
   * @throws {Error} Throws an error for wrong coordinates.
   */
  private swap(x0: number, y0: number, x1: number, y1: number) {
    const number0 = this.getNumber(x0, y0);
    const number1 = this.getNumber(x1, y1);

    this.setNumber(x1, y1, number0);
    if (number0 === 0) {
      this.x = x1;
      this.y = y1;
    }

    this.setNumber(x0, y0, number1);
    if (number1 === 0) {
      this.x = x0;
      this.y = y0;
    }
  }

  public getState(): BoardState {
    return {
      x: this.x,
      y: this.y,
      numbers: this.numbers,
    };
  }

  public isCompleted(): boolean {
    let prevNumber = 0;

    for (let i = 0; ; i++) {
      const x = i % BOARD_SIDE_SIZE;
      const y = Math.floor(i / BOARD_SIDE_SIZE);

      const number = this.getNumber(x, y, false);
      if (number === 0) {
        continue;
      }

      if (number !== prevNumber + 1) {
        return false;
      }

      if (number === BOARD_MAX_NUMBER) {
        return true;
      }

      prevNumber = number;
    }
  }
}

export enum MoveDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface BoardState {
  x: number;
  y: number;
  numbers: number[][];
};
