import readline from 'readline';

import { INPUT_PROMPT } from 'src/config';
import { Command, Input } from 'src/domain/puzzle';

/**
 * Simple keyboard input.
 */
export class KeyboardInput implements Input {
  private readonly input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  public getCommand(): Promise<Command> {
    return new Promise(resolve => {
      this.input.question(INPUT_PROMPT, string => {
        const command = this.stringToCommand(string);
        resolve(command);
      });
    });
  }

  public stop(): void {
    this.input.close();
  }

  private stringToCommand(string: string): Command {
    switch (string) {
      case 'new': return { type: 'new' };
      case 'exit': return { type: 'exit' };
    }

    const asNumber = Number(string);
    if (isNaN(asNumber)) {
      return { type: 'unknown' };
    }

    return { type: 'move', number: asNumber };
  }
}
