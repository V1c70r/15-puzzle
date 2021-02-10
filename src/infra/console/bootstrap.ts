import { EnI18n } from 'src/infra/en-i18n';
import { Puzzle } from 'src/domain/puzzle';
import { boardConfig } from 'src/config/board-config';

import { FileStorage } from './file-storage';
import { KeyboardInput } from './keyboard-input';
import { ConsoleDisplay } from './console-display';
import { fileStorageConfig } from 'src/config/file-storage-config';

/**
 * Starts the game.
 */
export async function bootstrap(): Promise<void> {
  const storage = new FileStorage({ config: fileStorageConfig });
  const display = new ConsoleDisplay({ boardConfig });
  const i18n = new EnI18n({ boardConfig });
  const input = new KeyboardInput({ i18n });

  const puzzle = new Puzzle({
    boardConfig,
    storage,
    display,
    input,
    i18n,
  });

  await puzzle.start();
}
