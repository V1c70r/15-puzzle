import path from 'path';

/**
 * Board config parameters.
 */
export const BOARD_SIDE_SIZE = 4;
export const BOARD_MAX_NUMBER = BOARD_SIDE_SIZE * BOARD_SIDE_SIZE - 1;

/**
 * Storage config parameters.
 */
export const STORAGE_STATE_FILE = path.resolve(__dirname, '..', 'data', 'state.json');
export const STORAGE_IDENT_IN_STATE_FILE = 2;

/**
 * Input config parameters.
 */
export const INPUT_PROMPT = '> ';

/**
 * Display config parameters.
 */
export const DISPLAY_NUMBER_WIDTH = BOARD_MAX_NUMBER.toString().length;

// TODO pass config as constructor parameters.
// TODO add config interfaces
