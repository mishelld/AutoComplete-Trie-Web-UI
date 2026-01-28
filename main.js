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
  const typed = event.target.value;
  const predictWords = trie.predictWords(typed);
  const ul = document.querySelector("ul");
  if (typed != "") {
    ul.classList.add("display");
  } else {
    ul.classList.remove("display");
  }
  ul.innerHTML = "";
  for (const word of predictWords) {
    const li = document.createElement("li");
    const slice = word.slice(typed.length);
    li.innerHTML = `<span class="red">${typed}</span>${slice}`;
    ul.appendChild(li);
  }
});
