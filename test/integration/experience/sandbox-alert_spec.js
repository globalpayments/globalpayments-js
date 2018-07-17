import { visit } from "../../support/helpers";

describe("experience - sandbox alert", () => {
  describe("production", () => {
    beforeEach(() => {
      visit("heartland/sandbox-alert-prod");
    });

    it("doesn't show alert", () => {
      cy.get("#form > .sandbox-warning").should("not.exist");
    });
  });

  describe("non-production", () => {
    beforeEach(() => {
      visit("heartland/sandbox-alert-non-prod");
    });

    it("shows alert", () => {
      cy.get("#form > .sandbox-warning").should("exist");
    });
  });
});
