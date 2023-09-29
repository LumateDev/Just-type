import React from "react";
import "./button.css";

const CountButton = ({ text, active, handleClick }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={active ? "toolCard__button__active" : "toolCard__button"}
    >
      {text}
    </button>
  );
};

export default CountButton;
