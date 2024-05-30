import { addSandboxAlert } from "../internal/lib/add-sandbox-alert";
import getGateway from "../internal/lib/get-gateway";
import { INSTALLMENTS_KEY } from "../internal/lib/installments/contracts/constants";
import objectAssign from "../internal/lib/object-assign";
import { options } from "../internal";
import { addStylesheet, json2css } from "../internal/lib/styles";
import UIForm, { fieldStyles, IUIFormOptions, parentStyles } from "../ui/form";
import { addFooterIcons } from "../internal/lib/add-footer-icons";
import translations from "../internal/lib/translations/translations";
import { translateObj } from "../internal/lib/translate";
import { getCurrentLanguage } from "../internal/lib/detectLanguage";
import { createHtmlDivElement, createToolTip } from "../common/html-element";
import {DCC_KEY} from "../internal/lib/currency-conversion/contracts/constants";

export const defaultOptions: IUIFormOptions = {
  labels: {
    "card-cvv": translations.en.labels['card-cvv'],
    "card-expiration": translations.en.labels['card-expiration'],
    "card-holder-name": translations.en.labels['card-holder-name'],
    "card-number": translations.en.labels['card-number'],
    submit: translations.en.labels.submit,
  },
  placeholders: {
    "card-expiration": "MM / YYYY",
  },
  prefix: "credit-card-",
  style: "default",
  titles: {
    "card-cvv": "Card CVV Input",
    "card-expiration": "Card Expiration Input",
    "card-holder-name": "Card Holder Name Input",
    "card-number": "Card Number Input",
    submit: "Form Submit Button Input",
  },
  values: {
    "card-track": translations.en.values['card-track'],
    submit: translations.en.values.submit,
  },
};

/**
 * Allows integrators to create a standard drop-in form for
 * accepting credit card data.
 *
 * @param target Target element to contain the drop-in form
 * @param formOptions Options for the drop-in form
 * @returns
 */
export function form(
  target: string | HTMLElement,
  formOptions: IUIFormOptions = {},
) {
  if (typeof target === "string") {
    const el = document.querySelector(target) as HTMLElement;

    if (!el) {
      throw new Error("Credit card form target does not exist");
    }

    target = el;
  }

  target.className = target.className + " secure-payment-form";

  const gateway = getGateway();
  if (gateway && gateway.getEnv(options) !== "production") {
    addSandboxAlert(target);
  }

  formOptions = objectAssign(objectAssign({}, defaultOptions), formOptions);

  // create field targets
  let fieldTypes = [
    "card-number",
    "card-expiration",
    "card-cvv",
    "card-holder-name",
    "submit",
  ];

  // If Currency Conversion option is present, insert the field between cardholder and submit button
  if (options.currencyConversion) fieldTypes.splice(fieldTypes.length-1, 0, DCC_KEY);

  // If installments option is present insert the field between card holder and submit button
  if (options.installments) fieldTypes.splice(fieldTypes.length-1, 0, INSTALLMENTS_KEY);

  const firstFieldCardForm = fieldTypes[0];

  if (formOptions.apms) {
    fieldTypes = [...formOptions.apms.toString().split(','), ...fieldTypes]
  }

  const fields: any = {};

  if (options.language) {
    formOptions.labels = translateObj(options.language, formOptions.labels);
    formOptions.values = translateObj(options.language, formOptions.values);
  }

  for (const i in fieldTypes) {
    if (!fieldTypes.hasOwnProperty(i)) {
      continue;
    }

    const type = fieldTypes[i];

    const wrapper = document.createElement("div");
    wrapper.className = formOptions.prefix + type;
    target.appendChild(wrapper);

    if (type !== "submit" && formOptions.labels && formOptions.labels[type]) {
      const label = document.createElement("label");
      label.appendChild(document.createTextNode(formOptions.labels[type]));
      wrapper.appendChild(label);
    }

    const el = createHtmlDivElement({
      className: formOptions.prefix + type + "-target"
    });
    wrapper.appendChild(el);
    const lang = getCurrentLanguage();

    if (
      type === "card-cvv" &&
      formOptions.style &&
      formOptions.style !== "blank"
    ) {
      const tooltip = createToolTip( {
        title: translations[lang].tooltip.title,
        htmlContent: translations[lang].tooltip.text,
        attributes: [{
          'aria-label': translations[lang].tooltip['aria-label']
        }]
      });
      el.append(tooltip);
    }

    fields[type] = {} as any;
    fields[type].target = ".secure-payment-form ." + formOptions.prefix + type + "-target";
    if (formOptions.placeholders && formOptions.placeholders[type]) {
      fields[type].placeholder =
        type === "card-expiration" && options.enableTwoDigitExpirationYear
          ? "MM / YY"
          : formOptions.placeholders[type];
    }
    if (formOptions.values && formOptions.values[type]) {
      fields[type].value = formOptions.values[type];
    }
    if (formOptions.labels && formOptions.labels[type]) {
      fields[type].label = formOptions.labels[type];
    }
    if (formOptions.titles && formOptions.titles[type]) {
      fields[type].title = formOptions.titles[type];
    }
    if (formOptions.amount) {
      fields[type].amount = formOptions.amount;
    }

    fields[type].fieldOptions = {
      styleType: formOptions.style,
    };
  }

  const language = getCurrentLanguage();
  if (formOptions.apms) {
    const firstField = target.querySelector(`[class$="${firstFieldCardForm}"]`);
    const divider = document.createElement('div');
    divider.classList.add('other-cards-label');
    divider.innerHTML = `<span>${translations[language]['other-cards-label']}</span>`;
    target.insertBefore(divider, firstField);
  }

  // add any styles for the parent window
  if (formOptions.style) {
    addStylesheet(
      json2css(parentStyles()[formOptions.style]),
      `secure-payment-styles-${formOptions.style}`,
    );
  }

  addFooterIcons(formOptions, target);

  return new UIForm(
    fields,
    formOptions.style ? fieldStyles()[formOptions.style] : {},
  );
}

