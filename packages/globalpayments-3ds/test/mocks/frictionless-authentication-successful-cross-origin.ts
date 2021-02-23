// tslint:disable:max-line-length
import { RequestMock } from "testcafe";

import check3dsVersionSuccess from "../fixtures/mocks/check-3ds-version-success";
import initiateAuthenticationFrictionlessAuthenticationSuccessful from "../fixtures/mocks/initiate-authentication-frictionless-authentication-successful";
import methodNotificationComplete from "../fixtures/mocks/method-notification-complete";
import { successfulJsonResponse } from "../helpers/mocking";

const mocks = RequestMock();
successfulJsonResponse(
  mocks,
  /http:\/\/3ds2\.localhost\/check-3ds-version\.php/,
  check3dsVersionSuccess,
);
mocks
  .onRequestTo(/\/acs\/methodData/)
  .respond(methodNotificationComplete, 200, { "Content-Type": "text/html" });
successfulJsonResponse(
  mocks,
  /http:\/\/3ds2\.localhost\/initiate-authentication\.php/,
  initiateAuthenticationFrictionlessAuthenticationSuccessful,
);

export default mocks;
