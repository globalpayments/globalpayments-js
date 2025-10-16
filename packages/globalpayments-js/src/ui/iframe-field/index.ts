import { EventEmitter, generateGuid } from "globalpayments-lib";
import { bus, loadedFrames, options, postMessage } from "../../internal";
import Card from "../../internal/lib/card";
import Events from "../../internal/lib/events";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { json2css } from "../../internal/lib/styles";
import { IDictionary } from "../../internal/lib/util";
import actionAccumulateDataAndTokenize from "./action-accumulate-data-and-tokenize";
import actionAccumulateInstallmentData from "./installments/action-request-accumulate-data";
import actionAccumulateCurrencyConversionData from "./currency-conversion/action-request-accumulate-data";
import actionAddStylesheet from "./action-add-stylesheet";
import actionCardTrackButtonClick from "./action-card-track-button-click";
import actionGetCvv from "./action-get-cvv";
import actionPaymentRequestComplete from "./action-payment-request-complete";
import actionPaymentRequestStart from "./action-payment-request-start";
import actionRequestData from "./action-request-data";
import actionRequestInstallmentData from "./installments/action-request-data";
import actionRequestCurrencyConversionData from "./currency-conversion/action-request-data";
import actionSetCardType from "./action-set-card-type";
import actionSetFocus from "./action-set-focus";
import actionSetLabel from "./action-set-label";
import actionSetPlaceholder from "./action-set-placeholder";
import actionSetText from "./action-set-text";
import actionSetValue from "./action-set-value";
import actionSetTypeCvv from "./action-set-type-cvv";
import actionCardRequestInstallments from "./installments/action-request-start";
import actionCurrencyConversion from "./currency-conversion/action-request-start";
import actionGetCurrencyConversionValue from "./currency-conversion/action-get-value";
import { InstallmentEvents } from "../../internal/lib/installments/contracts/enums";
import assetBaseUrl from "../../internal/lib/asset-base-url";
import { CardFormFieldNames, ExpressPayFieldNames,HostedFieldValidationEvents } from "../../common/enums";

import actionShowValidation from "./action-show-validation";
import actionHideValidation from "./action-hide-validation";
import actionValidateValue from "./action-validate-value";
import actionValidateForm from "./action-validate-form";
import actionEnableSubmitButton from "./action-enable-submit-button";
import {translateMessage} from "../../internal/lib/translate";
import translations from "../../internal/lib/translations/translations";

import { ApmInternalEvents } from "../../apm/enums";
import actionQRCodePaymentMethodsRequestStart from "./qr-code-payment-methods/action-request-start";
import actionSetCustomMessages from "./action-set-custom-message";
import { CurrencyConversionEvents } from "../../internal/lib/currency-conversion/contracts/enums";
import { DCC_KEY } from "../../internal/lib/currency-conversion/contracts/constants";
import { IUIFormOptions } from "../form";
import CountryList from "country-list-with-dial-code-and-flag";
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg';
import { Country, State, City } from 'country-state-city';
import { ApmProviders, ExpressPayEvents } from "../../internal/lib/enums";

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
  amount?: string;
  fieldOptions?: any;
  validationMessages?: object;
}

