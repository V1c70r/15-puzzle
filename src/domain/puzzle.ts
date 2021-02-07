import { Board, BoardState } from './board';

/**
 * 15 puzzle game logic.
 */
export class Puzzle {
  private readonly storage: Storage;
  private readonly display: Display;
  private readonly input: Input;
  private readonly i18n: I18n;
  private board!: Board;

  public constructor({storage, display, input, i18n}: PuzzleDependencies) {
    this.storage = storage;
    this.display = display;
    this.input = input;
    this.i18n = i18n;
  }

  public async start() {
    this.display.showMessage(this.i18n.greeting);
    this.display.showMessage(this.i18n.help);

    const prevState = this.storage.load();
    if (prevState) {
      this.display.showMessage(this.i18n.gameLoaded);
    } else {
      this.display.showMessage(this.i18n.newGameCreated);
    }

    this.board = new Board(prevState);
    this.display.drawState(this.board.getState());

    try {
      while (true) {
        this.processCommand(await this.input.getCommand());
      }
    } catch (error) {
      this.save();
      throw error;
    }
  }

  private processCommand(command: Command) {
    switch (command.type) {
      case 'move':
        this.onMove(command.number);
        break;

      case 'new':
        this.onNew();
        break;

      case 'exit':
        this.onExit();
        break;

      case 'unknown':
        this.onUnknown();
        break;
    }
  }

  private onMove(number: number) {
    if (this.board.move(number)) {
      this.display.drawState(this.board.getState());

      if (this.board.isCompleted()) {
        this.display.showCongratulation(this.i18n.congratulation);
        this.onNew();
      }
    } else {
      this.display.showError(this.i18n.cantMoveNumber(number));
    }
  }

  private onNew() {
    this.board = new Board();
    this.display.showMessage(this.i18n.newGameCreated);
    this.display.drawState(this.board.getState());
    this.save();
  }

  private onExit() {
    this.save();
    this.display.showMessage(this.i18n.goodbye);
    this.input.stop();
    process.exit();
  }

  private onUnknown() {
    this.display.showError(this.i18n.unknownCommand);
    this.display.showMessage(this.i18n.help);
  }

  private save() {
    this.storage.save(this.board.getState());
    this.display.showMessage(this.i18n.gameSaved);
  }
}

export type Command = { type: 'move', number: number } | { type: 'new' } | { type: 'exit' } | { type: 'unknown' };

export interface PuzzleDependencies {
  storage: Storage;
  display: Display;
  input: Input;
  i18n: I18n;
}

export interface Storage {
  load(): BoardState | undefined;
  save(state: BoardState): void;
}

export interface Display {
  showMessage(message: string): void;
  showError(error: string): void;
  showCongratulation(message: string): void;
  drawState(state: BoardState): void;
}

export interface Input {
  getCommand(): Promise<Command>;
  stop(): void;
}

export interface I18n {
  greeting: string;
  goodbye: string;
  newGameCreated: string;
  gameLoaded: string;
  gameSaved: string;
  congratulation: string;
  cantMoveNumber: (number: number) => string;
  unknownCommand: string;
  help: string;
}
