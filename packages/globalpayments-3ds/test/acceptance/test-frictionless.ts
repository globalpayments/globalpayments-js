import {
  getIframe,
  getInitiateAuthenticationData,
  getVersionCheckData,
} from "../helpers/data";
import frictionlessAuthenticationFailedMocks from "../mocks/frictionless-authentication-failed";
import frictionlessAuthenticationSuccessfulMocks from "../mocks/frictionless-authentication-successful";
// tslint:disable-next-line:max-line-length
import frictionlessAuthenticationSuccessfulCrossOriginMocks from "../mocks/frictionless-authentication-successful-cross-origin";

const expectFrictionlessResponseWithStatus = (status: string) => {
  return async (t) => {
    await t.click("#start");

    // version check should succeed
    const versionCheckData = await getVersionCheckData();
    await t.expect(versionCheckData.error).typeOf("undefined");

    // initiate authentication should succeed
    const initiateAuthenticationData = await getInitiateAuthenticationData();
    await t.expect(initiateAuthenticationData.error).typeOf("undefined");
    await t.expect(initiateAuthenticationData.status).eql(status);
    await t.expect(initiateAuthenticationData.challenge).typeOf("undefined");

    // no challenge iframe should exist
    await t.expect(getIframe().exists).notOk();
  };
};

fixture("Frictionless - Simple").page(
  "http://localhost:7778/test/fixtures/test-site/simple-payment-page-lightbox.html",
);

test.requestHooks(frictionlessAuthenticationSuccessfulMocks)(
  "Authentication Successful",
  expectFrictionlessResponseWithStatus("AUTHENTICATION_SUCCESSFUL"),
);

test.requestHooks(frictionlessAuthenticationFailedMocks)(
  "Authentication Failed",
  expectFrictionlessResponseWithStatus("AUTHENTICATION_FAILED"),
);

test
  .requestHooks(frictionlessAuthenticationSuccessfulCrossOriginMocks)
  .page(
    "http://localhost:7778/test/fixtures/test-site/simple-payment-page-lightbox-cross-origin.html",
  )(
  "Cross Origin Authentication Successful",
  expectFrictionlessResponseWithStatus("AUTHENTICATION_SUCCESSFUL"),
);

fixture("Frictionless - Minimal").page(
  "http://localhost:7778/test/fixtures/test-site/minimal-payment-page-lightbox.html",
);

test.requestHooks(frictionlessAuthenticationSuccessfulMocks)(
  "Authentication Successful",
  expectFrictionlessResponseWithStatus("AUTHENTICATION_SUCCESSFUL"),
);

test.requestHooks(frictionlessAuthenticationFailedMocks)(
  "Authentication Failed",
  expectFrictionlessResponseWithStatus("AUTHENTICATION_FAILED"),
);
