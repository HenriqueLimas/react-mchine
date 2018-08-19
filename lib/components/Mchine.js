import React from "react";
import { func, object } from "prop-types";
import mchine from "mchine";

export class Mchine extends React.Component {
  constructor(props) {
    super(props);

    mchine(props.stateChart);
  }

  handleTransition = () => {};

  render() {
    const { children } = this.props;

    return children({
      transition: this.handleTransition
    });
  }
}

Mchine.propTypes = {
  stateChart: object.isRequired,
  children: func.isRequired
};

export default Mchine;
