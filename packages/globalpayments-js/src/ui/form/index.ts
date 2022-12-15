import { IEventListener } from "globalpayments-lib";

import assetBaseUrl from "../../internal/lib/asset-base-url";
import { postMessage } from "../../internal/lib/post-message";
import {
  fieldStyles as defaultFieldStyles,
  parentStyles as defaultParentStyles,
} from "../../internal/lib/styles/default";
import {
  fieldStyles as gpDefaultFieldStyles,
  parentStyles as gpDefaultParentStyles,
} from "../../internal/lib/styles/gp-default";
import {
  fieldStyles as simpleFieldStyles,
  parentStyles as simpleParentStyles,
} from "../../internal/lib/styles/simple";
import { IDictionary } from "../../internal/lib/util";
import { IFrameCollection, IframeField, IUIFormField } from "../iframe-field";
import addClickToPay from "../iframe-field/action-add-click-to-pay";

export { IUIFormField } from "../iframe-field";

export const fieldStyles = () => ({
  blank: {},
  default: defaultFieldStyles(assetBaseUrl()),
  "gp-default": gpDefaultFieldStyles(assetBaseUrl()),
  simple: simpleFieldStyles(assetBaseUrl()),
});

export const parentStyles = () => ({
  blank: {},
  default: defaultParentStyles(assetBaseUrl()),
  "gp-default": gpDefaultParentStyles(assetBaseUrl()),
  simple: simpleParentStyles(assetBaseUrl()),
});

export interface IUIFormOptions {
  labels?: IDictionary;
  placeholders?: IDictionary;
  prefix?: string;
  style?: "default" | "simple" | "blank" | "gp-default";
  titles?: IDictionary;
  values?: IDictionary;
}

export const frameFieldTypes = [
  "click-to-pay",
  "card-number",
  "card-expiration",
  "card-cvv",
  "card-holder-name",
  "card-track",
  "account-number",
  "routing-number",
  "submit",
];

export interface IUIFormFields {
  [key: string]: IUIFormField;
}

/**
 * Represents logic surrounding a group of hosted fields.
 */
export default class UIForm {
  public frames: IFrameCollection;
  public fields: IUIFormFields;
  public styles: object;
  private totalNumberOfFields = 0;

  /**
   * Instantiates a new UIForm object for a group of hosted fields
   *
   * @param fields Hosted field configuration
   * @param styles Custom CSS configuration
   */
  public constructor(fields: IUIFormFields, styles: object) {
    this.frames = {};
    this.fields = fields;
    this.styles = styles;

    this.createFrames();
  }

  /**
   * Sets an event listener for an event type
   *
   * @param fieldTypeOrEventName The field type on which the listener should
   *          be applied, or the type of event that should trigger the listener
   * @param eventNameOrListener The type of event that should trigger the
   *          listener, or the listener function
   * @param listener The listener function when both field type and event type
   *          are provided
   */
  public on(
    fieldTypeOrEventName: string,
    eventNameOrListener: string | IEventListener,
    listener?: IEventListener,
  ) {
    // When we're given a specific hosted field, only apply the
    // event listener to that hosted field
    if (typeof eventNameOrListener === "string" && listener) {
      checkFieldType(this.frames, fieldTypeOrEventName);
      const field = this.frames[fieldTypeOrEventName];
      if (!field) {
        return;
      }

      field.on(eventNameOrListener, listener);
      return this;
    }

    // ... otherwise, apply the event listener to all hosted
    // fields within the form
    for (const i in frameFieldTypes) {
      if (!frameFieldTypes.hasOwnProperty(i)) {
        continue;
      }

      const fieldType = frameFieldTypes[i];
      if (!this.frames.hasOwnProperty(fieldType)) {
        continue;
      }

      checkFieldType(this.frames, fieldType);
      const field = this.frames[fieldType];
      if (!field) {
        return;
      }
      field.on(fieldTypeOrEventName, eventNameOrListener as IEventListener);
    }
    return this;
  }

  /**
   * Appends additional CSS rules to the group of hosted fields
   *
   * @param json New CSS rules
   */
  public addStylesheet(json: IDictionary) {
    for (const i in frameFieldTypes) {
      if (!frameFieldTypes.hasOwnProperty(i)) {
        continue;
      }

      const type = frameFieldTypes[i];
      if (!this.frames.hasOwnProperty(type)) {
        continue;
      }

      checkFieldType(this.frames, type);
      const field = this.frames[type];
      if (!field) {
        return;
      }
      field.addStylesheet(json);
    }
    return this;
  }

