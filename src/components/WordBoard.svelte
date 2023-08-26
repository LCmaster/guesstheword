<script lang="ts">
  export let entries: Array<Array<string>>;
  export let currentEntry: Array<string>;
</script>

<div class="p-4 flex justify-center items-center">
  <div class="grid grid-cols-5 grid-rows-7 gap-1">
    {#each { length: 7 } as _, i}
      {#each { length: 5 } as _, j}
        <div
          style:grid-row={i + 1}
          style:grid-column={j + 1}
          class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
        />
      {/each}
    {/each}
    {#each entries as row, i}
      {#each row as letter, j}
        <div
          style:grid-row={i + 1}
          style:grid-column={j + 1}
          class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md"
        >
          {letter}
        </div>
      {/each}
    {/each}
    {#each currentEntry as letter, j}
      <div
        style:grid-row={entries.length + 1}
        style:grid-column={j + 1}
        class="w-12 h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md"
      >
        {letter}
      </div>
    {/each}
  </div>
</div>
