import React, { useRef, useEffect } from "react";
import "./inputText.css";
import Word from "./Word";
import wordsEn from "./data";

const InputText = ({ setActiveKey }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      const firstChar = inputRef.current.querySelector(".typingLetter");
      firstChar.focus();
    }
  }, []);

  const wordItems = wordsEn.map((word, index) => (
    <Word
      key={index}
      word={word}
      ref={inputRef}
      len={wordsEn.length}
      i={index}
      setActiveKey={setActiveKey}
    ></Word>
  ));

  return (
    <section className="inputText-section">
      <div className="container">
        <div className="typingText-wrapper" ref={inputRef}>
          {wordItems}
        </div>
      </div>
    </section>
  );
};

export default InputText;