export const fieldTypeAutocompleteMap: IDictionary = {
  "card-cvv": "cc-csc",
  "card-expiration": "cc-exp",
  "card-number": "cc-number",
  "card-holder-name": "cc-name"
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
    const enableAutocomplete = data.enableAutocomplete !== undefined ? data.enableAutocomplete : true;
    const fieldOptions = data.fieldOptions;
    const disablePayButton = data.disabledPayButton || false;
    IframeField.setHtmlLang(data.lang);
    IframeField.createField(id, type, data.type, enableAutocomplete, fieldOptions, disablePayButton);
    IframeField.addMessageListener(id, type, data.targetOrigin,fieldOptions);

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
    Events.addHandler(document.body, "touchstart", () => {
      /** */
    });
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
   * @param fieldOptions Field Options
   */
  public static createField(
    id: string,
    name: string,
    type: string,
    enableAutocomplete: boolean,
    fieldOptions?: any,
    disabledPayButton?: boolean,
  ) {
    // type = "button";
    const query = window.location.hash.replace("#", "");
    const data: any = JSON.parse(atob(query));

    const formOptionFields = data.formOptionFields;
    const input:any = document.createElement(
      type === "button" ? "button" : (type === "select" ? "select" : "input"),
    );
    input.setAttribute(
      "type",
      type === "button"
        ? "button"
        : name === "card-holder-name"
        ? "text"
        : "tel",
    );
    input.name = name;
    input.id = paymentFieldId;
    input.className = name;
    input.setAttribute("data-id", id);

    const countryArray = CountryList.getAll();
      const countryDialCodes = countryArray.map(item => {
        const obj = {
          "code":item.code,
          "countryCode":item.countryCode,
          "countryName":item.name,
          "dial_code":item.dial_code,
          "flag":CountryFlagSvg[item.code]
        }
        return obj;
      });
      const states = State.getStatesOfCountry('US');

    if(type === "select" && (name === ExpressPayFieldNames.Country || name === ExpressPayFieldNames.ShippingCountry)){
      countryDialCodes.forEach(element =>{
        const option = document.createElement("option");
        if(element.countryName === "United States"){
          option.value = element.code;
          option.text = `${element.countryName}`;
          option.setAttribute("selected","selected");
          input.appendChild(option);
        }
      })
    }
    else if(type === "select" && (name === ExpressPayFieldNames.BillingState || name === ExpressPayFieldNames.ShippingState)){
      states.forEach(element =>{
        const option = document.createElement("option");
        option.value = element.isoCode;
        option.text = element.name;
        input.appendChild(option);
      })
    }
    else if (type === "select" && name === ExpressPayFieldNames.CountryCode) {
      countryDialCodes.forEach(element => {
        const option = document.createElement("option");
        if (element.countryName === "United States") {
          option.value = element.dial_code;
          option.text = `${element.dial_code}`;
          option.setAttribute("selected", "selected");
          input.appendChild(option);
        }
      });
    }

    if (enableAutocomplete === true && fieldTypeAutocompleteMap[name]) {
      input.setAttribute("autocomplete", fieldTypeAutocompleteMap[name]);
    }

    if (name === "card-track") {
      const message = "Read Card";
      input.appendChild(document.createTextNode(message));
    } else if (type === "button") {
      // const message = translateMessage(data.lang, translations.en.values.submit);
      const message = formOptionFields?.submit ? formOptionFields?.submit : translateMessage(data.lang, translations.en.values.submit);
      input.appendChild(document.createTextNode(message));
      if(disabledPayButton){
        input.classList.add('disabled-submit-button');
      }
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
      IframeField.createAutocompleteField(
        dest,
        id,
        "card-cvv",
        "cardCsc",
        "Card CVV",
        "cc-csc",
      );
      IframeField.createAutocompleteField(
        dest,
        id,
        "card-expiration",
        "cardExpiration",
        "Card Expiration",
        "cc-exp",
      );
      IframeField.createAutocompleteField(
        dest,
        id,
        "card-holder-name",
        "cardHolderName",
        "Card Holder Name",
        "cc-name",
      );
    }

    if (name === CardFormFieldNames.CardNumber) {
      input.setAttribute("data-prev", "0");
      const icon = document.createElement('img');
      icon.className = 'card-number-icon';
      icon.setAttribute('aria-disabled', 'false');
      if (fieldOptions === undefined ||
          (fieldOptions && (fieldOptions.styleType === undefined || fieldOptions.styleType === "blank"))
      ) {
        icon.setAttribute('aria-hidden', "true");
      }
      icon.setAttribute('alt', 'Generic Card');
      icon!.setAttribute('title', 'Generic Card');
      icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      icon.setAttribute('onerror', 'this.onerror=null; this.src="' +`${assetBaseUrl()}images/gp-cc-generic.svg` + '"');
      dest.insertBefore(icon, input);
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
      case CardFormFieldNames.CardNumber:
        Card.attachNumberEvents("#" + input.id);
        input.name = "cardNumber";
        break;
      case CardFormFieldNames.CardExpiration:
        Card.attachExpirationEvents("#" + input.id);
        break;
      case CardFormFieldNames.CardCvv:
        Card.attachCvvEvents("#" + input.id);
        break;
      case CardFormFieldNames.CardHolderName:
        Card.attachCardHolderNameEvents("#" + input.id,CardFormFieldNames.CardHolderName);
        break;
      case ExpressPayFieldNames.EmailId:
        Card.attachEmailEvents("#" + input.id);
        break;
      case ExpressPayFieldNames.CountryCode:
        Card.attachCountryEvents("#" + input.id,ExpressPayFieldNames.CountryCode);
        break;
      case ExpressPayFieldNames.Phone:
        Card.attachPhoneEvents("#" + input.id);
        break;
      case ExpressPayFieldNames.BillingAddress:
        Card.attachAddressEvents("#" + input.id,ExpressPayFieldNames.BillingAddress);
        break;
      case ExpressPayFieldNames.Country:
        Card.attachCountryEvents("#" + input.id,ExpressPayFieldNames.Country);
        break;
      case ExpressPayFieldNames.BillingCity:
        Card.attachCardHolderNameEvents("#" + input.id,ExpressPayFieldNames.BillingCity);
        break;
      case ExpressPayFieldNames.ShippingCity:
        Card.attachCardHolderNameEvents("#" + input.id,ExpressPayFieldNames.ShippingCity);
        break;
      case ExpressPayFieldNames.BillingState:
        Card.attachCountryEvents("#" + input.id,ExpressPayFieldNames.BillingState);
        break;
      case ExpressPayFieldNames.ShippingState:
        Card.attachCountryEvents("#" + input.id,ExpressPayFieldNames.ShippingState);
        break;
      case ExpressPayFieldNames.BillingPostalCode:
        Card.attachPostalCodeEvents("#" + input.id,ExpressPayFieldNames.BillingPostalCode);
        break;
      case ExpressPayFieldNames.ShippingPostalCode:
        Card.attachPostalCodeEvents("#" + input.id,ExpressPayFieldNames.ShippingPostalCode);
        break;
      case ExpressPayFieldNames.ShippingAddress:
        Card.attachAddressEvents("#" + input.id,ExpressPayFieldNames.ShippingAddress);
        break;
      case ExpressPayFieldNames.ShippingCountry:
        Card.attachCountryEvents("#" + input.id,ExpressPayFieldNames.ShippingCountry);
        break;
      case ExpressPayFieldNames.ShippingName:
        Card.attachCardHolderNameEvents("#" + input.id,ExpressPayFieldNames.ShippingName);
        break;
      case DCC_KEY:
        input.hidden = true;
        break;
      default:
        break;
    }
  }

  /**
   * Appends a hidden input to the given destination to accept
   * full autocomplete/autofill data from the browser. The
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
    label: string,
    autocomplete: string,
  ) {
    const element = document.createElement("input");
    element.name = name;
    element.className = "autocomplete-hidden";
    element.tabIndex = -1;
    element.autocomplete = autocomplete;
    element.setAttribute('aria-label', label);
    element.setAttribute('aria-hidden', "true");

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
    fieldOptions?:any
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
        case InstallmentEvents.CardInstallmentsAccumulateData:
          actionAccumulateInstallmentData(id, type, data);
          break;
        case CurrencyConversionEvents.CurrencyConversionAccumulateData:
          actionAccumulateCurrencyConversionData(id, type, data);
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
        case InstallmentEvents.CardInstallmentsRequestData:
          actionRequestInstallmentData(id, type, data);
          break;
        case CurrencyConversionEvents.CurrencyConversionRequestData:
          actionRequestCurrencyConversionData(id, type, data);
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
        case "change-cvv-settings":
          actionSetTypeCvv(data.data.maxlength);
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
        case "get-value":
          // Get the value from the input element in the iframe
          const input = document.getElementById(paymentFieldId) as HTMLInputElement | HTMLSelectElement;
          postMessage.post(
            {
              data: { value: input ? input.value : "" },
              id,
              type: "ui:iframe-field:get-value",
            },
            "parent"
          );
          break;
        case "set-label":
          actionSetLabel(data.data.label);
          IframeField.triggerResize(id);
          break;
        case InstallmentEvents.CardInstallmentsRequestStart:
          actionCardRequestInstallments(id, data.data);
          break;
        case CurrencyConversionEvents.CurrencyConversionRequestStart:
          actionCurrencyConversion(id, data.data);
          break;
        case CurrencyConversionEvents.CurrencyConversionSendValue:
          actionGetCurrencyConversionValue(id, data);
          break;
        case "update-options":
          for (const prop in data.data) {
            if (data.data.hasOwnProperty(prop)) {
              options[prop] = data.data[prop];
            }
          }
          break;

        case HostedFieldValidationEvents.BuiltInValidationShow:
          let validationMessage = data.data.validationMessage;
          if (options.language) {
            validationMessage = translateMessage(options.language, validationMessage);
            // If the validation message is not found in the translation object,
            // it indicates that it is a custom message
            if (validationMessage === undefined) {
              validationMessage = data.data.validationMessage;
            }
          }
          actionShowValidation(id, validationMessage, data.data.fieldType,fieldOptions?.styleType);
          IframeField.triggerResize(id);
          break;
        case HostedFieldValidationEvents.SetCustomValidationMessages:
          const customValidationMessages = data.data.customValidationMessages;
          actionSetCustomMessages(type, customValidationMessages);
          break;
        case HostedFieldValidationEvents.BuiltInValidationHide:
          actionHideValidation(id, data.data.fieldType);
          IframeField.triggerResize(id);
          break;
        case HostedFieldValidationEvents.Validate:
          actionValidateValue(id, type, data.data.target, data.data.expressPayValidation);
          IframeField.triggerResize(id);
          break;
        case HostedFieldValidationEvents.ValidateForm:
          actionValidateForm(id, data);
          break;

        case ApmInternalEvents.PaymentMethodsRequestStart:
          actionQRCodePaymentMethodsRequestStart(id, data.data);
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
  public type: "button" | "input" | "select";
  public url: string;
  public formOptionFields: IUIFormOptions | undefined;
  public expressPayEnabled: boolean = false;

  /**
   * Instantiates a new IframeField object for a hosted field
   *
   * @param type Field type of the hosted field
   * @param opts Options for creating the iframe / hosted field
   * @param src URL for the hosted field's iframe
   */
  constructor(type: string, opts: IUIFormField, src: string, formOptionFields?:IUIFormOptions) {
    super();

    const selector = opts.target || "";

    this.id = btoa(generateGuid());
    // this.type = type === "submit" || type === "card-track" ? "button" : "input";
    switch(type){
      case ("submit") :
      case ("card-track") : {
        this.type = "button"
      }
      break;
      case ("country") :
      case ("country-code") :
      case ("shipping-address-country") :
      case ("billing-state") :
      case ("shipping-state") :
      {
        this.type = "select"
      }
      break;
      default : {
        this.type = "input"
      }
    }
    this.url = src;
    this.formOptionFields = formOptionFields;
    this.frame = this.makeFrame(type, this.id, opts);
    this.frame.onload = () => {
      this.emit("load");
    };
    if(options.expressPay?.enabled){
      this.expressPayEnabled = true;
    }
    this.frame.src =
      src +
      "#" +
      // initial data for the iframe
      btoa(
        JSON.stringify({
          enableAutocomplete: options.enableAutocomplete,
          id: this.id,
          lang: options.language || "en",
          targetOrigin: window.location.origin,
          type: this.type,
          fieldOptions: opts.fieldOptions,
          formOptionFields:this.formOptionFields,
          disabledPayButton: options.disablePayButton,
          frame: this.frame
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
              frames:this.frame
            },
            this.id,
          );
          break;
        case "resize":
          this.frame.style.height = `${data.data.height}px`;
          break;
        case "pass-data":
          const installment = data.data.installment;
          const currencyConversion = data.data.currencyConversion;

          let shippingSameAsBilling:any;

          if(this.expressPayEnabled){
            shippingSameAsBilling = document.getElementById('shipping-as-billing-checkbox');
          }
          postMessage.post(
            {
              data: {
                type: data.data.type,
                value: data.data.value,
                isShippingSameAsBilling: shippingSameAsBilling?.checked,
                expressPayOptions: this.expressPayEnabled ? options.expressPay : {},
                ...(installment ? { installment } : {}),
                ...(currencyConversion ? { currencyConversion } : {})
              },
              id: data.data.target,
              type: "ui:iframe-field:accumulate-data",
            },
            data.data.target,
          );
          return;
        case HostedFieldValidationEvents.ValidatePassData:
          postMessage.post(
            {
              data: data.data,
              id: data.data.target,
              type: `ui:iframe-field:${HostedFieldValidationEvents.ValidateForm}`,
            },
            data.data.target,
          );
          return;
        case InstallmentEvents.CardInstallmentsPassData:
          postMessage.post(
            {
              data: {
                type: data.data.type,
                value: data.data.value,
              },
              id: data.data.target,
              type: `ui:iframe-field:${InstallmentEvents.CardInstallmentsAccumulateData}`,
            },
            data.data.target,
          );
          break;
        case CurrencyConversionEvents.CurrencyConversionPassData:
          postMessage.post(
            {
              data: {
                type: data.data.type,
                value: data.data.value,
              },
              id: data.data.target,
              type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionAccumulateData}`,
            },
            data.data.target,
          );
          break;
      // TODO
      //  case HostedFieldValidationEvents.EnableSubmitButton:
      //     actionEnableSubmitButton(data)
      //     break;
        case "token-success":
          if (data.data.expressPayEnabled) {
            if(this.formOptionFields?.provider === ApmProviders.ExpressPay){
              data.data.provider = ApmProviders.ExpressPay;
            }
            const merchantCustomEventProvideDetails = new CustomEvent(ExpressPayEvents.ExpressPayActionDetail, {
              detail: data.data
            });
            window.dispatchEvent(merchantCustomEventProvideDetails);
            return;
          }
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

  // getButtonIframe(){
  //   for (const frameId in loadedFrames) {
  //       if (loadedFrames[frameId]?.type === "button") {
  //         return loadedFrames[frameId];
  //       }
  //     }
  //   return null;
  // }

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

  public getValue(){
    return new Promise((resolve) => {
      // Listen for the response from the iframe
      const handler = (data: any) => {
        if (!data.id || data.id !== this.id) return;
        const event = data.type.replace("ui:iframe-field:", "");
        if (event === "get-value") {
          resolve(data.data.value);
          // Optionally: remove this handler after resolving
        }
      };
      postMessage.receive(handler);

      // Ask the iframe for its value
      postMessage.post(
        {
          id: this.id,
          type: "ui:iframe-field:get-value",
        },
        this.id
      );
    });
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

  /**
   * Sets custom validation messages for the hosted field
   *
   * @param customMessages - an object containing custom validation messages
   * The `msg` object should have keys corresponding to specific validation messages for the field.
   * For example, { NotCompleted: 'Custom not completed message', YearNotValid: 'Custom year not valid message' }.
   */
  public setCustomValidationMessages(customMessages: object) {
    postMessage.post(
      {
        data: {
          customValidationMessages: customMessages,
          fieldType: this.frame.name,
        },
        id: this.id,
        type: `ui:iframe-field:${HostedFieldValidationEvents.SetCustomValidationMessages}`,
      },
      this.id,
    );
  }

  /**
   * Show the validation of a hosted field
   *
   * @param validationMessage The desired validation message
   */
  public showValidation(validationMessage: string) {
    postMessage.post(
      {
        data: {
          validationMessage,
          fieldType: this.frame.name,
        },
        id: this.id,
        type: `ui:iframe-field:${HostedFieldValidationEvents.BuiltInValidationShow}`,
      },
      this.id,
    );
  }

  /**
   * Hide the validation of a hosted field
   *
   */
  public hideValidation() {
    postMessage.post(
      {
        data: {
          fieldType: this.frame.name,
        },
        id: this.id,
        type: `ui:iframe-field:${HostedFieldValidationEvents.BuiltInValidationHide}`,
      },
      this.id,
    );
  }

  /**
   * Validate hosted field
   *
   */
  public validate() {
    postMessage.post(
      {
        data: { },
        id: this.id,
        type: `ui:iframe-field:${HostedFieldValidationEvents.Validate}`,
      },
      this.id,
    );
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
