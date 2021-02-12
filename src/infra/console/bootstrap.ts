import { Puzzle } from 'src/domain/puzzle';
import { boardConfig } from 'src/domain/board.config';
import { ConsoleEnI18n } from 'src/infra/console/console-en-i18n';

import { FileStorage } from './file-storage';
import { KeyboardInput } from './keyboard-input';
import { ConsoleDisplay } from './console-display';
import { fileStorageConfig } from './config/file-storage.config';
import { consoleDisplayConfig } from './config/console-display.config';

/**
 * Starts the game.
 */
export async function bootstrap(): Promise<void> {
  const storage = new FileStorage({ config: fileStorageConfig });
  const display = new ConsoleDisplay({ boardConfig, config: consoleDisplayConfig });
  const i18n = new ConsoleEnI18n({ boardConfig });
  const input = new KeyboardInput({ i18n });

  const puzzle = new Puzzle({
    boardConfig,
    storage,
    display,
    input,
    i18n,
    processExit: () => process.exit(),
  });

  await puzzle.start();
}