/**
 * Allows integrators to create a drop-in form for accepting
 * track data from a human interface device (HID).
 *
 * @param target Target element to contain the drop-in form
 * @param formOptions Options for the drop-in form
 * @returns
 */
export function trackReaderForm(
  target: string | HTMLElement,
  formOptions: IUIFormOptions = {},
) {
  if (typeof target === "string") {
    const el = document.querySelector(target) as HTMLElement;

    if (!el) {
      throw new Error("Credit card track reader form target does not exist");
    }

    target = el;
  }

  target.className = target.className + " secure-payment-form";

  const gateway = getGateway();

  if (gateway && gateway.getEnv(options) !== "production") {
    addSandboxAlert(target);
  }

  formOptions = objectAssign(objectAssign({}, defaultOptions), formOptions);
  formOptions.prefix = "track-reader-";

  // create field targets
  const fieldTypes = ["card-track"];
  const fields: any = {};

  for (const i in fieldTypes) {
    if (!fieldTypes.hasOwnProperty(i)) {
      continue;
    }

    const type = fieldTypes[i];

    if (formOptions.labels && formOptions.labels[type]) {
      const label = document.createElement("label");
      label.setAttribute("for", formOptions.prefix + type);
      label.appendChild(document.createTextNode(formOptions.labels[type]));
      target.appendChild(label);
    }

    const el = document.createElement("div");
    el.id = formOptions.prefix + type;
    target.appendChild(el);

    fields[type] = {} as any;
    fields[type].target = "#" + formOptions.prefix + type;

    if (formOptions.placeholders && formOptions.placeholders[type]) {
      fields[type].placeholder = formOptions.placeholders[type];
    }
    if (formOptions.values && formOptions.values[type]) {
      fields[type].value = formOptions.values[type];
    }
  }

  // add any styles for the parent window
  if (formOptions.style) {
    addStylesheet(
      json2css(parentStyles()[formOptions.style]),
      `secure-payment-styles-${formOptions.style}`,
    );
  }

  return new UIForm(
    fields,
    formOptions.style ? fieldStyles()[formOptions.style] : {},
  );
}