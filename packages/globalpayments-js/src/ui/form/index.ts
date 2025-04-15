import { IEventListener } from "globalpayments-lib";

import assetBaseUrl from "../../internal/lib/asset-base-url";
import { bus, options, postMessage } from "../../internal";
import {
  fieldStyles as defaultFieldStyles,
  parentStyles as defaultParentStyles,
} from "../../internal/lib/styles/default";
import {
  fieldStyles as gpDefaultFieldStyles,
  parentStyles as gpDefaultParentStyles,
} from "../../internal/lib/styles/gp-default";
import { fieldStyles as simpleFieldStyles, parentStyles as simpleParentStyles } from "../../internal/lib/styles/simple";
import { IDictionary } from "../../internal/lib/util";
import { IFrameCollection, IframeField, IUIFormField } from "../iframe-field";
import addClickToPay from "../iframe-field/click-to-pay/action-add";
import addGooglePay from "../iframe-field/google-pay/action-add";
import addApplePay from "../iframe-field/apple-pay/action-add";
import {Apm, ApmProviders, CardFormEvents} from "../../internal/lib/enums";
import addInstallments from "../iframe-field/installments/action-add";
import { InstallmentEvents } from "../../internal/lib/installments/contracts/enums";
import { verifyInstallmentAvailability } from "../../internal/lib/installments/contracts/installment-plans-data";
import { INSTALLMENTS_KEY } from "../../internal/lib/installments/contracts/constants";
import { InstallmentPaymentData } from "../../internal/lib/installments/installments-handler";
import addIssuerBanner from "../../internal/lib/installments/components/add-issuer-banner";
import { getHaveVirginMoneyCreditCardBannerTemplate } from "../../internal/lib/installments/templates/common";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { resetValidationRoundCounter } from "../../internal/built-in-validations/helpers";

import { ApmInternalEvents } from "../../apm/enums";
import addQRCodePaymentMethods from "../iframe-field/qr-code-payment-methods/action-add";
import { normalizePaymentMethodConfigurations } from "../../apm/qr-code-payments/helpers";
import { IPaymentMethodConfigurationNormalized } from "../../apm/qr-code-payments/contracts";
import { DCC_KEY } from "../../internal/lib/currency-conversion/contracts/constants";
import {
  CurrencyConversionEvents,
  CurrencyConversionStatus
} from "../../internal/lib/currency-conversion/contracts/enums";
import addCurrencyConversion from "../iframe-field/currency-conversion/action-add";
import { resetCurrencyConversion } from "../../internal/lib/currency-conversion/utils/reset-currency-conversion";
import { cleanUpCurrencyConversionAvailabilityStatus, cleanUpCurrencyConversionPreviousValue, getCurrencyConversionAvailabilityStatus, setCurrencyConversionAvailabilityStatus } from "../../internal/lib/currency-conversion/utils/helpers";
import addPaymentMethod from "../iframe-field/payment-methods/action-add";

import { getFieldStyles, getParentStyles } from "../../internal/lib/styles/themes/brand-themes/brand-themes";
import addOrderInformation from "../components/order-information/action-add-order-information";

export { IUIFormField } from "../iframe-field";

export const fieldStyles = () => ({
  blank: {},
  default: defaultFieldStyles(assetBaseUrl()),
  "gp-default": gpDefaultFieldStyles(assetBaseUrl()),
  simple: simpleFieldStyles(assetBaseUrl()),

  // Brand theme styles
  ...(getFieldStyles(assetBaseUrl())),
});

export const parentStyles = () => ({
  blank: {},
  default: defaultParentStyles(assetBaseUrl()),
  "gp-default": gpDefaultParentStyles(assetBaseUrl()),
  simple: simpleParentStyles(assetBaseUrl()),

  // Brand theme styles
  ...(getParentStyles(assetBaseUrl())),
});

export interface IUIFormOptions {
  labels?: IDictionary;
  placeholders?: IDictionary;
  prefix?: string;
  style?: "default" | "simple" | "blank" | "gp-default";
  titles?: IDictionary;
  values?: IDictionary;
  amount?: number;
  apms?: IDictionary;
}

