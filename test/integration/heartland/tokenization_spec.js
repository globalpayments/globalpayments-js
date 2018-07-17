import {
  assertTokenError,
  assertCardTokenSuccess,
  assertCardTrackTokenSuccess,
  assertAchTokenSuccess,
  assertGiftTokenSuccess,
  click,
  enter,
  visit,
} from "../../support/helpers";

describe("heartland - tokenization", () => {
  describe("card", () => {
    beforeEach(() => {
      visit("heartland/card");
    });

    it("tokenizes card without error", () => {
      cy.get("#cardNumber > iframe").then(enter("4111111111111111"));
      cy.get("#cardExpiration > iframe").then(enter("12 / 2025"));
      cy.get("#cardCvv > iframe").then(enter("123"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertCardTokenSuccess);
    });

    it("fails to tokenize with bad data", () => {
      cy.get("#cardNumber > iframe").then(enter("a"));
      cy.get("#cardSubmit > iframe").then(click());

      cy.get("#testResult").then(assertTokenError);
    });
  });

  describe("card-dropin", () => {
    beforeEach(() => {
      visit("heartland/card-dropin");
    });

    it("tokenizes card without error", () => {
      cy
        .get("#credit-card-card-number > iframe")
        .then(enter("4111111111111111"));
      cy.get("#credit-card-card-expiration > iframe").then(enter("12 / 2025"));
      cy.get("#credit-card-card-cvv > iframe").then(enter("123"));
      cy.get("#credit-card-submit > iframe").then(click());

      cy.get("#testResult").then(assertCardTokenSuccess);
    });

    it("fails to tokenize with bad data", () => {
      cy.get("#credit-card-card-number > iframe").then(enter("a"));
      cy.get("#credit-card-submit > iframe").then(click());

      cy.get("#testResult").then(assertTokenError);
    });
  });

  describe("card track", () => {
    beforeEach(() => {
      visit("heartland/card-track");
    });

    it("tokenizes card without error", () => {
      cy.get("#cardTrack > iframe").then(click());
      cy
        .get("#cardTrack > iframe")
        .then(
          enter(
            "<E1050311%B4005550000004460^VISA TEST CARD^25120000000000000000000?" +
              "|BgEFUVUE+F6UQ4qmYeYCW4WYnFPkBqdlKTZoXIXYbDc+JAG6Ny87hoVs|+++++++" +
              "098f/Gjar|11;4005550000004460=2512000000000000000?|yTVSGj5FpKgp5D" +
              "VpMGMeJ9ptfo|+++++++098f/Gjar|00|||/wECAQECAoFGAgEH4gQQTDT6jRZwb3" +
              "NAc2VjdXJlZXhjaGFuZ2UubmV0UoCSdUS4sUASsOv/ON+UFscI1lNhf8/cMOU+Ppa" +
              "uYy/WU9QtSmKpTaZC9CZpMZmqAebOfNdzB2hhLGqKxm/DQAZrIVgWIoZX4JIEwP6l" +
              "8cUegCuNBldbrE2fD5Sr2dKZhpXLcfVP/0Ht1iF4/tHzPAaRWQvEUBFjaX/pGQGNA" +
              "z4Auq2C6sC/5joVahowUt66J0LWhjOm9p+rBNYm67vZLVZHxRqI|>{enter}",
            "#secure-payment-field-data",
          ),
        );

      cy.get("#testResult").then(assertCardTrackTokenSuccess);
    });
  });

  describe("ach", () => {
    beforeEach(() => {
      visit("heartland/ach");
    });

    it("tokenizes account without error", () => {
      cy.get("#accountNumber > iframe").then(enter("12345678"));
      cy.get("#routingNumber > iframe").then(enter("123456789"));
      cy.get("#achSubmit > iframe").then(click());

      cy.get("#testResult").then(assertAchTokenSuccess);
    });
  });

  describe("ach-dropin", () => {
    beforeEach(() => {
      visit("heartland/ach-dropin");
    });

    it("tokenizes account without error", () => {
      cy.get("#echeck-account-number > iframe").then(enter("12345678"));
      cy.get("#echeck-routing-number > iframe").then(enter("123456789"));
      cy.get("#echeck-submit > iframe").then(click());

      cy.get("#testResult").then(assertAchTokenSuccess);
    });
  });

  describe("gift", () => {
    beforeEach(() => {
      visit("heartland/gift");
    });

    it("tokenizes card without error", () => {
      cy.get("#giftNumber > iframe").then(enter("5022440000000000001"));
      cy.get("#giftSubmit > iframe").then(click());

      cy.get("#testResult").then(assertGiftTokenSuccess);
    });
  });

  describe("gift-dropin", () => {
    beforeEach(() => {
      visit("heartland/gift-dropin");
    });

    it("tokenizes card without error", () => {
      cy
        .get("#gift-and-loyalty-card-number > iframe")
        .then(enter("5022440000000000001"));
      cy.get("#gift-and-loyalty-submit > iframe").then(click());

      cy.get("#testResult").then(assertGiftTokenSuccess);
    });
  });
});
