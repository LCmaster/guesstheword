<script lang="ts">
  import { stats } from "$lib/stats";

  $: numberOfGames = $stats.games.reduce((prev, curr) => prev + curr, 0);
  $: winAverage = $stats.games.reduce(
    (prev, curr, index) =>
      index === $stats.games.length - 1 ? prev : prev + curr,
    0
  );
</script>

<div class="flex flex-col gap-4">
  <slot name="result" />
  <table>
    <tr>
      <th class="text-sm text-center text-zinc-500">Games</th>
      <th class="text-sm text-center text-zinc-500">Wins</th>
      <th class="text-sm text-center text-zinc-500">Win Streak</th>
      <th class="text-sm text-center text-zinc-500">Best Win Streak</th>
    </tr>
    <tr>
      <td class="font-bold text-3xl text-center">{numberOfGames}</td>
      <td class="font-bold text-3xl text-center"
        >{Math.round((winAverage / numberOfGames) * 100)}%</td
      >
      <td class="font-bold text-3xl text-center">{$stats.currentWinStreak}</td>
      <td class="font-bold text-3xl text-center">{$stats.bestWinStreak}</td>
    </tr>
  </table>
  <div>
    <h3 class="font-bold">Games distribution:</h3>
    <ul class="flex flex-col gap-1">
      {#each $stats.games as game, i}
        <li class="flex items-center gap-1">
          {#if i == $stats.games.length - 1}
            <img src="/skull.svg" alt="lost" class="w-4 h-4" />
          {:else}
            <div class="w-4 h-4 font-bold text-sm text-center">{i + 1}</div>
          {/if}
          <div
            style:width={game
              ? `${Math.round((game / numberOfGames) * 100)}%`
              : "auto"}
            class="p-2 flex justify-end items-center rounded-md bg-blue-500"
          >
            {#if game === 0}
              <iconify-icon icon="subway:error" style:color="white" />
            {:else}
              <span class="w-4 h-4 font-bold text-sm text-center text-white"
                >{game}</span
              >
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <slot name="footer" />
</div>
