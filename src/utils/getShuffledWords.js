import wordsRu from "../data/dataRu";
import wordsEn from "../data/dataEn";
import wordsEnNum from "../data/dataEnNum";
import wordsEnNumPunc from "../data/dataEnNumPunc";
import wordsEnPunc from "../data/dataEnPunc";
import wordsRuNum from "../data/dataRuNum";
import wordsRuPunc from "../data/dataRuPunc";
import wordsRuNumPunc from "../data/dataRuNunPunc";
import { randomEnglishQuote } from "../data/quoteEn";
import { randomRussianQuote } from "../data/quoteRu";

import { shuffle } from "../utils/shuffle";

export const getShuffledWords = (
  wordType,
  languageTest,
  punctuationInclude,
  wordCount,
  numbersInclude,
  activeModeButton
) => {
  if (wordType === "default") {
    if (languageTest === "russian") {
      if (numbersInclude && !punctuationInclude)
        return shuffle(wordsRuNum).slice(0, wordCount);
      if (punctuationInclude && !numbersInclude)
        return shuffle(wordsRuPunc).slice(0, wordCount);
      if (numbersInclude && punctuationInclude)
        return shuffle(wordsRuNumPunc).slice(0, wordCount);
      if (activeModeButton === "quote") {
        let randomQuote = randomRussianQuote();
        return randomQuote;
      } else {
        return shuffle(wordsRu).slice(0, wordCount);
      }
    }
    if (languageTest === "english") {
      if (numbersInclude && !punctuationInclude)
        return shuffle(wordsEnNum).slice(0, wordCount);
      if (punctuationInclude && !numbersInclude)
        return shuffle(wordsEnPunc).slice(0, wordCount);
      if (numbersInclude && punctuationInclude)
        return shuffle(wordsEnNumPunc).slice(0, wordCount);
      if (activeModeButton === "quote") {
        let randomQuote = randomEnglishQuote();
        return randomQuote;
      } else {
        return shuffle(wordsEn).slice(0, wordCount);
      }
    }
    throw new Error("Invalid languageTest value");
  }
};
