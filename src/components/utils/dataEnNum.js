import dataEn from "./dataEn";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const wordsEnNum = dataEn.map(
  (word) => word + numbers[Math.floor(Math.random() * numbers.length)]
);

export default wordsEnNum;
