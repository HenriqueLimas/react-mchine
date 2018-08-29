function isParallelState(state) {
  return typeof state === "object";
}

export function matchState(state, stateToCheck) {
  if (isParallelState(state)) {
    const path = stateToCheck.split(".");

    return (
      path
        .slice(0, path.length - 1)
        .reduce((data, key) => data && data[key], state) ===
      path[path.length - 1]
    );
  }

  return state === stateToCheck;
}

export default matchState;
