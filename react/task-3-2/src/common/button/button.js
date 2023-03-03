import React from "react";
import './button.css';

function Button({type, onClick}) {
  return(
    <button className="button" onClick={onClick}>
      {type === 'minus' ? String.fromCharCode(8722) : '+'}
    </button>
  );
}

export default Button;
