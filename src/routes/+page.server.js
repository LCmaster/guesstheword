import wordlist from "wordlist-english";

export function load({ cookies }) {
  const wordList = wordlist["english"].filter((word) => word.length === 5);

  const numberOfWords = wordList.length;
  let wordIndex = cookies.get("wordIndex");
  if (!wordIndex) {
    wordIndex = Math.floor(Math.random() * numberOfWords);
    cookies.set("wordIndex", wordIndex.toString(), { path: "/" });
  }

  return {
    word: parseInt(wordIndex),
  };
}
