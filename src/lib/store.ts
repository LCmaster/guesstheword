import { writable } from "svelte/store";

const storedEntries: Array<{ entry: string; result: string }> = JSON.parse(
  typeof window !== "undefined" ? localStorage.getItem("entries") ?? "[]" : "[]"
);

export const entries = writable(storedEntries);
entries.subscribe((value: Array<{ entry: string; result: string }>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("entries", JSON.stringify(value));
  }
});

const storedGameState = parseInt(
  typeof window !== "undefined" ? localStorage.getItem("gameState") ?? "0" : "0"
);

export const game = writable(storedGameState);
game.subscribe((value: number) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("gameState", value.toString());
  }
});

const storedTheme =
  typeof window !== "undefined"
    ? localStorage.getItem("theme") ?? "system"
    : "system";

export const theme = writable(storedTheme);
theme.subscribe((value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", value);
  }
});
