import assetBaseUrl from "../../internal/lib/asset-base-url";
import { postMessage } from "../../internal/lib/post-message";
import {
  fieldStyles as defaultFieldStyles,
  parentStyles as defaultParentStyles,
} from "../../internal/lib/styles/default";
import {
  fieldStyles as simpleFieldStyles,
  parentStyles as simpleParentStyles,
} from "../../internal/lib/styles/simple";
import { IDictionary } from "../../internal/lib/util";
import { IEventListener } from "../../lib/event-emitter";
import { IFrameCollection, IframeField, IUIFormField } from "../iframe-field";

export { IUIFormField } from "../iframe-field";

export const fieldStyles = {
  blank: {},
  default: defaultFieldStyles,
  simple: simpleFieldStyles,
};

export const parentStyles = {
  blank: {},
  default: defaultParentStyles,
  simple: simpleParentStyles,
};

export interface IUIFormOptions {
  labels?: IDictionary;
  placeholders?: IDictionary;
  prefix?: string;
  style?: "default" | "simple" | "blank";
  titles?: IDictionary;
  values?: IDictionary;
}

export const frameFieldTypes = [
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

export default class UIForm {
  public frames: IFrameCollection;
  public fields: IUIFormFields;
  public styles: object;
  private totalNumberOfFields = 0;

  public constructor(fields: IUIFormFields, styles: object) {
    this.frames = {};
    this.fields = fields;
    this.styles = styles;

    this.createFrames();
  }

  public on(
    type: string,
    event: string | IEventListener,
    listener?: IEventListener,
  ) {
    if (typeof event === "string" && listener) {
      checkFieldType(this.frames, type);
      const field = this.frames[type];
      if (!field) {
        return;
      }

      field.on(event, listener);
      return this;
    }

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
      field.on(type, event as IEventListener);
    }
    return this;
  }

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
      });
    }
  }

  private requestDataFromAll(target: IframeField) {
    const fields: string[] = [];

    for (const type of frameFieldTypes) {
      if (!this.frames[type]) {
        continue;
      }

      fields.push(type);
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
