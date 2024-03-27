import React, { useState, useEffect } from "react";
import "./account.css";
import Keyboard from "../Keyboard/Keyboard";
import { IoIosRefresh } from "react-icons/io";
import axios from "axios";

const Account = ({
  setModalOpen,
  logged,
  setFormTitle,
  username,
  userId,
  languageTest,
}) => {
  const [letterErrors, setLetterErrors] = useState({});
  const [userStats, setUserStats] = useState({});
  useEffect(() => {
    const fetchErrors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/errors/${userId}`
        );
        console.log("responce successful:", response);
        setLetterErrors(response.data.errors_data);
      } catch (error) {
        console.error(error.response ? error.response : error.message);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/data/${userId}`
        );
        console.log("responce successful:", response);
        setUserStats(response.data);
        console.log(userStats.data);
      } catch (error) {
        console.error(error.response ? error.response : error.message);
      }
    };

    if (userId && logged) {
      fetchErrors();
      fetchData();
    }
    // eslint-disable-next-line
  }, [userId, logged]); // Зависимости useEffect: если userId или logged изменятся, выполнится запрос

  const handleRegisterClick = () => {
    setModalOpen(true);
    setFormTitle("Регистрация");
  };

  const handleLoginClick = () => {
    setModalOpen(true);
    setFormTitle("Авторизация");
  };
  const handleRefreshStats = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/errors/${userId}`
      );

      console.log("responce successful:", response);
      console.log("Ошибки пользователя", response.data.errors_data);

      setLetterErrors(response.data.errors_data);
    } catch (error) {
      console.log(error.responce);
    }
  };

  return (
    <div className="container">
      {logged && userId && Object.keys(userStats).length ? (
        <div className="account-wrapper">
          <div className="info-wrapper">
            <div className="welcome-text">
              <div className="text">Добро пожаловать, {username}</div>
            </div>
            <div className="card-wrapper">
              <div className="card">Ваш Уровень: {userStats.data.level}</div>
              <div className="card">
                Опыт: {userStats.data.experience.toFixed(1)}/
                {userStats.data.threshold.toFixed(1)}
              </div>
              <div className="card">
                Лучшая скорость печати: {userStats.data.best_WPM.toFixed(1)}
              </div>
              <div className="card">
                Средняя скорость печати: {userStats.data.average_WPM.toFixed(1)}
              </div>
              <div className="card">
                Лучшая точность: {userStats.data.best_accuracy.toFixed(1)}
              </div>
              <div className="card">
                Средняя точность: {userStats.data.average_accuracy.toFixed(1)}
              </div>
            </div>

            <div className="user-keyboard">
              <Keyboard
                languageTest={languageTest}
                letterErrors={letterErrors}
              />

              <div className="button-r">
                <div className="hint">Сбросить ошибки</div>
                <button type="button" onClick={handleRefreshStats}>
                  <IoIosRefresh />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="auth-wrapper">
          <div className="auth-warning">
            <h2 className="auth-warning-text">
              Похоже вы не авторизованны в системе, для полного доступа к
              функционалу авторизуйтесь или создайте новую учетную запись
            </h2>
            <div className="auth-warning-buttons">
              <button
                className="auth-warning-btn"
                onClick={handleRegisterClick}
              >
                Регистрация
              </button>
              <button className="auth-warning-btn" onClick={handleLoginClick}>
                Авторизация
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
