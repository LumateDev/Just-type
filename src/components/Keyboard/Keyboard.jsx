import React from "react";
import "./keyboard.css";

const Keyboard = ({ activeKey }) => {
  // const row1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];
  const row2 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
  const row3 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
  const row4 = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
  const row5 = [" "];

  const getKeyStyle = (key) => {
    if (key.toLowerCase() === activeKey.toLowerCase()) {
      return "activeKey";
    }
    return "defaultKey";
  };

  return (
    <section className="keyboard">
      <div className="container">
        <div className="keyboard-wrapper">
          {/* <div className="row row1">
          {row1.map((key) => (
              <div className={`key ${getKeyStyle(key)}`} key={key}>
                {key}
              </div>
            ))}
          </div> */}

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

          <div className="row row 5">
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
