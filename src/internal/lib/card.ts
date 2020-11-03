import CardNumberFormatter from "../formatters/card-number";
import ExpirationFormatter from "../formatters/expiration";
import CardNumberValidator from "../validators/card-number";
import CvvValidator from "../validators/cvv";
import ExpirationValidator from "../validators/expiration";
import { typeByNumber } from "./card-types";
import Events from "./events";
import { postMessage } from "./post-message";

export default class Card {
  /**
   * addType
   *
   * Adds a class to the target element with the card type
   * inferred from the target"s current value.
   *
   * @param e
   */
  public static addType(e: Event) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const type = typeByNumber(target.value);
    const classList = target.className.split(" ");
    const length = classList.length;
    let i = 0;
    let c = "";

    for (i; i < length; i++) {
      c = classList[i];
      if (c && c.indexOf("card-type-") !== -1) {
        delete classList[i];
      }
    }

    if (type) {
      classList.push("card-type-" + type.code);

      const id = target.getAttribute("data-id");
      if (id) {
        postMessage.post(
          {
            data: { cardType: type.code },
            id,
            type: "ui:iframe-field:card-type",
          },
          "parent",
        );
      }
    }

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  /**
   * formatNumber
   *
   * Formats a target element"s value based on the
   * inferred card type"s formatting regex.
   *
   * @param e
   */
  public static formatNumber(e: Event) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;

    if (value.length === 0) {
      return;
    }

    const formatted = new CardNumberFormatter().format(value);
    target.value = formatted;

    if (!target.setSelectionRange) {
      return;
    }

    let cursor = target.selectionStart || 0;

    // copy and paste, space inserted on formatter
    if (value.length < formatted.length) {
      cursor += formatted.length - value.length;
    }

    // check if before new inserted digit is a space
    if (value.charAt(cursor) === " " && formatted.charAt(cursor - 1) === " ") {
      cursor += 1;
    }

