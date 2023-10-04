import React from "react";
import "./word.css";
import Char from "./Char";

const Word = React.forwardRef(
  (
    {
      word,
      i,
      len,
      setActiveKey,
      setTotalTypedCharacters,
      setTotalMistypedCharacters,
      totalMistypedCharacters,
      totalTypedCharacters,
      startTime,
      endTime,
      setStartTime,
      setEndTime,
      setStatus,
    },
    ref
  ) => {
    let w = word.split("");

    if (i + 1 !== len) {
      w.push(" ");
    }

    const charItems = w.map((char, index) => (
      <Char
        key={index}
        char={char}
        word={word}
        ref={ref}
        setActiveKey={setActiveKey}
        totalTypedCharacters={totalTypedCharacters}
        totalMistypedCharacters={totalMistypedCharacters}
        setTotalTypedCharacters={setTotalTypedCharacters}
        setTotalMistypedCharacters={setTotalMistypedCharacters}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        startTime={startTime}
        endTime={endTime}
        setStatus={setStatus}
      ></Char>
    ));
    return <div className="word">{charItems}</div>;
  }
);

export default Word;
