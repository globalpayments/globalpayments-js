import {
  assertTokenError,
  assertCardTokenSuccess,
  click,
  enter,
  visit,
} from "../../support/helpers";

describe("genius - tokenization", () => {
  describe("card", () => {
    beforeEach(() => {
      visit("genius/card");
    });

    it("tokenizes card without error", () => {
      cy.get("#cardNumber > iframe").then(enter("4111111111111111"));
      cy.get("#cardExpiration > iframe").then(enter("12 / 2025"));
      cy.get("#cardCvv > iframe").then(enter("123"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertCardTokenSuccess);
    });

    it("fails to tokenize with bad data", () => {
      cy.get("#cardNumber > iframe").then(enter("a"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertTokenError);
    });
  });
});
