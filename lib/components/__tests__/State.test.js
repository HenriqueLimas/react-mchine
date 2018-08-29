import React from "react";
import { mount } from "enzyme";
import { State } from "../State";
import Context from "../../Context";

describe("<State />", () => {
  const tests = [
    {
      name:
        "should render the children when the state is equal to the is property",
      props: {
        is: "state"
      },
      state: "state",
      want: 1
    },
    {
      name:
        "should not render the children when the state is not equal to the is property",
      props: {
        is: "doesntExist"
      },
      state: "state",
      want: 0
    }
  ];

  tests.forEach(tt => {
    it(tt.name, () => {
      const Component = () => <div />;
      const container = mount(
        <Context.Provider value={tt.state}>
          <State is={tt.props.is}>
            <Component />
          </State>
        </Context.Provider>
      );

      expect(container.find(Component).length).toBe(tt.want);
    });
  });
});
