import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const input = "./src/index.ts";

const plugins = [
  resolve({
    "base64-js": true,
    "promise-polyfill": true,
    "fetch-ie8": true,
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
      file: "./dist/globalpayments.js",
      format: "iife",
      name: "GlobalPayments",
      sourcemap: true,
    },

    plugins,
    onwarn,
  },
  // Prod
  {
    input,
    output: {
      file: "./dist/globalpayments.min.js",
      format: "iife",
      name: "GlobalPayments",
      sourcemap: true,
    },

    plugins: plugins.concat([
      terser({
        compress: {
          dead_code: true,
          drop_debugger: true,
          drop_console: true,
        },
      }),
    ]),
    onwarn,
  },
];
