import React from "react";
import { mount } from "enzyme";
import { withMchine } from "../withMchine";
import { Mchine } from "../components/Mchine";

describe("withMchine()", () => {
  describe("props", () => {
    const Component = () => <div />;
    const stateChart = { initial: "idle", states: { idle: {} } };

    const tests = [
      {
        name: "should add the transition method",
        args: {
          Component,
          stateChart
        },
        props: {},
        propName: "transition",
        childUnderTest: Component,
        want: expect.any(Function)
      },
      {
        name: "should add component props",
        args: {
          Component,
          stateChart
        },
        props: {
          externalProp: 42
        },
        propName: "externalProp",
        childUnderTest: Component,
        want: 42
      },
      {
        name: "should pass the stateChart property to Mchine",
        args: {
          Component,
          stateChart
        },
        props: {},
        propName: "stateChart",
        childUnderTest: Mchine,
        want: { initial: "idle", states: { idle: {} } }
      }
    ];

    tests.forEach(tt => {
      it(tt.name, () => {
        const MchineComponent = withMchine(tt.args.stateChart)(
          tt.args.Component
        );
        const container = mount(<MchineComponent {...tt.props} />);

        expect(container.find(tt.childUnderTest).prop(tt.propName)).toEqual(
          tt.want
        );
      });
    });
  });

  describe("static properties", () => {
    const Component = () => <div />;
    const tests = [
      {
        name: "should set displayName",
        args: {
          Component
        },
        propertyName: "displayName",
        want: "withMchine(Component)"
      },
      {
        name: "should set WrappedComponent property",
        args: {
          Component
        },
        propertyName: "WrappedComponent",
        want: Component
      }
    ];

    tests.forEach(tt => {
      it(tt.name, () => {
        const MchineComponent = withMchine({})(tt.args.Component);

        expect(MchineComponent[tt.propertyName]).toBe(tt.want);
      });
    });
  });
});
