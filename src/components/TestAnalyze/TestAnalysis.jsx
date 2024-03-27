import React from "react";
import "./testAnalysis.css";


import RestartButton from "./../ToolButton/RestartButton";
import Keyboard from "../Keyboard/Keyboard";

const TestAnalysis = ({
  startTime,
  wordCount,

  totalChars,
  totalErrors,
  incorrectChars,
  
  activeRestartButton,
  setActiveRestartButton,
  setStatus,
  languageTest,
  userId,
  setServerWords,
  serverWords,
  WPM,
  accuracy,totalTime,
  endTime,
}) => {
  

  
  
  console.log("Total chars: ", totalChars);
  console.log("Total error: ", totalErrors);
  console.log("Total time: ", totalTime);
  console.log("incorectChars: ", incorrectChars);

  return (
    <div className="section-analysis">
      <div className="container">
        <div className="analysis-wrapper">
          <h1 className="analysis-title">Анализ вашей печати</h1>
          <div className="itemValue">WPM(Слов в минуту) : {WPM}</div>
          <div className="itemValue">{`Accuracy(Точность): ${accuracy.toFixed(
            0
          )}%`}</div>
          <div className="itemValue">
            Ваши ошибки:
            {Object.entries(incorrectChars)
              .map(([key, value]) => ` ${key}: ${value}`)
              .join(", ")}
          </div>

          <h2 className="analysis-title">
            Вам следует обратить внимание на эти клавиши
          </h2>
          <div className="keyboard">
            <Keyboard
              incorrectKeys={incorrectChars}
              languageTest={languageTest}
            />
          </div>
          
          <div className="button">
            {" "}
            <RestartButton
              activeRestartButton={activeRestartButton}
              setActiveRestartButton={setActiveRestartButton}
              setStatus={setStatus}
              setServerWords={setServerWords}
              serverWords={serverWords}
            />
            <div className="hint">Нажмите tab + Enter чтобы начать сначала</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAnalysis;
