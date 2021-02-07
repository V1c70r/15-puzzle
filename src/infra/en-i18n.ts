import { EOL } from 'os';

import { I18n } from "src/domain/puzzle";
import { BOARD_MAX_NUMBER } from 'src/config';

/**
 * English internationalization.
 */
export const enI18n: I18n = {
  greeting: 'Come in, Chosen One.',
  goodbye: 'Goodbye!',
  newGameCreated: 'New game started.',
  gameLoaded: 'Game is loaded.',
  gameSaved: 'Game is saved.',
  congratulation: 'You win!',
  cantMoveNumber: (number: number) => `You can't move ${number}.`,
  unknownCommand: 'You entered an unknown command.',
  help: [
    'Please input a command.',
    'Allowed commands:',
    `  number from 1 to ${BOARD_MAX_NUMBER} - move a number`,
    '  new - shuffle the puzzle',
    '  exit - save and stop the game'
  ].join(EOL)
};
