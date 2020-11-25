import { RequestMock } from "testcafe";

const mocks = RequestMock();

mocks
  .onRequestTo(/\/foo\/bar\/success-enrolled/)
  .respond({ enrolled: true }, 200, {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*",
  });
mocks
  .onRequestTo(/\/foo\/bar\/success-not-enrolled/)
  .respond({ enrolled: false }, 200, {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*",
  });
mocks
  .onRequestTo(/\/foo\/bar\/client-error/)
  .respond({ error: "error" }, 400, {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*",
  });
mocks
  .onRequestTo(/\/foo\/bar\/server-error/)
  .respond({ error: "error" }, 500, {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*",
  });

export default mocks;
