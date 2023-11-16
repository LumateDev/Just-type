import React, { useEffect, useState, useRef } from "react";
import "./inputText.css";
import Word from "./Word";

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

  const inputRef = useRef();
  let charIndex = 0;

  const getShuffledWords = () => {
    if (wordType === "default") {
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
    }
  };

  useEffect(() => {
    const shuffledWords = getShuffledWords();
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
      setWordComplete(calculateCurrentWord(inputText) + 1);

      setTotalChars(charIndex);

      const totalErrors = Array.from(incorrectChars.values()).reduce(
        (acc, cur) => acc + cur,
        0
      );

      setTotalErrors(totalErrors);
    }
  }, [
    caretPosition,
    charIndex,
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
    let lastUserInput = userInput.slice(-1)[0];
    console.log(lastUserInput);
    //console.log(userInput.length);
    console.log(letters[userInput.length - 1]);
    console.log(letters);

    let newIncorrectChars = new Map(incorrectChars);

    //Пользователь не может допускать ошибки
    // if (lastUserInput !== letters[userInput.length - 1]) return;

    //Пользователь не может допускать ошибки в пробеле
    if (
      lastUserInput !== letters[userInput.length - 1] &&
      letters[userInput.length - 1] === " "
    )
      return;

    setInputText(userInput);
    setCaretPosition(userInput.length);
    if (userInput.length !== letters.length)
      setActiveKey(letters[userInput.length]);
  };
  //необходимо установить текущую активную букву - ready
  //Необходимо проверить соответсвует ли символ введённый пользователем текущему, если нет, до добавить в мапу текущий, {символ: количество}
  //Необходимо запретить переход к следующему слову или символу, если текущий символ пробел и пользователь нажал его неверно
  // необходимо написать функцию getWordClass , которая будет определять класс слова, если слово на котором пользователь, класс актив, если слово введенно без ошибок, класс complete, если в слове есть хотя бы 1 ошибка class wrong
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

  //неактуальная функция, нужно перерадобать
  const calculateCurrentWord = (userInput) => {
    return userInput
      .join("")
      .split(" ")
      .filter((word) => word !== "").length;
  };

  const wordItems = words.map((word, index) => {
    const chars = [...word, index !== words.length - 1 ? " " : ""].map(
      (char) => {
        charIndex++;
        return { char: char, idx: charIndex };
      }
    );
    return (
      <Word
        key={index}
        charsWithIndexes={chars}
        getCharacterClass={getCharacterClass}
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
          <div className={`typingText-wrapper ${isBlur ? "blur" : ""}`}>
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
              }}
              onKeyDown={handleKeyDown}
            />
            {wordItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputText;
