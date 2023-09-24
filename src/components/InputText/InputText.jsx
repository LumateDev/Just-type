import React , {useRef,useEffect} from "react";
import "./inputText.css";

// import Char from "./Char";
// import { letters } from "./data.js";

import Word from "./Word";
let words = [
  "delete",
"hello",
"world",
"js",
"react",
"aboba",
"system",
"point",
"person",
"input",
"user",
"update",
"delete",
"insert",
"create",
"css",
"style",
"Bee",
"restart",
"stop",
"run",
"app",
"data"
];

// let wordsR = [
// "дима",
// "машина",
//  ""
// ];

const InputText = () => {

  const inputRef = useRef(null);
  
  // Задаем начальный фокус на первый символ первого слова
  useEffect(() => {
    if (inputRef.current) {
      const firstChar = inputRef.current.querySelector(".typingLetter");
      firstChar.focus();
    }
  }, []);


  const wordItems = words.map((word, index) => (
    <Word key={index} word={word} ref={inputRef} len = {words.length} i = {index}
    ></Word>
  ));

return (
<section className="inputText-section">
<div className="container">
<div className="typingText-wrapper"ref={inputRef}>{wordItems}</div>
</div>
</section>
);
};

export default InputText;