import { options } from "../../lib/options";

export default () => {
  return options["X-GP-Environment"] || "local";
};
