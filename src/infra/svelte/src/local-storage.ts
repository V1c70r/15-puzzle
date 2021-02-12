import { BoardState, Storage } from './domain/contract';

/**
 * Local storage for the game state.
 */
export class LocalStorage implements Storage {
  protected readonly config: LocalStorageConfig;

  public constructor({ config }: { config: LocalStorageConfig }) {
    this.config = config;
  }

  public load(): BoardState | undefined {
    try {
      return JSON.parse(localStorage.getItem(this.config.key));
    } catch (error) {
      console.error(error);
    }
  }

  public save(state: BoardState): void {
    localStorage.setItem(this.config.key, JSON.stringify(state));
  }
}

export interface LocalStorageConfig {
  key: string;
}
