import { writable } from "svelte/store";

function getStoreOrElse(itemName: string, orElse: any) {
  return typeof window !== "undefined"
    ? localStorage.getItem(itemName) ?? orElse
    : orElse;
}

function setStoreItem(itemName: string, value: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(itemName, value);
  }
}

const storedWord: string = getStoreOrElse("word", "");
export const word = writable(storedWord);
word.subscribe((value: string) => {
  setStoreItem("word", word.toString());
});

const storedEntries: Array<{ entry: string; result: string }> = JSON.parse(
  getStoreOrElse("entries", "[]")
);

export const entries = writable(storedEntries);
entries.subscribe((value: Array<{ entry: string; result: string }>) => {
  setStoreItem("entries", JSON.stringify(value));
});

const storedGameState = parseInt(getStoreOrElse("gameState", "0"));

export const game = writable(storedGameState);
game.subscribe((value: number) => {
  setStoreItem("gameState", value.toString());
});

const storedTheme = getStoreOrElse("theme", "system");
export const theme = writable(storedTheme);
theme.subscribe((value: string) => {
  setStoreItem("theme", value);
});
