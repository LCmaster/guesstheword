import { derived } from "svelte/store";

import { getLocalStorageOrElse, setLocalStorageItem } from "$lib";
import { gameId, gameState, entries } from "$lib/game";

let storedStats: {
  games: Array<number>;
  lastGame: number;
  currentWinStreak: number;
  bestWinStreak: number;
} = JSON.parse(
  getLocalStorageOrElse(
    "stats",
    JSON.stringify({
      games: [0, 0, 0, 0, 0, 0, 0],
      lastGame: -1,
      currentWinStreak: 0,
      bestWinStreak: 0,
    })
  )
);
export const stats = derived(
  [gameId, gameState, entries],
  ([$gameId, $gameState, $entries], set) => {
    if ($gameState !== "PLAYING" && storedStats.lastGame !== $gameId) {
      const currentWinStreak =
        $gameState == "WON" ? storedStats.currentWinStreak + 1 : 0;
      const bestWinStreak =
        storedStats.bestWinStreak < currentWinStreak
          ? currentWinStreak
          : storedStats.bestWinStreak;
      const games = storedStats.games.map((n, index) => {
        const wonTest = $gameState === "WON" && index === $entries.length - 1;
        const lostTest =
          $gameState === "LOST" && index === storedStats.games.length - 1;

        return wonTest || lostTest ? n + 1 : n;
      });

      const newStats = {
        games,
        lastGame: $gameId,
        bestWinStreak,
        currentWinStreak,
      };

      storedStats = newStats;
      set(newStats);
    }
  },
  storedStats
);
stats.subscribe((value) => setLocalStorageItem("stats", JSON.stringify(value)));
