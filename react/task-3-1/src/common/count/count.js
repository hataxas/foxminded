import React from "react";
import './count.css';

function Count(props) {
  return(
    <div className="count">
      {props.value}
    </div>
  );
}

export default Count;
