import getGateway from "../../lib/get-gateway";
import version from "../../../lib/version";
import { options } from "../..";

export default (result: string) => {
    const gateway = getGateway();
    if (!gateway) {
      return result;
    }

    const majorVersion = version.split(".")[0] || version[0];
    const env = gateway.getEnv(options);

    switch (env) {
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
