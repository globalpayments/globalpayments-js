import { EventEmitter, generateGuid } from "globalpayments-lib";

import { bus, loadedFrames, options, postMessage } from "../../internal";
import Card from "../../internal/lib/card";
import Events from "../../internal/lib/events";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { json2css } from "../../internal/lib/styles";
import { IDictionary } from "../../internal/lib/util";
import actionAccumulateDataAndTokenize from "./action-accumulate-data-and-tokenize";
import actionAddStylesheet from "./action-add-stylesheet";
import actionCardTrackButtonClick from "./action-card-track-button-click";
import actionGetCvv from "./action-get-cvv";
import actionPaymentRequestComplete from "./action-payment-request-complete";
import actionPaymentRequestStart from "./action-payment-request-start";
import actionRequestData from "./action-request-data";
import actionSetCardType from "./action-set-card-type";
import actionSetFocus from "./action-set-focus";
import actionSetLabel from "./action-set-label";
import actionSetPlaceholder from "./action-set-placeholder";
import actionSetText from "./action-set-text";
import actionSetValue from "./action-set-value";

export interface IFrameCollection {
  [key: string]: IframeField | undefined;
}

export interface IUIFormField {
  label?: string;
  placeholder?: string;
  target?: string;
  text?: string;
  title?: string;
  value?: string;
}

export const fieldTypeAutocompleteMap: IDictionary = {
  "card-cvv": "cc-csc",
  "card-expiration": "cc-exp",
  "card-number": "cc-number",
};

/**
 * Represents logic surrounding individual hosted fields.
 *
 * Static methods are ran within the iframe / child window.
 *
 * Instance methods are ran within the parent window.
 */
export class IframeField extends EventEmitter {
  /**
   * Sets up the hosted field's iframe for further
   * processing, and registers the hosted field
   * with the parent window.
   *
   * @param type Field type of the hosted field
   */
  public static register(type: string) {
    const query = window.location.hash.replace("#", "");
    const data: any = JSON.parse(atob(query));
    const id: string = data.id;
    const enableAutocomplete = data.enableAutocomplete || false;

    IframeField.setHtmlLang(data.lang);
    IframeField.createField(id, type, data.type, enableAutocomplete);
    IframeField.addMessageListener(id, type, data.targetOrigin);

    postMessage.post(
      {
        data: { type },
        id,
        type: "ui:iframe-field:register",
      },
      "parent",
    );
    IframeField.triggerResize(id);

    // Fix iOS issue with cross-origin iframes
    Events.addHandler(document.body, "touchstart", () => { /** */ });
  }

  /**
   * Sets the hosted field's `lang` attribute on the `html` element
   * with the globally configured value.
   *
   * @param lang The configured language code
   */
  public static setHtmlLang(lang: string) {
    const elements = document.querySelectorAll("html");

    if (!elements) {
      return;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      el.lang = lang;
    }
  }

  /**
   * Creates the inner field within the iframe window and sets
   * any appropriate attributes, properties, and event handlers.
   * @param id Field ID
   * @param name Field type
   * @param type Type of element
   * @param enableAutocomplete Whether autocomplete should be enabled
   */
  public static createField(id: string, name: string, type: string, enableAutocomplete: boolean) {
    const input = document.createElement(
      type === "button" ? "button" : "input",
    );
    input.setAttribute("type", type === "button" ? "button" : (name === "card-holder-name" ? "text" : "tel"));
    input.id = paymentFieldId;
    input.className = name;
    input.setAttribute("data-id", id);

    if (enableAutocomplete === true && fieldTypeAutocompleteMap[name]) {
      input.setAttribute("autocomplete", fieldTypeAutocompleteMap[name]);
    }

    if (name === "card-track") {
      const message = "Read Card";
      input.appendChild(document.createTextNode(message));
    } else if (type === "button") {
      const message = "Submit";
      input.appendChild(document.createTextNode(message));
    }

    const label = document.createElement("label");
    label.id = paymentFieldId + "-label";
    label.setAttribute("for", paymentFieldId);
    label.className = "offscreen";

    const dest = document.getElementById(paymentFieldId + "-wrapper");
    if (!dest) {
      return;
    }

    dest.insertBefore(input, dest.firstChild);
    dest.insertBefore(label, dest.firstChild);

    IframeField.addFrameFocusEvent();

    if (enableAutocomplete === true && name === "card-number") {
      IframeField.createAutocompleteField(dest, id, "card-cvv", "cardCsc", "cc-csc");
      IframeField.createAutocompleteField(dest, id, "card-expiration", "cardExpiration", "cc-exp");
      IframeField.createAutocompleteField(dest, id, "card-holder-name", "cardHolderName", "cc-name");
    }

    if (name === "card-track") {
      Events.addHandler(input, "click", () => {
        actionCardTrackButtonClick(id);
      });
    } else if (type === "button") {
      Events.addHandler(input, "click", () => {
        postMessage.post(
          {
            id,
            type: "ui:iframe-field:click",
          },
          "parent",
        );
      });
    }

    switch (name) {
      case "card-number":
        Card.attachNumberEvents("#" + input.id);
        input.name = "cardNumber";
        break;
      case "card-expiration":
        Card.attachExpirationEvents("#" + input.id);
        break;
      case "card-cvv":
        Card.attachCvvEvents("#" + input.id);
        break;
      default:
        break;
    }
  }

