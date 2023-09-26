import version from "../../../lib/version";
import getEnv from "./get-env";

export default (result: string) => {
  const majorVersion = version.split(".")[0] || version[0];

  switch (getEnv()) {
    case "local":
      return `http://localhost:7777/dist/`;
    case "qa":
      return `https://js-qa.np-hpp.globalpay.com/${version}/`;
    case "sandbox":
      return `https://js-cert.globalpay.com/${version}/`;
    case "production":
      return `https://js.globalpay.com/${version}/`;
    default:
      return result;
  }
};
