import React from "react";
import '../../App.css';
import Button from "../../common/button/button";
import Count from "../../common/count/count";

class CounterClassComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
    };

    this.minusCount = () => {
      this.setState((state) => {
        return {
          value: state.value - 1
        }
      });
    };

    this.plusCount = () => {
      this.setState((state) => {
        return {
          value: state.value + 1
        }
      });
    };
  }

  render() {
    return(
      <div className="container">
        <Button
          type="minus"
          onClick = {this.minusCount}
          />
        <Count value={this.state.value}/>
        <Button
          type="plus"
          onClick = {this.plusCount}
        />
      </div>
    );
  }
}

export default CounterClassComponent;
