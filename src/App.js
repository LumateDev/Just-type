import "./style/main.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <!----------------------------PAGES----------------------------------------> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* <!----------------------------PAGES----------------------------------------> */}
        {/* <!----------------------------FOOTER----------------------------------------> */}
        <Footer />
        {/* <!----------------------------FOOTER----------------------------------------> */}
      </Router>
    </div>
  );
}

export default App;
