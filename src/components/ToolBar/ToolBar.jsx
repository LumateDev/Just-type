import React, {useState} from "react";
import "./toolBar.css";
import RestartButton from "../ToolButton/RestartButton";
import LanguageButton from "../ToolButton/LanguageButton";
import settingsIcon from "./../../img/toolbar/settings.svg";
import restartIcon from "./../../img/toolbar/restart.svg";
import WTQButton from "../../components/ToolButton/WTQButton"

const ToolBar = () => {


  const [activeWTQButton, setActiveWTQButton] = useState("words");

  const handleClick = (buttonName) => {
      setActiveWTQButton(buttonName);
  }


  return (
    <section className="toolbar">
      <div className="container">
        <div className="toolbar-wrapper">
          <div className="toolCard">
            <RestartButton img={restartIcon} />
            <LanguageButton text="english" />
          </div>
          <div className="toolCard">

          <WTQButton text = "words" active={activeWTQButton === "words"} handleClick={() => handleClick("words")}/>
            <WTQButton text = "time" active={activeWTQButton === "time"} handleClick={() => handleClick("time")}/>
            <WTQButton text = "quote" active={activeWTQButton === "quote"} handleClick={() => handleClick("quote")}/>
            
          </div>

          <div className="toolCard">
            <div className="toolCard__button">10</div>
            <div className="toolCard__button">25</div>
            <div className="toolCard__button">50</div>
            <div className="toolCard__button">100</div>
            <div className="toolCard__button">
              <img
                src={settingsIcon}
                alt="settingsIcon"
                width="20px"
                height="20px"
              />
            </div>
          </div>
          <div className="toolCard">
            <div className="toolCard__button">numbers</div>
            <div className="toolCard__button">punctuation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolBar;
