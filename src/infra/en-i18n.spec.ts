import { BoardConfig } from 'src/domain/board';

import { EnI18n } from './en-i18n';

class TestEnI18n extends EnI18n {
  public readonly boardConfig!: BoardConfig;
}

describe('EnI18n', () => {
  const boardConfig: BoardConfig = {
    sideSize: 4,
    maxNumber: 15,
  };
  let enI18n: TestEnI18n;

  beforeEach(() => {
    enI18n = new TestEnI18n({ boardConfig });
  });

  describe('constructor', () => {
    it('sets a board config', () => {
      expect(enI18n.boardConfig).toBe(boardConfig);
    });
  });

  describe('start', () => {
    it('has not empty strings after start', () => {
      enI18n.start();

      expect(enI18n.inputPrompt).not.toBeFalsy();
      expect(enI18n.greeting).not.toBeFalsy();
      expect(enI18n.goodbye).not.toBeFalsy();
      expect(enI18n.newGameCreated).not.toBeFalsy();
      expect(enI18n.gameLoaded).not.toBeFalsy();
      expect(enI18n.gameSaved).not.toBeFalsy();
      expect(enI18n.congratulation).not.toBeFalsy();
      expect(enI18n.unknownCommand).not.toBeFalsy();
      expect(enI18n.help).not.toBeFalsy();
    });
  });

  describe('stop', () => {
    it('must not fail', () => {
      expect(() => enI18n.stop()).not.toThrow();
    });
  });

  describe('cantMoveNumber', () => {
    it('returns a string that contains given number', () => {
      expect(enI18n.cantMoveNumber(999)).toContain('999');
    });
  });
});
