import ExpirationFormatter from "../formatters/expiration";
import CardNumberValidator from "../validators/card-number";
import CvvValidator from "../validators/cvv";
import ExpirationValidator from "../validators/expiration";
import {typeByNumber} from "./card-types";
import Events from "./events";
import { postMessage } from "./post-message";
import { options } from './options';
import { InstallmentEvents } from "./installments/contracts/enums";

import { hideHostedFieldValidation, showHostedFieldValidation } from "../built-in-validations/helpers";
import { expressPayFieldsValidate, validate } from "../built-in-validations/field-validator";
import { CardFormFieldNames, CardFormFieldValidationTestEvents, ExpressPayFieldNames } from "../../common/enums";
import { isSafari } from "../../common/browser-helpers";
import { CurrencyConversionEvents } from "./currency-conversion/contracts/enums";
import { hasCurrencyConversionSensitiveValueChanged, removeCurrencyConversionAvailabilityStatus, removeCurrencyConversionPreviousValue } from "./currency-conversion/utils/helpers";
import { HOSTED_FIELDS_ADDITIONAL_KEYS, HOSTED_FIELDS_SHIPPING_KEYS } from "../../common/constants";

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
    let classList = target.className.split(" ");
    const length = classList.length;
    const icon = target.parentNode?.querySelector('img');
    const GENERIC_CARD_DESCRIPTION = "Generic Card";

    let i = 0;
    let c = "";

    for (i; i < length; i++) {
      c = classList[i];
      if (c && c.indexOf("card-type-") !== -1) {
        delete classList[i];
      }
    }

    const id = target.getAttribute("data-id");
    if (type) {
      classList.push("card-type-" + type.code);
      classList = classList.filter((str) => str !== '');

      if (id) {
        postMessage.post(
          {
            data: {cardType: type.code},
            id,
            type: "ui:iframe-field:card-type",
          },
          "parent",
        );
      }

      if (icon) {
        const cardTypeDescription = `${type.code.charAt(0).toUpperCase() + type.code.slice(1)} Card`;
        icon.setAttribute('alt', cardTypeDescription);
        icon.setAttribute('title', cardTypeDescription);
      }
    } else {
      icon!.setAttribute('alt', GENERIC_CARD_DESCRIPTION);
      icon!.setAttribute('title', GENERIC_CARD_DESCRIPTION);
    }

    classList = classList.filter((str) => str !== '');
    const classListIcon = classList.filter(str => (str !== '' && str !== 'card-number'))
    icon!.className = classListIcon.join(" ");
    icon!.classList.add('card-number-icon');
    target.className = classList.join(" ");
  }

  /**
   * formatNumber
   *
   * Formats a target element"s value based on the
   * inferred card type"s formatting regex.
   *
   * @param e
   */
  public static formatNumber(e: KeyboardEvent | Event) {
    const { value: initialCardNumberValue, target } = Card.getFieldEventData(e);

    if (!target || !initialCardNumberValue || (initialCardNumberValue && initialCardNumberValue.length === 0)) return;

    // Get the initial cursor position
    const selectionStart = target.selectionStart || 0;

    // Restrict for numeric (only numbers)
    const numbersOnlyCardNumberValue = initialCardNumberValue.replace(/[^0-9]/g, '');

    // Restrict length (based on the max length for the card type)
    const cardType = typeByNumber(numbersOnlyCardNumberValue);
    const maxLength = cardType ? cardType.lengths.reduce((max: number, curr: number) => Math.max(max, curr)) : 19;
    const truncatedCardNumberValue = numbersOnlyCardNumberValue.substring(0, maxLength);

    // Calculate the number of spaces before the cursor
    const numSpacesBefore = (numbersOnlyCardNumberValue.slice(0, selectionStart).match(/\s/g) || []).length;

    // Format number
    const formattedCardNumberValue = truncatedCardNumberValue.replace(/(.{4})/g, '$1 ').trim();
    target.value = formattedCardNumberValue;

    // Calculate the new cursor position
    const newSelectionStart = selectionStart - numSpacesBefore;
    const formattedSelectionStart = newSelectionStart + Math.floor(newSelectionStart / 4);

    // Set the cursor position
    const finalPosition = Math.min(formattedSelectionStart, target.value.length);
    target.setSelectionRange(finalPosition, finalPosition);
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
      // allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      // allow: weird Android/Chrome issue
      e.keyCode === 229
    ) {
      return;
    }

    // used for triggering the keyup event on safari
    target.value = new ExpirationFormatter().format(value, e.type === "blur" || (e.type === "keyup" && target !== document.activeElement && isSafari));
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
      // allow: backspace, delete, tab, escape, ctrl and enter
      if (
        [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        // allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
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
    // allow: backspace, delete, tab, escape, ctrl and enter
    if (
      [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don"t do anything
      return;
    }

    const maxValue = (max: number, curr: number) => Math.max(max, curr);

    if (
      value.replace(/\D/g, "").length >=
      (cardType ? cardType.lengths.reduce(maxValue) : 19)
    ) {
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
      // allow: backspace, delete, tab, escape, ctrl and enter
      if (
        [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        // allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // allow: Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
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
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      }
  }

  /**
   * restrictNumericOnInput
   *
   * Restricts input in a target element to only
   * numeric data for input event type.
   *
   * @param e
   */
  public static restrictNumericOnInput(e: Event) {
    if (!options.fieldValidation?.enabled) return;

    const { value, target } = Card.getFieldEventData(e);

    const integerRegex = /^\d+$/;
    if (!integerRegex.test(value.replaceAll(' / ', '').replaceAll(' ', ''))) {
      target.value = "";
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
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");

    // Get the initial cursor position
    const selectionStart = target.selectionStart || 0;

    // Filter out non-numeric characters
    const cleanedValue = target.value.replace(/[^0-9\s]/g, '');
    target.value = cleanedValue;

    const rawValue = cleanedValue.replace(/[-\s]/g, '');
    const cardType = typeByNumber(rawValue);

    // Add spaces after every 4 digits
    const formattedValue = rawValue.replace(/(.{4})/g, '$1 ').trim();

    // Calculate the new cursor position
    const numSpacesBefore = (cleanedValue.slice(0, selectionStart).match(/\s/g) || []).length;
    const newSelectionStart = selectionStart - numSpacesBefore;
    const formattedSelectionStart = newSelectionStart + Math.floor(newSelectionStart / 4);

    target.value = formattedValue;

    let classList = target.className.split(" ");
    const length = classList.length;
    let c = "";

    for (let i = 0; i < length; i++) {
      c = classList[i];
      if (c.indexOf("valid") !== -1 || c.indexOf("possibly-valid") !== -1 || c.indexOf("invalid") !== -1) {
        delete classList[i];
      }
    }

    let isValid = new CardNumberValidator().validate(rawValue);
    if (options.fieldValidation?.enabled) {
      const validationResult = validate(CardFormFieldNames.CardNumber, rawValue);
      isValid = isValid && (validationResult && validationResult.isValid);
    }

    if (isValid) {
      classList.push("valid");

      if (id) {
        postMessage.post(
          {
            data: { valid: true },
            id,
            type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardNumber}`,
          },
          "parent",
        );
      }
    } else {
      const maxValue = (max: number, curr: number) => Math.max(max, curr);

      if (cardType && rawValue.length < cardType.lengths.reduce(maxValue)) {
        classList.push("possibly-valid");
      }

      classList.push("invalid");

      if (id) {
        postMessage.post(
          {
            data: { valid: false },
            id,
            type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardNumber}`,
          },
          "parent",
        );
      }
    }

    classList = classList.filter((str) => str !== '');
    target.className = classList.join(" ");

    // Set the cursor position
    const finalPosition = Math.min(formattedSelectionStart, target.value.length);
    target.setSelectionRange(finalPosition, finalPosition);
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
    const id = target.getAttribute("data-id");
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

    let isValid = new CvvValidator().validate(
        value,
        cardType === "unknown" ? undefined : isAmex,
      );
    if (options.fieldValidation?.enabled) {
      const validationResult = validate(CardFormFieldNames.CardCvv, value, { isAmex });
      isValid = isValid && (validationResult && validationResult.isValid);
    }

    if (isValid) {
      classList.push("valid");

      if (id) {
        postMessage.post(
          {
            data: {valid: true},
            id,
            type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardCvv}`,
          },
          "parent",
        );
      }
    } else {
      classList.push("invalid");

      if (id) {
        postMessage.post(
          {
            data: {valid: false},
            id,
            type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardCvv}`,
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
    const id = target.getAttribute("data-id");
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

    let isValid = new ExpirationValidator().validate(value);
    if (options.fieldValidation?.enabled) {
      const validationResult = validate(CardFormFieldNames.CardExpiration, value);
      isValid = isValid && (validationResult && validationResult.isValid);
    }

    if (isValid) {
      classList.push("valid");

      if (id) {
        postMessage.post(
          {
            data: {valid: true},
            id,
            type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardExpiration}`,
          },
          "parent",
        );
      }
    } else {
      classList.push("invalid");

      if (id) {
        postMessage.post(
          {
            data: { valid: false },
            id,
            type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardExpiration}`,
          },
          "parent",
        );
      }
    }

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  /**
   * validateCardHolderName
   *
   * Validates a target element"s value based on the
   * possible Card Holder name. Adds a class to the target
   * element to note `valid` or `invalid`.
   *
   * @param e
   */
  public static validateCardHolderName(e: Event,field:string) {
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");
    const value = target.value;
    const classList = target.className.split(" ");

    if (!id) return;

    // Remove the valid/invalid css class
    classList.forEach((fieldClass: string, fieldClassIndex: number) => {
      if (fieldClass.indexOf("valid") !== -1) {
        delete classList[fieldClassIndex];
      }
    });

    const { isValid: valid } = validate(field, value);
    postMessage.post(
      {
        data: { valid },
        id,
        type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardHolderName}`,
      },
      "parent",
    );

    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    classList.push(valid ? "valid" : "invalid");

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  /**
   * validateCardHolderEmail
   *
   * Validates a target element"s value based on the
   * possible Card Holder Email. Adds a class to the target
   * element to note `valid` or `invalid`.
   *
   * @param e
   */

  public static validateEmail(e: Event){
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");
    const value = target.value;
    const classList = target.className.split(" ");

    if (!id) return;

    // Remove the valid/invalid css class
    classList.forEach((fieldClass: string, fieldClassIndex: number) => {
      if (fieldClass.indexOf("valid") !== -1) {
        delete classList[fieldClassIndex];
      }
    });

    const { isValid: valid } = expressPayFieldsValidate(ExpressPayFieldNames.EmailId, value);
    postMessage.post(
      {
        data: { valid },
        id,
        type: `ui:iframe-field:${CardFormFieldValidationTestEvents.EmailId}`,
      },
      "parent",
    );

    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    classList.push(valid ? "valid" : "invalid");

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  public static validatePhone(e: Event){
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");
    const value = target.value;
    const classList = target.className.split(" ");

    if (!id) return;

    // Remove the valid/invalid css class
    classList.forEach((fieldClass: string, fieldClassIndex: number) => {
      if (fieldClass.indexOf("valid") !== -1) {
        delete classList[fieldClassIndex];
      }
    });

    const { isValid: valid } = expressPayFieldsValidate(ExpressPayFieldNames.Phone, value);
    postMessage.post(
      {
        data: { valid },
        id,
        type: `ui:iframe-field:${CardFormFieldValidationTestEvents.PhoneNumber}`,
      },
      "parent",
    );

    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    classList.push(valid ? "valid" : "invalid");

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  public static validatePostalCode(e: Event,field:string){
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");
    const value = target.value;
    const classList = target.className.split(" ");

    if (!id) return;

    // Remove the valid/invalid css class
    classList.forEach((fieldClass: string, fieldClassIndex: number) => {
      if (fieldClass.indexOf("valid") !== -1) {
        delete classList[fieldClassIndex];
      }
    });

    const { isValid: valid } = expressPayFieldsValidate(field, value);
    postMessage.post(
      {
        data: { valid },
        id,
        type: `ui:iframe-field:${CardFormFieldValidationTestEvents.BillingPostalCode}`,
      },
      "parent",
    );

    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    classList.push(valid ? "valid" : "invalid");

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

    public static validateBillingAddress(e: Event,field:string) {
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");
    const value = target.value;
    const classList = target.className.split(" ");

    if (!id) return;

    // Remove the valid/invalid css class
    classList.forEach((fieldClass: string, fieldClassIndex: number) => {
      if (fieldClass.indexOf("valid") !== -1) {
        delete classList[fieldClassIndex];
      }
    });

    const { isValid: valid } = expressPayFieldsValidate(field, value);
    postMessage.post(
      {
        data: { valid },
        id,
        type: `ui:iframe-field:${CardFormFieldValidationTestEvents.CardHolderName}`,
      },
      "parent",
    );

    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    classList.push(valid ? "valid" : "invalid");

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  public static validateCountry(e: Event,field:string){
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLSelectElement;
    const id = target.getAttribute("data-id");
    const value = target.value;
    const classList = target.className.split(" ");

    if (!id) return;

    // Remove the valid/invalid css class
    classList.forEach((fieldClass: string, fieldClassIndex: number) => {
      if (fieldClass.indexOf("valid") !== -1) {
        delete classList[fieldClassIndex];
      }
    });

    const { isValid: valid } = expressPayFieldsValidate(ExpressPayFieldNames.Country, value);
    postMessage.post(
      {
        data: { valid },
        id,
        type: `ui:iframe-field:${CardFormFieldValidationTestEvents.Country}`,
      },
      "parent",
    );

    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    classList.push(valid ? "valid" : "invalid");

    target.className = classList.join(" ").replace(/^\s+|\s+$/gm, "");
  }

  /**
   * validateInstallmentFields
   *
   * Validates a target element"s value based on the
   * availability of use installment plans.
   *
   * @param e
   * @param fieldType
   */
  public static validateInstallmentFields(e: Event, fieldType: string) {
    if (!options.installments) return;

    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;

    const id = target.getAttribute("data-id");
    if (!id) return;

    let installmentFieldValid = false;

    if (fieldType === CardFormFieldNames.CardNumber ) {
      installmentFieldValid = new CardNumberValidator().validate(value);
    }
    if (fieldType === CardFormFieldNames.CardExpiration ) {
      installmentFieldValid = new ExpirationValidator().validate(value);
    }
    if (fieldType === CardFormFieldNames.CardCvv ) {
      const CARD_TYPE_UNKNOWN = "unknown";
      const CARD_TYPE_CLASS_PREFIX = "card-type-";
      const classList = target.className.split(" ");
      const [cardTypeClass] = classList.filter(c => new RegExp(`/${CARD_TYPE_CLASS_PREFIX}\\b`, 'g').test(c));
      const cardType = cardTypeClass ? cardTypeClass.replace(CARD_TYPE_CLASS_PREFIX, "") : CARD_TYPE_UNKNOWN;

      installmentFieldValid = new CvvValidator().validate(
        value,
        cardType === CARD_TYPE_UNKNOWN ? undefined : cardType === "amex",
      );
    }
    if (installmentFieldValid) return;

    const eventType = `ui:iframe-field:${InstallmentEvents.CardInstallmentsHide}`;
    postMessage.post(
      {
        data: { value, id },
        id,
        type: eventType,
      },
      "parent",
    );
  }

  /**
   * validateCurrencyConversionFields
   *
   * Validates a target element"s value based on the
   * availability of use currency conversion.
   *
   * @param e
   * @param fieldType
   */
  public static validateCurrencyConversionFields(e: Event, fieldType: string) {
    if (!options.currencyConversion?.enabled) return;

    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;

    const id = target.getAttribute("data-id");
    if (!id) return;

    let isFieldValid = false;

    if (fieldType === CardFormFieldNames.CardNumber) {
      isFieldValid = new CardNumberValidator().validate(value);
    }
    if (fieldType === CardFormFieldNames.CardExpiration) {
      isFieldValid = new ExpirationValidator().validate(value);
    }

    if (isFieldValid) return;
    postMessage.post(
      {
        data: { value, id, isFieldValid },
        id,
        type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionHide}`,
      },
      "parent",
    );
  }

  /**
   * currencyConversionFieldsValidatedEvent
   *
   * Post an event when an installment related card field is validated
   *
   * @param e
   * @param fieldType
   */
  public static currencyConversionFieldsValidatedEvent(e: Event, fieldType: string) {
    if (!options.currencyConversion?.enabled) return;

    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;

    const id = target.getAttribute("data-id");
    if (!id) return;

    const valueHasChanged = hasCurrencyConversionSensitiveValueChanged(fieldType, value);

    let isFieldValid = false;

    if (fieldType === CardFormFieldNames.CardNumber) {
      isFieldValid = new CardNumberValidator().validate(value);
    }
    if (fieldType === CardFormFieldNames.CardExpiration) {
      isFieldValid = new ExpirationValidator().validate(value);
      if (options.fieldValidation?.enabled) {
        isFieldValid = new ExpirationValidator().validateDate(value);
      }
    }

    if (!isFieldValid) return;

    if (!valueHasChanged) return;

    const eventType = `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionFieldsValidated}`;
    postMessage.post(
      {
        data: { value, id },
        id,
        type: eventType,
      },
      "parent",
    );
  }

  /**
   * hideCurrencyConversionField
   *
   * Hides the currency conversion field component.
   *
   * @param e
   * @param fieldType
   */
  public static hideCurrencyConversionField(e: Event, fieldType: string) {
    if (!options.currencyConversion?.enabled) return;

    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;

    const id = target.getAttribute("data-id");
    if (!id) return;

    removeCurrencyConversionPreviousValue(fieldType);

    // Since the sensitive values has changed the feature become unavailable and hidden
    removeCurrencyConversionAvailabilityStatus();

    postMessage.post(
      {
        data: { value, id, isFieldValid: false },
        id,
        type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionHide}`,
      },
      "parent",
    );
  }

  /**
   * postInstallmentFieldValidatedEvent
   *
   * Post an event when an installment related card field is validated
   *
   * @param e
   */
  public static postInstallmentFieldValidatedEvent(e: Event) {
    if (!options.installments) return;

    const target = (e.currentTarget
      ? e.currentTarget
      : e.srcElement) as HTMLInputElement;
    const value = target.value;

    const id = target.getAttribute("data-id");
    if (!id) return;

    const eventType = `ui:iframe-field:${InstallmentEvents.CardInstallmentsFieldValidated}`;
    postMessage.post(
      {
        data: { value, id },
        id,
        type: eventType,
      },
      "parent",
    );
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
    // Set a generic card max length
    el.setAttribute("maxlength", "23");

    Events.addHandler(el, "focus", (e: Event) => {
      const { value, target } = Card.getFieldEventData(e);

      if (!target || !value || (value && value.length === 0)) return;
    });

    Events.addHandler(el, "input", Card.validateNumber);

    Events.addHandler(el, "input", Card.addType);

    Events.addHandler(el, "blur", Card.formatNumber);
    Events.addHandler(el, "focus", Card.formatNumber);

    Events.addHandler(el, "blur", Card.postInstallmentFieldValidatedEvent);
    Events.addHandler(el, "blur", (e: Event) => { Card.currencyConversionFieldsValidatedEvent(e, CardFormFieldNames.CardNumber) });
    Events.addHandler(el, "input", (e: Event) => { Card.validateInstallmentFields(e, CardFormFieldNames.CardNumber) });

    Events.addHandler(el, "input", (e: Event) => { Card.hideCurrencyConversionField(e, CardFormFieldNames.CardNumber) });

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, CardFormFieldNames.CardNumber) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
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
    Events.addHandler(el, "input", Card.restrictNumericOnInput);
    Events.addHandler(el, "keydown", Card.restrictLength(9));
    Events.addHandler(el, "keyup", Card.formatExpiration);
    Events.addHandler(el, "blur", Card.formatExpiration);
    Events.addHandler(el, "input", Card.validateExpiration);
    Events.addHandler(el, "blur", Card.validateExpiration);
    Events.addHandler(el, "blur", Card.postInstallmentFieldValidatedEvent);
    Events.addHandler(el, "blur", (e: Event) => { Card.currencyConversionFieldsValidatedEvent(e, CardFormFieldNames.CardExpiration) });
    Events.addHandler(el, "input", (e: Event) => { Card.validateInstallmentFields(e, CardFormFieldNames.CardExpiration) });

    Events.addHandler(el, "input", (e: Event) => { Card.hideCurrencyConversionField(e, CardFormFieldNames.CardExpiration) });

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, CardFormFieldNames.CardExpiration) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
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
    el.setAttribute("maxlength", "3");
    Events.addHandler(el, "keydown", Card.restrictNumeric);
    Events.addHandler(el, "input", Card.restrictNumericOnInput);
    Events.addHandler(el, "keydown", Card.restrictLength(4));
    Events.addHandler(el, "input", Card.validateCvv);
    Events.addHandler(el, "blur", Card.validateCvv);
    Events.addHandler(el, "blur", Card.postInstallmentFieldValidatedEvent);
    Events.addHandler(el, "input", (e: Event) => { Card.validateInstallmentFields(e, CardFormFieldNames.CardCvv) });

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, CardFormFieldNames.CardCvv) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
  }

  /**
   * attachCardHolderNameEvents
   *
   * @param selector
   */
  public static attachCardHolderNameEvents(selector: string,field:string) {
    const el = document.querySelector(selector);
    if (!el) return;

    Events.addHandler(el, "input", (e:Event) => {Card.validateCardHolderName (e,field)});
    Events.addHandler(el, "blur", (e:Event) => {Card.validateCardHolderName (e,field)});

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, field) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
  }

  /**
   * attachEmailEvents
   *
   * @param selector
   */

  public static attachEmailEvents(selector: string) {
    const el = document.querySelector(selector);
    if (!el) return;

    Events.addHandler(el, "input", Card.validateEmail);
    Events.addHandler(el, "blur", Card.validateEmail);

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, ExpressPayFieldNames.EmailId) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
  }

  /**
   * attachPhoneEvents
   *
   * @param selector
   */

  public static attachPhoneEvents(selector: string) {
    const el = document.querySelector(selector);
    if (!el) return;

    // Set a generic card max length
    el.setAttribute("maxlength", "10");

    Events.addHandler(el, "keydown", Card.restrictNumeric);
    Events.addHandler(el, "input", Card.restrictNumericOnInput);

    Events.addHandler(el, "input", Card.validatePhone);
    Events.addHandler(el, "blur", Card.validatePhone);

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, ExpressPayFieldNames.Phone) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
  }

  /**
   * attachPostalCodeEvents
   *
   * @param selector
   */

  public static attachPostalCodeEvents(selector: string,field:string) {
    const el = document.querySelector(selector);
    if (!el) return;

    // Set a generic card max length
    el.setAttribute("maxlength", "10");

    // Events.addHandler(el, "keydown", Card.restrictNumeric);
    // Events.addHandler(el, "input", Card.restrictNumericOnInput);

    Events.addHandler(el, "input", (e:Event) => {Card.validatePostalCode(e,field)});
    Events.addHandler(el, "blur", (e:Event) => {Card.validatePostalCode(e,field)});

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, field) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
  }

  public static attachAddressEvents(selector: string, field:string) {
    const el = document.querySelector(selector);
    if (!el) return;

    Events.addHandler(el, "input", (e: Event) => { Card.validateBillingAddress(e,field) });
    Events.addHandler(el, "blur", (e: Event) => { Card.validateBillingAddress(e,field) });

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, field) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
  }

  /**
   * attachCountryEvents
   *
   * @param selector
   */

  public static attachCountryEvents(selector: string,field:string) {
    const el = document.querySelector(selector);
    if (!el) return;

    Events.addHandler(el, "input", (e:Event) => { Card.validateCountry(e,field) });
    Events.addHandler(el, "blur", (e:Event) => { Card.validateCountry(e,field) });

    Events.addHandler(el, "blur", (e: Event) => { Card.focusOutHostedFieldValidationHandler(e, field) });
    Events.addHandler(el, "input", (e: Event) => { Card.focusInHostedFieldValidationHandler(e) });
  }

  private static handleHostedFieldValidation(id: string, type: string, value: string , extraData?: any): boolean {
    let additionalFieldsToValidate = HOSTED_FIELDS_ADDITIONAL_KEYS.map(x => x);
    if(options.expressPay?.isShippingRequired !== false && localStorage.getItem("shippingSameAsBilling")==="false"){
      additionalFieldsToValidate = [...additionalFieldsToValidate,...HOSTED_FIELDS_SHIPPING_KEYS.map(x =>x)];
    }
    const validationResult = validate(type, value, extraData);
    const expressPayValidationResult:any = additionalFieldsToValidate.indexOf(type) > -1 ? expressPayFieldsValidate(type, value, extraData) : true

    const isValid = additionalFieldsToValidate.indexOf(type) > -1 ? (expressPayValidationResult && expressPayValidationResult.isValid) : (validationResult && validationResult.isValid);

    if (!isValid && (validationResult.message || expressPayValidationResult.message)) {
      showHostedFieldValidation(id, (validationResult.message || expressPayValidationResult.message));
    } else {
      hideHostedFieldValidation(id);
    }
    return isValid;
  }

  private static focusOutHostedFieldValidationHandler(e: Event, type: string) {
    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");
    const value = target.value;

    if (!id) return;

    Card.handleHostedFieldValidation(id, type, value, { isAmex: Card.getCardType(target) === "amex" });
  }

  private static focusInHostedFieldValidationHandler(e: Event) {
    // Only if Built-in field validations are enable
    if (!options.fieldValidation?.enabled) return;

    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;
    const id = target.getAttribute("data-id");

    if (!id) return;

    hideHostedFieldValidation(id);
  }

  private static getFieldEventData(e: Event): { id: string | null, value: string, target: HTMLInputElement } {
    const target = (e.currentTarget ? e.currentTarget : e.srcElement) as HTMLInputElement;

    return {
      id: target.getAttribute("data-id"),
      value: target.value,
      target,
    };
  }

  private static getCardType(target: HTMLInputElement): string {
    const unknownCardType = "unknown";

    if (!target) return unknownCardType;

    const classList = target.className.split(" ");
    const cardType = classList.find(x => x.indexOf("card-type-") !== -1)?.replace("card-type-", "");

    return cardType || unknownCardType;
  }
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (let i = start || 0, j = this.length; i < j; i++) {
      if (this[i] === obj) {
        return i;
      }
    }
    return -1;
  };
}