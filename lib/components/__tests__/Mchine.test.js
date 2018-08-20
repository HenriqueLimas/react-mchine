import React from "react";
import { shallow } from "enzyme";
import { Mchine } from "../Mchine";
import Context from "../../Context";

describe("<Mchine />", () => {
  it("should start the stateMachine property", () => {
    const stateChart = {
      initial: "idle",
      states: {
        idle: {}
      }
    };
    const container = shallow(
      <Mchine stateChart={stateChart}>{() => {}}</Mchine>
    );

    expect(container.instance().stateMachine).toBeDefined();
  });

  it("should set the Context.Provider value with the currentState of the stateMachine", () => {
    const stateChart = {
      initial: "idle",
      states: {
        idle: {}
      }
    };

    const container = shallow(
      <Mchine stateChart={stateChart}>{() => {}}</Mchine>
    );
    const { stateMachine } = container.instance();

    expect(container.find(Context.Provider).prop("value")).toEqual(
      stateMachine.getCurrentState()
    );
  });

  it("should update the Context value on transition", () => {
    const stateChart = {
      initial: "idle",
      states: {
        idle: {
          events: {
            login: {
              target: "sending"
            }
          }
        },
        sending: {
          events: {
            success: {
              target: "idle"
            }
          }
        }
      }
    };

    const container = shallow(
      <Mchine stateChart={stateChart}>{() => {}}</Mchine>
    );
    const instance = container.instance();

    expect(container.find(Context.Provider).prop("value")).toBe("idle");

    instance.handleTransition("login");
    expect(container.find(Context.Provider).prop("value")).toBe("sending");
  });
});
