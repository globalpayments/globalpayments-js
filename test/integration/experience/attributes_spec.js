import {
  shouldHaveAttribute,
  shouldHaveText,
  visit,
} from "../../support/helpers";

describe("experience - attributes", () => {
  beforeEach(() => {
    visit("heartland/card-attributes");
  });

  it("sets placeholders", () => {
    cy
      .get("#cardNumber > iframe")
      .then(shouldHaveAttribute("placeholder", "•••• •••• •••• ••••"));
    cy
      .get("#cardExpiration > iframe")
      .then(shouldHaveAttribute("placeholder", "MM / YYYY"));
    cy.get("#cardCvv > iframe").then(shouldHaveAttribute("placeholder", "•••"));
  });

  it("sets initial values", () => {
    cy
      .get("#cardNumber > iframe")
      .then(shouldHaveAttribute("value", "4111 1111 1111 1111"));
    cy
      .get("#cardExpiration > iframe")
      .then(shouldHaveAttribute("value", "12 / 2025"));
    cy.get("#cardCvv > iframe").then(shouldHaveAttribute("value", "123"));
  });

  it("sets initial text", () => {
    cy.get("#cardSubmit > iframe").then(shouldHaveText("Place Order"));
  });

  it("sets initial input types", () => {
    cy.get("#cardHolder > iframe").then(shouldHaveAttribute("type", "text"));
    cy.get("#cardNumber > iframe").then(shouldHaveAttribute("type", "tel"));
    cy.get("#cardExpiration > iframe").then(shouldHaveAttribute("type", "tel"));
    cy.get("#cardCvv > iframe").then(shouldHaveAttribute("type", "tel"));
    cy.get("#cardSubmit > iframe").then(shouldHaveAttribute("type", "button"));
  });
});
