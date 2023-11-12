import { useState } from "react";
import "./style/main.css";
import Home from "./pages/Home";

import RegAndLogForm from "./components/RegAndLogForm/RegAndLogForm";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Education from "./pages/Education";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [logged, setLogged] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header />
        {/* <!----------------------------PAGES----------------------------------------> */}

        <RegAndLogForm
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setLogged={setLogged}
        ></RegAndLogForm>
        <Routes>
          <Route path="/Just-type/" element={<Home />} />
          <Route path="/Just-type/education" element={<Education />} />
          <Route
            path="/Just-type/profile"
            element={<Profile setModalOpen={setModalOpen} logged={logged} />}
          />
          <Route path="/Just-type/settings" element={<Settings />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
