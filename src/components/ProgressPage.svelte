<script>
  export let numberOfGames = 1;
  export let numberOfWins = 1;
  export let currentWinStreak = 1;
  export let bestWinStreak = 1;
</script>

<div class="flex flex-col gap-4">
  <slot name="result" />
  <div class="w-full grid grid-cols-4 gap-2">
    <h3 class="text-sm text-center text-zinc-500">Games</h3>
    <h3 class="text-sm text-center text-zinc-500">Wins</h3>
    <h3 class="text-sm text-center text-zinc-500">Win Streak</h3>
    <h3 class="text-sm text-center text-zinc-500">Best Win Streak</h3>
    <p class="font-bold text-4xl text-center">{numberOfGames}</p>
    <p class="font-bold text-4xl text-center">
      {Math.round((currentWinStreak / numberOfGames) * 100)}%
    </p>
    <p class="font-bold text-4xl text-center">{currentWinStreak}</p>
    <p class="font-bold text-4xl text-center">{bestWinStreak}</p>
  </div>
  <div>
    <h3 class="font-bold text-center">Games distribution</h3>
    <ul class="flex flex-col gap-1">
      {#each { length: 6 } as _, i}
        <li class="flex items-center gap-1">
          <div class="w-4 h-4 font-bold text-sm text-center">{i + 1}</div>
          <div
            style:width={i === 0 ? "100%" : "auto"}
            class="p-2 flex justify-end items-center rounded-md bg-blue-500"
          >
            {#if i === 0}
              <span class="w-4 h-4 font-bold text-sm text-center text-white"
                >1</span
              >
            {:else}
              <iconify-icon icon="subway:error" style:color="white" />
            {/if}
          </div>
        </li>
      {/each}

      <li class="flex justify-start items-center gap-1">
        <img src="/skull.svg" alt="lost" class="w-4 h-4" />
        <div class="p-2 flex justify-end items-center rounded-md bg-blue-500">
          <iconify-icon icon="subway:error" style:color="white" />
        </div>
      </li>
    </ul>
  </div>
  <slot name="footer" />
</div>
