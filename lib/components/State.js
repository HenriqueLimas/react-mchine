import React from "react";
import PropTypes from "prop-types";
import Context from "../Context";
import { matchState } from "../matchState";

export function State({ is, children }) {
  return (
    <Context.Consumer>
      {state => (matchState(state, is) ? children : null)}
    </Context.Consumer>
  );
}

State.propTypes = {
  is: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default State;
