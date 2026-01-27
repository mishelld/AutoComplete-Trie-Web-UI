import AutoCompleteTrie from "./model.js";

const container = document.getElementById("container");
const button = document.getElementById("button");
const trie = new AutoCompleteTrie();

button.addEventListener("click", () => {
  const word = document.getElementById("word");
  trie.addWord(word.value);
  console.log(trie.words);
});

const suggestion = document.getElementById("suggestion");
suggestion.addEventListener("input", (event) => {
  const predictWord = trie.predictWords(event.target.value);
  console.log("User typed:", event.target.value);
  console.log(predictWord);
});
