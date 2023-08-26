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
        <button
          on:click={() => handleLetterClicked(letter)}
          class="w-8 h-8 md:w-12 md:h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2"
        >
          {#if letter === "backspace"}
            <iconify-icon icon="mdi:backspace" />
          {:else if letter === "enter"}
            <iconify-icon icon="uil:enter" />
          {:else}
            {letter}
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>
