import React from "react";
import "./account.css";

const Account = ({ setModalOpen, logged, setFormTitle, username, userId }) => {
  const handleRegisterClick = () => {
    setModalOpen(true);
    setFormTitle("Регистрация");
  };

  const handleLoginClick = () => {
    setModalOpen(true);
    setFormTitle("Авторизация");
  };

  return (
    <div className="container">
      {logged ? (
        <div className="account-wrapper">
          <div className="welcome-text">
            <div className="text">Добро пожаловать, {username}</div>
            <div className="text">Ваш ID: {userId}</div>
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
