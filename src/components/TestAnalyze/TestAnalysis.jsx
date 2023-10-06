import React from "react";
import "./testAnalysis.css";

const TestAnalysis = ({
  startTime,
  endTime,
  totalChars,

  totalErrors,

  wordCount,
}) => {
  const accuracy = ((totalChars - totalErrors) / totalChars) * 100;

  const totalTime = (endTime - startTime) / 1000;
  const WPM = ((wordCount / totalTime) * 60).toFixed(2);

  return (
    <div className="section-analysis">
      <div className="container">
        <div className="analysis-wrapper">
          <h1 className="analysis-title">Анализ вашей печати</h1>
          <div className="itemValue">WPM : {WPM}</div>
          <div className="itemValue">{`Accuracy: ${accuracy.toFixed(0)}%`}</div>
        </div>
      </div>
    </div>
  );
};

export default TestAnalysis;
