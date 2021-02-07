import { Display } from 'src/domain/puzzle';
import { BoardState } from 'src/domain/board';
import { repeat } from 'lodash';
import { DISPLAY_NUMBER_WIDTH } from 'src/config';

/**
 * Simple console display.
 */
export class ConsoleDisplay implements Display {
  private readonly spaces = repeat(' ', DISPLAY_NUMBER_WIDTH);

  // TODO add print function

  public showMessage(message: string): void {
    console.log();
    console.log(message);
    console.log();
  }

  public showError(error: string): void {
    console.log();
    console.log('ERROR', error);
    console.log();
  }

  public showCongratulation(message: string): void {
    console.log();
    console.log('!!!', message, '!!!');
    console.log();
  }

  public drawState({ numbers }: BoardState): void {
    console.log();
    numbers.forEach(row => {
      console.log(row.map(number => this.formatNumber(number)).join(' '));
    });
    console.log();
  }

  private formatNumber(number: number) {
    if (!number) {
      return this.spaces;
    }

    return (this.spaces + number).slice(-DISPLAY_NUMBER_WIDTH);
  }
}
