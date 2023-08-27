<script lang="ts">
  import { game } from "$lib/store";

  export let entries: Array<{ entry: string; result: string }>;
  export let canSubmit = false;
  export let entryHandler: (entry: string) => void;

  const keyboardLetters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "BACKSPACE"],
    ["Z", "X", "C", "V", "B", "N", "M", "ENTER"],
  ];

  $: computedKeyboardKeys = keyboardLetters.map((keyRow) => {
    return keyRow.map((key) => {
      let enabled = false;
      let played = false;

      for (let i = 0; i < entries.length; i++) {
        for (let j = 0; j < entries[i].entry.length; j++) {
          if (entries[i].entry[j] === key) {
            played = true;
            enabled = enabled || entries[i].result[j] !== "I";
          }
        }
      }

      return { key, incorrect: played && !enabled };
    });
  });

  const handleLetterClicked = (letter: string) => {
    entryHandler(letter);
  };
</script>

<div class="w-full flex flex-col gap-1">
  {#each computedKeyboardKeys as row}
    <div class="flex justify-center items-center gap-1">
      {#each row as { key, incorrect }}
        {#if key === "BACKSPACE"}
          <button
            disabled={$game !== 0}
            style:background-color={!$game ? "white" : "gray"}
            style:border-color={!$game ? "black" : "gray"}
            on:click={() => handleLetterClicked(key)}
            class={`w-8 h-8 md:w-12 md:h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2`}
          >
            <iconify-icon icon="mdi:backspace" />
          </button>
        {:else if key === "ENTER"}
          <button
            disabled={!canSubmit}
            style:background-color={canSubmit ? "white" : "gray"}
            style:border-color={canSubmit ? "black" : "gray"}
            on:click={() => handleLetterClicked(key)}
            class={`w-24 h-8 md:w-36 md:h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2`}
          >
            <iconify-icon
              icon="uil:enter"
              style:color={canSubmit ? "black" : "dimgray"}
            />
          </button>
        {:else}
          <button
            disabled={$game !== 0}
            style:background-color={incorrect ? "gray" : "white"}
            style:border-color={incorrect ? "gray" : "black"}
            on:click={() => handleLetterClicked(key)}
            class={`w-8 h-8 md:w-12 md:h-12 flex justify-center items-center aspect-square text-lg md:text-2xl rounded-md border-solid border-black border-2`}
          >
            {key}
          </button>
        {/if}
      {/each}
    </div>
  {/each}
</div>
