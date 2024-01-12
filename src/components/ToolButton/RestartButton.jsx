import React from "react";
import restartIcon from "./../../img/toolbar/restart.svg";

function RestartButton({
  activeRestartButton,
  setActiveRestartButton,
  setServerWords,
  serverWords,
  setStatus,
}) {
  const handleClickRestart = () => {
    setActiveRestartButton(activeRestartButton + 1);
    setStatus("print");
    if (!Array.isArray(serverWords) || serverWords.length === 0)
      setServerWords([]);
  };
  return (
    <button
      type="button"
      onClick={handleClickRestart}
      className="toolCard__button"
    >
      <img src={restartIcon} width="20px" height="20px" alt="" />
    </button>
  );
}

export default RestartButton;
