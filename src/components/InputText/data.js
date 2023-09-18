export const letters = [];
let words = ["hello", "world", "js", "react", "aboba"];
let str = words.join([" "]);

for (let i = 0; i < str.length; i++) {
  let obj = {};
  obj.id = i + 1;
  obj.char = str[i];
  letters.push(obj);
}
