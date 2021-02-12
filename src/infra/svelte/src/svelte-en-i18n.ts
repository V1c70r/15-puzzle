import { I18n } from './domain/contract';

/**
 * English internationalization for browser.
 */
export class SvelteEnI18n implements I18n {
  public readonly inputPrompt = '';
  public readonly greeting = 'Come in, Chosen One.';
  public readonly goodbye = 'Goodbye!';
  public readonly newGameCreated = 'New game started.';
  public readonly gameLoaded = 'Game is loaded.';
  public readonly congratulation = 'WIN!';
  public readonly unknownCommand = 'Something wrong happened.';
  public readonly help = 'Click on a number to move it.';

  public cantMoveNumber(number: number): string {
    return `You can't move ${number}.`;
  }

  public init(): void {}
}
