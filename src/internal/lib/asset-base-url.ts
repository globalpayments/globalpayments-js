import getGateway from "../../internal/lib/get-gateway";
import { options } from "../../internal/lib/options";
import version from "../../lib/version";

export default () => {
  let result = `https://api2.heartlandportico.com/SecureSubmit.v1/token/gp-${version}/`;

  const gateway = getGateway();
  if (!gateway) {
    return result;
  }

  if (gateway.urls.assetBaseUrl) {
    return gateway.urls.assetBaseUrl(result);
  }

  switch (gateway.getEnv(options)) {
    case "local":
      result = "http://localhost:7777/dist/";
      break;
    case "sandbox":
      result = `https://hps.github.io/token/gp-${version}/`;
      break;
    default:
      break;
  }

  return result;
};
