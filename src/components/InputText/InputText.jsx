import React, { useMemo, useEffect, useRef } from "react";
import "./inputText.css";
import Word from "./Word";
import words from "./data";

const InputText = ({
  startTime,
  endTime,
  setEndTime,
  setStartTime,
  setActiveKey,
  setTotalTypedCharacters,
  setTotalMistypedCharacters,
  setStatus,
  wordCount,
  wordTime,
  restartTest,
  numbersInclude,
  punctuationInclude,
  languageTest,
  totalMistypedCharacters,
  totalTypedCharacters,
}) => {
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };
  const inputRef = useRef(null);

  useEffect(() => {
    setStartTime(null);
    setEndTime(null);
    setTotalTypedCharacters(0);
    setTotalMistypedCharacters(0);
    if (inputRef.current) {
      const firstChar = inputRef.current.querySelector(".typingLetter");
      firstChar.focus();
    }
  }, [
    wordCount,
    wordTime,
    restartTest,
    numbersInclude,
    punctuationInclude,
    languageTest,
  ]);

  const shuffledWords = useMemo(
    () => shuffle(words).slice(0, wordCount),
    [
      wordCount,
      wordTime,
      restartTest,
      numbersInclude,
      punctuationInclude,
      languageTest,
    ]
  );

  const wordItems = shuffledWords.map((word, index) => (
    <Word
      key={index}
      word={word}
      ref={inputRef}
      len={shuffledWords.length}
      i={index}
      setActiveKey={setActiveKey}
      totalTypedCharacters={totalTypedCharacters}
      totalMistypedCharacters={totalMistypedCharacters}
      setTotalTypedCharacters={setTotalTypedCharacters}
      setTotalMistypedCharacters={setTotalMistypedCharacters}
      startTime={startTime}
      endTime={endTime}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
      setStatus={setStatus}
    ></Word>
  ));

  return (
    <section className="inputText-section" key={shuffledWords}>
      <div className="container">
        <div className="typingText-wrapper" ref={inputRef}>
          {wordItems}
        </div>
      </div>
    </section>
  );
};

export default InputText;
