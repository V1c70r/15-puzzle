describe('Board', () => {
  describe('constructor', () => {
    it('set a config');

    it('set a new random state if there is no given state');

    it('set given state if there is given state');
  });

  describe('createRandomState', () => {
    it('returns numbers with needed shape');

    it('returns emptiness coordinates');

    it('returns random numbers');
  });

  describe('move', () => {
    it('returns false for invalid numbers');

    it('does not change state for invalid numbers');

    it('returns false for not movable numbers');

    it('does not change state for not movable numbers');

    it('can move a number up');

    it('can move a number down');

    it('can move a number left');

    it('can move a number right');

    it('returns true if a number is movable');
  });

  describe('canMove', () => {
    it('returns false if a number can not be move');

    it('returns true if a number can not be up');

    it('returns true if a number can not be down');

    it('returns true if a number can not be right');

    it('returns true if a number can not be left');
  });

  describe('getNumber', () => {
    it('returns a number for valid coordinates');

    it('throws an error for invalid coordinates');
  });

  describe('getNumberOrUndefined', () => {
    it('returns a number for valid coordinates');

    it('returns undefined for invalid coordinates');
  });

  describe('setNumber', () => {
    it('set a number in a board for valid coordinates');

    it('throws an error for invalid coordinates');
  });

  describe('isValidCoordinate', () => {
    it('returns true for a valid coordinate');

    it('returns false for an invalid coordinate');
  });

  describe('isValidCoordinates', () => {
    it('returns true for a valid coordinates');

    it('returns false for an invalid coordinates');
  });

  describe('checkCoordinates', () => {
    it('throws an error for an invalid coordinates');

    it('does not throw an error for an valid coordinates');
  });

  describe('swap', () => {
    it('swaps two numbers in the board state');

    it('updates the emptiness coordinates');

    it('throws an error for an invalid coordinates');
  });

  describe('getState', () => {
    it('returns the current state of the board');
  });

  describe('isCompleted', () => {
    it('returns true if the puzzle is completed');

    it('returns false if the puzzle is not completed yet');
  });
});
