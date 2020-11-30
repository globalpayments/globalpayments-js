import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

const input = "./src/index.ts";

const plugins = [
  resolve({
      "globalpayments-js-loader": true,
  }),
  commonjs(),
  typescript({
    check: true,
    typescript: require("typescript"),
    useTsconfigDeclarationDir: true,
  }),
];

const onwarn = (warning) => {
  // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
  // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
  if (warning.code === "THIS_IS_UNDEFINED") {
    return;
  }
  console.error(warning.message);
};

export default [
  // Dev
  {
    input,
    output: {
      file: "./lib/globalpayments-js-web-components.js",
      format: "esm",
      name: "GlobalPayments",
      sourcemap: true,
    },

    plugins,
    onwarn,
  },
];
