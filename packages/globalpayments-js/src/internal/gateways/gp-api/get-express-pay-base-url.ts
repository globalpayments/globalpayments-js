import version from "../../../lib/version";
import getEnv from "./get-env";

export default (result: string) => {
  const majorVersion = version.split(".")[0] || version[0];

  switch (getEnv()) {
    case "local":
    case "dev":
      return `https://dev.np-wallet.globalpayments.com/checkout`;
    case "qa":
      return `https://qa.np-wallet.globalpayments.com/checkout`;
    case "sandbox":
      return `https://cert.wallet.globalpayments.com/checkout`;
    case "production":
      return `https://wallet.globalpayments.com/checkout`;
    default:
      return result;
  }
};
