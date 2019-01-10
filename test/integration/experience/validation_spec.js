import {
  enter,
  shouldHaveClass,
  shouldNotHaveClass,
  visit,
} from "../../support/helpers";

describe("experience - validation", () => {
  beforeEach(() => {
    visit("heartland/card");
  });

  it("validates card numbers", () => {
    cy.get("#cardNumber > iframe").then(enter("411111"));
    cy.get("#cardNumber > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardNumber > iframe").then(shouldHaveClass("possibly-valid"));
    cy.get("#cardNumber > iframe").then(enter("1111111111"));
    cy.get("#cardNumber > iframe").then(shouldHaveClass("valid"));
    cy.get("#cardNumber > iframe").then(shouldNotHaveClass("possibly-valid"));
    cy.get("#cardNumber > iframe").then(enter("{backspace}"));
    cy.get("#cardNumber > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardNumber > iframe").then(shouldHaveClass("possibly-valid"));
  });

  it("validates expiration dates", () => {
    cy.get("#cardExpiration > iframe").then(enter("1"));
    cy.get("#cardExpiration > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardExpiration > iframe").then(shouldHaveClass("possibly-valid"));
    cy.get("#cardExpiration > iframe").then(enter("22025"));
    cy.get("#cardExpiration > iframe").then(shouldHaveClass("valid"));
    cy
      .get("#cardExpiration > iframe")
      .then(shouldNotHaveClass("possibly-valid"));
    cy.get("#cardExpiration > iframe").then(enter("{backspace}"));
    cy.get("#cardExpiration > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardExpiration > iframe").then(shouldHaveClass("possibly-valid"));
  });

  it("validates security codes", () => {
    cy.get("#cardCvv > iframe").then(enter("12"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("3"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("valid"));
    cy.get("#cardCvv > iframe").then(shouldNotHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("{backspace}"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("4"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("valid"));
    // prevents more than four characters from being entered
    cy.get("#cardCvv > iframe").then(enter("56"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("valid"));

    // non-amex
    cy.get("#cardNumber > iframe").then(enter("4111"));
    cy.get("#cardCvv > iframe").then(enter("{selectall}{backspace}"));
    cy.get("#cardCvv > iframe").then(enter("12"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("3"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("valid"));
    cy.get("#cardCvv > iframe").then(shouldNotHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("{backspace}"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("possibly-valid"));

    // amex
    cy.get("#cardNumber > iframe").then(enter("{selectall}{backspace}"));
    cy.get("#cardNumber > iframe").then(enter("3700"));
    cy.get("#cardCvv > iframe").then(enter("{selectall}{backspace}"));
    cy.get("#cardCvv > iframe").then(enter("12"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("3"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("4"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("valid"));
    cy.get("#cardCvv > iframe").then(shouldNotHaveClass("possibly-valid"));
    cy.get("#cardCvv > iframe").then(enter("{backspace}"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("invalid"));
    cy.get("#cardCvv > iframe").then(shouldHaveClass("possibly-valid"));
  });
});
