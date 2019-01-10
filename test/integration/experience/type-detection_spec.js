import {
  enter,
  shouldHaveClass,
  shouldNotHaveClass,
  visit,
} from "../../support/helpers";

describe("experience - type-detection", () => {
  describe("card", () => {
    beforeEach(() => {
      visit("heartland/card");
    });

    it("defers to unknown on no match", () => {
      cy.get("#cardNumber > iframe").then(enter("999"));
      cy
        .get("#cardNumber > iframe")
        .then(shouldNotHaveClass("card-type-unknown"));
      cy.get("#cardNumber > iframe").then(enter("1"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-unknown"));
      cy.get("#cardNumber > iframe").then(enter("111111111111"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-unknown"));
    });

    it("detects visa", () => {
      cy.get("#cardNumber > iframe").then(enter("411"));
      cy.get("#cardNumber > iframe").then(shouldNotHaveClass("card-type-visa"));
      cy.get("#cardNumber > iframe").then(enter("1"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-visa"));
      cy.get("#cardNumber > iframe").then(enter("111111111111"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-visa"));
    });

    it("detects mastercard", () => {
      cy.get("#cardNumber > iframe").then(enter("545"));
      cy
        .get("#cardNumber > iframe")
        .then(shouldNotHaveClass("card-type-mastercard"));
      cy.get("#cardNumber > iframe").then(enter("4"));
      cy
        .get("#cardNumber > iframe")
        .then(shouldHaveClass("card-type-mastercard"));
      cy.get("#cardNumber > iframe").then(enter("111111111111"));
      cy
        .get("#cardNumber > iframe")
        .then(shouldHaveClass("card-type-mastercard"));
    });

    it("detects amex", () => {
      cy.get("#cardNumber > iframe").then(enter("371"));
      cy.get("#cardNumber > iframe").then(shouldNotHaveClass("card-type-amex"));
      cy.get("#cardNumber > iframe").then(enter("1"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-amex"));
      cy.get("#cardNumber > iframe").then(enter("111111111111"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-amex"));
    });

    it("detects discover", () => {
      cy.get("#cardNumber > iframe").then(enter("601"));
      cy
        .get("#cardNumber > iframe")
        .then(shouldNotHaveClass("card-type-discover"));
      cy.get("#cardNumber > iframe").then(enter("1"));
      cy
        .get("#cardNumber > iframe")
        .then(shouldHaveClass("card-type-discover"));
      cy.get("#cardNumber > iframe").then(enter("111111111111"));
      cy
        .get("#cardNumber > iframe")
        .then(shouldHaveClass("card-type-discover"));
    });

    it("detects jcb", () => {
      cy.get("#cardNumber > iframe").then(enter("351"));
      cy.get("#cardNumber > iframe").then(shouldNotHaveClass("card-type-jcb"));
      cy.get("#cardNumber > iframe").then(enter("1"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-jcb"));
      cy.get("#cardNumber > iframe").then(enter("111111111111"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-jcb"));
    });

    it("alerts form's cvv of card type", () => {
      cy.get("#cardNumber > iframe").then(enter("371"));
      cy.get("#cardNumber > iframe").then(shouldNotHaveClass("card-type-amex"));
      cy.get("#cardCvv > iframe").then(shouldNotHaveClass("card-type-amex"));
      cy.get("#cardNumber > iframe").then(enter("1"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-amex"));
      cy.get("#cardCvv > iframe").then(shouldHaveClass("card-type-amex"));

      cy.get("#cardNumber > iframe").then(enter("{selectall}{backspace}400"));
      cy.get("#cardNumber > iframe").then(shouldNotHaveClass("card-type-visa"));
      cy.get("#cardCvv > iframe").then(shouldNotHaveClass("card-type-visa"));
      cy.get("#cardNumber > iframe").then(enter("0"));
      cy.get("#cardNumber > iframe").then(shouldHaveClass("card-type-visa"));
      cy.get("#cardCvv > iframe").then(shouldHaveClass("card-type-visa"));
    });
  });
});
