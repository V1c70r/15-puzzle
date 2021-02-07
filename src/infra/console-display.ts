import { BoardConfig } from 'src/domain/board';
import { BoardState, Display, EMPTINESS } from 'src/domain/contract';

// TODO add chalk

/**
 * Simple console display.
 */
export class ConsoleDisplay implements Display {
  protected readonly maxNumberWidth: number;

  public constructor({ boardConfig }: { boardConfig: BoardConfig }) {
    this.maxNumberWidth = boardConfig.maxNumber.toString().length;
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

  public showCongratulation(congratulation: string): void {
    this.print();
    this.print('!!!', congratulation, '!!!');
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
    if (number === EMPTINESS) {
      return ''.padStart(this.maxNumberWidth);
    }

    return number.toString().padStart(this.maxNumberWidth);
  }

  private print(...strings: string[]): void {
    // eslint-disable-next-line no-console
    console.log(...strings);
  }
}
