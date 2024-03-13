import React from "react";
import GeneralSettings from "../components/Settings/GeneralSettings";


const Settings = (
  {
    recomendedMode,
    setRecomendedMode,
    logged
  }
) => {
  return (
    <section className="section-settings">
      <GeneralSettings recomendedMode={recomendedMode} setRecomendedMode={setRecomendedMode} logged={logged}/>
    </section>
  );
};

export default Settings;
