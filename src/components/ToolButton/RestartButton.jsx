import React from "react";


function RestartButton(props) {
  
  const handleClick = () => {
    window.location.reload();
  };

  return (
    
      <button type="button" onClick={handleClick} className="toolCard__button" >
      <img src={props.img} width="16px" height="16px" alt="" />
      </button>
    
  );
}

export default RestartButton;
