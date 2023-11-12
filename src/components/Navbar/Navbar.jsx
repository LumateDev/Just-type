import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

import gradCapIcon from "./../../img/navbar/graduation-cap.svg";
import userIcon from "./../../img/navbar/icon-user.svg";
import bellIcon from "./../../img/navbar/bell.svg";
import settingsIcon from "./../../img/navbar/settings.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-row">
          <ul className="nav-list">
            <li className="nav-list__item">
              <NavLink to="/Just-type/profile" className="user-link">
                <img src={userIcon} alt="userIcon" width="32px" height="32px" />
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to="/Just-type/education" className="edu-link">
                <img
                  src={gradCapIcon}
                  alt="educationIcon"
                  width="32px"
                  height="32px"
                />
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to="/Just-type/notification" className="bell-link">
                <img src={bellIcon} alt="bellIcon" width="32px" height="32px" />
              </NavLink>
            </li>

            <li className="nav-list__item">
              <NavLink to="/Just-type/settings" className="settings-link">
                <img
                  src={settingsIcon}
                  alt="settingsIcon"
                  width="32px"
                  height="32px"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
