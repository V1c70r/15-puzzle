import { chunk, range, shuffle } from 'lodash';

import { EMPTINESS, BoardState } from './contract'

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
 */
export class Board {
  /**
   * The size of board's side.
   */
  private readonly config: BoardConfig;

  /**
   * Numbers inside a board.
   */
  private readonly numbers: number[][];

  /**
   * X position of the empty space.
   */
  private x: number;

  /**
   * Y position of the empty space.
   */
  private y: number;

  public constructor({ config, state } : {
    config: BoardConfig;
    state?: BoardState;
  }) {
    this.config = config;

    if (!state) {
      state = this.createRandomState();
    }

    this.x = state.x;
    this.y = state.y;
    this.numbers = state.numbers;
  }

  private createRandomState(): BoardState {
    const numbers = chunk(shuffle(range(this.config.maxNumber + 1)), this.config.sideSize);

    const [x, y] = numbers.flatMap((rows, y) => {
      const x = rows.indexOf(EMPTINESS);
      return x === -1 ? [] : [x, y];
    });

    return { x, y, numbers };
  }

  /**
   * @param number A number to move.
   * @returns false if a number can't be moved.
   */
  public move(number: number): boolean {
    const isValidNumber = 1 <= number && number <= this.config.maxNumber;
    if (!isValidNumber) {
      return false;
    }

    const numberMoveDirection = this.canMove(number);
    if (!numberMoveDirection) {
      return false;
    }

    switch (numberMoveDirection) {
      case 'up': this.swap(this.x, this.y + 1, this.x, this.y); break;
      case 'down': this.swap(this.x, this.y - 1, this.x, this.y); break;
      case 'left': this.swap(this.x + 1, this.y, this.x, this.y); break;
      case 'right': this.swap(this.x - 1, this.y, this.x, this.y); break;
    }

    return true;
  }

  private canMove(number: number): MoveDirection | undefined {
    if (this.getNumberOrUndefined(this.x, this.y + 1) === number) {
      return 'up';
    }

    if (this.getNumberOrUndefined(this.x, this.y - 1) === number) {
      return 'down';
    }

    if (this.getNumberOrUndefined(this.x + 1, this.y) === number) {
      return 'left';
    }

    if (this.getNumberOrUndefined(this.x - 1, this.y) === number) {
      return 'right';
    }
  }

  /**
   * @throws {Error} Throws an error for wrong coordinates.
   */
  private getNumber(x: number, y: number): number {
    this.checkCoordinates(x, y);

    return this.numbers[y][x];
  }

  /**
   * @returns Returns undefined for wrong coordinates.
   */
  private getNumberOrUndefined(x: number, y: number): number | undefined {
    if (!this.isValidCoordinates(x, y)) {
      return;
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
    return 0 <= coordinate && coordinate < this.config.sideSize;
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
    if (number0 === EMPTINESS) {
      this.x = x1;
      this.y = y1;
    }

    this.setNumber(x0, y0, number1);
    if (number1 === EMPTINESS) {
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

    // the game board size is small that is why linear complexity is good for us
    for (let i = 0; ; i++) {
      const x = i % this.config.sideSize;
      const y = Math.floor(i / this.config.sideSize);

      const number = this.numbers[y][x];

      if (number === EMPTINESS) {
        continue;
      }

      if (number !== prevNumber + 1) {
        return false;
      }

      if (number === this.config.maxNumber) {
        return true;
      }

      prevNumber = number;
    }
  }
}

type MoveDirection = 'up' | 'down' | 'left' | 'right';

export interface BoardConfig {
  /**
   * The size of board's side.
   */
  readonly sideSize: number;

  /**
   * The maximum number inside the board.
   */
  readonly maxNumber: number;
}