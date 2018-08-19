import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const makeExternalPredicate = externalArr => {
  if (!externalArr.length) {
    return () => false;
  }

  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
};

export default {
  input: "lib/index.js",

  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" }
  ],

  external: makeExternalPredicate([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]),

  plugins: [babel({ plugins: ["external-helpers"] })]
};
