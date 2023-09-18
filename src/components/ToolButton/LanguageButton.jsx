import React from "react";

const LanguageButton = ({ text }) => {
  const handleClick = () => {
    alert("your language is English");
  };

  return (
    <button type="button" onClick={handleClick} className="toolCard__button">
      {text}
    </button>
  );
};

export default LanguageButton;
