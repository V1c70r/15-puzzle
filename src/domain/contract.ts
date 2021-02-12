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
  processExit: () => void;
}

export interface Storage {
  load(): BoardState | undefined;
  save(state: BoardState): void;
}

export interface Display {
  showMessage(message: string): void;
  showError(error: string): void;
  showCongratulation(message: string): void;
  drawState(state: BoardState): void;
}

export interface Input {
  start(callback: (command: Command) => void): void;
  stop(): void;
}

export interface I18n {
  readonly inputPrompt: string;
  readonly greeting: string;
  readonly goodbye: string;
  readonly newGameCreated: string;
  readonly gameLoaded: string;
  readonly congratulation: string;
  readonly unknownCommand: string;
  readonly help: string;
  cantMoveNumber: (number: number) => string;
  init(): void;
}
