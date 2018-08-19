import React from "react";
import { Mchine } from "./components/Mchine";

export function withMchine(stateChart) {
  return Component => {
    const C = props => (
      <Mchine stateChart={stateChart}>
        {mchineComponentProps => (
          <Component {...props} {...mchineComponentProps} />
        )}
      </Mchine>
    );

    C.displayName = `withMchine(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
  };
}

export default withMchine;
