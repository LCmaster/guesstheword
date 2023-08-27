<script lang="ts">
  import { generate } from "random-words";

  import { word, game, entries } from "$lib/store";
  import Keyboard from "../components/Keyboard.svelte";
  import WordBoard from "../components/WordBoard.svelte";
  import Modal from "../components/Modal.svelte";
  import AboutPage from "../components/AboutPage.svelte";
  import SettingsPage from "../components/SettingsPage.svelte";
  import ProgressPage from "../components/ProgressPage.svelte";

  function generateNextWord() {
    return generate({ minLength: 5, maxLength: 5 }).toString().toUpperCase();
  }

  function resetGame() {
    game.set(0);
  }

  function resetBoard() {
    entries.set([]);
  }

  function resetWord() {
    word.set(generateNextWord());
  }

  if ($word.length !== 5) {
    resetWord();
  }

  const allowed: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");

  function wordmatcher(word: string, entry: string) {
    word = word.toUpperCase();

    let matched: Array<string> = new Array(word.length);
    let unmatched: Map<string, number> = new Map<string, number>();
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      if (letter === entry[i]) {
        matched[i] = "C";
      } else {
        matched[i] = "I";
        unmatched.set(letter, (unmatched.get(letter) ?? 0) + 1);
      }
    }

    for (let i = 0; i < entry.length; i++) {
      const letter = entry[i];
      if (word[i] !== letter) {
        const numberOfOccurrences = unmatched.get(letter) ?? 0;
        if (numberOfOccurrences > 0) {
          matched[i] = "M";
          unmatched.set(letter, numberOfOccurrences - 1);
        }
      }
    }

    return matched.join("");
  }

  let canSubmit = false;
  let currentEntry: Array<string> = [];

  let showModal = $game !== 0 ? "progress" : "";

  $: canSubmit = currentEntry.length === 5;

  function handleEntry(entry: string) {
    if (canSubmit) {
      if (entry === "ENTER") {
        const uppercaseWord = $word.toUpperCase();
        const uppercaseEntry = currentEntry.join("").toUpperCase();
        const result = wordmatcher(uppercaseWord, uppercaseEntry);

        if (result === "CCCCC") {
          game.set(1);
          showModal = "progress";
        } else if ($entries.length === 5 && result !== "CCCCC") {
          game.set(-1);
          showModal = "progress";
        }

        entries.update((prev) => [
          ...prev,
          { entry: uppercaseEntry, result: result },
        ]);

        currentEntry = [];
      }
    } else {
      if (allowed.includes(entry)) {
        currentEntry = [...currentEntry, entry.toUpperCase()];
      }
    }
    if (entry === "BACKSPACE") {
      currentEntry.pop();
      currentEntry = [...currentEntry];
    }
  }
</script>

{#if showModal}
  <Modal on:click={() => (showModal = "")}>
    {#if showModal === "about"}
      <AboutPage />
    {:else if showModal === "settings"}
      <SettingsPage />
    {:else if showModal === "progress"}
      <ProgressPage>
        <h2 slot="result" class="font-bold text-2xl uppercase text-center">
          {#if $game === 1}
            Yaayyy!
          {:else}
            Oh no!
          {/if}
        </h2>

        <div slot="footer" class="grid grid-cols-2 gap-2">
          {#if $game !== 0}
            <button
              on:click={() => {
                resetGame();
                resetWord();
                resetBoard();
                showModal = "";
              }}
              class="px-4 py-2 font-bold rounded-md text-white bg-blue-500"
              >Next word</button
            >
            <button
              class="px-4 py-2 font-bold rounded-md text-white bg-blue-500"
              >Share it on twitter</button
            >
          {/if}
        </div>
      </ProgressPage>
    {/if}
  </Modal>
{/if}
<div
  class="h-screen p-2 flex flex-col justify-between items-center gap-2 md:gap-2"
>
  <header class="w-full">
    <div class="flex justify-between items-center">
      <button
        on:click={() => {
          showModal = "about";
        }}
        class="w-6 h-6 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
      >
        <iconify-icon icon="mdi:help" />
      </button>
      <h1 class="font-bold text-lg uppercase">Guesstheword</h1>
      <button
        on:click={() => {
          showModal = "settings";
        }}
        class="w-6 h-6 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
      >
        <iconify-icon icon="mdi:gear" />
      </button>
    </div>
  </header>

  <WordBoard bind:entries={$entries} {currentEntry} />
  <Keyboard bind:entries={$entries} bind:canSubmit entryHandler={handleEntry} />
</div>
