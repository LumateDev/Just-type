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
]);

const Char = React.forwardRef(({ char }, ref) => {
  const showNotification = () => {
    alert("Вы ввели все символы!");
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
          const prevWordPrevToLastChar = prevWordLastChar
            ? prevWordLastChar.previousElementSibling
            : null;

          // Добавлено условие для удаления неверных символов после конца слова
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
          element.blur();
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
      if (!nextSibling) {
        const newCharElement = document.createElement("span");
        newCharElement.textContent = event.key;
        newCharElement.className = "typingLetter-incorrect__add";
        newCharElement.id = "typingLetter-incorrect__add";
        newCharElement.tabIndex = -1;

        const nextChar = element;

        element.insertAdjacentElement("beforebegin", newCharElement);
        nextChar.focus();
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
      onMouseDown={(event) => event.preventDefault()}
      onMouseUp={(event) => event.preventDefault()}
      ref={ref}
    >
      {char}
    </span>
  );
});

export default Char;