export const frameFieldTypes = [
  Apm.Blik,
  Apm.ClickToPay,
  Apm.GooglePay,
  Apm.ApplePay,
  Apm.OpenBankingPayment,
  Apm.PayPal,
  Apm.QRCodePayments,
  CardFormFieldNames.CardNumber,
  CardFormFieldNames.CardExpiration,
  CardFormFieldNames.CardCvv,
  CardFormFieldNames.CardHolderName,
  "card-track",
  CardFormFieldNames.CardAccountNumber,
  "routing-number",
  INSTALLMENTS_KEY,
  DCC_KEY,
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
        if (this.fields[type].validationMessages) {
          field.setCustomValidationMessages(this.fields[type].validationMessages || {})
        }
        if (this.styles) {
          field.addStylesheet(this.styles);
        }
      });
    }

    // support tokenization data flows to `card-number` / `account-number`
    if (this.frames.submit !== undefined) {
      this.frames.submit.on("click", () => {
        if (options.fieldValidation?.enabled) {
          this.validateForm(this.frames);
        } else {
          this.submitForm();
        }
      });
    }

    const cardNumber = this.frames[CardFormFieldNames.CardNumber];
    const cardCvv = this.frames[CardFormFieldNames.CardCvv];
    const ctp = this.frames[Apm.ClickToPay];
    const googlePay = this.frames[Apm.GooglePay];
    const applePay = this.frames[Apm.ApplePay];
    const openBanking = this.frames[Apm.OpenBankingPayment];
    const paypal = this.frames[Apm.PayPal];
    const qrCodePayments = this.frames[Apm.QRCodePayments];

    const blik = this.frames[Apm.Blik];

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

    // Add Installments configs
    if (options.installments) {
      const installmentsFrame = this.frames[INSTALLMENTS_KEY];
      if (installmentsFrame) {
        installmentsFrame?.container?.querySelector('iframe')?.remove();
      }
      addIssuerBanner(installmentsFrame);

      this.configureCardInstallmentsEvents();
    }

    if (options.currencyConversion?.enabled) {
      const dcc = this.frames[DCC_KEY];
      if (dcc) {
        dcc?.container?.querySelector('iframe')?.classList.add('hidden');
      }
      this.configureCurrencyConversionEvents(dcc);
    }

    if(googlePay) {
      googlePay?.container?.querySelector('iframe')?.remove();
      addGooglePay(googlePay, this.fields[Apm.GooglePay]);
    }

    if(applePay) {
      applePay?.container?.querySelector('iframe')?.remove();
      addApplePay(applePay, this.fields[Apm.ApplePay]);
    }

    if(ctp) {
      ctp?.container?.querySelector('iframe')?.remove();
      addClickToPay(ctp, this.fields[Apm.ClickToPay]);
    }

    if (qrCodePayments) {
      qrCodePayments?.container?.querySelector('iframe')?.remove();

      const qrCodePaymentsFields = this.fields[Apm.QRCodePayments];
      const amount = qrCodePaymentsFields && qrCodePaymentsFields.amount || 0;
      if (options.apms?.qrCodePayments && options.apms?.qrCodePayments.enabled) {
        if (!cardNumber || !qrCodePayments) return;

        const cardNumberFieldFrameId = cardNumber.id;

        // Based on the configuration: Request Payment Methods or use the manual configs.
        const allowedPaymentMethods = options.apms.qrCodePayments.allowedPaymentMethods;
        if (allowedPaymentMethods && allowedPaymentMethods.length > 0) {
          // Show QR Payment method buttons based on manual configs
          addQRCodePaymentMethods(qrCodePayments, allowedPaymentMethods as IPaymentMethodConfigurationNormalized[], amount);
        } else {
          // Request Payment methods when the Card Number field is already registered
          cardNumber.on("register", () => {
            this.startQRCodePaymentMethodsRequest({ id: cardNumberFieldFrameId });
          });

          cardNumber.on(ApmInternalEvents.PaymentMethodsRequestCompleted, (responseData?: any) => {
            const frame = this.frames[Apm.QRCodePayments];
            if (frame) {
              frame?.container?.querySelector('iframe')?.remove();

              // Show QR Payment method buttons based on response
              const { paymentMethodConfigurations } = responseData;
              if (paymentMethodConfigurations) addQRCodePaymentMethods(frame, paymentMethodConfigurations.map((x: any) => normalizePaymentMethodConfigurations(x)), amount);
            }
          });
        }
      }
    }

    if (openBanking) {
      openBanking?.container?.querySelector('iframe')?.remove();
      addPaymentMethod(openBanking, ApmProviders.OpenBanking, Apm.OpenBankingPayment,options.apms?.countryCode);
    }

    if (blik) {
      blik?.container?.querySelector('iframe')?.remove();
      addPaymentMethod(blik, ApmProviders.Blik, Apm.Blik);
    }

    if (paypal) {
      paypal?.container?.querySelector('iframe')?.remove();
      addPaymentMethod(paypal, ApmProviders.PayPal, Apm.PayPal,options.apms?.countryCode);
    }

    // Hosted Fields validattion
    if (options.fieldValidation?.enabled) {
      this.configureHostedFieldValidations(this.frames);
    }
  }

  private configureCardInstallmentsEvents(): void {
    let installmentRequestInProgress = false;

    const cardNumberFrame = this.frames["card-number"];
    const cardExpirationFrame = this.frames["card-expiration"];
    const cardCvvFrame = this.frames["card-cvv"];
    if (!cardNumberFrame || !cardExpirationFrame || !cardCvvFrame) return;

    [cardNumberFrame, cardExpirationFrame, cardCvvFrame].forEach(cardFieldFrame => {
      cardFieldFrame.on(InstallmentEvents.CardInstallmentsHide, (_data?: any) => {
        this.removeInstallmentsPanel();
        installmentRequestInProgress = false;
      });

      cardFieldFrame.on(InstallmentEvents.CardInstallmentsFieldValidated, (_data?: any) => {
        this.requestInstallmentData();
      });

      cardFieldFrame.on(InstallmentEvents.CardInstallmentsRequestStart, (data?: any) => {
        if (installmentRequestInProgress) return;
        installmentRequestInProgress = true;

        if (!data) return;

        const { cardNumber, cardExpiration } = data;
        this.startCardInstallmentDataRequest({
          id: cardFieldFrame.id,
          cardNumber,
          cardExpiration,
          data
        });
      });

      cardFieldFrame.on(InstallmentEvents.CardInstallmentsRequestCompleted, (installmentPlansData?: any) => {
        if (!installmentPlansData || installmentPlansData && !verifyInstallmentAvailability(installmentPlansData)) return;

        const installments = this.frames[INSTALLMENTS_KEY];
        if (installments) {
          installments?.container?.querySelector('iframe')?.remove();
          addInstallments(installments, installmentPlansData, (installment) => {
            const target = this.frames[`card-number`] || this.frames[`account-number`];

            if (!target) return;

            this.requestDataFromAll(target, installment);
          });
        }

        installmentRequestInProgress = false;
      });

      cardFieldFrame.on(InstallmentEvents.CardInstallmentsRequestFailed, (_data?: any) => {
        // TBD (Installments): Emit an event? A 'token-error' error? or any installment error type?
        this.removeInstallmentsPanel();
        installmentRequestInProgress = false;
      });
    });
  }

  private startCardInstallmentDataRequest(args: {id: string, cardNumber:string, cardExpiration: string, data?: any}): void {
    const {
      id,
      cardNumber,
      cardExpiration,
      data,
    } = args;

    const installmentFields = this.fields[INSTALLMENTS_KEY];
    const amount = installmentFields.amount || 0;
    const eventType = `ui:iframe-field:${InstallmentEvents.CardInstallmentsRequestStart}`;
    postMessage.post(
      {
        data: {
          amount,
          cardNumber,
          cardExpiration,
          ...data
        },
        id,
        type: eventType,
      },
      id,
    );
  }

  private removeInstallmentsPanel(): void {
    const installmentsPanel = document.getElementsByClassName("installment-step-container")[0];
    if (installmentsPanel) {
      installmentsPanel.remove();
    }

    const installmentsIssuerBanner = document.getElementById("virgin-money-credit-card-banner");
    if (installmentsIssuerBanner) {
      const content = getHaveVirginMoneyCreditCardBannerTemplate();
      installmentsIssuerBanner.outerHTML = content.outerHTML;
    }
  }

  private currencyConversionResponseData: any;

  /**
   * Configures event listeners related to currency conversion for the specified iframe field.
   * @param dccField The iframe field associated with the currency conversion.
   */
  private configureCurrencyConversionEvents(dccField: IframeField | undefined): void {
    cleanUpCurrencyConversionAvailabilityStatus();

    cleanUpCurrencyConversionPreviousValue();

    // Variable to track if a currency conversion request is in progress
    let currencyConversionRequestInProgress = false;
    if (dccField) {
      // Retrieve the card number and card expiration iframe fields
      const cardNumberFrame = this.frames["card-number"];
      const cardExpirationFrame = this.frames["card-expiration"];

      // If either iframe field is missing, return early
      if (!cardNumberFrame || !cardExpirationFrame) return;

      // Iterate through each iframe field for currency conversion validation
      [cardNumberFrame, cardExpirationFrame].forEach(cardFieldFrame => {
        // Event listener for hiding currency conversion related elements
        cardFieldFrame.on(CurrencyConversionEvents.CurrencyConversionHide, (_data?: any) => {
          cleanUpCurrencyConversionAvailabilityStatus();

          resetCurrencyConversion(dccField);
          currencyConversionRequestInProgress = false;
        });

        // Event listener for validating currency conversion fields
        cardFieldFrame.on(CurrencyConversionEvents.CurrencyConversionFieldsValidated, (data?: any) => {
          // Make the request for currency conversion data
          this.requestCurrencyConversionData();
        });

        // Event listener for initiating currency conversion request
        cardFieldFrame.on(CurrencyConversionEvents.CurrencyConversionRequestStart, (data?: any) => {
          // If currency conversion request is already in progress or data is missing, return early
          if (currencyConversionRequestInProgress || !data) return;

          currencyConversionRequestInProgress = true;

          // Extract card number and expiration data from the event data and start the currency conversion request
          const { cardNumber, cardExpiration } = data;
          this.startCurrencyConversionDataRequest({
            id: cardFieldFrame.id,
            cardNumber,
            cardExpiration,
            data
          });
        });

        // Event listener for handling completion of currency conversion request
        cardFieldFrame.on(CurrencyConversionEvents.CurrencyConversionRequestCompleted, (data?: any) => {
          if (!data) return;

          this.checkCurrencyConversionStatus(dccField, data);

          // Add the currency conversion data to the specified iframe field and update response data
          addCurrencyConversion(dccField, data, (response, value) => {
              this.currencyConversionResponseData = {response, value};
          });

          currencyConversionRequestInProgress = false;
        });
      });
    }
  }

  private checkCurrencyConversionStatus = (dccField: IframeField, data: any) => {
    const isCurrencyConversionAvailable = data.status === CurrencyConversionStatus.CurrencyConversionAvailable;
    setCurrencyConversionAvailabilityStatus(isCurrencyConversionAvailable);

    if (!isCurrencyConversionAvailable) {
      resetCurrencyConversion(dccField);
    }
  }

  /**
   * Initiates a currency conversion data request using the provided parameters.
   * @param args An object containing the necessary parameters for the currency conversion request.
   */
  private startCurrencyConversionDataRequest(args: {id: string, cardNumber:string, cardExpiration: string, data?: any}): void {
    const {
      id,
      cardNumber,
      cardExpiration,
      data,
    } = args;

    // Retrieve the amount from the dynamic currency conversion fields
    const dccFields = this.fields[DCC_KEY];
    const amount = dccFields.amount || 0;

    // Post the currency conversion request message
    postMessage.post(
      {
        data: {
          amount,
          cardNumber,
          cardExpiration,
          ...data
        },
        id,
        type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionRequestStart}`,
      },
      id,
    );
  }

  /**
   * Requests data from all relevant fields associated with the target iframe field,
   * including optional installment payment data and currency conversion data if enabled.
   * @param target The iframe field for which data is requested.
   * @param installment Optional installment payment data.
   */
  private requestDataFromAll(
    target: IframeField,
    installment?: InstallmentPaymentData
  ) {
    // Initialize an array to store field names
    const fields: string[] = [];

    // Check if the frame type is defined and not excluded from request
    for (const type of frameFieldTypes) {
      if (!this.frames[type]) {
        continue;
      }

      if (type !== Apm.GooglePay
        && type !== Apm.ClickToPay
        && type !== Apm.ApplePay
        && type !== INSTALLMENTS_KEY
        && type !== Apm.QRCodePayments
        && type !== Apm.OpenBankingPayment
        && type !== Apm.Blik) {
        fields.push(type);
      }
    }

    if (this.currencyConversionResponseData) {
      // Check if Currency Conversion is enabled and a value is selected
      const isCurrencyConversionEnabled = options.currencyConversion?.enabled;
      const hasCurrencyConversionNoValueSelected = this.currencyConversionResponseData.value === '';

      // If Currency Conversion is enabled but no value is selected and field validation is not enabled, emit an error
      if (isCurrencyConversionEnabled && hasCurrencyConversionNoValueSelected) {
        if (!options.fieldValidation?.enabled) {
          // tslint:disable-next-line:no-console
          console.error("Mandatory Fields missing [currency conversion] See Developers Guide");
          return;
        }

        // Remove DCC_KEY from fields if it was not processed due to currency conversion condition
        const isCurrencyConversionAvailable = getCurrencyConversionAvailabilityStatus();
        if (!isCurrencyConversionAvailable && fields.includes(DCC_KEY)) {
          fields.splice(fields.indexOf(DCC_KEY), 1);
        }
      }
    }

    const currencyConversion = this.currencyConversionResponseData
      && this.currencyConversionResponseData.response
      && getCurrencyConversionAvailabilityStatus()
      ? this.currencyConversionResponseData.response : '';

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
            ...(installment ? {installment} : {}),
            ...{currencyConversion}
          },
          id: field.id,
          type: "ui:iframe-field:request-data",
        },
        field.id,
      );
    }
  }

  public setSubtotalAmount(amount: string){
    for (const type of frameFieldTypes) {
      if (!this.fields[type]) {
        continue;
      }
      this.fields[type].amount = amount;
    }
  }

  private requestInstallmentData() {
    const target = this.frames[`card-number`] || this.frames[`account-number`];
    if (!target) return;

    // Required fields to be completed and validated to call the endpoint
    const fields = [
      "card-number",
      "card-expiration",
      "card-cvv",
    ];

    fields.forEach((type) => {
      const field = this.frames[type];

      if (!field) return;

      postMessage.post(
        {
          data: {
            fields,
            target: target.id,

          },
          id: field.id,
          type: `ui:iframe-field:${InstallmentEvents.CardInstallmentsRequestData}`,
        },
        field.id,
      );
    });
  }

  private configureHostedFieldValidations(frames: IFrameCollection): void {
    const cardNumberFrame = frames[CardFormFieldNames.CardNumber];
    if (!cardNumberFrame) return;

    const hostedFieldsToValidate = [
      cardNumberFrame,
      frames[CardFormFieldNames.CardExpiration],
      frames[CardFormFieldNames.CardCvv ],
      frames[CardFormFieldNames.CardHolderName]
    ];

    if (options.currencyConversion?.enabled) {
      hostedFieldsToValidate.push(frames[DCC_KEY])
    }

    hostedFieldsToValidate.forEach(field => {
      if (!field) return;

      field.on(HostedFieldValidationEvents.ValidationShow, (validationData?: any) => {
        if (!validationData) return;
        const { validationMessage } = validationData;

        field.showValidation(validationMessage);
      });

      field.on(HostedFieldValidationEvents.ValidationHide, (validationData?: any) => {
        if (!validationData) return;

        field.hideValidation();
      });

      if (field.frame.name === CardFormFieldNames.CardCvv) {
        field.on(HostedFieldValidationEvents.ValidationCvvTooltipShow, () => {
          const cvvTooltipDiv = document.querySelector(`.tooltip`);
          cvvTooltipDiv?.classList.add('hf-cvv-tooltip-invalid');
        });

        field.on(HostedFieldValidationEvents.ValidationCvvTooltipHide, () => {
          const cvvTooltipDiv = document.querySelector(`.tooltip`);
          cvvTooltipDiv?.classList.remove('hf-cvv-tooltip-invalid');
        });
      }
    });

    const cleanUpFormValidationDataAndEmitValidityState = (isFormValid: boolean) => {
      // Clean up form validation data
      const w = window as any;
      delete w.formValidations;

      bus.emit(CardFormEvents.ValidityState, { isFormValid });
    };

    cardNumberFrame.on(HostedFieldValidationEvents.ValidateFormValid, (_validationData?: any) => {
      cleanUpFormValidationDataAndEmitValidityState(true);

      // Submit the VALID form
      this.submitForm();
    });

    cardNumberFrame.on(HostedFieldValidationEvents.ValidateFormInvalid, (_validationData?: any) => cleanUpFormValidationDataAndEmitValidityState(false));
  }

  private validateForm(frames: IFrameCollection): void {
    const accountCardNumberFrameTarget = this.frames[CardFormFieldNames.CardNumber] || this.frames[CardFormFieldNames.CardAccountNumber];
    if (!accountCardNumberFrameTarget) return;

    const hostedFieldsToValidate = [
      accountCardNumberFrameTarget,
      frames[CardFormFieldNames.CardExpiration ],
      frames[CardFormFieldNames.CardCvv ],
      frames[CardFormFieldNames.CardHolderName ],
    ];

    if (options.currencyConversion?.enabled && getCurrencyConversionAvailabilityStatus()) {
      hostedFieldsToValidate.push(frames[DCC_KEY])
    }

    resetValidationRoundCounter();

    for (const field of hostedFieldsToValidate) {
      if (!field) return;

      postMessage.post(
        {
          data: { target: accountCardNumberFrameTarget.id },
          id: field.id,
          type: `ui:iframe-field:${HostedFieldValidationEvents.Validate}`,
          target: accountCardNumberFrameTarget.id,
        },
        field.id,
      );
    }
  }

  private submitForm() {
    // support tokenization data flows to `card-number` / `account-number`
    const accountCardNumberFrame = this.frames[CardFormFieldNames.CardNumber] || this.frames[CardFormFieldNames.CardAccountNumber];
    if (!accountCardNumberFrame) return;

    this.requestDataFromAll(accountCardNumberFrame);
  }

  private requestCurrencyConversionData() {
    const target = this.frames[`card-number`] || this.frames[`account-number`];
    if (!target) return;

    // Required fields to be completed and validated to call the endpoint
    const fields = [
      CardFormFieldNames.CardNumber,
      CardFormFieldNames.CardExpiration
    ];

    fields.forEach((type) => {
      const field = this.frames[type];

      if (!field) return;

      postMessage.post(
        {
          data: {
            fields,
            target: target.id,

          },
          id: field.id,
          type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionRequestData}`,
        },
        field.id,
      );
    });
  }

  private startQRCodePaymentMethodsRequest(args: { id: string }): void {
    const { id } = args;

    const eventType = `ui:iframe-field:${ApmInternalEvents.PaymentMethodsRequestStart}`;
    postMessage.post(
      {
        data: { },
        id,
        type: eventType,
      },
      id,
    );
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