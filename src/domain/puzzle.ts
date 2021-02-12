import { Board, BoardConfig } from './board';
import { Command, Display, I18n, Input, PuzzleDependencies, Storage } from './contract';

/**
 * 15 puzzle game logic.
 */
export class Puzzle {
  protected readonly boardConfig: BoardConfig;
  protected readonly storage: Storage;
  protected readonly display: Display;
  protected readonly input: Input;
  protected readonly i18n: I18n;
  protected readonly processExit: () => void;
  protected board!: Board;

  public constructor({
    boardConfig,
    storage,
    display,
    input,
    i18n,
    processExit,
  }: PuzzleDependencies) {
    this.boardConfig = boardConfig;
    this.storage = storage;
    this.display = display;
    this.input = input;
    this.i18n = i18n;
    this.processExit = processExit;
  }

  public async start(): Promise<void> {
    this.i18n.init();

    this.display.showMessage(this.i18n.greeting);
    this.display.showMessage(this.i18n.help);

    this.loadBoard();
    if (!this.board) {
      this.createNewBoard();
    }

    this.input.start(command => this.processCommand(command));
  }

  public stop(): void {
    this.saveBoard();

    this.display.showMessage(this.i18n.goodbye);
    this.input.stop();

    this.processExit();
  }

  protected processCommand(command: Command): void {
    try {
      switch (command.type) {
        case 'move':
          this.moveNumber(command.number);
          break;

        case 'new':
          this.createNewBoard();
          break;

        case 'exit':
          this.stop();
          break;

        case 'unknown':
          this.showUnknownError();
          break;
      }
    } catch (error) {
      this.saveBoard();
      throw error;
    }
  }

  protected moveNumber(number: number): void {
    if (this.board.move(number)) {
      this.drawState();

      if (this.board.isCompleted()) {
        this.display.showCongratulation(this.i18n.congratulation);
        this.createNewBoard();
      } else {
        this.saveBoard();
      }
    } else {
      this.display.showError(this.i18n.cantMoveNumber(number));
    }
  }

  protected createNewBoard(): void {
    this.board = new Board({ config: this.boardConfig });

    this.display.showMessage(this.i18n.newGameCreated);
    this.drawState();

    this.saveBoard();
  }

  protected showUnknownError(): void {
    this.display.showError(this.i18n.unknownCommand);
    this.display.showMessage(this.i18n.help);
  }

  protected loadBoard(): void {
    const state = this.storage.load();
    if (state) {
      this.board = new Board({ config: this.boardConfig, state });
      this.display.showMessage(this.i18n.gameLoaded);
      this.drawState();
    }
  }

  protected saveBoard(): void {
    this.storage.save(this.board.getState());
  }

  protected drawState(): void {
    this.display.drawState(this.board.getState());
  }
}
