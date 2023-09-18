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
    // console.log(event.key);

    if (event.keyCode === 32) {
      nextSibling ? nextSibling.focus() : element.blur();
    }
    if (event.keyCode === 8) {
      if (char === " ") {
        prevSibling ? prevSibling.focus() : element.blur();
      }
      else{
        setState({ cls: "typingLetter" });
        prevSibling ? prevSibling.focus() : element.blur();
        //console.log("Backspace!!!");
      }
      
    } else {
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
    >
      {char}
    </span>
  );
};

export default Char;
