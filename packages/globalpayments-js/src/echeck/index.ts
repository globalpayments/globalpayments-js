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
    "account-number": "Account Number:",
    "account-type": "Account Type:",
    "check-type": "Check Type:",
    "routing-number": "Routing Number:",
  },
  placeholders: {
    "account-number": "•••••••••",
    "routing-number": "•••••••••",
  },
  prefix: "echeck-",
  style: "default",
  values: {
    submit: "Submit",
  },
};

export function form(
  target: string | HTMLElement,
  formOptions: IUIFormOptions = {},
) {
  if (typeof target === "string") {
    const el = document.querySelector(target) as HTMLElement;

    if (!el) {
      throw new Error("ACH/eCheck form target does not exist");
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
    "account-number",
    "routing-number",
    "account-type",
    "check-type",
    "submit",
  ];
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

    if (type === "account-type") {
      const select = document.createElement("select");
      select.name = "account-type";
      const defaultOption = document.createElement("option");
      defaultOption.appendChild(document.createTextNode("-- Account Type --"));
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);
      const personalOption = document.createElement("option");
      personalOption.appendChild(document.createTextNode("Personal"));
      select.appendChild(personalOption);
      const businessOption = document.createElement("option");
      businessOption.appendChild(document.createTextNode("Business"));
      select.appendChild(businessOption);
      el.appendChild(select);
      continue;
    }

    if (type === "check-type") {
      const select = document.createElement("select");
      select.name = "check-type";
      const defaultOption = document.createElement("option");
      defaultOption.appendChild(document.createTextNode("-- Check Type --"));
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);
      const checkingOption = document.createElement("option");
      checkingOption.appendChild(document.createTextNode("Checking"));
      select.appendChild(checkingOption);
      const savingsOption = document.createElement("option");
      savingsOption.appendChild(document.createTextNode("Savings"));
      select.appendChild(savingsOption);
      el.appendChild(select);
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
