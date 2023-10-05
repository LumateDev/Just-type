import React from "react";
import "./char.css";

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

const Char = React.forwardRef(
  (
    {
      char,
      setActiveKey,
      setTotalTypedCharacters,
      setTotalMistypedCharacters,
      totalTypedCharacters,
      totalMistypedCharacters,
      startTime,
      endTime,
      setStartTime,
      setEndTime,
      setStatus,
    },
    ref
  ) => {
    const showNotification = () => {
      alert("Вы ввели все символы!");
      setEndTime(new Date());
      setStatus("analysis");
    };
    const handleFocus = () => {
      setActiveKey(char);
    };
    const handleBlur = () => {
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

      if (!startTime) {
        setStartTime(new Date());
      }

      if (event.key === "Backspace") {
        if (prevSibling) {
          if (prevSibling.innerHTML === " ") {
            prevSibling.focus();
            return;
          }

          if (prevSibling.id === "typingLetter-incorrect__add") {
            prevSibling.remove();
          }

          prevSibling.focus();
          prevSibling.className = "typingLetter";
          setTotalTypedCharacters(totalTypedCharacters - 1);
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
              const lastIncorrectChar =
                incorrectChars[incorrectChars.length - 1];
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
        setTotalTypedCharacters(totalTypedCharacters + 1);
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
        setTotalMistypedCharacters(totalMistypedCharacters + 1);
        if (!nextSibling && event.key !== " ") {
          const newCharElement = document.createElement("span");
          newCharElement.textContent = event.key;
          newCharElement.className = "typingLetter-incorrect";
          newCharElement.id = "typingLetter-incorrect__add";
          newCharElement.tabIndex = -1;
          const nextChar = element;
          element.insertAdjacentElement("beforebegin", newCharElement);
          nextChar.focus();
        } else {
          element.className = "typingLetter-incorrect";
          nextSibling ? nextSibling.focus() : showNotification();
          element.blur();
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
  }
);

export default Char;
