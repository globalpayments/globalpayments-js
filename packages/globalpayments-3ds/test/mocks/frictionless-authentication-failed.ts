// tslint:disable:max-line-length
import { RequestMock } from "testcafe";

import check3dsVersionSuccess from "../fixtures/mocks/check-3ds-version-success";
import initiateAuthenticationFrictionlessAuthenticationFailed from "../fixtures/mocks/initiate-authentication-frictionless-authentication-failed";
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
  initiateAuthenticationFrictionlessAuthenticationFailed,
);

export default mocks;
