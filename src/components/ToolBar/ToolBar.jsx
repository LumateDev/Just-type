import React from "react";
import "./toolBar.css";
import settingsIcon from "./../../img/toolbar/settings.svg";
import restartIcon from "./../../img/toolbar/restart.svg";

const ToolBar = () => {
  return (
    <section className="toolbar">
      <div className="container">
        <div className="toolbar-wrapper">
          <div className="toolCard">
            <div className="toolCard__button">
              <img
                src={restartIcon}
                alt="restartIcon"
                width="20px"
                height="20px"
              />
            </div>
            <div className="toolCard__button">english</div>
          </div>
          <div className="toolCard">
            <div className="toolCard__button">words</div>
            <div className="toolCard__button">time</div>
            <div className="toolCard__button">quotes</div>
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
