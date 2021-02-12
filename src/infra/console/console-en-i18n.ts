import { EOL } from 'os';

import { I18n } from 'src/domain/contract';
import { BoardConfig } from 'src/domain/board';

/**
 * English internationalization for CLI.
 */
export class ConsoleEnI18n implements I18n {
  protected readonly boardConfig: BoardConfig;

  public readonly inputPrompt = '> ';
  public readonly greeting = 'Come in, Chosen One.';
  public readonly goodbye = 'Goodbye!';
  public readonly newGameCreated = 'New game started.';
  public readonly gameLoaded = 'Game is loaded.';
  public readonly gameSaved = 'Game is saved.';
  public readonly congratulation = 'WIN!';
  public readonly unknownCommand = 'You entered an unknown command.';
  public help!: string;

  public constructor({ boardConfig }: { boardConfig: BoardConfig }) {
    this.boardConfig = boardConfig;
  }

  public cantMoveNumber(number: number): string {
    return `You can't move ${number}.`;
  }

  public init(): void {
    this.help = [
      'Please input a command.',
      'Allowed commands:',
      `  number from 1 to ${this.boardConfig.maxNumber} - move a number`,
      '  new - shuffle the puzzle',
      '  exit - save and stop the game',
    ].join(EOL);
  }
}
