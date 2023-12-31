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

  return (
    <div className="App">
      <Router>
        <Header logged={logged} setLogged= {setLogged} username={username} setUsername = {setUsername} />
        {/* <!----------------------------PAGES----------------------------------------> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route
            path="/profile"
            element={
              <Profile
                logged={logged}
                setLogged={setLogged}
                username={username}
                setUsername={setUsername}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
