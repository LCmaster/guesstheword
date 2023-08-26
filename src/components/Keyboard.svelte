<script lang="ts">
  export let entryHandler: (entry: string) => void;
  const keyboardLetters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "backspace"],
    ["Z", "X", "C", "V", "B", "N", "M", "enter"],
  ];
  const handleLetterClicked = (letter: string) => {
    entryHandler(letter);
  };
</script>

<div class="w-full flex flex-col gap-1">
  {#each keyboardLetters as row}
    <div class="flex justify-center items-center gap-1">
      {#each row as letter}
        {#if letter === "backspace"}
          <button
            on:click={() => handleLetterClicked(letter)}
            class={`w-8 h-8 md:w-12 md:h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2`}
          >
            <iconify-icon icon="mdi:backspace" />
          </button>
        {:else if letter === "enter"}
          <button
            on:click={() => handleLetterClicked(letter)}
            class={`w-24 h-8 md:w-36 md:h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2`}
          >
            <iconify-icon icon="uil:enter" />
          </button>
        {:else}
          <button
            on:click={() => handleLetterClicked(letter)}
            class={`w-8 h-8 md:w-12 md:h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2`}
          >
            {letter}
          </button>
        {/if}
      {/each}
    </div>
  {/each}
</div>
