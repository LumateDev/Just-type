import React from "react";
import restartIcon from "./../../img/toolbar/restart.svg";

function RestartButton({activeRestartButton, setActiveRestartButton, setStatus}) {

  const handleClickRestart = () => {
    setActiveRestartButton(activeRestartButton + 1);
    setStatus("print");
  };
  return (
    <button type="button" onClick={handleClickRestart} className="toolCard__button">
      <img src={restartIcon} width="20px" height="20px" alt="" />
    </button>
  );
}

export default RestartButton;
