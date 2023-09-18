import React from "react";

function ToolButton({ img }) {
  const handleClick = () => {
    alert("Restart");
  };

  return (
    <button type="button" onClick={handleClick} className="toolCard__button">
      <img src={img} width="16px" height="16px" alt="" />
    </button>
  );
}

export default ToolButton;
