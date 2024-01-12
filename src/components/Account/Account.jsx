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
  setLanguageTest,
}) => {
  const [letterErrors, setLetterErrors] = useState({});
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

    if (userId && logged) {
      fetchErrors();
    }
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
      {logged ? (
        <div className="account-wrapper">
          <div className="info-wrapper">
            <div className="welcome-text">
              <div className="text">Добро пожаловать, {username}</div>
              <div className="text">Ваш ID в системе: {userId}</div>
            </div>
            <div className="user-keyboard">
              <h1 className="keyboard-title">Цветовая схема ваших ошибок</h1>

              <Keyboard
                languageTest={languageTest}
                letterErrors={letterErrors}
              />
              <p className="hint">
                Эта схема отображает насколько часто вы совершаете ошибку в
                определенных буквах
              </p>
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
