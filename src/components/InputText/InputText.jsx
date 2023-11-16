import React, { useEffect, useState, useRef } from "react";
import "./inputText.css";

import wordsRu from "./../utils/dataRu";
import wordsEn from "./../utils/dataEn";
import wordsEnNum from "../utils/dataEnNum";
import wordsEnNumPunc from "../utils/dataEnNumPunc";
import wordsRuNum from "../utils/dataRuNum";
import wordsRuPunc from "../utils/dataRuPunc";
import wordsRuNumPunc from "../utils/dataRuNunPunc";
import { randomEnglishQuote } from "../utils/quoteEn";
import { randomRussianQuote } from "../utils/quoteRu";
import { shuffle } from "./../utils/shuffle";
import wordsEnPunc from "../utils/dataEnPunc";

const InputText = ({
  setActiveKey,
  wordCount,
  status,
  setStatus,
  wordTime,
  setWordCount,
  setTotalChars,
  setTotalErrors,
  setEndTime,
  startTime,
  setStartTime,
  setActiveRestartButton,
  incorrectChars,
  setIncorrectChars,
  languageTest,
  activeModeButton,
  setWordComplete,
  activeRestartButton,
  numbersInclude,
  punctuationInclude,
}) => {
  const [inputText, setInputText] = useState([]);
  const [letters, setLetters] = useState([]);
  const [caretPosition, setCaretPosition] = useState(0);
  const [isBlur, setIsBlur] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [tabPressed, setTabPressed] = useState(false);
  const [leftTime, setLeftTime] = useState(wordTime);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const inputRef = useRef();

  const getShuffledWords = () => {
    if (languageTest === "russian") {
      if (numbersInclude && !punctuationInclude)
        return shuffle(wordsRuNum).slice(0, wordCount);
      if (punctuationInclude && !numbersInclude)
        return shuffle(wordsRuPunc).slice(0, wordCount);
      if (numbersInclude && punctuationInclude)
        return shuffle(wordsRuNumPunc).slice(0, wordCount);
      if (activeModeButton === "quote") {
        let randomQuote = randomRussianQuote();
        return randomQuote;
      } else {
        return shuffle(wordsRu).slice(0, wordCount);
      }
    }

    if (languageTest === "english") {
      if (numbersInclude && !punctuationInclude)
        return shuffle(wordsEnNum).slice(0, wordCount);
      if (punctuationInclude && !numbersInclude)
        return shuffle(wordsEnPunc).slice(0, wordCount);
      if (numbersInclude && punctuationInclude)
        return shuffle(wordsEnNumPunc).slice(0, wordCount);
      if (activeModeButton === "quote") {
        let randomQuote = randomEnglishQuote();
        return randomQuote;
      } else {
        return shuffle(wordsEn).slice(0, wordCount);
      }
    }

    throw new Error("Invalid languageTest value");
  };

  useEffect(() => {
    const shuffledWords = getShuffledWords();
    const shuffleString = shuffledWords.join(" ");
    setLetters(shuffleString.split(""));
    setInputText(Array(shuffleString.length).fill(""));

    inputRef.current.focus();
    setActiveKey(shuffleString[0]);
    setCaretPosition(0);
    setStartTime(null);
    setEndTime(null);
    setLeftTime(wordTime);
    setTotalChars(0);
    setTotalErrors(0);
    setIncorrectChars(new Map());

    if (activeModeButton === "time") setWordCount(wordTime * 5);
    else if (
      activeModeButton === "words" &&
      wordCount !== 10 &&
      wordCount !== 25 &&
      wordCount !== 50 &&
      wordCount !== 75 &&
      wordCount !== 100
    ) {
      setWordCount(25);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setActiveKey,
    wordCount,
    activeModeButton,
    wordTime,
    activeRestartButton,
    languageTest,
    numbersInclude,
    punctuationInclude,
  ]);

  useEffect(() => {
    if (
      (caretPosition >= letters.length && letters.length !== 0) ||
      (leftTime <= 0 && activeModeButton === "time")
    ) {
      setEndTime(new Date());
      setStatus("analysis");
      setWordComplete(calculateCurrentWord(inputText) + 1);
      setTotalChars(letters.length);
      const totalErrors = Array.from(incorrectChars.values()).reduce(
        (acc, cur) => acc + cur,
        0
      );

      setTotalErrors(totalErrors);
    }
  }, [
    caretPosition,
    letters.length,
    leftTime,
    activeModeButton,
    setEndTime,
    setStatus,
    setWordComplete,
    inputText,
    incorrectChars,
    setTotalErrors,
    setTotalChars,
  ]);

  useEffect(() => {
    let timer;

    if (startTime && activeModeButton === "time") {
      timer = setInterval(() => {
        const currentLeftTime = (
          (wordTime * 1000 - (new Date() - startTime)) /
          1000
        ).toFixed(0);
        setLeftTime(currentLeftTime);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [wordTime, startTime, activeModeButton]);

  const handleBlur = () => {
    setActiveKey("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      setTabPressed(true);
      return;
    }
    if (event.key === "Enter" && tabPressed) {
      setActiveRestartButton(activeRestartButton + 1);
      setTabPressed(false);
      return;
    }
    if (event.key === "Enter" && !tabPressed) {
      return;
    }

    if (event.key === "CapsLock") {
      if (event.getModifierState("CapsLock")) {
        setCapsLockOn(true);
      } else {
        setCapsLockOn(false);
      }
      return;
    }
    if (!startTime) {
      setStartTime(new Date());
    }
  };

  const handleChange = (event) => {
    let userInput = event.target.value.split("");
    let newIncorrectChars = new Map(incorrectChars);

    if (caretPosition !== 0 && userInput.length < inputText.length) {
      setInputText(userInput);
      setCaretPosition(userInput.length);
      setActiveKey(letters[userInput.length]);
      return;
    }

    if (letters[caretPosition] === " " && userInput[caretPosition] !== " ") {
      return;
    }

    if (userInput.length > letters.length) {
      userInput = userInput.slice(0, letters.length);
    }

    setInputText(userInput);
    setCaretPosition(userInput.length);
    if (userInput.length < letters.length)
      setActiveKey(letters[userInput.length]);

    if (userInput[userInput.length - 1] !== letters[userInput.length - 1]) {
      if (newIncorrectChars.has(letters[userInput.length - 1])) {
        let prev = newIncorrectChars.get(letters[userInput.length - 1]);
        newIncorrectChars.set(letters[userInput.length - 1], prev + 1);
      } else {
        newIncorrectChars.set(letters[userInput.length - 1], 1);
      }
    }

    setIncorrectChars(newIncorrectChars);
  };
  const getCharacterClass = (char, index) => {
    if (index === caretPosition) {
      return "typingLetterCaret";
    } else if (!inputText[index]) {
      return "typingLetter";
    }
    return inputText[index] === char
      ? "typingLetterCorrect"
      : "typingLetterIncorrect";
  };

  const calculateCurrentWord = (userInput) => {
    return userInput
      .join("")
      .split(" ")
      .filter((word) => word !== "").length;
  };

  return (
    <div className="inputText-section">
      <div className="container">
        <div className="top-bar-row">
          <div className="top-bar-row-row">
            {activeModeButton === "time" && (
              <div className="count-wrapper" key={leftTime}>
                {leftTime}
              </div>
            )}

            {(activeModeButton === "words" || activeModeButton === "quote") && (
              <div className="count-wrapper" key={wordCount}>
                {calculateCurrentWord(inputText) + 1} / {wordCount}
              </div>
            )}
            {capsLockOn && (
              <div className="capsLock-warning">Caps Lock is on!</div>
            )}
          </div>
          <div className="top-bar-col">
            {" "}
            <div className="restart-hint">
              Нажмите Tab + Enter чтобы начать сначала
            </div>
          </div>
        </div>
        <div className="focus-button-wrapper">
          {showButton && (
            <button
              className="focus-button"
              onClick={() => inputRef.current.focus()}
            >
              Нажмите чтобы продолжить печать
            </button>
          )}
          <div className={`wrapper ${isBlur ? "blur" : ""}`}>
            <input
              ref={inputRef}
              className={"typingText-wrapper"}
              type="text"
              value={inputText.join("")}
              onChange={handleChange}
              autoCorrect="off"
              spellCheck="false"
              onPaste={(e) => e.preventDefault()}
              onBlur={() => {
                setIsBlur(true);
                setShowButton(true);
                handleBlur();
              }}
              onFocus={() => {
                setIsBlur(false);
                setShowButton(false);
              }}
              onKeyDown={handleKeyDown}
            />
            <p className="text">
              {letters.map((letter, index) => (
                <span key={index} className={getCharacterClass(letter, index)}>
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputText;
