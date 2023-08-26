<script lang="ts">
  import axios from "axios";

  import { store } from "$lib/store";
  import Keyboard from "../components/Keyboard.svelte";
  import WordBoard from "../components/WordBoard.svelte";

  const allowed: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");

  let currentEntry: Array<string> = [];

  let showAboutModal = false;
  let showSettingsModal = false;

  function handleEntry(entry: string) {
    if (currentEntry.length === 5) {
      if (entry === "enter") {
        const form = new FormData();
        form.append("entry", currentEntry.join(""));

        axios.post("/", form).then((res) => {
          const data = JSON.parse(res.data.data);
          console.log(data);
          store.update((prev) => [
            ...prev,
            { entry: data[1], result: data[2] },
          ]);
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

<div
  class="h-screen p-2 flex flex-col justify-between items-center gap-2 md:gap-2"
>
  <header class="w-full">
    <div class="flex justify-between items-center">
      <button
        on:click={() => {
          showAboutModal = !showAboutModal;
        }}
        class="w-6 h-6 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
      >
        <iconify-icon icon="mdi:help" />
      </button>
      <h1 class="font-bold text-lg uppercase">Guesstheword</h1>
      <button
        on:click={() => {
          showSettingsModal = !showSettingsModal;
        }}
        class="w-6 h-6 p-1 flex justify-center items-center rounded-md border-solid border-black border-2"
      >
        <iconify-icon icon="mdi:gear" />
      </button>
    </div>
  </header>

  <WordBoard {currentEntry} />
  <Keyboard entryHandler={handleEntry} />
</div>
