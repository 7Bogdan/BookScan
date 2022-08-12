let regExp = (text) => {
  let filterText = text.replace(/[^a-z А-ЯЁ ]/gi, "").toLowerCase();
  let arr = filterText.split(" ");
  let words = {};
  let arrWords = [];
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    words[word] = words[word] ? words[word] + 1 : 1;
  }
  for (let i in words) {
    let obj = {
      words: i,
      quantity: words[i],
    };
    arrWords.push(obj);
  }
  return arrWords;
};

export { regExp };
