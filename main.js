import AutoCompleteTrie from "./model.js";

const container = document.getElementById("container");
const counter = document.querySelector("#counter");
const message = document.querySelector("#message");
const button = document.getElementById("button");
const trie = new AutoCompleteTrie();

button.addEventListener("click", () => {
  const word = document.getElementById("word");
  if (word.value === "") {
    message.innerHTML = "✘ Cannot add empty word";
    message.classList.remove("green");
    message.classList.add("red");

    return;
  }
  trie.addWord(word.value);
  message.classList.remove("red");
  message.classList.add("green");
  message.innerHTML = `✓ Added '${word.value}' to dictionary `;
  counter.innerHTML = trie.words + "";
});

const suggestion = document.getElementById("suggestion");
suggestion.addEventListener("input", (event) => {
  const predictWord = trie.predictWords(event.target.value);
  console.log("User typed:", event.target.value);
  console.log(predictWord);
});
