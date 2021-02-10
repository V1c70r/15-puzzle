import { boardConfig } from './board-config';

describe('boardConfig', () => {
  it(`contains board's maximum number according to board's square size`, () => {
    expect(boardConfig.maxNumber).toBe(boardConfig.sideSize ** 2 - 1);
  });
});
