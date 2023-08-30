import { derived, writable, type Writable } from "svelte/store";
import { generate } from "random-words";
import { getLocalStorageOrElse, setLocalStorageItem } from "$lib";

function generateNextWord() {
  return generate({ minLength: 5, maxLength: 5 }).toString().toUpperCase();
}

export const input: Writable<Array<string>> = writable([]);

const storedEntries = JSON.parse(getLocalStorageOrElse("entries", "[]"));
export const entries: Writable<
  Array<{ input: Array<string>; result: Array<string> }>
> = writable(storedEntries);
entries.subscribe((value) => {
  setLocalStorageItem("entries", JSON.stringify(value));
});

let currentGameId = parseInt(getLocalStorageOrElse("gameId", Date.now()));
export const gameId = derived(
  entries,
  ($entries, set) => {
    if ($entries.length === 0) {
      currentGameId = Date.now();
      set(currentGameId);
    }
  },
  currentGameId
);
gameId.subscribe((value) => {
  setLocalStorageItem("gameId", currentGameId.toString());
});

const storedGameState = getLocalStorageOrElse("gameState", "PLAYING");
export const gameState = derived(
  entries,
  ($entries) => {
    if ($entries.length === 0) {
      return "PLAYING";
    }

    const lastEntry: { input: string[]; result: string[] } =
      $entries[$entries.length - 1];

    const points = lastEntry.result.reduce(
      (prev, curr) => prev + (curr === "C" ? 1 : 0),
      0
    );

    if (points === lastEntry.input.length) {
      return "WON";
    }
    if ($entries.length >= 6) {
      return "LOST";
    }

    return "PLAYING";
  },
  storedGameState
);
gameState.subscribe((value) => setLocalStorageItem("gameState", value));

let currentWord = getLocalStorageOrElse("word", generateNextWord());
export const word = writable(currentWord);
word.subscribe((value) => {
  setLocalStorageItem("word", value);
});
