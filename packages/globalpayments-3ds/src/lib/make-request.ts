import { GPError } from "./gp-error";

// tslint:disable-next-line:no-empty-interface
export interface IRequestData {}

// tslint:disable-next-line:no-empty-interface
export interface IResponseData {}

export async function makeRequest(
  endpoint: string,
  data: IRequestData,
): Promise<IResponseData> {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const rawResponse = await fetch(endpoint, {
      body: JSON.stringify(data),
      credentials: "omit",
      headers: typeof Headers !== "undefined" ? new Headers(headers) : headers,
      method: "POST",
    });

    if (!rawResponse.ok) {
      throw new GPError(
        [
          {
            code: rawResponse.status.toString(),
            message: await rawResponse.text(),
          },
        ],
        rawResponse.statusText,
      );
    }

    return await rawResponse.json();
  } catch (e) {
    let reasons = [{ code: e.name, message: e.message }];
    if (e.reasons) {
      reasons = reasons.concat(e.reasons);
    }
    throw new GPError(reasons);
  }
}
