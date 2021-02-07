import fs from 'fs';

import { BoardState, Storage } from 'src/domain/contract';

/**
 * Simple storage for the game state.
 */
export class FileStorage implements Storage {
  private readonly config: FileStorageConfig;

  public constructor({ config }: { config: FileStorageConfig }) {
    this.config = config;
  }

  public start(): void {}

  public stop(): void {}

  public load(): BoardState | undefined {
    if (fs.existsSync(this.config.filePath)) {
      return JSON.parse(fs.readFileSync(this.config.filePath).toString());
    }
  }

  public save(state: BoardState): void {
    fs.writeFileSync(this.config.filePath, JSON.stringify(state, null, this.config.identInFile));
  }
}

export interface FileStorageConfig {
  readonly filePath: string;
  readonly identInFile: number;
}
