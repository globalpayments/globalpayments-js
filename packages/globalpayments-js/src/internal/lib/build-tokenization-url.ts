import getGateway from "./get-gateway";
import { options } from "./options";
import { IDictionary } from "./util";

export default (queryString?: IDictionary): string => {
  const gateway = getGateway();

  if (!gateway) {
    return "";
  }

  const base = gateway.urls.tokenization(
    gateway.getEnv(options) === "production",
  );

  if (!queryString) {
    return base;
  }

  let query = "?";

  for (const param in queryString) {
    if (queryString.hasOwnProperty(param) && queryString[param]) {
      query += param + "=" + encodeURIComponent(queryString[param]) + "&";
    }
  }

  return base + query;
};
