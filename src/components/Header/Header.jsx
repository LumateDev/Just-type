import "./header.css";
import React from "react";
import defaultLogo from "./../../img/header/just-type-logo.png";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Header = ({ username, setUsername, logged, setLogged, setUserId }) => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="container">
          <div className="header-row">
            <div className="header-logo">
              <NavLink to="/" className="header-logo">
                <img src={defaultLogo} alt="logo" width="200px" height="60px" />
              </NavLink>
            </div>
            <div className="header-links">
              <Navbar
                username={username}
                setUsername={setUsername}
                logged={logged}
                setLogged={setLogged}
                setUserId={setUserId}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