  /**
   * Appends a hidden input to the given destination to accept
   * full autocomplete/auto-fill data from the browser. The
   * parent window is also notified of data changes to these
   * fields in order display the new data to the end-user.
   *
   * @param destination Parent node for new element
   * @param id Field ID
   * @param type Field type
   * @param name Field name to be used
   * @param autocomplete Value for field's autocomplete attribute
   */
  public static createAutocompleteField(
    destination: Node,
    id: string,
    type: string,
    name: string,
    autocomplete: string,
  ) {
    const element = document.createElement("input");
    element.name = name;
    element.className = "autocomplete-hidden";
    element.tabIndex = -1;
    element.autocomplete = autocomplete;
    Events.addHandler(element, "input", () => {
      let value = element && element.value ? element.value : "";

      // this shouldn't happen, but explicitly ignore to prevent
      // these fields from leaking their data to the parent
      if (type === "card-number" || type === "account-number") {
        value = "";
      }

      postMessage.post(
        {
          data: {
            type,
            value,
          },
          id,
          type: "ui:iframe-field:set-autocomplete-value",
        },
        "parent",
      );
    });
    destination.appendChild(element);
  }

  /**
   * addFrameFocusEvent
   *
   * Ensures an iframe's document forwards its received focus
   * to the input field. Helps provide consistent behavior in
   * all browsers.
   */
  public static addFrameFocusEvent() {
    const element = document.getElementById(paymentFieldId);
    if (!element) {
      return;
    }

    const focusEventName = "focus";
    const handler = (e: any) => {
      if (e.fromElement === element) {
        return;
      }
      if (e.relatedTarget) {
        return;
      }

      element.focus();
    };

    if ((document as any)["on" + focusEventName + "in"]) {
      Events.addHandler(document, focusEventName + "in", handler);
    } else {
      Events.addHandler(document, focusEventName, handler);
    }
  }

  /**
   * Sets the iframe window's postMessage handler in order to
   * react to parent/sibling events.
   *
   * @param id ID of the hosted field
   * @param type Field type of the hosted field
   * @param targetOrigin Parent window's origin
   */
  public static addMessageListener(
    id: string,
    type: string,
    targetOrigin: string,
  ) {
    // update the global state with information about the parent window
    loadedFrames.parent = {
      frame: parent,
      url: targetOrigin,
    } as any;

    postMessage.receive((data: any) => {
      if (!data.id || (data.id && data.id !== id)) {
        return;
      }

      const event: string = data.type.replace("ui:iframe-field:", "");

      switch (event) {
        case "accumulate-data":
          actionAccumulateDataAndTokenize(id, type, data);
          break;
        case "add-stylesheet":
          actionAddStylesheet(data.data.css);
          IframeField.triggerResize(id);
          break;
        case "get-cvv":
          actionGetCvv(id, type);
          break;
        case "payment-request-complete":
          actionPaymentRequestComplete(id, data);
          break;
        case "payment-request-start":
          actionPaymentRequestStart(id, data);
          break;
        case "request-data":
          actionRequestData(id, type, data);
          break;
        case "set-card-type":
          actionSetCardType(data.data.cardType);
          break;
        case "set-focus":
          actionSetFocus();
          break;
        case "set-placeholder":
          actionSetPlaceholder(data.data.placeholder);
          IframeField.triggerResize(id);
          break;
        case "set-text":
          actionSetText(data.data.text);
          IframeField.triggerResize(id);
          break;
        case "set-value":
          actionSetValue(data.data.value);
          IframeField.triggerResize(id);
          break;
        case "set-label":
          actionSetLabel(data.data.label);
          IframeField.triggerResize(id);
          break;
        case "update-options":
          for (const prop in data.data) {
            if (data.data.hasOwnProperty(prop)) {
              options[prop] = data.data[prop];
            }
          }
          break;
        default:
          break;
      }
    });
  }

  /**
   * Triggers a resize of the hosted field's iframe element
   * within the parent window.
   *
   * @param id ID of the hosted field
   */
  public static triggerResize(id: string) {
    postMessage.post(
      {
        data: {
          height: document.body.offsetHeight + 1,
        },
        id,
        type: "ui:iframe-field:resize",
      },
      "parent",
    );
  }

  public container: Element | null;
  public frame: HTMLIFrameElement;
  public id: string;
  public targetNode: any;
  public type: "button" | "input";
  public url: string;

