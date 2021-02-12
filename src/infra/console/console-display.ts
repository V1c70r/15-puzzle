import chalk from 'chalk';
import { repeat } from 'lodash';

import { BoardConfig } from 'src/domain/board';
import { BoardState, Display, EMPTINESS } from 'src/domain/contract';

/**
 * Simple console display.
 */
export class ConsoleDisplay implements Display {
  protected readonly config: ConsoleDisplayConfig;
  protected readonly boardConfig: BoardConfig;
  protected readonly maxNumberWidth: number;
  protected readonly boardEmptyLine: string;

  public constructor({
    config,
    boardConfig,
  }: {
    config: ConsoleDisplayConfig;
    boardConfig: BoardConfig;
  }) {
    this.config = config;
    this.boardConfig = boardConfig;
    this.maxNumberWidth = boardConfig.maxNumber.toString().length;

    const lineSize = (this.maxNumberWidth + 1) * this.boardConfig.sideSize + 4;
    this.boardEmptyLine = chalk.bgGreen(repeat(' ', lineSize));
  }

  public start(): void {}

  public stop(): void {}

  public showMessage(message: string): void {
    this.print(chalk.bold(message));
    this.print();
  }

  public showError(error: string): void {
    this.print(chalk.red.bold(error));
    this.print();
  }

  public showCongratulation(congratulation: string): void {
    for (let i = 0; i < this.config.newGamePaddingSize; i++) {
      this.print();
    }
    this.print(chalk.green.bold(congratulation));
    this.print();
  }

  public drawState({ numbers }: BoardState): void {
    this.print(this.boardEmptyLine);

    numbers.forEach(row => {
      this.print(
        chalk.bgGreen.bold('  ' + row.map(number => this.formatNumber(number)).join(' ') + '   '),
      );
    });

    this.print(this.boardEmptyLine);
    this.print();
  }

  protected formatNumber(number: number): string {
    if (number === EMPTINESS) {
      return ''.padStart(this.maxNumberWidth);
    }

    return number.toString().padStart(this.maxNumberWidth);
  }

  protected print(...strings: string[]): void {
    // eslint-disable-next-line no-console
    console.log(...strings);
  }
}

export interface ConsoleDisplayConfig {
  /**
   * A number of empty lines to separate a new and an old game.
   */
  newGamePaddingSize: number;
}
