import React from "react";
import Modal from "react-modal";
import "./regAndLogForm.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import errorSvg from "../../img/form/form-error.svg";

const RegAndLogForm = ({
  modalOpen,
  setModalOpen,
  formTitle,
  setFormTitle,
  setUsername,
  setLogged,
  setUserId,
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

  const onSubmit = async (data) => {
    try {
      switch (formTitle) {
        case "Регистрация":
          await handleRegister(data);

          break;
        case "Восстановление":
          await handleRecover(data);
          break;
        default:
          await handleLogin(data);
          reset();
      }
    } catch (error) {
      console.error("Error:", error);
      reset();
    }
  };
  const handleRegister = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        {
          username: data.username,
          password: data.password,
          email: data.email,
          repeat_password: data.repeat_password,
        }
      );

      console.log("Registration successful:", response.data);
      // console("ID:", response.data.data.id);
      // console("Username:", response.data.data.username);

      setLogged(true);
      setUsername(response.data.data.username);

      console.log("response.data.data.username:", response.data.data.username);
      console.log("response.data.data.ID::::::::", response.data.data.id);
      setUserId(response.data.data.id);
      setModalOpen(false);

      alert("Регистрации прошла успешно");
      // Handle success, redirect, or update UI accordingly
    } catch (error) {
      console.error("Registration failed:", error.response);
      alert("Произошла ошибка регистрации");
    }
  };

  const handleRecover = async (data) => {
    alert("Запрос на сброс пароля принят");
  };

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          username: data.username,
          password: data.password,
        }
      );
      console.log("Login successful:", response.data);
      alert("Авторизация прошла успешно");

      setUsername(response.data.username);
      setUserId(response.data.id);

      setLogged(true);
      setModalOpen(false);
    } catch (error) {
      console.error("Login failed:", error.response.data);
      alert("Произошла ошибка авторизации");
    }
  };

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
                  value: 6,
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
              {errors?.repeat_password && (
                <img
                  src={errorSvg}
                  width="32px"
                  height="32px"
                  alt="error icon"
                />
              )}
              <input
                {...register("repeat_password", {
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
              {errors?.repeat_password && (
                <p>{errors?.repeat_password?.message || "Error!"}</p>
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
