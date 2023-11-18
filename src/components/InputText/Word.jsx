import React from "react";
import Letter from "./Letter";
import "./word.css";

const Word = ({
  charsWithIndexes,
  getCharacterClass,
  getWordClass,
  wordIdx,
}) => {
  if (wordIdx) {
    return (
      <span className={getWordClass(wordIdx, charsWithIndexes)}>
        {charsWithIndexes.map((char, index) => (
          <Letter
            key={index}
            char={char.char}
            getCharacterClass={getCharacterClass}
            index={char.idx - 1}
          />
        ))}
      </span>
    );
  } else {
    return <div className="">loading</div>;
  }
};

export default Word;
