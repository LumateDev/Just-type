import React from "react";
import "./inputText.css";

import Char from "./Char";
import { letters } from "./data.js";

const InputText = () => {
  //letters.map((letter, index) => console.log(letter.char, index));

  const listItems = letters.map((letter, index) => (
    <Char key={index} char={letter.char} i={index}></Char>
  ));

  return (
    <section className="inputText-section">
      <div className="container">
        
        <div className="typingText-wrapper">
       
          {listItems}</div>
      </div>
    </section>
  );
};

export default InputText;
