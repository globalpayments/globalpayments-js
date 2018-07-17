import {
  assertTokenError,
  assertTokenSuccess,
  click,
  enter,
  shouldHaveValue,
  visit,
} from "../../support/helpers";

describe("experience - formatting", () => {
  beforeEach(() => {
    visit("heartland/card");
  });

  it("formats card numbers", () => {
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(shouldHaveValue("4242 42"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("2"));
    cy.get("#cardNumber > iframe").then(shouldHaveValue("4242 4242 4242 4242"));
    cy.get("#cardNumber > iframe").then(enter("{backspace}"));
    cy.get("#cardNumber > iframe").then(shouldHaveValue("4242 4242 4242 424"));
  });

  it("formats gift card numbers", () => {
    cy.get("#cardNumber > iframe").then(enter("5"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("4"));
    cy.get("#cardNumber > iframe").then(enter("9"));
    cy.get("#cardNumber > iframe").then(enter("9"));
    cy.get("#cardNumber > iframe").then(shouldHaveValue("5044 99"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("0"));
    cy.get("#cardNumber > iframe").then(enter("1"));
    cy
      .get("#cardNumber > iframe")
      .then(shouldHaveValue("5044 9900 0000 0000 001"));
    cy.get("#cardNumber > iframe").then(enter("{backspace}"));
    cy
      .get("#cardNumber > iframe")
      .then(shouldHaveValue("5044 9900 0000 0000 00"));
  });

  it("formats expiration dates", () => {
    cy.get("#cardExpiration > iframe").then(enter("1"));
    cy.get("#cardExpiration > iframe").then(shouldHaveValue("1"));
    cy.get("#cardExpiration > iframe").then(enter("2"));
    cy.get("#cardExpiration > iframe").then(shouldHaveValue("12 / "));
    cy.get("#cardExpiration > iframe").then(enter("34"));
    cy.get("#cardExpiration > iframe").then(shouldHaveValue("12 / 34"));
    cy.get("#cardExpiration > iframe").then(enter("{backspace}"));
    cy.get("#cardExpiration > iframe").then(shouldHaveValue("12 / 3"));
  });
});
