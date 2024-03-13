import { useState } from "react";
import "./style/main.css";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Education from "./pages/Education";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [recomendedMode, setRecomendedMode] = useState(false);
  const [languageTest, setLanguageTest] = useState("english");
  const [serverWords, setServerWords] = useState([]);

  return (
    <div className="App">
      <Router>
        <Header
          logged={logged}
          setLogged={setLogged}
          username={username}
          setUsername={setUsername}
          setUserId={setUserId}
        />
        {/* <!----------------------------PAGES----------------------------------------> */}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                userId={userId}
                recomendedMode = {recomendedMode}
                languageTest={languageTest}
                setLanguageTest={setLanguageTest}
                setServerWords={setServerWords}
                serverWords={serverWords}
              />
            }
          />
          <Route path="/education" element={<Education />} />
          <Route
            path="/profile"
            element={
              <Profile
                logged={logged}
                setLogged={setLogged}
                username={username}
                setUsername={setUsername}
                setUserId={setUserId}
                userId={userId}
                languageTest={languageTest}
                setLanguageTest={setLanguageTest}
              />
            }
          />
          <Route path="/settings" element={
            <Settings 
              logged = {logged}
              recomendedMode={recomendedMode}
              setRecomendedMode = {setRecomendedMode}/>} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
