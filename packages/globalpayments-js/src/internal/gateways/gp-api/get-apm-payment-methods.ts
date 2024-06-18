import { IDictionary } from "../../lib/util";
import { setGpApiHeaders } from "../../lib/set-headers";

export default async (url: string, _env: string, data: IDictionary) => {
  const headers = setGpApiHeaders();

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
