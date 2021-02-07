import { Board, BoardConfig } from './board';
import { Command, Display, I18n, Input, Service, Storage } from './contract';

/**
 * 15 puzzle game logic.
 */
export class Puzzle implements Service {
  private readonly boardConfig: BoardConfig;
  private readonly storage: Storage;
  private readonly display: Display;
  private readonly input: Input;
  private readonly i18n: I18n;
  private board!: Board;

  public constructor({
    boardConfig,
    storage,
    display,
    input,
    i18n,
  }: {
    boardConfig: BoardConfig;
    storage: Storage;
    display: Display;
    input: Input;
    i18n: I18n;
  }) {
    this.boardConfig = boardConfig;
    this.storage = storage;
    this.display = display;
    this.input = input;
    this.i18n = i18n;
  }

  public async start() {
    this.storage.start();
    this.display.start();
    this.input.start();
    this.i18n.start();

    this.display.showMessage(this.i18n.greeting);
    this.display.showMessage(this.i18n.help);

    this.loadBoard();
    if (!this.board) {
      this.createNewBoard();
    }

    try {
      while (true) {
        this.processCommand(await this.input.getCommand());
      }
    } catch (error) {
      this.saveBoard();
      throw error;
    }
  }

  public stop() {
    this.saveBoard();

    this.display.showMessage(this.i18n.goodbye);

    this.i18n.stop();
    this.input.stop();
    this.display.stop();
    this.storage.stop();

    process.exit();
  }

  private processCommand(command: Command) {
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
  }

  private moveNumber(number: number) {
    if (this.board.move(number)) {
      this.drawState();

      if (this.board.isCompleted()) {
        this.display.showCongratulation(this.i18n.congratulation);
        this.createNewBoard();
      }
    } else {
      this.display.showError(this.i18n.cantMoveNumber(number));
    }
  }

  private createNewBoard() {
    this.board = new Board({ config: this.boardConfig });

    this.display.showMessage(this.i18n.newGameCreated);
    this.drawState();

    this.saveBoard();
  }

  private showUnknownError() {
    this.display.showError(this.i18n.unknownCommand);
    this.display.showMessage(this.i18n.help);
  }

  private loadBoard() {
    const state = this.storage.load();
    if (state) {
      this.board = new Board({ config: this.boardConfig, state });
      this.display.showMessage(this.i18n.gameLoaded);
      this.drawState();
    }
  }

  private saveBoard() {
    this.storage.save(this.board.getState());
    this.display.showMessage(this.i18n.gameSaved);
  }

  private drawState() {
    this.display.drawState(this.board.getState());
  }
}
