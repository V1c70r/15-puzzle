import { Puzzle } from './puzzle';
import { Board, BoardConfig } from './board';
import { BoardState, Command, Display, I18n, Input, PuzzleDependencies, Storage } from './contract';

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

  public processCommand(command: Command): void {
    super.processCommand(command);
  }

  public moveNumber(number: number): void {
    super.moveNumber(number);
  }

  public showUnknownError(): void {
    super.showUnknownError();
  }

  public saveBoard(): void {
    super.saveBoard();
  }

  public drawState(): void {
    super.drawState();
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
      jest.spyOn(puzzle, 'loadBoard').mockImplementation();
      const spyOnCreateNewBoard = jest.spyOn(puzzle, 'createNewBoard');

      expect(spyOnCreateNewBoard).not.toHaveBeenCalled();

      await puzzle.start();

      expect(spyOnCreateNewBoard).toHaveBeenCalled();
    });

    it('starts processing cycle', async () => {
      const spyOnProcessingCycle = jest.spyOn(puzzle, 'processingCycle').mockImplementation();

      expect(spyOnProcessingCycle).not.toHaveBeenCalled();

      await puzzle.start();

      expect(spyOnProcessingCycle).toHaveBeenCalled();
    });

    it('stops with an error if processing cycle failed', async () => {
      const spyOnStop = jest.spyOn(puzzle, 'stop').mockImplementation();
      jest.spyOn(puzzle, 'processingCycle').mockImplementation(() => {
        throw new Error('Ups!');
      });

      expect(spyOnStop).not.toHaveBeenCalled();

      await puzzle.start();

      expect(spyOnStop).toHaveBeenCalled();
      expect(spyOnStop.mock.calls[0].toString()).toBe('Error: Ups!');
    });
  });

  describe('stop', () => {
    let spyOnProcessExit: jest.SpyInstance;
    let spyOnSaveBoard: jest.SpyInstance;

    beforeEach(() => {
      spyOnProcessExit = jest.spyOn(process, 'exit').mockImplementation();
      spyOnSaveBoard = jest.spyOn(puzzle, 'saveBoard').mockImplementation();
    });

    it('saves a board', () => {
      expect(spyOnSaveBoard).not.toHaveBeenCalled();

      puzzle.stop();

      expect(spyOnSaveBoard).toHaveBeenCalled();
    });

    it('shows goodbye message', () => {
      expect(dependencies.display.showMessage).not.toHaveBeenCalledWith(dependencies.i18n.goodbye);

      puzzle.stop();

      expect(dependencies.display.showMessage).toHaveBeenCalledWith(dependencies.i18n.goodbye);
    });

    it('stops dependencies', () => {
      expect(dependencies.storage.stop).not.toHaveBeenCalled();
      expect(dependencies.display.stop).not.toHaveBeenCalled();
      expect(dependencies.input.stop).not.toHaveBeenCalled();
      expect(dependencies.i18n.stop).not.toHaveBeenCalled();

      puzzle.stop();

      expect(dependencies.storage.stop).toHaveBeenCalledTimes(1);
      expect(dependencies.display.stop).toHaveBeenCalledTimes(1);
      expect(dependencies.input.stop).toHaveBeenCalledTimes(1);
      expect(dependencies.i18n.stop).toHaveBeenCalledTimes(1);
    });

    it('stops the process if no argument given', () => {
      expect(spyOnProcessExit).not.toHaveBeenCalled();

      puzzle.stop();

      expect(spyOnProcessExit).toHaveBeenCalled();
    });

    it('throws an error if it is given', () => {
      expect(() => puzzle.stop(new Error('Ups!'))).toThrow('Ups!');
    });
  });

  describe('processingCycle', () => {
    it.todo('TODO');
  });

  describe('processCommand', () => {
    let spyOnMoveNumber: jest.SpyInstance;
    let spyOnCreateNewBoard: jest.SpyInstance;
    let spyOnStop: jest.SpyInstance;
    let spyOnShowUnknownError: jest.SpyInstance;

    beforeEach(() => {
      spyOnMoveNumber = jest.spyOn(puzzle, 'moveNumber').mockImplementation();
      spyOnCreateNewBoard = jest.spyOn(puzzle, 'createNewBoard').mockImplementation();
      spyOnStop = jest.spyOn(puzzle, 'stop').mockImplementation();
      spyOnShowUnknownError = jest.spyOn(puzzle, 'showUnknownError').mockImplementation();
    });

    it('moves number for move command', () => {
      puzzle.processCommand({ type: 'move', number: 10 });

      expect(spyOnMoveNumber).toHaveBeenCalledWith(10);
      expect(spyOnCreateNewBoard).not.toHaveBeenCalled();
      expect(spyOnStop).not.toHaveBeenCalled();
      expect(spyOnShowUnknownError).not.toHaveBeenCalled();
    });

    it('creates a new board for new command', () => {
      puzzle.processCommand({ type: 'new' });

      expect(spyOnMoveNumber).not.toHaveBeenCalled();
      expect(spyOnCreateNewBoard).toHaveBeenCalled();
      expect(spyOnStop).not.toHaveBeenCalled();
      expect(spyOnShowUnknownError).not.toHaveBeenCalled();
    });

    it('stops the game for exit command', () => {
      puzzle.processCommand({ type: 'exit' });

      expect(spyOnMoveNumber).not.toHaveBeenCalled();
      expect(spyOnCreateNewBoard).not.toHaveBeenCalled();
      expect(spyOnStop).toHaveBeenCalled();
      expect(spyOnShowUnknownError).not.toHaveBeenCalled();
    });

    it('shows unknown error for unknown command', () => {
      puzzle.processCommand({ type: 'unknown' });

      expect(spyOnMoveNumber).not.toHaveBeenCalled();
      expect(spyOnCreateNewBoard).not.toHaveBeenCalled();
      expect(spyOnStop).not.toHaveBeenCalled();
      expect(spyOnShowUnknownError).toHaveBeenCalled();
    });
  });

  describe('moveNumber', () => {
    beforeEach(async () => {
      jest.spyOn(dependencies.storage, 'load').mockImplementation(
        (): BoardState => ({
          x: 0,
          y: 0,
          numbers: [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
          ],
        }),
      );

      jest.spyOn(puzzle, 'processingCycle').mockImplementation();

      await puzzle.start();
    });

    describe('an invalid number', () => {
      it('shows an error', () => {
        expect(dependencies.display.showError).not.toHaveBeenCalledWith(
          dependencies.i18n.cantMoveNumber(1000),
        );

        puzzle.moveNumber(1000);

        expect(dependencies.display.showError).toHaveBeenCalledWith(
          dependencies.i18n.cantMoveNumber(1000),
        );
      });

      it('does not change the board', () => {
        puzzle.moveNumber(1000);

        expect(puzzle.board.getState()).toEqual({
          x: 0,
          y: 0,
          numbers: [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
          ],
        });
      });
    });

    describe('a not movable number', () => {
      it('shows an error', () => {
        expect(dependencies.display.showError).not.toHaveBeenCalledWith(
          dependencies.i18n.cantMoveNumber(10),
        );

        puzzle.moveNumber(10);

        expect(dependencies.display.showError).toHaveBeenCalledWith(
          dependencies.i18n.cantMoveNumber(10),
        );
      });

      it('does not change the board', () => {
        puzzle.moveNumber(10);

        expect(puzzle.board.getState()).toEqual({
          x: 0,
          y: 0,
          numbers: [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
          ],
        });
      });

      describe('a moveable number', () => {
        it('moves the number inside the board', () => {
          const spyOnMove = jest.spyOn(puzzle.board, 'move').mockImplementation();

          expect(spyOnMove).not.toHaveBeenCalled();

          puzzle.moveNumber(1);

          expect(spyOnMove).toHaveBeenCalledWith(1);
        });

        it('draws a new state of the board', () => {
          puzzle.moveNumber(1);

          expect(dependencies.display.drawState).toHaveBeenCalledWith({
            x: 1,
            y: 0,
            numbers: [
              [1, 0, 2, 3],
              [4, 5, 6, 7],
              [8, 9, 10, 11],
              [12, 13, 14, 15],
            ],
          });
        });

        it.todo('does not show congratulation if the board is not completed');

        it.todo('shows congratulation if the board is completed');

        it.todo('creates a new board if the board is completed');
      });
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
