let words = [
  "delete",
  "hello",
  "world",
  "js",
  "react",
  "aboba",
  "system",
  "point",
  "person",
  "input",
  "user",
  "update",
  "delete",
  "insert",
  "create",
  "css",
  "style",
  "Bee",
  "restart",
  "stop",
  "run",
  "app",
  "data",
];

// let wordsR = [
// "дима",
// "машина",
//  ""
// ];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const wordsEn = shuffle(words);
export default wordsEn;
