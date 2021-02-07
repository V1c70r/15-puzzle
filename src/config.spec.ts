import { config } from './config';

describe('config', () => {
  it(`contains board's maximum number according to board's square size`, () => {
    expect(config.board.maxNumber).toBe(config.board.sideSize ** 2 - 1);
  });
});
