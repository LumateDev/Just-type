import dataRu from "./dataRu";

const punctuation = [".", ",", "!", "?", ";", ":", "-", "_"];
const wordsRuPunc = dataRu.map(
  (word) => word + punctuation[Math.floor(Math.random() * punctuation.length)]
);

export default wordsRuPunc;
