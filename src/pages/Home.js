import Header from "./../components/Header/Header";
import InputText from "../components/InputText/InputText";
import Toolbar from "../components/ToolBar/ToolBar";
import Keyboard from "../components/Keyboard/Keyboard";
import TestAnalysis from "../components/TestAnalyze/TestAnalysis";

import { useState } from "react";

const Home = () => {
  const [status, setStatus] = useState("print");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalTypedCharacters, setTotalTypedCharacters] = useState(0);
  const [totalMistypedCharacters, setTotalMistypedCharacters] = useState(0);
  const [wordCount, setWordCount] = useState(25);
  const [wordTime, setWordTime] = useState("15s");
  const [restartTest, setRestartTest] = useState(0);
  const [numbersInclude, setNumbersInclude] = useState(false);
  const [punctuationInclude, setPunctuationInclude] = useState(false);
  const [languageTest, setLanguageTest] = useState("english");
  const [activeKey, setActiveKey] = useState("");

  return (
    <>
      <Header />
      {status === "print" && (
        <InputText
          setStatus={setStatus}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setActiveKey={setActiveKey}
          wordCount={wordCount}
          wordTime={wordTime}
          restartTest={restartTest}
          numbersInclude={numbersInclude}
          punctuationInclude={punctuationInclude}
          languageTest={languageTest}
          totalTypedCharacters={totalTypedCharacters}
          totalMistypedCharacters={totalMistypedCharacters}
          setTotalTypedCharacters={setTotalTypedCharacters}
          setTotalMistypedCharacters={setTotalMistypedCharacters}
        />
      )}

      {status === "analysis" && (
        <TestAnalysis
          wordCount={wordCount}
          startTime={startTime}
          endTime={endTime}
          totalTypedCharacters={totalTypedCharacters}
          totalMistypedCharacters={totalMistypedCharacters}
        />
      )}

      <Toolbar
        setStatus={setStatus}
        activeCountButton={wordCount}
        activeTimeButton={wordTime}
        activeLanguageButton={languageTest}
        activeNumbersButton={numbersInclude}
        activePunctuationButton={punctuationInclude}
        activeRestartButton={restartTest}
        setActiveCountButton={setWordCount}
        setActiveTimeButton={setWordTime}
        setActiveLanguageButton={setLanguageTest}
        setActiveNumbersButton={setNumbersInclude}
        setActivePunctuationButton={setPunctuationInclude}
        setActiveRestartButton={setRestartTest}
      />

      <Keyboard activeKey={activeKey} />
    </>
  );
};

export default Home;