  /**
   * Sets a special-case event listener that fires when all hosted
   * fields in a form have registered / loaded
   *
   * @param fn The listener function
   */
  public ready(fn: (fields: IFrameCollection) => void) {
    let registered = 0;
    let ready = false;

    for (const i in frameFieldTypes) {
      if (!frameFieldTypes.hasOwnProperty(i)) {
        continue;
      }

      const type = frameFieldTypes[i];
      if (!this.frames.hasOwnProperty(type)) {
        continue;
      }

      checkFieldType(this.frames, type);
      const field = this.frames[type];
      if (!field) {
        return;
      }
      field.on("register", () => {
        ready = ++registered === this.totalNumberOfFields;

        if (ready) {
          fn(this.frames);
        }
      });
    }
  }

  /**
   * Deletes all hosted fields within the form
   */
  public dispose() {
    for (const i in frameFieldTypes) {
      if (!frameFieldTypes.hasOwnProperty(i)) {
        continue;
      }

      const type = frameFieldTypes[i];
      if (!this.frames.hasOwnProperty(type)) {
        continue;
      }

      const field = this.frames[type];
      if (!field) {
        return;
      }

      field.emit("dispose");
    }
  }

  private createFrames() {
    for (const type of frameFieldTypes) {
      if (!this.fields[type]) {
        continue;
      }

      const field = (this.frames[type] = new IframeField(
        type,
        this.fields[type],
        assetBaseUrl() + "field.html",
      ));
      this.totalNumberOfFields++;

      if (field === undefined) {
        continue;
      }

      // send all field configuration
      field.on("register", () => {
        if (this.fields[type].placeholder) {
          field.setPlaceholder(this.fields[type].placeholder || "");
        }
        if (this.fields[type].text) {
          field.setText(this.fields[type].text || "");
        }
        if (this.fields[type].value) {
          field.setValue(this.fields[type].value || "");
        }
        if (this.fields[type].label) {
          field.setLabel(this.fields[type].label || "");
        }
        if (this.fields[type].title) {
          field.setTitle(this.fields[type].title || "");
        }
        if (this.styles) {
          field.addStylesheet(this.styles);
        }
      });
    }

    // support tokenization data flows to `card-number` / `account-number`
    if (this.frames.submit !== undefined) {
      this.frames.submit.on("click", () => {
        const target =
          this.frames[`card-number`] || this.frames[`account-number`];

        if (target) {
          this.requestDataFromAll(target);
        }
      });
    }

    const cardNumber = this.frames["card-number"];
    const cardCvv = this.frames["card-cvv"];
    const ctp = this.frames["click-to-pay"];

    // support autocomplete / auto-fill from `card-number` to other fields
    if (cardNumber) {
      cardNumber.on("set-autocomplete-value", (data?: any) => {
        if (!data) {
          return;
        }

        const target = this.frames[data.type];

        if (data.type && data.value && target) {
          target.setValue(data.value);
        }
      });
    }

    // pass card type from `card-number` to `card-cvv`
    if (cardNumber && cardCvv) {
      cardNumber.on("card-type", (data?: any) => {
        postMessage.post(
          {
            data,
            id: cardCvv.id,
            type: "ui:iframe-field:set-card-type",
          },
          cardCvv.id,
        );
        const maxlength = data.cardType === "amex" ? "4" : "3";
        postMessage.post(
          {
            data: {
              maxlength,
            },
            id: cardCvv.id,
            type: "ui:iframe-field:change-cvv-settings",
          },
          cardCvv.id,
        );
      });
    }

    if(ctp) {
      ctp?.container?.querySelector('iframe')?.remove();
      addClickToPay(ctp);
    }
  }

  private requestDataFromAll(target: IframeField) {
    const fields: string[] = [];

    for (const type of frameFieldTypes) {
      if (!this.frames[type]) {
        continue;
      }

      if(type !== "click-to-pay") {
        fields.push(type);
      }
    }

    for (const type of fields) {
      if (type === "submit") {
        continue;
      }

      const field = this.frames[type];

      if (!field) {
        continue;
      }

      postMessage.post(
        {
          data: {
            fields,
            target: target.id,
          },
          id: field.id,
          type: "ui:iframe-field:request-data",
        },
        field.id,
      );
    }
  }
}

function checkFieldType(collection: IFrameCollection, type: string) {
  if (frameFieldTypes.indexOf(type) === -1) {
    throw new Error("Supplied field type is invalid");
  }

  if (!collection[type]) {
    throw new Error(
      "No field with the type `" + type + "` is currently available",
    );
  }
}