    target.setSelectionRange(cursor, cursor);
  }

  /**
   * formatExpiration
   *
   * Formats a target element"s value.
   *
   * @param e
   */
  public static formatExpiration(e: KeyboardEvent) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;
    // allow: delete, backspace
    if (
      [46, 8].indexOf(e.keyCode) !== -1 ||
      // allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    target.value = new ExpirationFormatter().format(value, e.type === "blur");
  }

  /**
   * restrictLength
   *
   * Restricts input in a target element to a
   * certain length data.
   *
   * @param length
   */
  public static restrictLength(length: number) {
    return (e: KeyboardEvent) => {
      const target = (e.currentTarget
        ? e.currentTarget
        : e.srcElement) as HTMLInputElement;
      const value = target.value;
      // allow: backspace, delete, tab, escape and enter
      if (
        [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        // allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don"t do anything
        return;
      }
      if (value.length >= length) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      }
    };
  }

  /**
   * restrictCardNumberLength
   *
   * Restricts input in a target element to a
   * certain length data.
   *
   * @param length
   */
  public static restrictCardNumberLength(e: KeyboardEvent) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;
    const cardType = typeByNumber(value);
    // allow: backspace, delete, tab, escape and enter
    if (
      [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don"t do anything
      return;
    }

    const maxValue = (max: number, curr: number) => Math.max(max, curr);

    // tslint:disable-next-line:no-console
    console.log(cardType ? cardType.lengths.reduce(maxValue) : 19);
    if (value.replace(/\D/g, "").length >= (cardType ? cardType.lengths.reduce(maxValue) : 19)) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
  }

  /**
   * restrictNumeric
   *
   * Restricts input in a target element to only
   * numeric data.
   *
   * @param e
   */
  public static restrictNumeric(e: KeyboardEvent) {
    // allow: backspace, delete, tab, escape and enter
    if (
      [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      // allow: weird Android/Chrome issue
      e.keyCode === 229
    ) {
      // let it happen, don"t do anything
      return;
    }
    // ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
  }

  /**
   * deleteProperly
   *
   * Places cursor on the correct position to
   * let the browser delete the digit instead
   * of the space.
   *
   * @param e
   */
  public static deleteProperly(e: KeyboardEvent) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;

    if (!target.setSelectionRange) {
      return;
    }

    const cursor = target.selectionStart || 0;

    // allow: delete, backspace
    if (
      [46, 8].indexOf(e.keyCode) !== -1 &&
      // if space to be deleted
      value.charAt(cursor - 1) === " "
    ) {
      // placing cursor before space to delete digit instead
      target.setSelectionRange(cursor - 1, cursor - 1);
    }
  }

  /**
   * validateNumber
   *
   * Validates a target element"s value based on the
   * inferred card type"s validation regex. Adds a
   * class to the target element to note `valid` or
   * `invalid`.
   *
   * @param e
   */
  public static validateNumber(e: Event) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value.replace(/[-\s]/g, "");
    const cardType = typeByNumber(value);
    const classList = target.className.split(" ");
    const length = classList.length;
    let c = "";

    for (let i = 0; i < length; i++) {
      c = classList[i];
      if (c.indexOf("valid") !== -1) {
        delete classList[i];
      }
    }

    if (new CardNumberValidator().validate(value)) {
      classList.push("valid");

      const id = target.getAttribute("data-id");
      if (id) {
        postMessage.post(
          {
            data: { valid: true },
            id,
            type: "ui:iframe-field:card-number-test",
          },
          "parent",
        );
      }
    } else {
      const maxValue = (max: number, curr: number) => Math.max(max, curr);

      if (cardType && value.length < cardType.lengths.reduce(maxValue)) {
        classList.push("possibly-valid");
      }

      classList.push("invalid");

      const id = target.getAttribute("data-id");
      if (id) {
        postMessage.post(
          {
            data: { valid: false },
            id,
            type: "ui:iframe-field:card-number-test",
          },
          "parent",
        );
      }
    }

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  /**
   * validateCvv
   *
   * Validates a target element"s value based on the
   * possible CVV lengths. Adds a class to the target
   * element to note `valid` or `invalid`.
   *
   * @param e
   */
  public static validateCvv(e: Event) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;
    const classList = target.className.split(" ");
    const length = classList.length;
    let c = "";
    let cardType = "unknown";

    for (let i = 0; i < length; i++) {
      c = classList[i];
      if (c.indexOf("valid") !== -1) {
        delete classList[i];
      }
      if (c.indexOf("card-type-") !== -1) {
        cardType = c.replace("card-type-", "");
      }
    }

    const isAmex = cardType === "amex";
    const maxLength = isAmex ? 4 : 3;

    if (value.length < maxLength) {
      classList.push("possibly-valid");
    }

    if (
      new CvvValidator().validate(
        value,
        cardType === "unknown" ? undefined : isAmex,
      )
    ) {
      classList.push("valid");

      const id = target.getAttribute("data-id");
      if (id) {
        postMessage.post(
          {
            data: { valid: true },
            id,
            type: "ui:iframe-field:card-cvv-test",
          },
          "parent",
        );
      }
    } else {
      classList.push("invalid");

      const id = target.getAttribute("data-id");
      if (id) {
        postMessage.post(
          {
            data: { valid: false },
            id,
            type: "ui:iframe-field:card-cvv-test",
          },
          "parent",
        );
      }
    }

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  /**
   * validateExpiration
   *
   * Validates a target element"s value based on the
   * current date. Adds a class to the target element
   * to note `valid` or `invalid`.
   *
   * @param e
   */
  public static validateExpiration(e: Event) {
    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;
    const classList = target.className.split(" ");
    const length = classList.length;
    let c = "";

    for (let i = 0; i < length; i++) {
      c = classList[i];
      if (c.indexOf("valid") !== -1) {
        delete classList[i];
      }
    }

    const [month, year] = value.split(" / ");

    if (!month || !year || month.length < 2 || year.length < 4) {
      classList.push("possibly-valid");
    }

    if (new ExpirationValidator().validate(value)) {
      classList.push("valid");

      const id = target.getAttribute("data-id");
      if (id) {
        postMessage.post(
          {
            data: { valid: true },
            id,
            type: "ui:iframe-field:card-expiration-test",
          },
          "parent",
        );
      }
    } else {
      classList.push("invalid");

      const id = target.getAttribute("data-id");
      if (id) {
        postMessage.post(
          {
            data: { valid: false },
            id,
            type: "ui:iframe-field:card-expiration-test",
          },
          "parent",
        );
      }
    }

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  /**
   * attachNumberEvents
   *
   * @param selector
   */
  public static attachNumberEvents(selector: string) {
    const el = document.querySelector(selector);
    if (!el) {
      return;
    }

    Events.addHandler(el, "keydown", Card.restrictNumeric);
    Events.addHandler(el, "keydown", Card.restrictCardNumberLength);
    Events.addHandler(el, "keydown", Card.deleteProperly);
    Events.addHandler(el, "keyup", Card.formatNumber);
    Events.addHandler(el, "input", Card.formatNumber);
    Events.addHandler(el, "input", Card.validateNumber);
    Events.addHandler(el, "input", Card.addType);
  }

  /**
   * attachExpirationEvents
   *
   * @param selector
   */
  public static attachExpirationEvents(selector: string) {
    const el = document.querySelector(selector);
    if (!el) {
      return;
    }

    Events.addHandler(el, "keydown", Card.restrictNumeric);
    Events.addHandler(el, "keydown", Card.restrictLength(9));
    Events.addHandler(el, "keyup", Card.formatExpiration);
    Events.addHandler(el, "blur", Card.formatExpiration);
    Events.addHandler(el, "input", Card.validateExpiration);
    Events.addHandler(el, "blur", Card.validateExpiration);
  }

  /**
   * attachCvvEvents
   *
   * @param selector
   */
  public static attachCvvEvents(selector: string) {
    const el = document.querySelector(selector);
    if (!el) {
      return;
    }

    Events.addHandler(el, "keydown", Card.restrictNumeric);
    Events.addHandler(el, "keydown", Card.restrictLength(4));
    Events.addHandler(el, "input", Card.validateCvv);
  }
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, start) {
    for (let i = start || 0, j = this.length; i < j; i++) {
      if (this[i] === obj) {
        return i;
      }
    }
    return -1;
  };
}
