import { addSandboxAlert } from "../internal/lib/add-sandbox-alert";
import getGateway from "../internal/lib/get-gateway";
import objectAssign from "../internal/lib/object-assign";
import { options } from "../internal/lib/options";
import { addStylesheet, json2css } from "../internal/lib/styles";
import UIForm, {
  fieldStyles,
  IUIFormField,
  IUIFormOptions,
  parentStyles,
} from "../ui/form";

export const defaultOptions: IUIFormOptions = {
  labels: {
    "card-number": "Card Number:",
    // tslint:disable-next-line:object-literal-key-quotes
    pin: "PIN:",
  },
  placeholders: {
    "card-number": "•••• •••• •••• ••••",
    // tslint:disable-next-line:object-literal-key-quotes
    pin: "••••",
  },
  prefix: "gift-and-loyalty-",
  style: "default",
  values: {
    submit: "Submit",
  },
};

/**
 * Allows integrators to create a standard drop-in form for
 * accepting gift and loyalty card data.
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
      throw new Error("Gift and loyalty form target does not exist");
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
  const fieldTypes = ["card-number", "pin", "submit"];
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

    if (type === "pin") {
      const input = document.createElement("input");
      input.name = "pin";
      input.type = "tel";
      el.appendChild(input);
      continue;
    }

    fields[type] = {} as IUIFormField;
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
    addStylesheet(json2css(parentStyles()[formOptions.style]));
  }

  return new UIForm(
    fields,
    formOptions.style ? fieldStyles()[formOptions.style] : {},
  );
}
