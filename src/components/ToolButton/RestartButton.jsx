import React from "react";
import restartIcon from "./../../img/toolbar/restart.svg";

function RestartButton() {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <button type="button" onClick={handleClick} className="toolCard__button">
      <img src={restartIcon} width="20px" height="20px" alt="" />
    </button>
  );
}

export default RestartButton;
