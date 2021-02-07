import { config } from './config';
import { EnI18n } from './infra/en-i18n';
import { Puzzle } from './domain/puzzle';
import { FileStorage } from './infra/file-storage';
import { KeyboardInput } from './infra/keyboard-input';
import { ConsoleDisplay } from './infra/console-display';

/**
 * Starts the game.
 */
export async function bootstrap() {
  const storage = new FileStorage({ config: config.storage });
  const display = new ConsoleDisplay({ boardConfig: config.board });
  const i18n = new EnI18n({ boardConfig: config.board });
  const input = new KeyboardInput({ i18n });

  const puzzle = new Puzzle({
    boardConfig: config.board,
    storage,
    display,
    input,
    i18n,
  });

  await puzzle.start();
}
