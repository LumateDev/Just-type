import React, { useEffect, useState } from "react";
import "./inputText.css";
import WordGroup from "./WordGroup";
import newWords from "./data";

const InputText = ({
  wordCount,
  setActiveKey,
  status,
  setStatus,
  totalChars,
  setTotalChars,
  totalErrors,
  setTotalErrors,
  setEndTime,
  startTime,
  setStartTime,
}) => {
  const words = newWords.slice(0, wordCount);

  // Calculate number of characters in each word (with spaces)
  const charsInWord = words.map((word) => [...word, " "].length);

  const chars = words.flatMap((word, index) => [
    ...word.split(""),
    index !== words.length - 1 ? " " : "",
  ]);

  const refs = chars.map(() => React.createRef());

  const [focusIndex, setFocusIndex] = useState(0);
  const [statuses, setStatuses] = useState(chars.map(() => "typingLetter"));
  const [userInput, setUserInput] = useState([]);
  const [incorrectChars, setIncorrectChars] = useState(new Set());
  const [extraInputs, setExtraInputs] = useState(
    new Array(words.length).fill([])
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
    if (refs[focusIndex]) {
      refs[focusIndex].current.focus();
    }
    if (focusIndex + 1 >= chars.length) {
      refs[focusIndex].current.blur();
    }
    if (focusIndex + 1 >= chars.length) {
      setEndTime(new Date());
      setStatus("analysis");
      console.log(status);
    }
  }, [focusIndex, chars.length, status, setStatus, setEndTime, chars, refs]);

  const handleFocus = () => {
    setActiveKey(chars[focusIndex]);
  };

  const handleBlur = () => {
    setActiveKey("");
  };

  const handleKeyDown = (event) => {
    const ignoreKeys = new Set([
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "CapsLock",
      "Alt",
      "Shift",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "Tab",
      "Control",
    ]);

    if (ignoreKeys.has(event.key)) return;

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
        extraInputs[wordIndex].length < 10 &&
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
        extraInputs[wordIndex].length >= 10 &&
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
        setStatuses((prev_1) => {
          const newStatuses = [...prev_1];
          newStatuses[focusIndex - 1] = "typingLetter";
          return newStatuses;
        });
        setIncorrectChars((prevSet) => {
          const newSet = new Set(prevSet);
          newSet.delete(chars[focusIndex - 1]);
          return newSet;
        });
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

      if (!charCorrect) {
        setIncorrectChars((prevSet) => new Set(prevSet.add(chars[focusIndex])));
      }
      return newStatuses;
    });

    setUserInput((prevInput) => [...prevInput.slice(0, focusIndex), event.key]);

    event.preventDefault();
    setFocusIndex((prevIndex) =>
      prevIndex + 1 < refs.length ? prevIndex + 1 : prevIndex
    );
  };

  let charIndex = 0;
  const wordItems = words.map((word, index) => {
    const charsInWord = [...word, index !== words.length - 1 ? " " : ""].length;
    const refSet = refs.slice(charIndex, charIndex + charsInWord);
    const statusSet = statuses.slice(charIndex, charIndex + charsInWord);
    charIndex += charsInWord;
    return (
      <WordGroup
        key={index}
        word={word}
        refSet={refSet}
        statusSet={statusSet}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        extraInputs={extraInputs[index]}
      />
    );
  });

  return (
    <section className="inputText-section">
      <div className="container">
        <div
          tabIndex={-1}
          className="typingText-wrapper"
          onKeyDown={handleKeyDown}
          key={wordCount}
        >
          {wordItems}
        </div>
      </div>
    </section>
  );
};

export default InputText;
