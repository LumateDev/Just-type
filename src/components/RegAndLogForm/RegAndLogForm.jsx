import React from "react";
import Modal from "react-modal";
import "./regAndLogForm.css";

const RegAndLogForm = ({
  modalOpen,
  setModalOpen,
  formTitle,
  setFormTitle,
}) => {
  const handleRegister = () => {
    alert("Запрос на " + formTitle + " принят");
  };

  const handleLogin = () => {
    alert("Запрос на " + formTitle + " принят");
  };

  const handleRecover = () => {
    alert("Запрос на " + formTitle + " принят");
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      className="modal-form"
      overlayClassName="overlay"
    >
      <form className="form-wrapper">
        <div className="form-title-wrapper">
          <h2 className="form-title">{formTitle}</h2>
        </div>

        <div className="form-row">
          <input type="text" autoComplete="username" placeholder="Username" />
        </div>
        {formTitle === "Регистрация" && (
          <div className="form-row">
            <input type="email" autoComplete="email" placeholder="Email" />
          </div>
        )}

        <div className="form-row">
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
          />
        </div>
        {formTitle === "Регистрация" && (
          <div className="form-row">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Repeat password"
            />
          </div>
        )}

        <div className="form-placeholder">
          {formTitle !== "Восстановление" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                formTitle === "Регистрация"
                  ? setFormTitle("Авторизация")
                  : setFormTitle("Восстановление");
              }}
            >
              {formTitle === "Регистрация"
                ? "Уже зарегистрированы? Войти"
                : "Забыли пароль?"}
            </button>
          )}
        </div>

        <div className="form-btn">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              formTitle === "Регистрация"
                ? handleRegister()
                : formTitle === "Восстановление"
                ? handleRecover()
                : handleLogin();
            }}
          >
            {formTitle === "Регистрация"
              ? "Создать аккаунт"
              : formTitle === "Восстановление"
              ? "Восстановить"
              : "Войти"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RegAndLogForm;
