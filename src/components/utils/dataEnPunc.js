import dataEn from "./dataEn";

const punctuation = [".", ",", "!", "?", ";", ":", "-", "_"];
const wordsEnPunc = dataEn.map(
  (word) => word + punctuation[Math.floor(Math.random() * punctuation.length)]
);

export default wordsEnPunc;
