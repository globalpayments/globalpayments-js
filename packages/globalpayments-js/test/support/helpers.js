export const assertCardTokenSuccess = ($json) => {
  assert.isOk($json);

  const result = JSON.parse($json.val());

  assert.isOk(result);
  assert.isOk(result.paymentReference);
  assert.isOk(result.details);
  assert.isOk(result.details.cardBin);
  assert.isOk(result.details.cardNumber);
  assert.strictEqual(result.details.cardSecurityCode, true);
  assert.isOk(result.details.cardType);
  assert.isOk(result.details.cardLast4);
  assert.isOk(result.details.expiryMonth);
  assert.isOk(result.details.expiryYear);
  assert.isNotOk(result.error);
};

export const assertCardTrackTokenSuccess = ($json) => {
  assert.isOk($json);

  const result = JSON.parse($json.val());

  assert.isOk(result);
  assert.isOk(result.paymentReference);
  assert.isOk(result.details);
  assert.isOk(result.details.cardNumber);
  assert.isNotOk(result.details.cardSecurityCode);
  assert.isOk(result.details.cardType);
  assert.isNotOk(result.error);
};

export const assertAchTokenSuccess = ($json) => {
  assert.isOk($json);

  const result = JSON.parse($json.val());

  assert.isOk(result);
  assert.isOk(result.paymentReference);
  assert.isOk(result.details);
  assert.isOk(result.details.accountNumber);
  assert.isOk(result.details.accountLast4);
  assert.isNotOk(result.error);
};

export const assertGiftTokenSuccess = ($json) => {
  assert.isOk($json);

  const result = JSON.parse($json.val());

  assert.isOk(result);
  assert.isOk(result.paymentReference);
  assert.isOk(result.details);
  assert.isOk(result.details.cardBin);
  assert.isOk(result.details.cardNumber);
  assert.isNotOk(result.details.cardSecurityCode);
  assert.isOk(result.details.cardType);
  assert.isOk(result.details.cardLast4);
  assert.isNotOk(result.error);
};

export const assertTokenError = ($json) => {
  assert.isOk($json);

  const result = JSON.parse($json.val());

  assert.isOk(result);
  assert.isOk(result.error);
  assert.isNotOk(result.paymentReference);
  assert.isOk(result.reasons);
  assert.notEqual(result.reasons.length, 0);
};

export const visit = (runner) => {
  cy.visit("http://localhost:7777/test/fixtures/" + runner + "/runner.html");
};

export const enter = (content, selector) => {
  if (!selector) {
    selector = "#secure-payment-field";
  }
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find(selector)
      .type(content, { force: true });
  };
};

export const click = () => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .click();
  };
};

export const shouldHaveClass = (klass) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("have.class", klass);
  };
};

export const shouldNotHaveClass = (klass) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("not.have.class", klass);
  };
};

export const shouldHaveValue = (value) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("have.value", value);
  };
};

export const shouldNotHaveValue = (value) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("not.have.value", value);
  };
};

export const shouldHaveStyle = (prop, value) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("have.css", prop, value);
  };
};

export const shouldNotHaveStyle = (prop, value) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("not.have.css", prop, value);
  };
};

export const shouldHaveAttribute = (attr, value) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("have.attr", attr, value);
  };
};

export const shouldHaveText = (value) => {
  return (frame) => {
    cy
      .wrap(frame.contents().find("body"))
      .find("#secure-payment-field")
      .should("have.text", value);
  };
};
