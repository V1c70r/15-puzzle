import { Command, Input } from './domain/contract';

/**
 * Browser input.
 */
export class SvelteInput implements Input {
  protected callback: (command: Command) => void;

  public start(callback: (command: Command) => void): void {
    this.callback = callback;
  }

  public stop(): void {}

  public onNew(): void {
    this.callback({ type: 'new' });
  }

  public onMove(number: number): void {
    this.callback({ type: 'move', number });
  }
}
