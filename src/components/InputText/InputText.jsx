import React from "react";
import "./inputText.css";

import Char from "./Char";
import { letters } from "./data.js";

const InputText = () => {
  const chars = [{}];
  let words = [ 'hello', 'world', 'js'];
  let str = words.join([' ']);
  console.log(str);
  console.log(str.length);

  for (let i = 1; i <= str.length; i++) {
    chars[i].id += i;
    chars[i].char += str[i];
  }
  
  console.log(chars);


  //letters.map((letter, index) => console.log(letter.char, index));

  const listItems = letters.map((letter, index) => (
    <Char key={index} char={letter.char} i={index}></Char>
  ));

  return (
    <section className="inputText-section">
      <div className="container">
        <div className="typingText-wrapper">{listItems}</div>
      </div>
    </section>
  );
};

export default InputText;
