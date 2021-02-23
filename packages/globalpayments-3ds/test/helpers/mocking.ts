import { RequestMock } from "testcafe";

export const successfulHtmlResponse = (
  requestMock: RequestMock,
  request: RegExp,
  data: string,
) =>
  requestMock
    .onRequestTo(request)
    .respond(data, 200, {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    });

export const successfulJsonResponse = (
  requestMock: RequestMock,
  request: RegExp,
  data: any,
) =>
  requestMock
    .onRequestTo(request)
    .respond(JSON.stringify(data), 200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

export const successfulRedirectResponse = (
  requestMock: RequestMock,
  request: RegExp,
  data: string,
) => requestMock.onRequestTo(request).respond("", 302, { Location: data });
