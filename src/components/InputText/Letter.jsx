import React from "react";
import "./letter.css";

const Letter = React.forwardRef(
  ({ char, status, handleBlur, handleFocus }, ref) => (
    <span
      className={`typingLetter ${status}`}
      tabIndex={-1}
      ref={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {char}
    </span>
  )
);

export default Letter;
