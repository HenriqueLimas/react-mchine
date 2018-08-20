import React from "react";
import { func, object } from "prop-types";
import mchine from "mchine";
import Context from "../Context";

export class Mchine extends React.Component {
  constructor(props) {
    super(props);

    this.stateMachine = mchine(props.stateChart);
    this.state = {};
  }

  handleTransition = event => {
    this.startTransitioning();
    this.stateMachine.transition(event);
    this.stopTransitioning();
  };

  startTransitioning = () => {};

  stopTransitioning = () => {
    this.forceUpdate();
  };

  render() {
    const { children } = this.props;

    return (
      <Context.Provider value={this.stateMachine.getCurrentState()}>
        {children({
          transition: this.handleTransition
        })}
      </Context.Provider>
    );
  }
}

Mchine.propTypes = {
  stateChart: object.isRequired,
  children: func.isRequired
};

export default Mchine;
