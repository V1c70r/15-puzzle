<script lang="ts">
  import Board from './board.svelte';

  import type { Log } from './svelte-display';

  import { Puzzle } from './domain/puzzle';
  import { boardConfig } from './domain/board.config'
  import { SvelteInput } from './svelte-input';
  import { SvelteEnI18n } from './svelte-en-i18n';
  import { LocalStorage } from './local-storage';
  import { SvelteDisplay } from './svelte-display';
  import { localStorageConfig } from './config/local-storage.config'
  import { svelteDisplayConfig } from './config/svelte-display.config';

  const storage = new LocalStorage({ config: localStorageConfig });
  const i18n = new SvelteEnI18n();
  const input = new SvelteInput();
  const display = new SvelteDisplay({ config: svelteDisplayConfig });

  const puzzle = new Puzzle({
    boardConfig,
    storage,
    display,
    input,
    i18n,
    processExit: () => {},
  });

  let logs: Log[];
  let numbers: number[][];

  const updateLog = () => {
    logs = display.getLogs();
  }
  const update = () => {
    updateLog();
    numbers = display.getNumbers();
  }
  const onNew = () => { input.onNew(); update(); }
  const onMove = (number: number) => { input.onMove(number); update(); }

  display.start({ redrawLog: update });
  puzzle.start();

  update();
</script>

<Board {logs} {numbers} {onNew} {onMove}/>
