import React, { useEffect, useState, useRef } from "react";
import "./inputText.css";
import Word from "./Word";

import { getShuffledWords } from "../../utils/getShuffledWords";
import { getCurrentWordIndex } from "../../utils/getCurrentWordIndex";

const InputText = ({
  wordType,
  setActiveKey,
  wordCount,
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
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState([]);
  const [caretPosition, setCaretPosition] = useState(0);
  const [leftTime, setLeftTime] = useState(wordTime);
  const [isBlur, setIsBlur] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [tabPressed, setTabPressed] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [del, setDel] = useState(false);

  const inputRef = useRef();
  const scrollContainer = useRef();
  let charIndex = 0;

  useEffect(() => {
    if (caretPosition === 0) {
      scrollContainer.current.scrollTop = 0;
    } else {
      let caretElem =
        scrollContainer.current?.querySelector(".typingLetterCaret");
      if (caretElem && caretElem.offsetTop % 96 === 0) {
        scrollContainer.current.scrollTo(0, caretElem.offsetTop);
      }
    }
  }, [caretPosition]);

  useEffect(() => {
    const shuffledWords = getShuffledWords(
      wordType,
      languageTest,
      punctuationInclude,
      wordCount,
      numbersInclude,
      activeModeButton
    );
    setWords(shuffledWords);
    setLetters(shuffledWords.join(" ").split(""));
    setInputText(Array(shuffledWords.length).fill(""));
    inputRef.current.focus();
    setActiveKey(shuffledWords[0][0]);
    setCaretPosition(0);
    setStartTime(null);
    setEndTime(null);
    setLeftTime(wordTime);
    setTotalChars(0);
    setTotalErrors(0);
    setIncorrectChars({});

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
      (caretPosition >= charIndex - 1 && charIndex !== 0) ||
      (leftTime <= 0 && activeModeButton === "time")
    ) {
      setEndTime(new Date());
      setStatus("analysis");
      setWordComplete(getCurrentWordIndex(caretPosition, letters));
      setTotalChars(charIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caretPosition]);

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

  const handleFocus = () => {
    if (letters[caretPosition]) setActiveKey(letters[caretPosition]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      setDel(true);
      return;
    } else {
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
      setDel(false);
      return;
    }
  };

  const handleChange = (event) => {
    console.log(incorrectChars);
    let userInput = event.target.value.split("");
    let lastUserInput = userInput.slice(-1)[0];
    let currentActiveChar = letters[userInput.length];
    let prevActiveChar = letters[userInput.length - 1];

    if (lastUserInput !== prevActiveChar && prevActiveChar !== " " && !del) {
      const newValue = incorrectChars[prevActiveChar]
        ? incorrectChars[prevActiveChar] + 1
        : 1;
      incorrectChars[prevActiveChar] = newValue;
      setTotalErrors((totalErrors) => totalErrors + 1);
    }
    //Пока пользователь не нажал пробел, не переходим к следующему слову
    if (lastUserInput !== prevActiveChar && prevActiveChar === " ") return;

    setInputText(userInput);
    setCaretPosition(userInput.length);

    if (userInput.length !== letters.length) setActiveKey(currentActiveChar);
  };

  const getCharacterClass = (char, index) => {
    if (index === caretPosition) {
      if (index === 0) {
        return "typingLetterCaretAnim";
      }
      return "typingLetterCaret";
    } else if (!inputText[index]) {
      return "typingLetter";
    }
    return inputText[index] === char
      ? "typingLetterCorrect"
      : "typingLetterIncorrect";
  };

  const getWordClass = (wordIndex, charsWithIndexes) => {
    const currentWordIndex = getCurrentWordIndex(caretPosition, letters);

    if (wordIndex === currentWordIndex) {
      return "wordActive";
    }
    if (!charsWithIndexes) {
    }
    if (wordIndex < currentWordIndex) {
      const wordChars = charsWithIndexes.map((item) => item.char);
      const hasMistakes = wordChars.some((char, idx) => {
        const absWordIdx = charsWithIndexes[idx].idx - 1;
        return inputText[absWordIdx] !== char && char !== "";
      });

      if (hasMistakes) {
        return "wordWrong";
      } else {
        return "wordComplete";
      }
    }
    return "word";
  };

  const wordItems = words.map((word, index) => {
    const chars = [...word, index !== words.length - 1 ? "" : ""].map(
      (char) => {
        charIndex++;
        return { char: char, idx: charIndex, wordIdx: index };
      }
    );
    return (
      <Word
        key={index}
        charsWithIndexes={chars}
        getCharacterClass={getCharacterClass}
        getWordClass={getWordClass}
        wordIdx={index + 1}
      />
    );
  });

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
                {getCurrentWordIndex(caretPosition, letters)} / {wordCount}
              </div>
            )}
          </div>
          {capsLockOn && (
            <div className="capsLock-warning">Caps Lock is on!</div>
          )}
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
          <input
            ref={inputRef}
            className={"typingText-input"}
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
              handleFocus();
            }}
            onKeyDown={handleKeyDown}
          />
          <div
            className={`typingText-wrapper ${isBlur ? "blur" : ""}`}
            ref={scrollContainer}
          >
            {wordItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputText;
