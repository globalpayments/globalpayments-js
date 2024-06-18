import { options } from "./options";
import { ApiVersion } from "./enums";
import version from "../../lib/version";

export function setGpApiHeaders() {
  const headers = {
    "Accept": "application/json",
    "Authorization": `Bearer ${options.accessToken || ""}`,
    "Content-Type": "application/json",
    "X-GP-Version": options.apiVersion || ApiVersion.default,
    "X-GP-Library": `javascript;version=${version}`,
  };

  return typeof Headers !== "undefined" ? new Headers(headers) : headers;
}