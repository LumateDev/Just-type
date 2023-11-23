import React from "react";
import Modal from "react-modal";
import "./regAndLogForm.css";
import { useForm } from "react-hook-form";
import errorSvg from "../../img/form/form-error.svg";

const RegAndLogForm = ({
  modalOpen,
  setModalOpen,
  formTitle,
  setFormTitle,
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
  });
  const password = watch("password");
  const onSubmit = (data) => {
    alert(JSON.stringify(data));

    reset();

    switch (formTitle) {
      case "Регистрация":
        handleRegister();
        break;
      case "Восстановление":
        handleRecover();
        break;
      default:
        handleLogin();
    }
  };
  function handleRegister() {
    console.log("Запуск функции handleRegister");
  }

  function handleRecover() {
    console.log("Запуск функции handleRecover");
  }

  function handleLogin() {
    console.log("Запуск функции handleLogin");
  }

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      className="modal-form"
      overlayClassName="overlay"
    >
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-title-wrapper">
          <h2 className="form-title">{formTitle}</h2>
        </div>

        <div className="form-col">
          <div className="form-input">
            {errors?.username && (
              <img src={errorSvg} width="32px" height="32px" alt="error icon" />
            )}
            <input
              {...register("username", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 5,
                  message: "Длина поля не может быть меньше 5 символов",
                },
                maxLength: {
                  value: 20,
                  message: "Длина поля не может быть больше 20 символов",
                },
              })}
              type="text"
              autoComplete="username"
              placeholder="Username"
            />
          </div>

          <div className="username-error">
            {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
          </div>
        </div>

        {formTitle === "Регистрация" && (
          <div className="form-col">
            <div className="form-input">
              {errors?.email && (
                <img
                  src={errorSvg}
                  width="32px"
                  height="32px"
                  alt="error icon"
                />
              )}
              <input
                {...register("email", {
                  required: "Поле обязательно для заполнения",
                  maxLength: {
                    value: 100,
                    message: "Длина поля не может быть больше 100 символов",
                  },

                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Почта заполнена неверно",
                  },
                })}
                type="email"
                autoComplete="email"
                placeholder="Email"
              />
            </div>

            <div className="email-error">
              {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
            </div>
          </div>
        )}

        <div className="form-col">
          <div className="form-input">
            {errors?.password && (
              <img src={errorSvg} width="32px" height="32px" alt="error icon" />
            )}
            <input
              {...register("password", {
                required: "Поле обязательно для заполнения",
                maxLength: {
                  value: 100,
                  message: "Длина поля не может быть больше 100 символов",
                },
                minLength: {
                  value: 8,
                  message: "Длина пароля не может быть меньше 8 символов",
                },
              })}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />
          </div>

          <div className="password-error">
            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
          </div>
        </div>

        {formTitle === "Регистрация" && (
          <div className="form-col">
            <div className="form-input">
              {errors?.repeatPassword && (
                <img
                  src={errorSvg}
                  width="32px"
                  height="32px"
                  alt="error icon"
                />
              )}
              <input
                {...register("repeatPassword", {
                  required: "Поле обязательно для заполнения",
                  maxLength: {
                    value: 100,
                    message: "Длина поля не может быть больше 100 символов",
                  },
                  minLength: {
                    value: 8,
                    message: "Длина пароля не может быть меньше 8 символов",
                  },
                  validate: (value) =>
                    value === password || "Пароли не совпадают",
                })}
                type="password"
                autoComplete="current-password"
                placeholder="Repeat Password"
              />
            </div>

            <div className="repeat-password-error">
              {errors?.repeatPassword && (
                <p>{errors?.repeatPassword?.message || "Error!"}</p>
              )}
            </div>
          </div>
        )}

        <div className="form-placeholder">
          {formTitle !== "Восстановление" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                reset();
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
          <button type="submit" disabled={!isValid}>
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
