import Header from "./../components/Header/Header";
import InputText from "../components/InputText/InputText";
import Toolbar from "../components/ToolBar/ToolBar";
import Keyboard from "../components/Keyboard/Keyboard";

import { useState } from "react";


const Home = () => {

  const [activeKey, setActiveKey] = useState("");
  return (
    <>
      {/* <!----------------------------HEADER----------------------------------------> */}
      <Header />
      <InputText setActiveKey={setActiveKey} />
      <Toolbar />
      <Keyboard activeKey={activeKey} />

      {/* <!----------------------------HEADER----------------------------------------> */}
      {/* <!-----------------------------MAIN-----------------------------------------> */}

      {/* <!-----------------------------MAIN-----------------------------------------> */}
    </>
  );
};

export default Home;
