import React, { useState } from "react";
import "./toolBar.css";
import RestartButton from "../ToolButton/RestartButton";
import restartIcon from "./../../img/toolbar/restart.svg";
import Button from "../ToolButton/Button";

const ToolBar = ({
  setStatus,
  activeNumbersButton,
  activeCountButton,
  activeLanguageButton,
  activePunctuationButton,
  activeTimeButton,
  activeRestartButton,
  setActiveCountButton,
  setActiveLanguageButton,
  setActiveTimeButton,
  setActiveNumbersButton,
  setActivePunctuationButton,
  setActiveRestartButton,
}) => {
  const [activeModeButton, setActiveModeButton] = useState("words");

  const handleClickMode = (buttonName) => {
    setActiveModeButton(buttonName);
  };
  const handleClickRestart = () => {
    setActiveRestartButton(activeRestartButton + 1);
    setStatus("print");
  };
  const handleClickCount = (buttonName) => {
    setActiveCountButton(buttonName);
  };
  const handleClickTime = (buttonName) => {
    setActiveTimeButton(buttonName);
  };
  const handleClickLanguage = (buttonName) => {
    setActiveLanguageButton(buttonName);
  };
  const handleClickNumbers = () => {
    setActiveNumbersButton((prev) => !prev);
  };
  const handleClickPunctuation = () => {
    setActivePunctuationButton((prev) => !prev);
  };

  let countButtons;
  switch (activeModeButton) {
    case "words":
      countButtons = [10, 25, 50, 75, 100];
      break;
    case "time":
      countButtons = ["15s", "30s", "1m", "3m", "5m"];
      break;
    case "quote":
      countButtons = [];
      break;
    default:
      countButtons = [];
  }

  return (
    <section className="toolbar">
      <div className="container">
        <div className="toolbar-wrapper">
          <div className="toolCard">
            <RestartButton
              img={restartIcon}
              handleClick={() => handleClickRestart()}
            />
            <Button
              text="english"
              active={activeLanguageButton === "english"}
              handleClick={() => handleClickLanguage("english")}
            />
            <Button
              text="russian"
              active={activeLanguageButton === "russian"}
              handleClick={() => handleClickLanguage("russian")}
            />
          </div>
          <div className="toolCard">
            <Button
              text="words"
              active={activeModeButton === "words"}
              handleClick={() => handleClickMode("words")}
            />
            <Button
              text="time"
              active={activeModeButton === "time"}
              handleClick={() => handleClickMode("time")}
            />
            <Button
              text="quote"
              active={activeModeButton === "quote"}
              handleClick={() => handleClickMode("quote")}
            />
          </div>

          {activeModeButton !== "quote" && (
            <div className="toolCard">
              {countButtons.map((button) => (
                <Button
                  key={button.toString()}
                  text={button.toString()}
                  active={
                    activeModeButton === "time"
                      ? activeTimeButton === button
                      : activeCountButton === button
                  }
                  handleClick={() => {
                    if (activeModeButton === "time") {
                      handleClickTime(button);
                    } else {
                      handleClickCount(button);
                    }
                  }}
                />
              ))}
            </div>
          )}
          <div className="toolCard">
            <Button
              text="Numbers"
              active={activeNumbersButton}
              handleClick={handleClickNumbers}
            />

            <Button
              text="Punctuation"
              active={activePunctuationButton}
              handleClick={handleClickPunctuation}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolBar;
