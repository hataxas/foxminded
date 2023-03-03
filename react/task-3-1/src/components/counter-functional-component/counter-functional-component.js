import React  from "react";
import '../../App.css';
import Button from "../../common/button/button";
import Count from "../../common/count/count";


function CounterFunctionalComponent(props) {
  const [value, setValue] = React.useState(0);

  return(
    <div className="container">
      <Button
        type="minus"
        onClick={() => setValue((v) => v - 1)}
      />
      <Count value={value}/>
      <Button
        type="plus"
        onClick={() => setValue((v) => v + 1)}
      />
    </div>
  );
}

export default CounterFunctionalComponent;
