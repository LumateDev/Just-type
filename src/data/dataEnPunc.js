import dataEn from "./dataEn";

const punctuation = [".", ",", "/", "'", ";", "[", "]"];
const wordsEnPunc = dataEn.map(
  (word) => word + punctuation[Math.floor(Math.random() * punctuation.length)]
);

export default wordsEnPunc;
