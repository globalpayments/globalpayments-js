import {
  assertTokenError,
  assertCardTokenSuccess,
  click,
  enter,
  visit,
} from "../../support/helpers";

describe("gp-api - tokenization", () => {
  describe("card", () => {
    beforeEach(() => {
      visit("gp-api/card");
      cy.wait(1000);
    });

    it("tokenizes card without error", () => {
      cy.get("#cardNumber > iframe").then(enter("4111111111111111"));
      cy.get("#cardExpiration > iframe").then(enter("12 / 2025"));
      cy.get("#cardCvv > iframe").then(enter("123"));
      cy.get("#cardHolder > iframe").then(enter("Jane Smith"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertCardTokenSuccess);
    });

    it("fails to tokenize with bad data", () => {
      cy.get("#cardNumber > iframe").then(enter("a"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertTokenError);
    });
  });

  describe("card-dropin", () => {
    beforeEach(() => {
      visit("gp-api/card-dropin");
      cy.wait(1000);
    });

    it("tokenizes card without error", () => {
      cy.get("#credit-card-card-holder-name > iframe").then(enter("Jane Smith"));
      cy
        .get("#credit-card-card-number > iframe")
        .then(enter("4111111111111111"));
      cy.get("#credit-card-card-expiration > iframe").then(enter("12 / 2025"));
      cy.get("#credit-card-card-cvv > iframe").then(enter("123"));
      cy.get("#credit-card-submit > iframe").then(click());

      cy.get("#testResult").then(assertCardTokenSuccess);
    });

    it("fails to tokenize with bad data", () => {
      cy.get("#credit-card-card-number > iframe").then(enter("a"));
      cy.get("#credit-card-submit > iframe").then(click());

      cy.get("#testResult").then(assertTokenError);
    });
  });
});
