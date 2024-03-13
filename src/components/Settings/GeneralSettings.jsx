import React from 'react'
import "./generalSettings.css"
import Switch from '@mui/material/Switch';



const GeneralSettings = ({recomendedMode, setRecomendedMode, logged}) => {


    const handleChangeRec = () => {
        setRecomendedMode(!recomendedMode);
        console.log(recomendedMode);
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
                    <Switch onChange={handleChangeRec}  color="default"  />
                    <label htmlFor="">Использовать рекомендации для улучшения навыков</label>
                    </>
                    
                )}
                {!logged && (
                    <>
                     <Switch  disabled  color ="default"  />
                    Для этой опции нужна авторизация 
                    </>
                    
                )}
                    
                
                
                  
                </label>
            </div>
        </div>
    </div>
  )
}

export default GeneralSettings