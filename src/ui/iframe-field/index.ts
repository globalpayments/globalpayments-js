import { bus, loadedFrames, options, postMessage } from "../../internal";
import Card from "../../internal/lib/card";
import Events from "../../internal/lib/events";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { json2css } from "../../internal/lib/styles";
import { IDictionary } from "../../internal/lib/util";
import EventEmitter from "../../lib/event-emitter";
import generateGuid from "../../lib/generate-guid";

import actionAccumulateDataAndTokenize from "./action-accumulate-data-and-tokenize";
import actionAddStylesheet from "./action-add-stylesheet";
import actionCardTrackButtonClick from "./action-card-track-button-click";
import actionPaymentRequestComplete from "./action-payment-request-complete";
import actionPaymentRequestStart from "./action-payment-request-start";
import actionRequestData from "./action-request-data";
import actionSetCardType from "./action-set-card-type";
import actionSetFocus from "./action-set-focus";
import actionSetPlaceholder from "./action-set-placeholder";
import actionSetText from "./action-set-text";
import actionSetValue from "./action-set-value";

export interface IFrameCollection {
  [key: string]: IframeField | undefined;
}

export class IframeField extends EventEmitter {
  public static register(type: string) {
    const query = window.location.hash.replace("#", "");
    const data: any = JSON.parse(atob(query));
    const id: string = data.id;

    IframeField.createField(id, type, data.type);
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
  }

  public static createField(id: string, name: string, type: string) {
    const input = document.createElement(
      type === "button" ? "button" : "input",
    );
    input.setAttribute("type", type === "button" ? "button" : "tel");
    input.id = paymentFieldId;
    input.className = name;
    input.setAttribute("data-id", id);

    if (name === "card-track") {
      const message = "Read Card";
      input.appendChild(document.createTextNode(message));
    } else if (type === "button") {
      const message = "Submit";
      input.appendChild(document.createTextNode(message));
    }

    const dest = document.getElementById(paymentFieldId + "-wrapper");
    if (!dest) {
      return;
    }
    dest.insertBefore(input, dest.firstChild);

    IframeField.addFrameFocusEvent();

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

  public static addMessageListener(
    id: string,
    type: string,
    targetOrigin: string,
  ) {
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
        case "update-options":
          for (const prop in data.data) {
            if (data.data.hasOwnProperty(prop)) {
              options[prop] = data.data[prop];
            }
          }
          break;
      }
    });
  }

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

  constructor(type: string, selector: string, src: string) {
    super();

    this.id = btoa(generateGuid());
    this.type = type === "submit" || type === "card-track" ? "button" : "input";
    this.url = src;
    this.frame = this.makeFrame(type, this.id);
    this.frame.onload = () => {
      this.emit("load");
    };
    this.frame.src =
      src +
      "#" +
      btoa(
        JSON.stringify({
          id: this.id,
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

    this.container.appendChild(this.frame);
    this.on("dispose", () => {
      loadedFrames[this.id] = undefined;
      if (this.container) {
        this.container.removeChild(this.frame);
      }
    });

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
          break;
        default:
          break;
      }

      this.emit(event, data.data);
    });

    loadedFrames[this.id] = this;
  }

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

  public setFocus() {
    postMessage.post(
      {
        id: this.id,
        type: "ui:iframe-field:set-focus",
      },
      this.id,
    );
  }

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

  private makeFrame(type: string, id: string) {
    const frame = document.createElement("iframe");
    frame.id = `secure-payment-field-${type}-${id}`;
    frame.name = type;
    frame.style.border = "0";
    frame.frameBorder = "0";
    frame.scrolling = "no";
    frame.setAttribute("allowtransparency", "true");
    return frame;
  }
}
