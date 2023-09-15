
import React from 'react'
import "./toolButton.css"

function ToolButoon ({img, text }) {

  const handleClick = () => {
    alert("your language is English")
  };


    return (
    
      <button type = "button" onClick={handleClick} className="toolCard__button" >
        
      {text}
      </button>
     
    )
  

  

}

export default ToolButoon;