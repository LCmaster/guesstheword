import { writable } from "svelte/store";

const storedEntries: Array<{ entry: string; result: string }> = JSON.parse(
  typeof window !== "undefined" ? localStorage.getItem("entries") ?? "[]" : "[]"
);

export const store = writable(storedEntries);
store.subscribe((value: Array<{ entry: string; result: string }>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("entries", JSON.stringify(value));
  }
});
