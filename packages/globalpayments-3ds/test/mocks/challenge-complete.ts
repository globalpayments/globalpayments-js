// tslint:disable:max-line-length
import { RequestMock } from "testcafe";

import challengeAcs from "../fixtures/mocks/challenge-acs";
import challengeNotificationComplete from "../fixtures/mocks/challenge-notification-complete";
import check3dsVersionSuccess from "../fixtures/mocks/check-3ds-version-success";
import initiateAuthenticationChallenge from "../fixtures/mocks/initiate-authentication-challenge";
import methodNotificationComplete from "../fixtures/mocks/method-notification-complete";
import {
  successfulHtmlResponse,
  successfulJsonResponse,
  // successfulRedirectResponse,
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
  initiateAuthenticationChallenge,
);
successfulHtmlResponse(mocks, /\/acs\/challenge/, challengeAcs);
successfulHtmlResponse(
  mocks,
  /\/3ds2\/challengeNotification/,
  challengeNotificationComplete,
);

export default mocks;
