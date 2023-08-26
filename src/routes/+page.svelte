<script lang="ts">
  import { generate } from "random-words";

  import { word, game, entries } from "$lib/store";
  import Keyboard from "../components/Keyboard.svelte";
  import WordBoard from "../components/WordBoard.svelte";
  import Modal from "../components/Modal.svelte";
  import AboutPage from "../components/AboutPage.svelte";
  import SettingsPage from "../components/SettingsPage.svelte";

  if ($word.length !== 5) {
    const newRandomWord = generate({ minLength: 5, maxLength: 5 })
      .toString()
      .toUpperCase();

    word.set(newRandomWord);
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

  let showModal = "";

  $: canSubmit = currentEntry.length === 5;

  function handleEntry(entry: string) {
    if (canSubmit) {
      if (entry === "enter") {
        const uppercaseWord = $word.toUpperCase();
        const uppercaseEntry = currentEntry.join("").toUpperCase();
        const result = wordmatcher(uppercaseWord, uppercaseEntry);

        entries.update((prev) => [
          ...prev,
          { entry: uppercaseEntry, result: result },
        ]);

        if (result === "CCCCC") {
          game.set(1);
        }
        currentEntry = [];
      }
    } else {
      if (allowed.includes(entry)) {
        currentEntry = [...currentEntry, entry.toUpperCase()];
      }
    }
    if (entry === "backspace") {
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

  <WordBoard {currentEntry} />
  <Keyboard bind:canSubmit entryHandler={handleEntry} />
</div>
