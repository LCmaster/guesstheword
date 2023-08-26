import * as wordlist from "wordlist-english";

export function load({ cookies }) {
  const wordList = wordlist["english"].filter(
    (word: string) => word.length === 5
  );

  const numberOfWords = wordList.length;
  let wordIndex: number = parseInt(cookies.get("wordIndex") ?? "-1");
  if (wordIndex >= 0) {
    wordIndex = Math.floor(Math.random() * numberOfWords);
    cookies.set("wordIndex", wordIndex.toString(), { path: "/" });
  }

  return {
    word: wordIndex,
  };
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

      console.log(word);

      let matched: Array<string> = new Array(word.length);
      let unmatched: Map<string, number> = new Map<string, number>();
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];

        if (letter === entry[i]) {
          matched.push("C");
        } else {
          matched.push("I");
          unmatched.set(letter, (unmatched.get(letter) ?? 0) + 1);
        }
      }

      for (let i = 0; i < entry.length; i++) {
        if (word[i] !== entry[i]) {
          const letter = entry[i];

          const letterOccurrences = unmatched.get(letter) ?? 0;
          if (letterOccurrences > 0) {
            matched[i] = "M";
            unmatched.set(letter, letterOccurrences - 1);
          }
        }
      }

      return [entry, matched.join("")];
    }
  },
};
