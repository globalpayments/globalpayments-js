import {
  click,
  enter,
  shouldHaveStyle,
  shouldNotHaveStyle,
  visit,
} from "../../support/helpers";

describe("experience - styles", () => {
  beforeEach(() => {
    visit("heartland/card-styled");
  });

  it("applies styles to a single form", () => {
    cy
      .get("#cardNumber > iframe")
      .then(shouldHaveStyle("background-color", "rgb(255, 0, 0)"));
    cy
      .get("#cardExpiration > iframe")
      .then(shouldHaveStyle("background-color", "rgb(255, 0, 0)"));
    cy
      .get("#cardCvv > iframe")
      .then(shouldHaveStyle("background-color", "rgb(255, 0, 0)"));
    cy
      .get("#cardSubmit > iframe")
      .then(shouldHaveStyle("background-color", "rgb(255, 0, 0)"));

    cy
      .get("#cardNumber > iframe")
      .then(shouldHaveStyle("border-top-color", "rgb(255, 0, 0)"));
    cy
      .get("#cardExpiration > iframe")
      .then(shouldNotHaveStyle("border-top-color", "rgb(255, 0, 0)")); // default
    cy
      .get("#cardCvv > iframe")
      .then(shouldNotHaveStyle("border-top-color", "rgb(255, 0, 0)")); // default
    cy
      .get("#cardSubmit > iframe")
      .then(shouldNotHaveStyle("border-top-color", "rgb(255, 0, 0)")); // default
  });
});
