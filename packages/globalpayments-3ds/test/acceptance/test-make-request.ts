import { getVersionCheckData } from "../helpers/data";
import mocks from "../mocks/make-request";

fixture("Unit - makeRequest");

test
  .page(
    "http://localhost:7778/test/fixtures/test-site/make-request-success-enrolled.html",
  )
  .requestHooks(mocks)("Request Successful - Card enrolled", async (t) => {
  await t.click("#start");

  // version check should succeed
  const versionCheckData = await getVersionCheckData();

  await t.expect(versionCheckData.error).typeOf("undefined");
  await t.expect(versionCheckData.enrolled).eql(true);
});

test
  .page(
    "http://localhost:7778/test/fixtures/test-site/make-request-success-not-enrolled.html",
  )
  .requestHooks(mocks)("Request Successful - Card not enrolled", async (t) => {
  await t.click("#start");

  // version check should fail
  const versionCheckData = await getVersionCheckData();

  await t.expect(versionCheckData.error).eql(true);
  await t.expect(versionCheckData.reasons.length).eql(1);
  await t.expect(versionCheckData.reasons[0].code).eql("Error");
  await t.expect(versionCheckData.reasons[0].message).eql("Card not enrolled");
});

test
  .page(
    "http://localhost:7778/test/fixtures/test-site/make-request-client-error.html",
  )
  .requestHooks(mocks)("Request results in client error", async (t) => {
  await t.click("#start");

  // version check should fail
  const versionCheckData = await getVersionCheckData();

  await t.expect(versionCheckData.error).eql(true);
  await t.expect(versionCheckData.reasons.length).eql(3);
  await t.expect(versionCheckData.reasons[2].code).eql("400");
  await t.expect(versionCheckData.reasons[2].message).eql(`{"error":"error"}`);
});

test
  .page(
    "http://localhost:7778/test/fixtures/test-site/make-request-server-error.html",
  )
  .requestHooks(mocks)("Request results in server error", async (t) => {
  await t.click("#start");

  // version check should fail
  const versionCheckData = await getVersionCheckData();

  await t.expect(versionCheckData.error).eql(true);
  await t.expect(versionCheckData.reasons.length).eql(3);
  await t.expect(versionCheckData.reasons[2].code).eql("500");
  await t.expect(versionCheckData.reasons[2].message).eql(`{"error":"error"}`);
});
