import { addSandboxAlert } from "../internal/lib/add-sandbox-alert";
import getGateway from "../internal/lib/get-gateway";
import objectAssign from "../internal/lib/object-assign";
import { options } from "../internal/lib/options";
import { addStylesheet, json2css } from "../internal/lib/styles";
import UIForm, { fieldStyles, IUIFormOptions, parentStyles } from "../ui/form";

export const defaultOptions: IUIFormOptions = {
  labels: {
    "card-cvv": "Card CVV",
    "card-expiration": "Card Expiration",
    "card-holder-name": "Card Holder Name",
    "card-number": "Card Number",
    "submit": "Submit",
  },
  placeholders: {
    "card-cvv": "•••",
    "card-expiration": "MM / YYYY",
    "card-holder-name": "Jane Smith",
    "card-number": "•••• •••• •••• ••••",
  },
  prefix: "credit-card-",
  style: "default",
  titles: {
    "card-cvv": "Card CVV Input",
    "card-expiration": "Card Expiration Input",
    "card-holder-name": "Card Holder Name Input",
    "card-number": "Card Number Input",
    "submit": "Form Submit Button Input",
  },
  values: {
    "card-track": "Read Card",
    "submit": "Submit",
  },
};

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
  const fieldTypes = [
    "card-holder-name",
    "card-number",
    "card-expiration",
    "card-cvv",
    "submit",
  ];
  const fields: any = {};
  for (const i in fieldTypes) {
    if (!fieldTypes.hasOwnProperty(i)) {
      continue;
    }

    const type = fieldTypes[i];

    if (type !== "submit" && formOptions.labels && formOptions.labels[type]) {
      const label = document.createElement("label");
      // label.setAttribute("for", formOptions.prefix + type);
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
    if (formOptions.labels && formOptions.labels[type]) {
      fields[type].label = formOptions.labels[type];
    }
    if (formOptions.titles && formOptions.titles[type]) {
      fields[type].title = formOptions.titles[type];
    }
  }

  // add any styles for the parent window
  if (formOptions.style) {
    addStylesheet(
      json2css(parentStyles[formOptions.style]),
      `secure-payment-styles-${formOptions.style}`,
    );
  }

  return new UIForm(
    fields,
    formOptions.style ? fieldStyles[formOptions.style] : {},
  );
}

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
      json2css(parentStyles[formOptions.style]),
      `secure-payment-styles-${formOptions.style}`,
    );
  }

  return new UIForm(
    fields,
    formOptions.style ? fieldStyles[formOptions.style] : {},
  );
}
