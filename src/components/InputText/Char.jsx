import React, { useState } from "react";
import "./char.css";
import { useRef, useEffect } from "react";

const Char = (props) => {
  const [state, setState] = useState({
    cls: "typingLetter",
  });

  var i = props.i;
  var char = props.char;

  const ref = useRef();
  // Автофокус на начало
  useEffect(() => {
    //console.log(ref);
    if (i === 0) {
      ref.current.focus();
    }
    if (char === " ") {
      setState({ cls: "typingLetter-space" });
      //console.log("space");
    }
  }, [char, i]);

  

  const handleKeyDown = (event) => {
    
    const element = event.target;
    const nextSibling = element.nextElementSibling;
    const prevSibling = element.previousElementSibling;
    const isSpace = element.textContent === " ";
    // console.log(event.key);

    if (event.keyCode === 32) {
      nextSibling ? nextSibling.focus() : element.blur();
    }
  
    if (event.key === "Alt" ) {
      console.log("Alt");
      
    }
    if (event.keyCode === 8) {
    if (isSpace) {
      prevSibling ? prevSibling.focus() : element.blur();
    } else {
      prevSibling ? prevSibling.focus() : element.blur();
      if (prevSibling) {
        prevSibling.className = "typingLetter";
        if (prevSibling.textContent === " ") {
          // Добавляем класс для пробела
          prevSibling.classList.add("typingLetter-space");
        }
      }
    }
  }  else {
      if (event.key === char && state.cls !== "typingLetter-space") {
        setState({ cls: "typingLetter-correct" });
        console.log("correct");
        nextSibling ? nextSibling.focus() : element.blur();
      } else if (event.key !== char && state.cls !== "typingLetter-space") {
        setState({ cls: "typingLetter-incorrect" });
        console.log("incorrect");
        nextSibling ? nextSibling.focus() : element.blur();
      }
    }
  };
  

  return (
    <span
    className={state.cls}
    key={i}
    tabIndex={-1}
    onKeyDown={handleKeyDown}
    ref={ref}
    id={`char-${i}`} // добавьте атрибут id здесь
    
    >
      {char}
    </span>
  );
};

export default Char;
