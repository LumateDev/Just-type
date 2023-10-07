import React, { useEffect, useState, useMemo } from "react";
import "./inputText.css";
import WordGroup from "./WordGroup";

import wordsRu from "./dataRu";
import { shuffle } from "./shuffle";
import wordsEn from "./dataEn";

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
    if (languageTest === 'russian') {
      return shuffle(wordsRu).slice(0, wordCount);
    }
  
    if (languageTest === 'english') {
      return shuffle(wordsEn).slice(0, wordCount);
    }
    if(numbersInclude  && !punctuationInclude)
    console.log("Используем массив с числами");

    if(punctuationInclude && !numbersInclude)
      console.log("Используем массив с пунктуацей");
    if(numbersInclude && punctuationInclude) 
      console.log("Используем массив со знаками и с пунктуацией");
  
    throw new Error('Invalid languageTest value');
    // eslint-disable-next-line
  }, [wordCount, languageTest, punctuationInclude, numbersInclude, activeRestartButton]);
  

  // Calculate number of characters in each word (with spaces)
  const charsInWord = shuffledWords.map((word) => [...word, " "].length);

  const chars = shuffledWords.flatMap((word, index) => [
    ...word.split(""),
    index !== shuffledWords.length - 1 ? " " : "",
  ]);

  const refs = chars.map(() => React.createRef());

  const [focusIndex, setFocusIndex] = useState(0);
  const [statuses, setStatuses] = useState(chars.map(() => "typingLetter"));
  const [leftTime, setLeftTime] = useState(wordTime);
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

  if(activeModeButton === "time")
      setWordCount(wordTime * 3);
  
  // eslint-disable-next-line 
  }, [
    wordCount,activeModeButton,wordTime,activeRestartButton,languageTest
  ]);

  useEffect(() => {
    setExtraInputs(new Array(shuffledWords.length).fill([]));
  }, [shuffledWords.length, activeModeButton]);

 

  useEffect(() => {
    
    if (refs[focusIndex]) {
      refs[focusIndex].current.focus();
    }
    if (focusIndex + 1 >= chars.length) {
      refs[focusIndex].current.blur();
    }
    if ((focusIndex + 1 >= chars.length) || (leftTime <= 0 && activeModeButton === "time")) {
      setEndTime(new Date());
      setStatus("analysis");
      setWordComplete(wordIndex + 1);
    }

  
    
  }, [focusIndex, chars.length, status, setStatus, setEndTime, chars, refs, leftTime,setWordComplete, wordIndex, activeModeButton]);

  useEffect(() => {
    let timer;
    
    if (startTime) {
      timer = setInterval(() => {
        const currentLeftTime = ((wordTime * 1000 - (new Date() - startTime)) / 1000).toFixed(0);
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
    const ignoreKeys = new Set([
      "F1","F2","F3","F4","F5","F6","F7","F8","F9",
      "F10","F11","F12","CapsLock","Alt","Shift","ArrowUp",
      "ArrowLeft","ArrowRight","ArrowDown","Tab","Control",
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
        let charWasIncorrect = statuses[focusIndex - 1] === 'typingLetter-incorrect';

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
    const charsInWord = [...word, index !== shuffledWords.length - 1 ? " " : ""].length;
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
        extraInputs={extraInputs[index] || []} // add fallback here
      />
    );
  });

  return (
    <section className="inputText-section" key={shuffledWords} >
      <div className="container">
      
  {activeModeButton === "time"  
    ? <div className="count-wrapper" key={leftTime}>{leftTime}</div>
    : <div className="count-wrapper" key={wordCount}>{wordIndex} / {wordCount}</div>
    }
        <div
          tabIndex={-1}
          className="typingText-wrapper"
          onKeyDown={handleKeyDown}
        >
          {wordItems}
        </div>
      </div>
    </section>
  );
};

export default InputText;
