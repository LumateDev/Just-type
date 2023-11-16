import React from "react";
import Letter from "./Letter";
import "./wordGroup.css";

const Word = ({ word }) => {
  const chars = [...word, " "];

  return (
    <div className="word">
      {chars.map((char, index) => {
        <Letter key={index} char={char} />;
      })}
    </div>
  );
};
export default Word;
