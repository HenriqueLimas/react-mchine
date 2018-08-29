import { matchState } from "../matchState";

describe("matchState()", () => {
  const tests = [
    {
      name: "should check the current state",
      args: {
        state: "idle",
        stateToCheck: "idle"
      },
      want: true
    },
    {
      name: "should return false when the current state does not match",
      args: {
        state: "idle",
        stateToCheck: "loading"
      },
      want: false
    },
    {
      name: "should return true with parallel state",
      args: {
        state: {
          bold: "on",
          italic: "off"
        },
        stateToCheck: "bold.on"
      },
      want: true
    }
  ];

  tests.forEach(tt => {
    it(tt.name, () => {
      expect(matchState(tt.args.state, tt.args.stateToCheck)).toBe(tt.want);
    });
  });
});
