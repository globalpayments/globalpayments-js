// tslint:disable:max-line-length
import { RequestMock } from "testcafe";

import check3dsVersionSuccess from "../fixtures/mocks/check-3ds-version-success";
import initiateAuthenticationFrictionlessAuthenticationSuccessful from "../fixtures/mocks/initiate-authentication-frictionless-authentication-successful";
import methodNotificationComplete from "../fixtures/mocks/method-notification-complete";
import {
  successfulHtmlResponse,
  successfulJsonResponse,
} from "../helpers/mocking";

const mocks = RequestMock();
successfulJsonResponse(
  mocks,
  /\/check-3ds-version.php/,
  check3dsVersionSuccess,
);
successfulHtmlResponse(mocks, /\/acs\/methodData/, methodNotificationComplete);
successfulJsonResponse(
  mocks,
  /\/initiate-authentication.php/,
  initiateAuthenticationFrictionlessAuthenticationSuccessful,
);

export default mocks;
