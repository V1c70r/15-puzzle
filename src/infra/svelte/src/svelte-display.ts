import { BoardState, Display } from './domain/contract';

/**
 * State of a browser display.
 */
export class SvelteDisplay implements Display {
  protected config: SvelteDisplayConfig;
  protected logs: Log[] = [];
  protected numbers: number[][] = [];

  protected redrawLog: () => void;
  protected clearLogTimeoutId?: number;

  public constructor({ config }: { config: SvelteDisplayConfig }) {
    this.config = config;
  }

  public start({ redrawLog }: { redrawLog: () => void }): void {
    this.redrawLog = redrawLog;
  }

  public showMessage(text: string): void {
    this.pushToLog({ text, type: 'message' });
  }

  public showError(text: string): void {
    this.pushToLog({ text, type: 'error' });
  }

  public showCongratulation(text: string): void {
    this.pushToLog({ text, type: 'congratulation' });
  }

  protected pushToLog(log: Log) {
    this.logs.push(log);
    this.logs = this.logs.slice(-this.config.logSize);

    if (this.clearLogTimeoutId) {
      clearTimeout(this.clearLogTimeoutId);
    }

    setTimeout(() => {
      this.logs = [];
      this.redrawLog();
    }, this.config.clearLogTimeoutMs);
  }

  public drawState({ numbers }: BoardState): void {
    this.numbers = numbers;
  }

  public getLogs(): Log[] {
    return this.logs;
  }

  public getNumbers(): number[][] {
    return this.numbers;
  }
}

export interface Log {
  text: string;
  type: 'message' | 'error' | 'congratulation';
}

export interface SvelteDisplayConfig {
  logSize: number;
  clearLogTimeoutMs: number;
}
