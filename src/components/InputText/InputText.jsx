import React, { useEffect, useState, useMemo } from "react";
import "./inputText.css";
import WordGroup from "./WordGroup";

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
import { ignoreKeys } from "../utils/ignoreKeys";
import wordsEnPunc from "../utils/dataEnPunc";

const InputText = ({
  wordCount,
  setActiveKey,
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
  setUserInput,
  setIncorrectChars,
  languageTest,
  activeModeButton,
  setWordComplete,
  activeRestartButton,
  numbersInclude,
  punctuationInclude,
}) => {
  const shuffledWords = useMemo(() => {

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
    // eslint-disable-next-line
  }, [
    wordCount,
    languageTest,
    punctuationInclude,
    numbersInclude,
    activeRestartButton,
    activeModeButton,
  ]);

  // Calculate number of characters in each word (with spaces)
  const charsInWord = shuffledWords.map((word) => [...word, " "].length);
  const chars = shuffledWords.flatMap((word, index) => [
    ...word.split(""),
    index !== shuffledWords.length - 1 ? " " : "",
  ]);

  const refs = chars.map(() => React.createRef());
  const [isBlur, setIsBlur] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [tabPressed, setTabPressed] = useState(false);
  const [statuses, setStatuses] = useState(chars.map(() => "typingLetter"));
  const [leftTime, setLeftTime] = useState(wordTime);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [extraInputs, setExtraInputs] = useState(
    new Array(shuffledWords.length).fill([])
  );

  // Calculate the index of current word
  let wordIndex = 0;
  let sumChars = 0;
  for (let i = 0; i < charsInWord.length; i++) {
    sumChars += charsInWord[i];
    if (sumChars > focusIndex) {
      wordIndex = i;
      break;
    }
  }

  useEffect(() => {
    setStartTime(null);
    setEndTime(null);
    setLeftTime(wordTime);
    setTotalChars(0);
    setTotalErrors(0);
    setFocusIndex(0);
    setStatuses(chars.map(() => "typingLetter"));
    setUserInput([]);
    setIncorrectChars(new Set());

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

    // eslint-disable-next-line
  }, [
    wordCount,
    activeModeButton,
    wordTime,
    activeRestartButton,
    languageTest,
  ]);

  //clear extraInputs
  useEffect(() => {
    setExtraInputs(new Array(shuffledWords.length).fill([]));
  }, [shuffledWords.length, activeModeButton, activeRestartButton]);

  useEffect(() => {
    if (refs[focusIndex]) {
      refs[focusIndex].current.focus();
    }
    if (focusIndex + 1 >= chars.length) {
      refs[focusIndex].current.blur();
    }
    if (
      focusIndex + 1 >= chars.length ||
      (leftTime <= 0 && activeModeButton === "time")
    ) {
      setEndTime(new Date());
      setStatus("analysis");
      setWordComplete(wordIndex + 1);
    }
  }, [
    focusIndex,
    chars.length,
    status,
    setStatus,
    setEndTime,
    chars,
    refs,
    leftTime,
    setWordComplete,
    wordIndex,
    activeModeButton,
  ]);

  useEffect(() => {
    let timer;

    if (startTime) {
      timer = setInterval(() => {
        const currentLeftTime = (
          (wordTime * 1000 - (new Date() - startTime)) /
          1000
        ).toFixed(0);
        setLeftTime(currentLeftTime);
      }, 1000);
    }

    return () => clearInterval(timer); // очистка интервала при размонтировании компонента
  }, [wordTime, startTime]);

  const handleFocus = () => {
    setActiveKey(chars[focusIndex]);
  };

  const handleBlur = () => {
    setActiveKey("");
  };

  const handleKeyDown = (event) => {
    if (ignoreKeys.has(event.key)) return;

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

    if (event.key === " ") {
      if (chars[focusIndex] === " " && extraInputs[wordIndex].length >= 10) {
        setFocusIndex((prevIndex) =>
          prevIndex + 1 < refs.length ? prevIndex + 1 : prevIndex
        );
        event.preventDefault();
        return;
      }
    }

    if (event.key !== " ") {
      if (
        chars[focusIndex] === " " &&
        extraInputs[wordIndex].length < 6 &&
        event.key !== "Backspace"
      ) {
        event.preventDefault();
        setExtraInputs((prev) => {
          const newExtraInputs = [...prev];
          newExtraInputs[wordIndex] = [...newExtraInputs[wordIndex], event.key];
          return newExtraInputs;
        });
        setTotalChars((prevCharTotal) => prevCharTotal + 1);
        setTotalErrors((prevErrorTotal) => prevErrorTotal + 1);
        return;
      }
      if (
        chars[focusIndex] === " " &&
        extraInputs[wordIndex].length >= 6 &&
        event.key !== "Backspace"
      ) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === "Backspace") {
      event.preventDefault();

      if (chars[focusIndex] === " " && extraInputs[wordIndex].length > 0) {
        setExtraInputs((prev) => {
          const newExtraInputs = [...prev];
          newExtraInputs[wordIndex] = [
            ...newExtraInputs[wordIndex].slice(
              0,
              newExtraInputs[wordIndex].length - 1
            ),
          ];
          return newExtraInputs;
        });
        return;
      }

      if (focusIndex > 0) {
        let charWasIncorrect =
          statuses[focusIndex - 1] === "typingLetter-incorrect";

        setStatuses((prevStatuses) => {
          const newStatuses = [...prevStatuses];
          newStatuses[focusIndex - 1] = "typingLetter";
          return newStatuses;
        });

        if (!charWasIncorrect) {
          setIncorrectChars((prevSet) => {
            const newSet = new Set(prevSet);
            newSet.delete(chars[focusIndex - 1]);
            return newSet;
          });
        }

        setUserInput((prevInput) => [...prevInput.slice(0, focusIndex - 1)]);
        setFocusIndex((prevIndex) => prevIndex - 1);
      }
      return;
    }

    let charCorrect = event.key === chars[focusIndex];

    if (event.key !== "Backspace") {
      setTotalChars((prevCharTotal) => prevCharTotal + 1);
      if (!charCorrect) setTotalErrors((prevErrorTotal) => prevErrorTotal + 1);
    }

    setStatuses((prevStatuses) => {
      const newStatuses = [...prevStatuses];
      newStatuses[focusIndex] = charCorrect
        ? "typingLetter-correct"
        : "typingLetter-incorrect";
      return newStatuses;
    });

    if (!charCorrect) {
      setTotalErrors((prevErrorTotal) => prevErrorTotal + 1);
      setIncorrectChars((prevSet) => new Set(prevSet.add(chars[focusIndex])));
    }

    setUserInput((prevInput) => [...prevInput.slice(0, focusIndex), event.key]);

    event.preventDefault();
    setFocusIndex((prevIndex) =>
      prevIndex + 1 < refs.length ? prevIndex + 1 : prevIndex
    );
  };

  let charIndex = 0;
  const wordItems = shuffledWords.map((word, index) => {
    const charsInWord = [...word, index !== shuffledWords.length - 1 ? " " : ""]
      .length;
    const refSet = refs.slice(charIndex, charIndex + charsInWord);
    const statusSet = statuses.slice(charIndex, charIndex + charsInWord);
    charIndex += charsInWord;
    return (
      <WordGroup
        key={index}
        word={word}
        refSet={refSet}
        statusSet={statusSet}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        extraInputs={extraInputs[index] || []}
      />
    );
  });

  return (
    <section className="inputText-section" key={shuffledWords}>
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
                {wordIndex} / {shuffledWords.length}
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
              onClick={() => refs[focusIndex].current.focus()}
            >
              Нажмите чтобы продолжить печать
            </button>
          )}
          <div
            tabIndex={-1}
            className={`typingText-wrapper ${isBlur ? "blur" : ""}`}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setIsBlur(true);
              setShowButton(true);
            }}
            onFocus={() => {
              setIsBlur(false);
              setShowButton(false);
            }}
          >
            {wordItems}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputText;
