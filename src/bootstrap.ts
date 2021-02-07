import { Puzzle } from "./domain/puzzle";
import { enI18n } from "./infra/en-i18n";
import { FileStorage } from "./infra/file-storage";
import { KeyboardInput } from "./infra/keyboard-input";
import { ConsoleDisplay } from "./infra/console-display";

/**
 * Starts the game.
 */
export async function bootstrap() {
  const puzzle = new Puzzle({
    storage: new FileStorage(),
    display: new ConsoleDisplay(),
    input: new KeyboardInput(),
    i18n: enI18n,
  });

  await puzzle.start();
}
