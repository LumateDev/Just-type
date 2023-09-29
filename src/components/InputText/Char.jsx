import React from "react";
import "./char.css";

const ignoreKeys = new Set([
  "F12",
  "CapsLock",
  "Alt",
  "Shift",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "ArrowDown",
  "Tab",
  "Control"
]);

const Char = React.forwardRef(({ char, setActiveKey }, ref) => {
  const showNotification = () => {
    alert("Вы ввели все символы!");
  };
  const handleFocus = (event) => {
    setActiveKey(char);
  };
  const handleBlur = (event) => {
    setActiveKey("");
  };

  const handleKeyDown = (event) => {
    const element = event.target;
    const nextSibling = element.nextElementSibling;
    const prevSibling = element.previousElementSibling;
  
    if (ignoreKeys.has(event.key)) {
      event.preventDefault();
      return;
    }
  
    if (event.key === "Backspace") {
      if (prevSibling) {
        // Добавьте условие для обработки пробельных символов
        if (prevSibling.innerHTML === " ") {
          prevSibling.focus();
          return;
        }
  
        if (prevSibling.id === "typingLetter-incorrect__add") {
          prevSibling.remove();
        }
  
        prevSibling.focus();
        prevSibling.className = "typingLetter";
      } else {
        const parentElement = element.parentElement;
        const prevWord = parentElement.previousElementSibling;
  
        if (prevWord) {
          const prevWordLastChar = prevWord.lastElementChild;
  

          const prevWordPrevToLastChar =
            prevWordLastChar && prevWordLastChar.innerHTML !== " "
              ? prevWordLastChar.previousElementSibling
              : prevWordLastChar;
  
          const incorrectChars = document.querySelectorAll(
            "#typingLetter-incorrect__add"
          );
          if (incorrectChars.length !== 0) {
            const lastIncorrectChar = incorrectChars[incorrectChars.length - 1];
            lastIncorrectChar.remove();
          }
  
          if (prevWordPrevToLastChar) {
            prevWordPrevToLastChar.focus();
            prevWordPrevToLastChar.className = "typingLetter";
          } else if (prevWordLastChar) {
            prevWordLastChar.focus();
            prevWordLastChar.className = "typingLetter";
          }
        } else {
          event.preventDefault();
  
        }
      }
    } else if (event.key === char) {
      element.className = "typingLetter-correct";
  
      if (nextSibling) {
        nextSibling.focus();
      } else {
        const parentElement = element.parentElement;
        const nextWord = parentElement.nextElementSibling;
  
        if (nextWord) {
          const nextWordFirstChar = nextWord.firstElementChild;
          if (nextWordFirstChar) {
            nextWordFirstChar.focus();
          }
        } else {
         

          element.blur();
          showNotification();
        }
      }
    } else if (event.key !== char) {
      if (!nextSibling && event.key !== " ") {
        console.log("Нет некста символа и нажат не пробел")
        const newCharElement = document.createElement("span");
        newCharElement.textContent = event.key;
        newCharElement.className = "typingLetter-incorrect";
        newCharElement.id = "typingLetter-incorrect__add";
        newCharElement.tabIndex = -1;
  
        const nextChar = element;
  
        element.insertAdjacentElement("beforebegin", newCharElement);
        nextChar.focus();
      }
      else if(!nextSibling && event.key !== " "){
        event.preventDefault();
      } else {
        element.className = "typingLetter-incorrect";
        nextSibling ? nextSibling.focus() : element.blur();
      }
    }
  };

  return (
    <span
      className={"typingLetter"}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={(event) => event.preventDefault()}
      onMouseUp={(event) => event.preventDefault()}
      ref={ref}
    >
      {char}
    </span>
  );
});

export default Char;
