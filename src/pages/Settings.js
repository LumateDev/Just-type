import React from "react";
import GeneralSettings from "../components/Settings/GeneralSettings";

const Settings = ({
  recomendedMode,
  setRecomendedMode,
  logged,
  useKeyboard,
  setUseKeyboard,
}) => {
  return (
    <section className="section-settings">
      <GeneralSettings
        recomendedMode={recomendedMode}
        setRecomendedMode={setRecomendedMode}
        logged={logged}
        useKeyboard={useKeyboard}
        setUseKeyboard={setUseKeyboard}
      />
    </section>
  );
};

export default Settings;
