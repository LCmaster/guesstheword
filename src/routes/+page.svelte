<script lang="ts">
  import { gameId, gameState, word, input, entries } from "$lib/game";

  import Keyboard from "../components/Keyboard.svelte";
  import WordBoard from "../components/WordBoard.svelte";
  import Modal from "../components/Modal.svelte";
  import AboutPage from "../components/AboutPage.svelte";
  import SettingsPage from "../components/SettingsPage.svelte";
  import ProgressPage from "../components/ProgressPage.svelte";
  import AppBar from "../components/AppBar.svelte";
  import { generate } from "random-words";

  function generateNextWord() {
    return generate({ minLength: 5, maxLength: 5 }).toString().toUpperCase();
  }

  let showModal = $gameState !== "PLAYING" ? "progress" : "";
  $: if ($gameState !== "PLAYING") {
    showModal = "progress";
  }

  function resetGame() {
    entries.set([]);
    word.set(generateNextWord());
  }

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

    return matched;
  }

  function handleEntry(input: string) {
    const result = wordmatcher($word, input);

    entries.update((prev) => {
      return [...prev, { input: input.split(""), result }];
    });
  }

  $: console.log($gameState, $word, $input, $entries);
</script>

<section
  id="game"
  class="h-screen p-4 flex flex-col justify-between items-center"
>
  <header class="container mx-auto">
    <AppBar>
      <button
        slot="leading"
        on:click={() => {
          showModal = "about";
        }}
        class="w-6 h-6 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
      >
        <iconify-icon icon="mdi:help" />
      </button>
      <h1 class="font-bold text-lg uppercase">guesstheword</h1>
      <button
        slot="trailling"
        on:click={() => {
          showModal = "settings";
        }}
        class="w-6 h-6 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
      >
        <iconify-icon icon="mdi:gear" />
      </button>
    </AppBar>
  </header>
  <main class="container mx-auto"><WordBoard /></main>
  <footer class="container mx-auto">
    <Keyboard entryHandler={handleEntry} />
  </footer>
</section>
<section id="modal" style:display={!showModal ? "none" : "block"}>
  <button
    on:click={() => (showModal = "")}
    class="fixed top-0 left-0 w-screen h-screen bg-gray-900/50"
  />
  <Modal title={showModal} on:close={() => (showModal = "")}>
    {#if showModal === "progress"}
      <ProgressPage>
        <h2 slot="result" class="font-bold text-2xl uppercase text-center">
          {#if $gameState === "WON"}
            Yaayyy!
          {:else}
            Oh no!
          {/if}
        </h2>

        <div slot="footer" class="grid grid-cols-2 gap-2">
          {#if $gameState !== "PLAYING"}
            <button
              on:click={() => {
                resetGame();
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
    {:else if showModal === "settings"}
      <SettingsPage />
    {:else}
      <AboutPage />
    {/if}
  </Modal>
</section>
