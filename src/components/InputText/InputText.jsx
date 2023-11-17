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
  totalErrors,
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
      setWordComplete(getCurrentWordIndex(caretPosition));
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
    let userInput = event.target.value.split("");
    let lastUserInput = userInput.slice(-1)[0];
    let currentActiveChar = letters[userInput.length];
    let prevActiveChar = letters[userInput.length - 1];

    //Пользователь не может допускать ошибки
    // if (lastUserInput !== letters[userInput.length - 1]) return;

    // Записываем каждую ошибку пользователя в Map
    if (lastUserInput !== prevActiveChar && del === false) {
      const newValue = incorrectChars.get(prevActiveChar)
        ? incorrectChars.get(prevActiveChar) + 1
        : 1;
      incorrectChars.set(prevActiveChar, newValue);
      setTotalErrors((totalErrors) => totalErrors + 1);
    }
    //Пока пользователь не нажал пробел, не переходим к следующему слову
    if (lastUserInput !== prevActiveChar && prevActiveChar === " ") return;

    setInputText(userInput);
    setCaretPosition(userInput.length);
    if (userInput.length !== letters.length) setActiveKey(currentActiveChar);
  };

  // необходимо написать функцию getWordClass , которая будет определять класс слова,
  // если слово на котором пользователь, класс актив, если слово введенно без ошибок,
  // класс complete, если в слове есть хотя бы 1 ошибка class wrong

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

  const getCurrentWordIndex = (index) => {
    let wordIndex = 0;
    let spaceCount = 0;

    for (let i = 0; i <= index; i++) {
      if (letters[i] === " ") {
        spaceCount += 1;
      } else {
        wordIndex = spaceCount + 1;
      }
    }

    return wordIndex;
  };

  const getWordClass = (wordIndex, charsWithIndexes) => {
    const currentWordIndex = getCurrentWordIndex(caretPosition);

    console.log(wordIndex);
    console.log(currentWordIndex);

    if (wordIndex === currentWordIndex) {
      return "wordActive";
      // } else if (wordIndex < currentWordIndex) {
      //   // Задаем условие, которое проверяет, встречаются ли ошибки в слове

      //   // Создаем массив символов этого слова
      //   const wordChars = charsWithIndexes.map((item) => item.char);

      //   // Проверка на ошибки в этом слове
      //   const hasMistakes = wordChars.some((char, idx) => {
      //     const absWordIdx = charsWithIndexes[idx].idx - 1; // абсолютный индекс символа в тексте
      //     return inputText[absWordIdx] !== char && char !== " ";
      //   });

      //   if (hasMistakes) {
      //     // если есть ошибки, слово считается неверно введенным
      //     return "wordWrong";
      //   } else {
      //     // если ошибок нет, слово считается успешно введенным
      //     return "wordComplete";
      //   }
    }

    // за умолчанием слова, которые еще не были достигнуты кареткой, получат класс 'word'
    return "word";
  };

  const wordItems = words.map((word, index) => {
    const chars = [...word, index !== words.length - 1 ? " " : ""].map(
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
                {getCurrentWordIndex(caretPosition)} / {wordCount}
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
                handleFocus();
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
