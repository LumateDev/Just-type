import Header from "./../components/Header/Header";
import InputText from "../components/InputText/InputText";
import Toolbar from "../components/ToolBar/ToolBar";
import Keyboard from "../components/Keyboard/Keyboard";
import TestAnalysis from "../components/TestAnalyze/TestAnalysis";

import { useState } from "react";

const Home = () => {
  const [status, setStatus] = useState("print");
  const [activeKey, setActiveKey] = useState("");
  const [wordCount, setWordCount] = useState(25);
  const [totalChars, setTotalChars] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [wordTime, setWordTime] = useState("15s");
  const [restartTest, setRestartTest] = useState(0);
  const [numbersInclude, setNumbersInclude] = useState(false);
  const [punctuationInclude, setPunctuationInclude] = useState(false);
  const [languageTest, setLanguageTest] = useState("english");

  return (
    <>
      <Header />
      {status === "print" && (
        <>
          <InputText
            wordCount={wordCount}
            setActiveKey={setActiveKey}
            status={status}
            setStatus={setStatus}
            totalChars={totalChars}
            setTotalChars={setTotalChars}
            totalErrors={totalErrors}
            setTotalErrors={setTotalErrors}
            setEndTime={setEndTime}
            startTime={startTime}
            setStartTime={setStartTime}
          />
          <Toolbar
            setStatus={setStatus}
            activeCountButton={wordCount}
            // activeTimeButton={wordTime}
            // activeLanguageButton={languageTest}
            // activeNumbersButton={numbersInclude}
            // activePunctuationButton={punctuationInclude}
            activeRestartButton={restartTest}
            setActiveCountButton={setWordCount}
            // setActiveTimeButton={setWordTime}
            // setActiveLanguageButton={setLanguageTest}
            // setActiveNumbersButton={setNumbersInclude}
            // setActivePunctuationButton={setPunctuationInclude}
            setActiveRestartButton={setRestartTest}
          />
          <Keyboard activeKey={activeKey} />
        </>
      )}{" "}
      {status === "analysis" && (
        <>
          <TestAnalysis
            wordCount={wordCount}
            startTime={startTime}
            endTime={endTime}
            totalChars={totalChars}
            totalErrors={totalErrors}
          />
        </>
      )}
    </>
  );
};

export default Home;
