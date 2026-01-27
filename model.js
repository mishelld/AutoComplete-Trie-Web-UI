export default class AutoCompleteTrie {
  constructor(value = null) {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
    this.words = 0;
  }
  addWord(word) {
    let node = this;
    let i = 0;
    while (i < word.length) {
      if (!node.children[word[i]]) {
        const new_node = new AutoCompleteTrie(word[i]);
        node.children[word[i]] = new_node;
        node = new_node;
      } else {
        node = node.children[word[i]];
      }
      i++;
    }
    node.endOfWord = true;
    this.words += 1;
  }
  findWord(word) {
    let node = this;
    let i = 0;
    while (i < word.length) {
      if (!node.children[word[i]]) {
        return false;
      } else {
        node = node.children[word[i]];
      }
      i++;
    }
    return true;
  }
  predictWords(prefix) {
    let allWords = [];
    let node = this._getRemainingTree(prefix, this);
    if (!node) {
      return [];
    }
    this._allWordsHelper(prefix, node, allWords);
    return allWords;
  }
  _getRemainingTree(prefix, node) {
    let i = 0;
    while (i < prefix.length) {
      if (!node.children[prefix[i]]) {
        console.log("No such prefix");
        return null;
      }
      node = node.children[prefix[i]];
      i++;
    }
    return node;
  }
  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWord) {
      allWords.push(prefix);
    }
    for (let key of Object.keys(node.children)) {
      const child = node.children[key];
      this._allWordsHelper(prefix + child.value, child, allWords);
    }
  }
  print(node = this) {
    console.log(node.value, node.endOfWord);
    for (let key of Object.keys(node.children)) {
      this.print(node.children[key]);
    }
  }
}

//trie.print();
