import { writable } from "svelte/store";

function getLocalStorageOrElse(itemName: string, orElse: any) {
  return typeof window !== "undefined"
    ? localStorage.getItem(itemName) ?? orElse
    : orElse;
}

function setLocalStorageItem(itemName: string, value: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(itemName, value);
  }
}

const storedStats: {
  games: Array<number>;
  currentWinStreak: number;
  bestWinStreak: number;
} = JSON.parse(
  getLocalStorageOrElse(
    "stats",
    JSON.stringify({
      games: [0, 0, 0, 0, 0, 0, 0],
      currentWinStreak: 0,
      bestWinStreak: 0,
    })
  )
);
export const stats = writable(storedStats);
stats.subscribe(
  (value: {
    games: Array<number>;
    currentWinStreak: number;
    bestWinStreak: number;
  }) => {
    setLocalStorageItem("stats", JSON.stringify(value));
  }
);

const storedWord: string = getLocalStorageOrElse("word", "");
export const word = writable(storedWord);
word.subscribe((value: string) => {
  setLocalStorageItem("word", word.toString());
});

const storedEntries: Array<{ entry: string; result: string }> = JSON.parse(
  getLocalStorageOrElse("entries", "[]")
);

export const entries = writable(storedEntries);
entries.subscribe((value: Array<{ entry: string; result: string }>) => {
  setLocalStorageItem("entries", JSON.stringify(value));
});

const storedGameState = parseInt(getLocalStorageOrElse("gameState", "0"));

export const game = writable(storedGameState);
game.subscribe((value: number) => {
  setLocalStorageItem("gameState", value.toString());
});

const storedTheme = getLocalStorageOrElse("theme", "system");
export const theme = writable(storedTheme);
theme.subscribe((value: string) => {
  setLocalStorageItem("theme", value);
});
