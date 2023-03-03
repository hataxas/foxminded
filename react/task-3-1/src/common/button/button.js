import React from "react";
import './button.css';

function Button(props) {
  return(
    <button className="button" onClick={props.onClick}>
      {props.type === 'minus' ? String.fromCharCode(8722) : '+'}
    </button>
  );
}

export default Button;
