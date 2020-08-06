import {
  click,
  enter,
  visit,
} from "../../support/helpers";

describe("openedge - tokenization", () => {
  describe("card", () => {
    beforeEach(() => {
      visit("openedge/card");
    });

    it("renders fields that are hosted by OpenEdge", () => {
      cy.get("#cardSubmit > iframe").should('have.attr', 'src').and('include', 'paygateway.com/secure_payment');
    });

    it("tokenizes card without error", () => {
      cy.get("#cardNumber > iframe").then(enter("4111111111111111"));
      cy.get("#cardExpiration > iframe").then(enter("12 / 2025"));
      cy.get("#cardCvv > iframe").then(enter("123"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(($json) => {
        assert.isOk($json);

        const result = JSON.parse($json.val());

        assert.isOk(result);
        assert.isOk(result.temporary_token);
        assert.isOk(result.card);
        assert.isOk(result.card.expiry_year);
        assert.isOk(result.card.type);
        assert.isOk(result.card.masked_card_number);
        assert.isNotOk(result.error);
      });
    });

    it("fails to tokenize with bad data", () => {
      cy.get("#cardNumber > iframe").then(enter("a"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(($json) => {
        assert.isOk($json);

        const result = JSON.parse($json.val());

        assert.isOk(result);
        assert.isOk(result.error);
        assert.isNotOk(result.paymentReference);
        assert.isNotOk(result.temporary_token);
      });
    });
  });
});