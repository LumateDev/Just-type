export const letters = [];


let words = ["hello", "world", "js", "react", "aboba", "system", "point", "person" , "input", "dimalox", "makskrasavchik"];


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
let res = shuffle(words);
let str = res.join([" "]);

for (let i = 0; i < str.length; i++) {
  let obj = {};
  obj.id = i + 1;
  obj.char = str[i];
  letters.push(obj);
}
