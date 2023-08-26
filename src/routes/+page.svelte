<script lang="ts">
  import axios from "axios";

  import { game, entries } from "$lib/store";
  import Keyboard from "../components/Keyboard.svelte";
  import WordBoard from "../components/WordBoard.svelte";
  import Modal from "../components/Modal.svelte";
  import AboutPage from "../components/AboutPage.svelte";
  import SettingsPage from "../components/SettingsPage.svelte";

  const allowed: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");

  let canSubmit = false;
  let currentEntry: Array<string> = [];

  let showModal = "";

  $: canSubmit = currentEntry.length === 5;

  function handleEntry(entry: string) {
    if (canSubmit) {
      if (entry === "enter") {
        const form = new FormData();
        form.append("entry", currentEntry.join(""));

        axios.post("/", form).then((res) => {
          const data = JSON.parse(res.data.data);

          entries.update((prev) => [
            ...prev,
            { entry: data[1], result: data[2] },
          ]);

          if (data[2] === "CCCCC") {
            game.set(1);
          }
        });
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
