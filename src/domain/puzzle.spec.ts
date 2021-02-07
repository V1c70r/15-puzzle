describe('Puzzle', () => {
  describe('constructor', () => {
    it('sets dependencies');
  });

  describe('start', () => {
    it('starts dependencies');

    it('shows greeting message');

    it('shows help message');

    it('loads saved a board');

    it('creates a new board if there is no saved board');

    it('processes inputs commands');

    it('stops the game if an error is thrown');
  });

  describe('stop', () => {
    it('saves a board');

    it('shows goodbye message');

    it('stops dependencies');

    it('stops the process');
  });

  describe('stopProcess', () => {
    it('stops the process');
  });

  describe('processCommand', () => {
    it('moves number for move command');

    it('creates a new board for new command');

    it('stops the game for exit command');

    it('shows unkwnown error for unkwnown command');
  });

  describe('moveNumber', () => {
    describe('an invalid number', () => {
      it('shows an error');

      it('does not change the board');
    });

    describe('a not movable number', () => {
      it('shows an error');

      it('does not change the board');
    });

    describe('a moveable number', () => {
      it('moves the number inside the board');

      it('draws a new state of the board');

      it('does not show congratulation if the board is not completed');

      it('shows congratulation if the board is completed');

      it('creates a new board if the board is completed');
    });

    describe('createNewBoard', () => {
      it('creates a new board');

      it('shows new game created message');

      it('draws the state of the new board');

      it('saves the state of the new board');
    });

    describe('showUnknownError', () => {
      it('shows unknown command error');

      it('shows help');
    });

    describe('loadBoard', () => {
      it('loads a state from the storage');

      describe('saved state', () => {
        it('creates a new board with the loaded state');
        it('shows game loaded message');
        it('draws the loaded state');
      });

      describe('no saved state', () => {
        it('does not create a new board');
        it('does not show game loaded message');
        it('does not draws the state');
      });
    });

    describe('saveBoard', () => {
      it('saves the state of the board');

      it('shows game saved message');
    });

    describe('drawState', () => {
      it('draw the state of the board');
    });
  });
});
