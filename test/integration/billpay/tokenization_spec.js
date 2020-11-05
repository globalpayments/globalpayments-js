import {
  assertTokenError,
  assertCardTokenSuccess,
  assertAchTokenSuccess,
  click,
  enter,
  visit,
} from "../../support/helpers";

describe("billpay - tokenization", () => {
  describe("card", () => {
    beforeEach(() => {
      visit("billpay/card");
    });

    it("tokenizes card without error", () => {
      cy.get("#cardNumber > iframe").then(enter("4111111111111111"));
      cy.get("#cardExpiration > iframe").then(enter("12 / 2025"));
      cy.get("#cardCvv > iframe").then(enter("123"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertCardTokenSuccess);
    });

    it("fails to tokenize with bad data - card number", () => {
      cy.get("#cardNumber > iframe").then(enter("a"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertTokenError);
    });
  });

  describe("ach", () => {
    beforeEach(() => {
      visit("billpay/ach");
    });

    it("tokenizes account without error", () => {
      cy.get("#accountNumber > iframe").then(enter("1357902468"));	
      cy.get("#routingNumber > iframe").then(enter("122000030"));
      cy.get("#achSubmit > iframe").then(click());

      cy.get("#testResult").then(assertAchTokenSuccess);
    });
  });
});
