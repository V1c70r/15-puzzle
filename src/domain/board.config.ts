import { BoardConfig } from './board';

/**
 * The size of board's side.
 */
const BOARD_SIDE_SIZE = 4;

export const boardConfig: BoardConfig = {
  sideSize: BOARD_SIDE_SIZE,
  maxNumber: BOARD_SIDE_SIZE * BOARD_SIDE_SIZE - 1,
};
