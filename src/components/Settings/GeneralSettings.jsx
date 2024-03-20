import React from 'react'
import "./generalSettings.css"

import { Switch } from 'antd';



const GeneralSettings = ({recomendedMode, setRecomendedMode, logged}) => {


    const handleChangeRec = () => {
        setRecomendedMode(!recomendedMode);
       
    }
  return (
    <div className="container">
        <div className="general-settings-wrapper">
            <div className="general-title">
                General Settings
            </div>
            <div className="general-settings-item">
                <label>

                {logged && (
                    <>
                    <Switch defaultChecked ={recomendedMode} onChange={handleChangeRec} />
                    <label htmlFor="">Использовать рекомндованные слова для улучшения навыков </label>
                    </>
                    
                )}

                {!logged && (
                    <>
                     <Switch disabled={true} defaultChecked = {false} />
                    Для использования рекомндованных слов необходима авторизация
                    </> 
                )}
                    
                </label>
            </div>
        </div>
    </div>
  )
}

export default GeneralSettings