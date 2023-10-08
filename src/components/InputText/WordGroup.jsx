import React from "react";
import Letter from "./Letter";
import "./wordGroup.css";

const WordGroup = ({
  word,
  refSet,
  statusSet,
  handleFocus,
  handleBlur,
  extraInputs,
}) => {
  const chars = [...word, " "];

  return (
    <div className="word">
      {chars.map((char, index) => {
        const extraInputElems =
          char === " "
            ? extraInputs.map((inputChar, i) => (
                <Letter
                  ref={null}
                  key={`extraInput-${index}-${i}`}
                  char={inputChar}
                  status="typingLetter-incorrect__add"
                  handleBlur={handleBlur}
                  handleFocus={handleFocus}
                />
              ))
            : [];

        return (
          <React.Fragment key={index}>
            {extraInputElems}
            <Letter
              ref={refSet[index]}
              char={char}
              status={statusSet[index]}
              handleBlur={handleBlur}
              handleFocus={handleFocus}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default WordGroup;
