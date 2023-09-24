import React from "react";
import "./word.css";
import Char from "./Char";

const Word = React.forwardRef(({ word, i, len}, ref) => {
    let w = word.split("");

    if (i + 1 !== len){
        w.push(" ");
      }

    
   

    const charItems = w.map((char, index) => (
        <Char
          key={index}
          char={char}
          word={word}
          ref={ref}
          
          
        ></Char>
      ));
    return <div className="word">{charItems}</div>;
  });
  
  export default Word;