/**
 * A contract between domain and infrastructure level.
 */

import { BoardConfig } from './board';

/**
 * A number to represent the empty space in the board.
 */
export const EMPTINESS = 0;

export interface BoardState {
  x: number;
  y: number;
  numbers: number[][];
}

export type Command =
  | { type: 'move'; number: number }
  | { type: 'new' }
  | { type: 'exit' }
  | { type: 'unknown' };

export interface PuzzleDependencies {
  boardConfig: BoardConfig;
  storage: Storage;
  display: Display;
  input: Input;
  i18n: I18n;
}

export interface Storage extends Service {
  load(): BoardState | undefined;
  save(state: BoardState): void;
}

export interface Display extends Service {
  showMessage(message: string): void;
  showError(error: string): void;
  showCongratulation(message: string): void;
  drawState(state: BoardState): void;
}

export interface Input extends Service {
  getCommand(): Promise<Command>;
}

export interface I18n extends Service {
  readonly inputPrompt: string;
  readonly greeting: string;
  readonly goodbye: string;
  readonly newGameCreated: string;
  readonly gameLoaded: string;
  readonly gameSaved: string;
  readonly congratulation: string;
  readonly unknownCommand: string;
  readonly help: string;
  cantMoveNumber: (number: number) => string;
}

export interface Service {
  start(): void;
  stop(): void;
}
