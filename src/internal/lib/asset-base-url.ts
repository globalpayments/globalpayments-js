import getGateway from "../../internal/lib/get-gateway";
import { options } from "../../internal/lib/options";
import version from "../../lib/version";

export default () => {
  let result = `https://api2.heartlandportico.com/SecureSubmit.v1/token/gp-${version}/`;

  const gateway = getGateway();
  if (!gateway) {
    return result;
  }

  if (gateway.requiredSettings[0] === "X-GP-Api-Key") {
    const env = gateway.getEnv(options);
    switch (env) {
      case "local":
        return `http://localhost:8080/v${version[0]}/`;
      case "dev":
        return `https://js.dev.paygateway.com/secure_payment/v${version[0]}/`;
      case "pqa":
        return `https://js.pqa.paygateway.com/secure_payment/v${version[0]}/`;
      case "qa":
        return `https://js.qa.paygateway.com/secure_payment/v${version[0]}/`;
      case "test":
        return `https://js.test.paygateway.com/secure_payment/v${version[0]}/`;
      case "prod":
        return `https://js.paygateway.com/secure_payment/v${version[0]}/`;
      case "GP":
        return result;
      default:
        return result;
    }
  }

  result =
    gateway.getEnv(options) === "sandbox"
      ? `https://hps.github.io/token/gp-${version}/`
      : result;
  return result;
};
