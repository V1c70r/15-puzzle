import { repeat } from 'lodash';

import { BoardConfig } from 'src/domain/board';
import { BoardState, Display } from 'src/domain/contract';

// TODO add chalk

/**
 * Simple console display.
 */
export class ConsoleDisplay implements Display {
  private readonly numberWidth: number;
  private readonly spaces: string;

  public constructor({ boardConfig }: { boardConfig: BoardConfig }) {
    this.numberWidth = boardConfig.maxNumber.toString().length;
    this.spaces = repeat(' ', this.numberWidth);
  }

  public start(): void {}

  public stop(): void {}

  public showMessage(message: string): void {
    this.print();
    this.print(message);
    this.print();
  }

  public showError(error: string): void {
    this.print();
    this.print('ERROR', error);
    this.print();
  }

  public showCongratulation(message: string): void {
    this.print();
    this.print('!!!', message, '!!!');
    this.print();
  }

  public drawState({ numbers }: BoardState): void {
    this.print();
    numbers.forEach(row => {
      this.print(row.map(number => this.formatNumber(number)).join(' '));
    });
    this.print();
  }

  private formatNumber(number: number): string {
    if (!number) {
      return this.spaces;
    }

    return (this.spaces + number.toString()).slice(-this.numberWidth);
  }

  private print(...strings: string[]): void {
    // eslint-disable-next-line no-console
    console.log(...strings);
  }
}
