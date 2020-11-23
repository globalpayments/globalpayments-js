import { options } from "../../lib/options";

export default () => {
  return options.env || "production";
};
