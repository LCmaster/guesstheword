import * as wordlist from "wordlist-english";

export function load({ cookies }) {
  const wordList = wordlist["english"].filter(
    (word: string) => word.length === 5
  );

  const numberOfWords = wordList.length;
  let wordIndex: number = parseInt(cookies.get("wordIndex") ?? "-1");
  if (wordIndex < 0) {
    wordIndex = Math.floor(Math.random() * numberOfWords);
    cookies.set("wordIndex", wordIndex.toString(), { path: "/" });
  }

  return;
}

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const entry = data.get("entry")?.toString();

    const wordList = wordlist["english"].filter(
      (word: string) => word.length === 5
    );

    let wordIndex: number = parseInt(cookies.get("wordIndex") ?? "-1");
    if (entry !== undefined && wordIndex >= 0) {
      let word: string = wordList[wordIndex];
      word = word.toUpperCase();

      let matched: Array<string> = new Array(word.length);
      let unmatched: Map<string, number> = new Map<string, number>();
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];

        if (letter === entry[i]) {
          matched[i] = "C";
        } else {
          matched[i] = "I";
          unmatched.set(letter, (unmatched.get(letter) ?? 0) + 1);
        }
      }

      for (let i = 0; i < entry.length; i++) {
        const letter = entry[i];
        if (word[i] !== letter) {
          const numberOfOccurrences = unmatched.get(letter) ?? 0;
          if (numberOfOccurrences > 0) {
            matched[i] = "M";
            unmatched.set(letter, numberOfOccurrences - 1);
          }
        }
      }

      return [entry, matched.join("")];
    }
  },
};
