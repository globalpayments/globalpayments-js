import {
  assertTokenError,
  assertCardTokenSuccess,
  visit,
  getIframeBody,
  type,
  cardDropinClick,
  shouldHaveValueCardDropin,
  shouldHaveAttributeCardDropin
} from "../../support/helpers";

describe("card-holder-name validation", () => {
  beforeEach(() => {
    visit("gp-api/card-dropin");
    cy.wait(1000);
  });

  it("correct card holder name", () => {

    type(getIframeBody('credit-card-card-number-target'), "4111111111111111");
    type(getIframeBody('credit-card-card-expiration-target'), "12 / 2025");
    type(getIframeBody('credit-card-card-cvv-target'), "123");
    type(getIframeBody('credit-card-card-holder-name-target'), "Jane Smith")

    cardDropinClick();

    cy.get("#testResult").then(assertCardTokenSuccess);
  });

  it("too large card holder name", () => {

    type(getIframeBody('credit-card-card-number-target'), "4111111111111111");
    type(getIframeBody('credit-card-card-expiration-target'), "12 / 2025");
    type(getIframeBody('credit-card-card-cvv-target'), "123");
    type(getIframeBody('credit-card-card-holder-name-target'), "ABCDEFGHIJKLMNOPQRSTUVWXYZAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZAAABBBCCCDDDEEEFFFGGGHHHJJJIIIK")

    cardDropinClick();

    cy.get("#testResult").then(assertTokenError);
  });

});

describe("pasting-data", () => {
  beforeEach(() => {
    visit("gp-api/card-dropin");
    cy.wait(1000);
  });

  it("allow pasting data", () => {
    type(getIframeBody('credit-card-card-number-target'), "{ctrl+v}4111111111111111");
    type(getIframeBody('credit-card-card-expiration-target'), "{ctrl+v}12 / 2025");
    type(getIframeBody('credit-card-card-cvv-target'), "{ctrl+v}123");
    type(getIframeBody('credit-card-card-holder-name-target'), "{ctrl+v}Jane Doe");

    shouldHaveValueCardDropin(getIframeBody('credit-card-card-number-target'), '4111 1111 1111 1111');
    shouldHaveValueCardDropin(getIframeBody('credit-card-card-expiration-target'), '12 / 2025');
    shouldHaveValueCardDropin(getIframeBody('credit-card-card-cvv-target'), '123');
    shouldHaveValueCardDropin(getIframeBody('credit-card-card-holder-name-target'), 'Jane Doe');
  });
});

describe("amex-behaviour", () => {
  beforeEach(() => {
    visit("gp-api/card-dropin");
    cy.wait(1000);
  });

  it("placeholder and lneg of cvv", () => {
    type(getIframeBody('credit-card-card-number-target'), "374101000000608");
    
    shouldHaveAttributeCardDropin(getIframeBody('credit-card-card-cvv-target'), "placeholder", '••••');
    shouldHaveAttributeCardDropin(getIframeBody('credit-card-card-cvv-target'), "maxlength", '4');
  });
});

describe("inputs-edition", () => {
  beforeEach(() => {
    visit("gp-api/card-dropin");
    cy.wait(1000);
  });

  it("editing inputs when some / all text is selected", () => {
    type(getIframeBody('credit-card-card-cvv-target'), "123");
    type(getIframeBody('credit-card-card-cvv-target'), "{selectall}456");
    shouldHaveValueCardDropin(getIframeBody('credit-card-card-cvv-target'), '456');
    type(getIframeBody('credit-card-card-cvv-target'), "{selectall}{backspace}");
    shouldHaveValueCardDropin(getIframeBody('credit-card-card-cvv-target'), '');
  });
});
