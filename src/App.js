import "./style/main.css";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Education from "./pages/Education";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <!----------------------------PAGES----------------------------------------> */}
        <Routes>
          <Route path="/Just-type/" element={<Home />} />
          <Route path="/Just-type/education" element={<Education />} />
          <Route path="/Just-type/profile" element={<Profile />} />
          <Route path="/Just-type/settings" element={<Settings />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
