import { assertCardTokenSuccess, visit } from "../../support/helpers";

// A browser AutoFill pass writes a field's value directly and dispatches only
// `input` / `change`. It never produces a keyboard event and never focuses the
// field, so the combined `card-expiration` field keeps whatever separator the
// browser used instead of the " / " it formats itself with.
//
// Chromium does not fill cross-origin frames, so the only value it writes goes
// into the library's own hidden relay inputs in the `card-number` frame, which
// reach the expiration field through `set-value` and get formatted on the way
// in. WebKit fills the real hosted field inputs directly, so the value arrives
// unformatted. Tokenization has to cope with both.

// The fixture fetches an access token before it renders, so wait for the frames
// to hold a field before reading their contents.
const waitForFields = () =>
  ["#cardNumber", "#cardExpiration", "#cardCvv", "#cardHolder", "#cardSubmit"].forEach(
    (target) => {
      cy.get(target + " > iframe").should((frame) => {
        expect(frame.contents().find("#secure-payment-field")).to.have.lengthOf(1);
      });
    },
  );

const input = (target) =>
  cy.get(target + " > iframe").then((frame) => frame.contents().find("#secure-payment-field"));

const autofill = (target, value, withChange) =>
  input(target).then(($el) => {
    const el = $el.get(0);
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    if (withChange !== false) {
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

const autofillCard = (expiration, withChange) => {
  autofill("#cardNumber", "4111111111111111", withChange);
  autofill("#cardExpiration", expiration, withChange);
  autofill("#cardCvv", "123", withChange);
  autofill("#cardHolder", "Jane Smith", withChange);
};

describe("gp-api - autofill", () => {
  beforeEach(() => {
    visit("gp-api/card-autofill");
    waitForFields();
  });

  const formats = [
    ["12/2029", "12 / 2029"],
    ["12/29", "12 / 2029"],
    ["1229", "12 / 2029"],
    ["12-2029", "12 / 2029"],
    ["7/29", "07 / 2029"],
  ];

  formats.forEach(([value, formatted]) => {
    it(`tokenizes an expiration autofilled as "${value}"`, () => {
      autofillCard(value);

      input("#cardExpiration").should("have.value", formatted);
      input("#cardExpiration").should("have.class", "valid");

      input("#cardSubmit").click({ force: true });

      cy.get("#testResult").then(assertCardTokenSuccess);
    });
  });

  it("tokenizes an expiration the field never had a chance to format", () => {
    autofillCard("12/2029", false);

    // Without a `change` event the value is still unformatted, which must not
    // stop the expiration from reaching the tokenization request.
    input("#cardExpiration").should("have.value", "12/2029");

    input("#cardSubmit").click({ force: true });

    cy.get("#testResult").then(assertCardTokenSuccess);
  });
});
