import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";

export default async (url: string, _env: string, data: IDictionary) => {
  const headers = createHeaders();

  try {
    const resp = await fetch(url, {
      credentials: "omit",
      headers,
      method: "GET",
    });

    return resp.json();
  } catch (e: any) {
    return {
      error: true,
      reasons: [{ code: e.name, message: e.message }],
    };
  }
};

function createHeaders() {
  const headers = {
    "Accept": "application/json",
    "Authorization": `Bearer ${options.accessToken || ""}`,
    "Content-Type": "application/json",
    "X-GP-Version": options.apiVersion || "2021-03-22",
  };
  return typeof Headers !== "undefined" ? new Headers(headers) : headers;
}
