import path from 'path';

import { BoardConfig } from './domain/board';
import { FileStorageConfig } from './infra/file-storage';

/**
 * The size of board's side.
 */
const BOARD_SIDE_SIZE = 4;

export const config: Config = {
  board: {
    sideSize: BOARD_SIDE_SIZE,
    maxNumber: BOARD_SIDE_SIZE * BOARD_SIDE_SIZE - 1,
  },
  storage: {
    filePath: path.resolve(__dirname, '..', 'data', 'state.json'),
    identInFile: 2,
  },
};

interface Config {
  board: BoardConfig;
  storage: FileStorageConfig;
}
