import {
  assertTokenError,
  assertTokenSuccess,
  click,
  enter,
  shouldHaveValue,
  visit,
} from "../../support/helpers";

describe("experience - disposal", () => {
  beforeEach(() => {
    visit("heartland/card-disposal");
  });

  it("should have no form elements after calling dispose", () => {
    cy.wait(500);
    cy
      .get("#cardNumber")
      .children()
      .should("have.length", 0);
    cy
      .get("#cardExpiration")
      .children()
      .should("have.length", 0);
    cy
      .get("#cardCvv")
      .children()
      .should("have.length", 0);
    cy
      .get("#cardSubmit")
      .children()
      .should("have.length", 0);
  });
});
