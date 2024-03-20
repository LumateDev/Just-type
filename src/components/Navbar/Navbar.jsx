import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";


import userIcon from "./../../img/navbar/icon-user.svg";
import settingsIcon from "./../../img/navbar/settings.svg";

const Navbar = ({ username, setUsername, setLogged, setUserId }) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-row">
          <ul className="nav-list">
            <li className="nav-list__item">
              <NavLink to="/profile" className="user-link">
                <img src={userIcon} alt="userIcon" width="32px" height="32px" />
              </NavLink>
              {username ? <div className="user-name">{username}</div> : null}
            </li>
           
            <li className="nav-list__item">
              <NavLink to="/settings" className="settings-link">
                <img
                  src={settingsIcon}
                  alt="settingsIcon"
                  width="32px"
                  height="32px"
                />
              </NavLink>
            </li>
            {username ? (
              <li className="nav-list__item">
                <div className="logout-wrapper">
                  <button
                    className="logout-button"
                    onClick={() => {
                      setLogged(false);
                      setUsername("");
                      setUserId("");
                    }}
                  >
                    {" "}
                    Выйти{" "}
                  </button>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
