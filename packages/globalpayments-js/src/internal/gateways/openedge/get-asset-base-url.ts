import version from "../../../lib/version";
import getEnv from "./get-env";

export default (result: string) => {
  const majorVersion = version.split(".")[0] || version[0];

  switch (getEnv()) {
    case "local":
      return `http://localhost:8080/v${majorVersion}/`;
    case "dev":
      return `https://js.dev.paygateway.com/secure_payment/v${majorVersion}/`;
    case "pqa":
      return `https://js.pqa.paygateway.com/secure_payment/v${majorVersion}/`;
    case "qa":
      return `https://js.qa.paygateway.com/secure_payment/v${majorVersion}/`;
    case "test":
      return `https://js.test.paygateway.com/secure_payment/v${majorVersion}/`;
    case "prod":
      return `https://js.paygateway.com/secure_payment/v${majorVersion}/`;
    case "GP":
      return result;
    default:
      return result;
  }
};
