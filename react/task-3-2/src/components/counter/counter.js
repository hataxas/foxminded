import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import {minusCount, plusCount} from '../../actions/actions';

import '../app/app.css';
import Button from "../../common/button/button";
import Count from "../../common/count/count";


function Counter() {
  const value = useSelector(state => state.count);
  const dispatch = useDispatch();

  return(
    <div className="container">
      <Button
        type="minus"
        onClick={() => dispatch(minusCount())}
      />
      <Count value={value}/>
      <Button
        type="plus"
        onClick={() => dispatch(plusCount())}
      />
    </div>
  );
}

export default Counter;
