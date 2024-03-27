import React from "react";
import "./generalSettings.css";

import { Switch } from "antd";

const GeneralSettings = ({
  recomendedMode,
  setRecomendedMode,
  logged,
  setUseKeyboard,
  useKeyboard,
}) => {
  const handleChangeRec = () => {
    setRecomendedMode(!recomendedMode);
  };
  const handleChangeKeyabord = () => {
    setUseKeyboard(!useKeyboard);
  };

  return (
    <div className="container">
      <div className="general-settings-wrapper">
        <div className="general-title">Общие настройки</div>
        <div className="general-settings-item">
          {logged && (
            <>
              <Switch
                className="switch"
                defaultChecked={recomendedMode}
                onChange={handleChangeRec}
              />
              <label className="text">
                Использовать рекомндованные слова для улучшения навыков{" "}
              </label>
            </>
          )}

          {!logged && (
            <>
              <Switch
                className="switch"
                disabled={true}
                defaultChecked={false}
              />
              Для использования рекомндованных слов необходима авторизация
            </>
          )}
        </div>
        <div className="general-settings-item">
          <>
            <Switch
              className="switch"
              defaultChecked={useKeyboard}
              onChange={handleChangeKeyabord}
            />
            <label className="text">Отображать виртуальную клавиатуру </label>
          </>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
