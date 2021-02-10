import readline from 'readline';

import { Command, I18n, Input } from 'src/domain/contract';

/**
 * Simple keyboard input.
 */
export class KeyboardInput implements Input {
  protected readonly i18n: I18n;
  protected input!: readline.Interface;

  public constructor({ i18n }: { i18n: I18n }) {
    this.i18n = i18n;
  }

  public start(): void {
    this.input = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public stop(): void {
    this.input.close();
  }

  public getCommand(): Promise<Command> {
    return new Promise(resolve => {
      this.input.question(this.i18n.inputPrompt, string => {
        const command = this.stringToCommand(string);
        resolve(command);
      });
    });
  }

  protected stringToCommand(string: string): Command {
    switch (string) {
      case 'new':
        return { type: 'new' };
      case 'exit':
        return { type: 'exit' };
    }

    const asNumber = Number(string);
    if (isNaN(asNumber)) {
      return { type: 'unknown' };
    }

    return { type: 'move', number: asNumber };
  }
}
