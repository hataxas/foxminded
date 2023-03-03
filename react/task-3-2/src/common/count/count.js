import React from "react";
import './count.css';

function Count({value}) {
  return(
    <div className="count">
      {value}
    </div>
  );
}

export default Count;
