import { boardConfig } from 'src/domain/board.config';

describe('boardConfig', () => {
  describe('sideSize', () => {
    it('is >= 2', () => {
      expect(boardConfig.sideSize).toBeGreaterThanOrEqual(2);
    });
  });

  describe('maxNumber', () => {
    it(`contains board's maximum number according to board's square size`, () => {
      expect(boardConfig.maxNumber).toBe(boardConfig.sideSize ** 2 - 1);
    });
  });
});
