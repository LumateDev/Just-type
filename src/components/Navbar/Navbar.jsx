import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

import gradCapIcon from "./../../img/navbar/graduation-cap.svg";
import userIcon from "./../../img/navbar/icon-user.svg";
import bellIcon from "./../../img/navbar/bell.svg";
import settingsIcon from "./../../img/navbar/settings.svg";

const Navbar = ({ username, setUsername, logged, setLogged, setUserId }) => {
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
              <NavLink to="/education" className="edu-link">
                <img
                  src={gradCapIcon}
                  alt="educationIcon"
                  width="32px"
                  height="32px"
                />
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to="/notification" className="bell-link">
                <img src={bellIcon} alt="bellIcon" width="32px" height="32px" />
              </NavLink>
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
