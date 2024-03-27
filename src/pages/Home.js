import InputText from "../components/InputText/InputText";
import Toolbar from "../components/ToolBar/ToolBar";
import Keyboard from "../components/Keyboard/Keyboard";
import TestAnalysis from "../components/TestAnalyze/TestAnalysis";

import { useState } from "react";

const Home = ({
  userId,
  serverWords,
  setServerWords,
  languageTest,
  setLanguageTest,
  recomendedMode,
  useKeyboard,
}) => {
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
  const [incorrectChars, setIncorrectChars] = useState({});
  const [wordComplete, setWordComplete] = useState(0);

  // if user not authorized or user game stats === null use default words from component, else use custom personalized words pack
  // eslint-disable-next-line

  return (
    <>
      {status === "print" && (
        <>
          <InputText
            setActiveKey={setActiveKey}
            wordCount={wordCount}
            status={status}
            setStatus={setStatus}
            setTotalChars={setTotalChars}
            setTotalErrors={setTotalErrors}
            setEndTime={setEndTime}
            startTime={startTime}
            setStartTime={setStartTime}
            incorrectChars={incorrectChars}
            setIncorrectChars={setIncorrectChars}
            wordTime={wordTime}
            languageTest={languageTest}
            activeRestartButton={activeRestartButton}
            setActiveRestartButton={setActiveRestartButton}
            numbersInclude={numbersInclude}
            punctuationInclude={punctuationInclude}
            activeModeButton={activeModeButton}
            setWordComplete={setWordComplete}
            setWordCount={setWordCount}
            serverWords={serverWords}
            recomendedMode={recomendedMode}
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
            totalErrors={totalErrors}
            setActiveLanguageButton={setLanguageTest}
            setActiveNumbersButton={setNumbersInclude}
            setActivePunctuationButton={setPunctuationInclude}
            setActiveRestartButton={setActiveRestartButton}
            activeModeButton={activeModeButton}
            setActiveModeButton={setActiveModeButton}
            serverWords={serverWords}
            setServerWords={setServerWords}
            recomendedMode={recomendedMode}
          />
          {useKeyboard && (
            <Keyboard
              activeKey={activeKey}
              status={status}
              languageTest={languageTest}
            />
          )}
        </>
      )}
      {status === "analysis" && (
        <>
          <TestAnalysis
            startTime={startTime}
            wordCount={wordCount}
            totalChars={totalChars}
            totalErrors={totalErrors}
            endTime={endTime}
            wordComplete={wordComplete}
            incorrectChars={incorrectChars}
            activeRestartButton={activeRestartButton}
            setActiveRestartButton={setActiveRestartButton}
            setStatus={setStatus}
            languageTest={languageTest}
            userId={userId}
            serverWords={serverWords}
            setServerWords={setServerWords}
          />
        </>
      )}
    </>
  );
};

export default Home;
