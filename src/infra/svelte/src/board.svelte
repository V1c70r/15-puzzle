<script lang="ts">
  import type { Log } from './svelte-display';

  export let numbers: number[][];
  export let logs: Log[];
  export let onNew: () => void;
  export let onMove: (number: number) => void;
</script>

<button on:click={onNew}>New game</button>
<table>
  <tbody>
    {#each numbers as rows, y (y)}
      <tr>
        {#each rows as number, x (x)}
          <td on:click={() => onMove(number)}>{number || ''}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
<div>
  {#each logs as {type, text}, key (key) }
    <p class="log-{type}">{text}</p>
  {/each}
</div>

<style>
td {
  border: 1px solid black;
  height: 30px;
  width:  30px;
  text-align: center;
}

.log-congratulation {
  color: green;
  font-weight: bold;
}

.log-error {
  color: red;
  font-weight: bold;
}
</style>
