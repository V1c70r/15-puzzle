import { Puzzle } from './puzzle';
import { Board, BoardConfig } from './board';
import { Display, I18n, Input, PuzzleDependencies, Storage } from './contract';

class TestPuzzle extends Puzzle {
  public readonly boardConfig!: BoardConfig;
  public readonly storage!: Storage;
  public readonly display!: Display;
  public readonly input!: Input;
  public readonly i18n!: I18n;
  public board!: Board;

  public processingCycle(): Promise<never> {
    return super.processingCycle();
  }

  public loadBoard(): void {
    super.loadBoard();
  }

  public createNewBoard(): void {
    super.createNewBoard();
  }
}

describe('Puzzle', () => {
  let dependencies: PuzzleDependencies;
  beforeEach(() => {
    dependencies = {
      boardConfig: {
        sideSize: 4,
        maxNumber: 15,
      },
      storage: {
        start: jest.fn(),
        stop: jest.fn(),
        load: jest.fn(),
        save: jest.fn(),
      },
      display: {
        start: jest.fn(),
        stop: jest.fn(),
        showMessage: jest.fn(),
        showError: jest.fn(),
        showCongratulation: jest.fn(),
        drawState: jest.fn(),
      },
      input: {
        start: jest.fn(),
        stop: jest.fn(),
        getCommand: jest.fn(),
      },
      i18n: {
        start: jest.fn(),
        stop: jest.fn(),
        inputPrompt: 'INPUT PROMPT',
        greeting: 'GREETING',
        goodbye: 'GOODBYE',
        newGameCreated: 'NEW GAME CREATED',
        gameLoaded: 'GAME LOADED',
        gameSaved: 'GAME SAVED',
        congratulation: 'CONGRATULATION',
        unknownCommand: 'UNKNOWN COMMAND',
        help: 'HELP',
        cantMoveNumber: (number: number) => `CAN NOT MOVE ${number}`,
      },
    };
  });

  let puzzle: TestPuzzle;
  beforeEach(() => {
    puzzle = new TestPuzzle(dependencies);
  });

  describe('constructor', () => {
    it('sets dependencies', () => {
      expect(puzzle.boardConfig).toBe(dependencies.boardConfig);
      expect(puzzle.storage).toBe(dependencies.storage);
      expect(puzzle.display).toBe(dependencies.display);
      expect(puzzle.input).toBe(dependencies.input);
      expect(puzzle.i18n).toBe(dependencies.i18n);
    });
  });

  describe('start', () => {
    beforeEach(() => {
      jest.spyOn(puzzle, 'processingCycle').mockImplementation();
    });

    it('starts dependencies', async () => {
      expect(dependencies.storage.start).not.toHaveBeenCalled();
      expect(dependencies.display.start).not.toHaveBeenCalled();
      expect(dependencies.input.start).not.toHaveBeenCalled();
      expect(dependencies.i18n.start).not.toHaveBeenCalled();

      await puzzle.start();

      expect(dependencies.storage.start).toHaveBeenCalledTimes(1);
      expect(dependencies.display.start).toHaveBeenCalledTimes(1);
      expect(dependencies.input.start).toHaveBeenCalledTimes(1);
      expect(dependencies.i18n.start).toHaveBeenCalledTimes(1);
    });

    it('shows greeting message', async () => {
      expect(dependencies.display.showMessage).not.toHaveBeenCalledWith(dependencies.i18n.greeting);

      await puzzle.start();

      expect(dependencies.display.showMessage).toHaveBeenCalledWith(dependencies.i18n.greeting);
    });

    it('shows help message', async () => {
      expect(dependencies.display.showMessage).not.toHaveBeenCalledWith(dependencies.i18n.help);

      await puzzle.start();

      expect(dependencies.display.showMessage).toHaveBeenCalledWith(dependencies.i18n.help);
    });

    it('loads saved a board', async () => {
      const spyOnLoadBoard = jest
        .spyOn(puzzle, 'loadBoard')
        .mockImplementation(function (this: TestPuzzle) {
          this.board = new Board({ config: dependencies.boardConfig });
        });
      const spyOnCreateNewBoard = jest.spyOn(puzzle, 'createNewBoard');

      expect(spyOnLoadBoard).not.toHaveBeenCalled();

      await puzzle.start();

      expect(spyOnLoadBoard).toHaveBeenCalled();
      expect(spyOnCreateNewBoard).not.toHaveBeenCalled();
    });

    it('creates a new board if there is no saved board', async () => {
      jest.spyOn(puzzle, 'loadBoard').mockImplementation(() => {});
      const spyOnCreateNewBoard = jest.spyOn(puzzle, 'createNewBoard');

      expect(spyOnCreateNewBoard).not.toHaveBeenCalled();

      await puzzle.start();

      expect(spyOnCreateNewBoard).toHaveBeenCalled();
    });

    it.todo('starts processing cycle');

    it.todo('stops the game if an error is thrown');
  });

  describe('stop', () => {
    it.todo('saves a board');

    it.todo('shows goodbye message');

    it.todo('stops dependencies');

    it.todo('stops the process without arguments');

    it.todo('throws an error if it is given');
  });

  describe('processingCycle', () => {
    it.todo('TODO');
  });

  describe('stopProcess', () => {
    it.todo('stops the process');
  });

  describe('processCommand', () => {
    it.todo('moves number for move command');

    it.todo('creates a new board for new command');

    it.todo('stops the game for exit command');

    it.todo('shows unkwnown error for unkwnown command');
  });

  describe('moveNumber', () => {
    describe('an invalid number', () => {
      it.todo('shows an error');

      it.todo('does not change the board');
    });

    describe('a not movable number', () => {
      it.todo('shows an error');

      it.todo('does not change the board');
    });

    describe('a moveable number', () => {
      it.todo('moves the number inside the board');

      it.todo('draws a new state of the board');

      it.todo('does not show congratulation if the board is not completed');

      it.todo('shows congratulation if the board is completed');

      it.todo('creates a new board if the board is completed');
    });

    describe('createNewBoard', () => {
      it.todo('creates a new board');

      it.todo('shows new game created message');

      it.todo('draws the state of the new board');

      it.todo('saves the state of the new board');
    });

    describe('showUnknownError', () => {
      it.todo('shows unknown command error');

      it.todo('shows help');
    });

    describe('loadBoard', () => {
      it.todo('loads a state from the storage');

      describe('saved state', () => {
        it.todo('creates a new board with the loaded state');
        it.todo('shows game loaded message');
        it.todo('draws the loaded state');
      });

      describe('no saved state', () => {
        it.todo('does not create a new board');
        it.todo('does not show game loaded message');
        it.todo('does not draws the state');
      });
    });

    describe('saveBoard', () => {
      it.todo('saves the state of the board');

      it.todo('shows game saved message');
    });

    describe('drawState', () => {
      it.todo('draw the state of the board');
    });
  });
});
