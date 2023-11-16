import React from "react";
import Letter from "./Letter";
import "./word.css";

const Word = ({ getCharacterClass, charsWithIndexes }) => {
  return (
    <span className="word">
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
};

export default Word;
