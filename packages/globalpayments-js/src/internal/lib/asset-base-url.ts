import getGateway from "../../internal/lib/get-gateway";
import { options } from "../../internal/lib/options";
import version from "../../lib/version";

export default () => {
  const majorVersion = version.split(".")[0] || version[0];
  const result = `https://js.globalpay.com/v${majorVersion}/`;

  const gateway = getGateway();

  if (gateway && gateway.urls.assetBaseUrl) {
    return gateway.urls.assetBaseUrl(result);
  }

  switch (options.env) {
    case "local":
      return `http://localhost:7777/dist/`;
    case "qa":
      return `https://js-qa.np-hpp.globalpay.com/v${majorVersion}/`;
    case "sandbox":
      return `https://js-cert.globalpay.com/v${majorVersion}/`;
    case "production":
      return `https://js.globalpay.com/v${majorVersion}/`;
    default:
      return result;
  }
};
