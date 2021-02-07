import fs from 'fs';

import { Storage } from 'src/domain/puzzle';
import { BoardState } from 'src/domain/board';
import { STORAGE_IDENT_IN_STATE_FILE, STORAGE_STATE_FILE } from 'src/config';

/**
 * Simple storage for the game state.
 */
export class FileStorage implements Storage {
  public load(): BoardState | undefined {
    if (fs.existsSync(STORAGE_STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STORAGE_STATE_FILE).toString());
    }
  }

  public save(state: BoardState): void {
    fs.writeFileSync(STORAGE_STATE_FILE, JSON.stringify(state, null, STORAGE_IDENT_IN_STATE_FILE));
  }
}
