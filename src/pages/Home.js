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
  const [activeModeButton, setActiveModeButton] = useState("words");
  const [wordTime, setWordTime] = useState(30);
  const [activeRestartButton, setActiveRestartButton] = useState(0);
  const [numbersInclude, setNumbersInclude] = useState(false);
  const [punctuationInclude, setPunctuationInclude] = useState(false);
  const [languageTest, setLanguageTest] = useState("english");

  const [userInput, setUserInput] = useState([]);
  const [incorrectChars, setIncorrectChars] = useState(new Set());
  const [wordComplete, setWordComplete] = useState(0);

  return (
    <>
      <Header />
      {status === "print" && (
        <>
          <InputText
            wordCount={wordCount}
            setWordCount={setWordCount}
            setActiveKey={setActiveKey}
            status={status}
            setStatus={setStatus}
            setTotalChars={setTotalChars}
            setTotalErrors={setTotalErrors}
            setEndTime={setEndTime}
            startTime={startTime}
            setStartTime={setStartTime}
            wordTime={wordTime}
            languageTest={languageTest}
            setUserInput={setUserInput}
            activeRestartButton={activeRestartButton}
            setActiveRestartButton={setActiveRestartButton}
            numbersInclude={numbersInclude}
            punctuationInclude={punctuationInclude}
            setIncorrectChars={setIncorrectChars}
            activeModeButton={activeModeButton}
            setWordComplete={setWordComplete}
          />
          <Toolbar
            setStatus={setStatus}
            activeCountButton={wordCount}
            activeTimeButton={wordTime}
            activeLanguageButton={languageTest}
            activeNumbersButton={numbersInclude}
            activePunctuationButton={punctuationInclude}
            activeRestartButton={activeRestartButton}
            setActiveCountButton={setWordCount}
            setActiveTimeButton={setWordTime}
            setActiveLanguageButton={setLanguageTest}
            setActiveNumbersButton={setNumbersInclude}
            setActivePunctuationButton={setPunctuationInclude}
            setActiveRestartButton={setActiveRestartButton}
            activeModeButton={activeModeButton}
            setActiveModeButton={setActiveModeButton}
          />
          <Keyboard
            activeKey={activeKey}
            status={status}
            languageTest={languageTest}
          />

          {/* <div className="itemValue">UserInput : {userInput}</div>
          <div className="itemValue">incorrectChars : {incorrectChars}</div> */}
        </>
      )}
      {status === "analysis" && (
        <>
          <TestAnalysis
            wordComplete={wordComplete}
            startTime={startTime}
            endTime={endTime}
            totalChars={totalChars}
            totalErrors={totalErrors}
            userInput={userInput}
            incorrectChars={incorrectChars}
            activeRestartButton={activeRestartButton}
            setActiveRestartButton={setActiveRestartButton}
            setStatus={setStatus}
            languageTest={languageTest}
          />
        </>
      )}
    </>
  );
};

export default Home;
