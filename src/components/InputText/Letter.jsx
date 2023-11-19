import React from "react";
import "./letter.css";

const Letter = ({ char, getCharacterClass, index }) => (
  <span className={getCharacterClass(char, index)}>{char}</span>
);

export default Letter;
