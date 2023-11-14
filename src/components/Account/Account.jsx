import React from "react";
import "./account.css";

const Account = ({ setModalOpen, logged, setFormTitle }) => {
  const handleRegisterClick = () => {
    setModalOpen(true);
    setFormTitle("Регистрация");
  };

  const handleLoginClick = () => {
    setModalOpen(true);
    setFormTitle("Авторизация");
  };

  return (
    <div className="section-auth">
      <div className="container">
        <div className="auth-wrapper">
          {!logged && (
            <div className="auth-warning">
              <h2 className="auth-warning-text">
                Похоже вы не авторизованны в системе, для полного доступа к
                функционалу авторизуйтесь или создайте новую учетную запись
              </h2>
              <div className="auth-warning-buttons">
                <button
                  className="auth-warning-btn"
                  onClick={handleRegisterClick} // использование новых обработчиков
                >
                  Регистрация
                </button>
                <button
                  className="auth-warning-btn"
                  onClick={handleLoginClick} // использование новых обработчиков
                >
                  Авторизация
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;