import React from "react";
import "./keyboard.css";

const Keyboard = ({
  activeKey,
  incorrectKeys,
  status,
  languageTest,
  letterErrors,
}) => {
  // Английская раскладка
  const engRow2 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
  const engRow3 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
  const engRow4 = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

  // Русская раскладка
  const rusRow2 = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"];
  const rusRow3 = ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"];
  const rusRow4 = ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."];

  const row5 = [" "];

  function getErrorColor(errors) {
    const maxErrors = 100; // Предел ошибок для максимального изменения цвета
    errors = Math.min(errors, maxErrors); // Ограничиваем количество ошибок пределом
    const weight = errors / maxErrors; // Весовой коэффициент цвета от 0 до 1

    // Пересчитываем цвет от зеленого к красному
    const red = Math.round((255 - 0) * weight + 0); // Зеленый цвет переходит к красному
    const green = Math.round((255 - 0) * (1 - weight) + 0); // Красный цвет переходит к зеленому
    const blue = 0; // Синий цвет отсутствует

    return `rgb(${red},${green},${blue})`;
  }
  const getKeyStyle = (key) => {
    const baseStyle = "key "; // Общий класс для клавиши
    if (
      status === "print" &&
      activeKey &&
      key.toLowerCase() === activeKey.toLowerCase()
    ) {
      return baseStyle + "activeKey";
    }
    if (incorrectKeys && key.toLowerCase() in incorrectKeys) {
      return baseStyle + "incorrectKey";
    }
    if (letterErrors) {
      const errors = letterErrors[key.toLowerCase()] || 0; // Используем 0 если нет ошибок
      const backgroundColor = getErrorColor(errors); // Получаем цвет фона

      // Возвращаем стиль с градиентом фона и белым текстом
      return {
        background: backgroundColor,
      };
    }

    return baseStyle + "defaultKey";
  };

  // Выбор рядов в зависимости от языка
  const row2 = languageTest === "english" ? engRow2 : rusRow2;
  const row3 = languageTest === "english" ? engRow3 : rusRow3;
  const row4 = languageTest === "english" ? engRow4 : rusRow4;

  return (
    <section className="keyboard">
      <div className="container">
        <div className="keyboard-wrapper">
          <div className="row row2">
            {row2.map((key) => {
              const keyStyle = getKeyStyle(key);
              return (
                <div
                  className={`key ${
                    typeof keyStyle === "string" ? keyStyle : ""
                  }`}
                  style={typeof keyStyle === "object" ? keyStyle : null}
                  key={key}
                >
                  {key}
                </div>
              );
            })}
          </div>

          <div className="row row3">
            {row3.map((key) => {
              const keyStyle = getKeyStyle(key);
              return (
                <div
                  className={`key ${
                    typeof keyStyle === "string" ? keyStyle : ""
                  }`}
                  style={typeof keyStyle === "object" ? keyStyle : null}
                  key={key}
                >
                  {key}
                </div>
              );
            })}
          </div>

          <div className="row row4">
            {row4.map((key) => {
              const keyStyle = getKeyStyle(key);
              return (
                <div
                  className={`key ${
                    typeof keyStyle === "string" ? keyStyle : ""
                  }`}
                  style={typeof keyStyle === "object" ? keyStyle : null}
                  key={key}
                >
                  {key}
                </div>
              );
            })}
          </div>

          <div className="row row5">
            {row5.map((key) => {
              const keyStyle = getKeyStyle(key);
              return (
                <div
                  className={
                    key === " "
                      ? "key space"
                      : `key ${typeof keyStyle === "string" ? keyStyle : ""}`
                  }
                  style={typeof keyStyle === "object" ? keyStyle : null}
                  key={key}
                >
                  {key}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keyboard;
