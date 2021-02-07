import { Board, BoardConfig } from './board';
import { Command, Display, I18n, Input, PuzzleDependencies, Service, Storage } from './contract';

/**
 * 15 puzzle game logic.
 */
export class Puzzle implements Service {
  protected readonly boardConfig: BoardConfig;
  protected readonly storage: Storage;
  protected readonly display: Display;
  protected readonly input: Input;
  protected readonly i18n: I18n;
  protected board!: Board;

  public constructor({ boardConfig, storage, display, input, i18n }: PuzzleDependencies) {
    this.boardConfig = boardConfig;
    this.storage = storage;
    this.display = display;
    this.input = input;
    this.i18n = i18n;
  }

  public async start(): Promise<void> {
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
      await this.processingCycle();
    } catch (error) {
      this.stop(error);
    }
  }

  public stop(error?: Error): void {
    this.saveBoard();

    this.display.showMessage(this.i18n.goodbye);

    this.i18n.stop();
    this.input.stop();
    this.display.stop();
    this.storage.stop();

    if (error) {
      throw error;
    } else {
      this.stopProcess();
    }
  }

  protected async processingCycle(): Promise<never> {
    while (true) {
      this.processCommand(await this.input.getCommand());
    }
  }

  protected stopProcess(): never {
    process.exit();
  }

  protected processCommand(command: Command): void {
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

  protected moveNumber(number: number): void {
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
    this.display.showMessage(this.i18n.gameSaved);
  }

  protected drawState(): void {
    this.display.drawState(this.board.getState());
  }
}
