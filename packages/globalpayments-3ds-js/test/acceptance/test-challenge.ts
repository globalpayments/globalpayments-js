import {
  getIframe,
  getInitiateAuthenticationData,
  getOverlay,
  getVersionCheckData,
} from "../helpers/data";
import challengeMocks from "../mocks/challenge-complete";

const expectSuccessfullyPromptedChallenge = (isLightbox: boolean) => {
  return async (t) => {
    await t.click("#start");

    // version check should succeed
    const versionCheckData = await getVersionCheckData();
    await t.expect(versionCheckData.error).typeOf("undefined");

    // challenge iframe should exist
    await t.expect(getIframe().exists).ok();
    await t.expect(getOverlay().exists)[isLightbox ? "ok" : "notOk"]();
    // confirm challenge
    await t
      .switchToIframe(getIframe())
      .click("input[type='submit']")
      .switchToMainWindow();

    // initiate authentication should succeed
    const initiateAuthenticationData = await getInitiateAuthenticationData();
    await t.expect(initiateAuthenticationData.error).typeOf("undefined");
    await t.expect(initiateAuthenticationData.status).eql("CHALLENGE_REQUIRED");
    await t.expect(initiateAuthenticationData.challenge.requestUrl).ok();
  };
};

const expectMissingEmbeddedChallengeTarget = async (t) => {
  await t.click("#start");

  // version check should fail
  const versionCheckData = await getVersionCheckData();
  await t.expect(versionCheckData.error).typeOf("undefined");

  // challenge iframe should exist
  await t.expect(getIframe().exists).notOk();
  await t.expect(getOverlay().exists).notOk();

  // initiate authentication should succeed
  const initiateAuthenticationData = await getInitiateAuthenticationData();
  await t.expect(initiateAuthenticationData.error).eql(true);
  await t.expect(initiateAuthenticationData.reasons).typeOf("Array");
  await t.expect(initiateAuthenticationData.reasons.length).eql(1);
  await t.expect(initiateAuthenticationData.reasons[0].code).eql("Error");
  await t
    .expect(initiateAuthenticationData.reasons[0].message)
    .eql("Embed target not found");
};

fixture("Challenge - Simple - lightbox").page(
  "http://localhost:8080/test/fixtures/test-site/simple-payment-page-lightbox.html",
);

test.requestHooks(challengeMocks)(
  "Challenge Prompted - success",
  expectSuccessfullyPromptedChallenge(true),
);

fixture("Challenge - Minimal - lightbox").page(
  "http://localhost:8080/test/fixtures/test-site/minimal-payment-page-lightbox.html",
);

test.requestHooks(challengeMocks)(
  "Challenge Prompted - success",
  expectSuccessfullyPromptedChallenge(true),
);

fixture("Challenge - Simple - embedded - string target");

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/simple-payment-page-embedded-string-target.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Prompted - success",
  expectSuccessfullyPromptedChallenge(false),
);

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/simple-payment-page-embedded-string-target-missing.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Not Prompted - missing target",
  expectMissingEmbeddedChallengeTarget,
);

fixture("Challenge - Minimal - embedded - string target");

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/minimal-payment-page-embedded-string-target.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Prompted - success",
  expectSuccessfullyPromptedChallenge(false),
);

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/minimal-payment-page-embedded-string-target-missing.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Not Prompted - missing target",
  expectMissingEmbeddedChallengeTarget,
);

fixture("Challenge - Simple - embedded - DOM target");

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/simple-payment-page-embedded-dom-target.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Prompted - success",
  expectSuccessfullyPromptedChallenge(false),
);

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/simple-payment-page-embedded-dom-target-missing.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Not Prompted - missing target",
  expectMissingEmbeddedChallengeTarget,
);

fixture("Challenge - Minimal - embedded - DOM target");

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/minimal-payment-page-embedded-dom-target.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Prompted - success",
  expectSuccessfullyPromptedChallenge(false),
);

test
  .page(
    "http://localhost:8080/test/fixtures/test-site/minimal-payment-page-embedded-dom-target-missing.html",
  )
  .requestHooks(challengeMocks)(
  "Challenge Not Prompted - missing target",
  expectMissingEmbeddedChallengeTarget,
);
