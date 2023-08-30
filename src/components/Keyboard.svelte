<script lang="ts">
  import { gameState, entries, input } from "$lib/game";
  import { locale } from "$lib/settings";
  import { onDestroy } from "svelte";
  import KeyboardKey from "./KeyboardKey.svelte";

  export let entryHandler: (entry: string) => void;

  const allowed: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");

  let keyboardKeys = [
    {
      key: $locale === "fr" ? "A" : "Q",
      hint: "",
    },
    {
      key: $locale === "fr" ? "Z" : "W",
      hint: "",
    },
    { key: "E", hint: "" },
    { key: "R", hint: "" },
    { key: "T", hint: "" },
    { key: "Y", hint: "" },
    { key: "U", hint: "" },
    { key: "I", hint: "" },
    { key: "O", hint: "" },
    { key: "P", hint: "" },
    {
      key: $locale === "fr" ? "Q" : "A",
      hint: "",
    },
    { key: "S", hint: "" },
    { key: "D", hint: "" },
    { key: "F", hint: "" },
    { key: "G", hint: "" },
    { key: "H", hint: "" },
    { key: "J", hint: "" },
    { key: "K", hint: "" },
    { key: "L", hint: "" },
    { key: "BACKSPACE", hint: "" },
    {
      key: $locale === "fr" ? "W" : "Z",
      hint: "",
    },
    { key: "X", hint: "" },
    { key: "C", hint: "" },
    { key: "V", hint: "" },
    { key: "B", hint: "" },
    { key: "N", hint: "" },
    { key: "M", hint: "" },
    { key: "ENTER", hint: "" },
  ];

  const unsubscribeFromEntries = entries.subscribe((value) => {
    const usedKeys = new Map<string, string>();

    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < value[i].input.length; j++) {
        const key = value[i].input[j];
        const result = value[i].result[j];
        usedKeys.set(key, usedKeys.get(key) ?? result);
      }
    }

    keyboardKeys = keyboardKeys.map((entry) => {
      return {
        key: entry.key,
        hint: usedKeys.get(entry.key) ?? "",
      };
    });
  });

  let canSubmit = false;
  const unsubscribeFromCurrentEntry = input.subscribe((value) => {
    canSubmit = value.length === 5;
  });

  function handleKeyTapped(key: string) {
    input.update((prev: Array<string>) => {
      if (key === "BACKSPACE") {
        if (prev.length > 0) {
          prev.pop();
        }
        return [...prev];
      } else {
        if (prev.length === 5) {
          if (key === "ENTER") {
            entryHandler($input.join(""));
            return [];
          } else {
            return [...prev];
          }
        } else {
          if (allowed.filter((allowedKey) => allowedKey === key).length > 0) {
            return [...prev, key];
          } else {
            return [...prev];
          }
        }
      }
    });
  }

  let keyDown = "";

  function handleKeyDown(key: string) {
    if (key !== keyDown) keyDown = key;
  }
  function handleKeyUp(key: string) {
    if (key === keyDown) {
      handleKeyTapped(keyDown);
      keyDown = "";
    }
  }

  onDestroy(() => {
    unsubscribeFromEntries();
    unsubscribeFromCurrentEntry();
  });
</script>

<svelte:window
  on:keydown={(ev) => handleKeyDown(ev.key.toUpperCase())}
  on:keyup={(ev) => handleKeyUp(ev.key.toUpperCase())}
/>

<div class="grid grid-cols-10 grid-rows-3 gap-1">
  {#each keyboardKeys as entry}
    <KeyboardKey
      key={entry.key}
      hint={entry.hint}
      disabled={$gameState !== "PLAYING"}
      isPressed={entry.key === keyDown}
      on:mouseup={() => handleKeyUp(entry.key)}
      on:mousedown={() => handleKeyDown(entry.key)}
    />
  {/each}
</div>
