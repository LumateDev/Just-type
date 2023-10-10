import React from "react";
import "./keyboard.css";

const Keyboard = ({ activeKey, incorrectKeys, status, languageTest }) => {
  // Английская раскладка
  const engRow2 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
  const engRow3 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
  const engRow4 = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

  // Русская раскладка
  const rusRow2 = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"];
  const rusRow3 = ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"];
  const rusRow4 = ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."];

  const row5 = [" "];

  const getKeyStyle = (key) => {
    if (status === "print" && key.toLowerCase() === activeKey.toLowerCase()) {
      return "activeKey";
    }
    if (incorrectKeys && incorrectKeys.has(key.toLowerCase())) {
      return "incorrectKey";
    }

    return "defaultKey";
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
            {row2.map((key) => (
              <div className={`key ${getKeyStyle(key)}`} key={key}>
                {key}
              </div>
            ))}
          </div>

          <div className="row row3">
            {row3.map((key) => (
              <div className={`key ${getKeyStyle(key)}`} key={key}>
                {key}
              </div>
            ))}
          </div>

          <div className="row row4">
            {row4.map((key) => (
              <div className={`key ${getKeyStyle(key)}`} key={key}>
                {key}
              </div>
            ))}
          </div>

          <div className="row row5">
            {row5.map((key) => (
              <div className={`space ${getKeyStyle(key)}`} key={key}>
                {key}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keyboard;
