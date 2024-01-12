import dataRu from "./dataRu";

const punctuation = [".", ",", "/", "'", ";", "[", "]"];
const wordsRuPunc = dataRu.map(
  (word) => word + punctuation[Math.floor(Math.random() * punctuation.length)]
);

export default wordsRuPunc;
