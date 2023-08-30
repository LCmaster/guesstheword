<script lang="ts">
  import { entries, input } from "$lib/game";
</script>

<div class="p-4 flex justify-center items-center">
  <div class="grid grid-cols-5 grid-rows-7 gap-1">
    {#each { length: 6 } as _, i}
      {#each { length: 5 } as _, j}
        <div
          style:grid-row={i + 1}
          style:grid-column={j + 1}
          class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
        />
      {/each}
    {/each}
    {#each $entries as { input, result }, i}
      {#each input as letter, j}
        <div
          style:grid-row={i + 1}
          style:grid-column={j + 1}
          style:background-color={result[j] !== "C"
            ? result[j] !== "M"
              ? "grey"
              : "orange"
            : "green"}
          class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md"
        >
          {letter}
        </div>
      {/each}
    {/each}
    {#each $input as letter, j}
      <div
        style:grid-row={$entries.length + 1}
        style:grid-column={j + 1}
        class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md"
      >
        {letter}
      </div>
    {/each}
  </div>
</div>
