import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";

const tokenTypes = {
  check: "2",
  credit: "1",
};

export default async (url: string, env: string, data: IDictionary) => {
  const request: any = {
    merchantName: options.merchantName,
  };

  if (data["card-number"]) {
    request.tokenData = data["card-number"].replace(/\s/g, "");
    request.type = tokenTypes.credit;
  } else if (data["account-number"]) {
    request.tokenData = `${data["account-number"]}|${data["routing-number"]}`;
    request.type = tokenTypes.check;
  }

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const resp = await fetch(url, {
      body: JSON.stringify(request),
      credentials: "omit",
      headers: typeof Headers !== "undefined" ? new Headers(headers) : headers,
      method: "POST",
    });
    return resp.json();
  } catch (e) {
    return {
      error: true,
      reasons: [{ code: e.name, message: e.message }],
    };
  }
};
