import { writable } from "svelte/store";

let storedLocale = "en";
export const locale = writable(storedLocale);
let storedTheme = "system";
export const theme = writable(storedTheme);