  /**
   * Instantiates a new IframeField object for a hosted field
   *
   * @param type Field type of the hosted field
   * @param opts Options for creating the iframe / hosted field
   * @param src URL for the hosted field's iframe
   */
  constructor(type: string, opts: IUIFormField, src: string) {
    super();

    const selector = opts.target || "";

    this.id = btoa(generateGuid());
    this.type = type === "submit" || type === "card-track" ? "button" : "input";
    this.url = src;
    this.frame = this.makeFrame(type, this.id, opts);
    this.frame.onload = () => {
      this.emit("load");
    };
    this.frame.src =
      src +
      "#" +
      // initial data for the iframe
      btoa(
        JSON.stringify({
          enableAutocomplete: options.enableAutocomplete,
          id: this.id,
          lang: options.language || "en",
          targetOrigin: window.location.href,
          type: this.type,
        }),
      );

    this.container = document.querySelector(selector);

    if (!this.container) {
      bus.emit("error", {
        error: true,
        reasons: [
          {
            code: "ERROR",
            message: "IframeField: target cannot be found with given selector",
          },
        ],
      });
      return;
    }

    if (this.container.hasChildNodes()) {
      this.container.insertBefore(this.frame, this.container.firstChild);
    } else {
      this.container.appendChild(this.frame);
    }

    this.on("dispose", () => {
      loadedFrames[this.id] = undefined;
      if (this.container) {
        this.container.removeChild(this.frame);
      }
    });

    // handle events coming from the iframe
    postMessage.receive((data: any) => {
      if (!data.id || (data.id && data.id !== this.id)) {
        return;
      }

      const event: string = data.type.replace("ui:iframe-field:", "");

      switch (event) {
        case "register":
          postMessage.post(
            {
              data: options,
              id: this.id,
              type: "ui:iframe-field:update-options",
            },
            this.id,
          );
          break;
        case "resize":
          this.frame.style.height = `${data.data.height}px`;
          break;
        case "pass-data":
          postMessage.post(
            {
              data: {
                type: data.data.type,
                value: data.data.value,
              },
              id: data.data.target,
              type: "ui:iframe-field:accumulate-data",
            },
            data.data.target,
          );
          return;
        default:
          break;
      }

      // re-emit event to the integrator
      this.emit(event, data.data);
    });

    // keep an instance of the hosted field for future interaction
    // with the iframe
    loadedFrames[this.id] = this;
  }

  /**
   * Appends additional CSS rules to the hosted field
   *
   * @param json New CSS rules
   */
  public addStylesheet(json: IDictionary) {
    const css = json2css(json);
    postMessage.post(
      {
        data: { css },
        id: this.id,
        type: "ui:iframe-field:add-stylesheet",
      },
      this.id,
    );
  }

  /**
   * Gets the CVV value from the `card-cvv` hosted field.
   *
   * Used by gateway implementations that do not store the CVV
   * with the token value:
   *
   * - TransIT (tsep)
   * - Heartland Bill pay (billpay)
   *
   * @returns A promise that resolves with the CVV value
   */
  public getCvv() {
    postMessage.post(
      {
        id: this.id,
        type: "ui:iframe-field:get-cvv",
      },
      this.id,
    );

    return new Promise((resolve) => {
      postMessage.receive((data: any) => {
        if (!data.id || (data.id && data.id !== this.id)) {
          return;
        }

        const event: string = data.type.replace("ui:iframe-field:", "");

        if (event === "get-cvv") {
          resolve(data.data);
          return;
        }
      });
    });
  }

  /**
   * Sets input focus on the hosted field
   */
  public setFocus() {
    postMessage.post(
      {
        id: this.id,
        type: "ui:iframe-field:set-focus",
      },
      this.id,
    );
  }

  /**
   * Sets the placeholder text of a hosted field
   *
   * @param placeholder The desired palceholder text
   */
  public setPlaceholder(placeholder: string) {
    postMessage.post(
      {
        data: { placeholder },
        id: this.id,
        type: "ui:iframe-field:set-placeholder",
      },
      this.id,
    );
  }

  /**
   * Sets the text content of a hosted field
   *
   * @param text The desired text value
   */
  public setText(text: string) {
    postMessage.post(
      {
        data: { text },
        id: this.id,
        type: "ui:iframe-field:set-text",
      },
      this.id,
    );
  }

  /**
   * Sets the value of a hosted field
   *
   * @param value The desired input value
   */
  public setValue(value: string) {
    postMessage.post(
      {
        data: { value },
        id: this.id,
        type: "ui:iframe-field:set-value",
      },
      this.id,
    );
  }

  /**
   * Sets the label of a hosted field
   *
   * @param label The desired input label
   */
  public setLabel(label: string) {
    postMessage.post(
      {
        data: { label },
        id: this.id,
        type: "ui:iframe-field:set-label",
      },
      this.id,
    );
  }

  /**
   * Sets the title of a hosted field
   *
   * @param title The desired title
   */
  public setTitle(title: string) {
    this.frame.title = title;
  }

  private makeFrame(type: string, id: string, opts: IUIFormField) {
    const frame = document.createElement("iframe");
    frame.id = `secure-payment-field-${type}-${id}`;
    frame.name = type;
    if (opts.title || opts.label) {
      frame.title = opts.title || opts.label || "";
    }
    frame.style.border = "0";
    frame.style.height = "50px";
    frame.frameBorder = "0";
    frame.scrolling = "no";
    frame.setAttribute("allowtransparency", "true");
    frame.allowPaymentRequest = true;
    return frame;
  }
}
