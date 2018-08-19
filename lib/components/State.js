import PropTypes from "prop-types";

export function State({ is, children }) {
  if (is) {
    return children;
  }

  return null;
}

State.propTypes = {
  is: PropTypes.string
};

export default State;
