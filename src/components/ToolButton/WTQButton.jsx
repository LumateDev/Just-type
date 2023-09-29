import React, {useState} from 'react'
import "./wtqButton.css"

const WTQButton = ({text, active, handleClick}) => {

    return (
      <button type="button" onClick={handleClick}  className = {active ? 'toolCard__button__active' : 'toolCard__button'} >
        {text}
      </button>
    )
  }
export default WTQButton;