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
import {fieldStyles as simpleFieldStyles, parentStyles as simpleParentStyles,} from "../../internal/lib/styles/simple";
import {IDictionary} from "../../internal/lib/util";
import {IFrameCollection, IframeField, IUIFormField} from "../iframe-field";
import addClickToPay from "../iframe-field/action-add-click-to-pay";
import addGooglePay from "../iframe-field/action-add-google-pay";
import addApplePay from "../iframe-field/action-add-apple-pay";
import { Apm, CardFormEvents } from "../../internal/lib/enums";
import addInstallments from "../iframe-field/action-add-installments";
import { InstallmentEvents } from "../../internal/lib/installments/contracts/enums";
import { bus, options } from "../../internal";
import { verifyInstallmentAvailability } from "../../internal/lib/installments/contracts/installment-plans-data";
import { INSTALLMENTS_KEY } from "../../internal/lib/installments/contracts/constants";
import { InstallmentPaymentData } from "../../internal/lib/installments/installments-handler";
import addIssuerBanner from "../../internal/lib/installments/components/add-issuer-banner";
import { getHaveVirginMoneyCreditCardBannerTemplate } from "../../internal/lib/installments/templates/common";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { resetValidationRoundCounter } from "../../internal/built-in-validations/helpers";

import { ApmInternalEvents } from "../../apm/enums";
import addQRCodePaymentMethods from "../iframe-field/action-add-qr-code-payment-methods";
import { normalizePaymentMethodConfigurations } from "../../apm/qr-code-payments/helpers";
import { IPaymentMethodConfigurationNormalized } from "../../apm/qr-code-payments/contracts";
import addOpenBankingPaymentMethod from "../iframe-field/action-add-open-banking";

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
  amount?: number;
  apms?: IDictionary;
}

export const frameFieldTypes = [
  Apm.ClickToPay,
  Apm.GooglePay,
  Apm.ApplePay,
  Apm.OpenBankingPayment,
  Apm.QRCodePayments,
  CardFormFieldNames.CardNumber,
  CardFormFieldNames.CardExpiration,
  CardFormFieldNames.CardCvv,
  CardFormFieldNames.CardHolderName,
  "card-track",
  CardFormFieldNames.CardAccountNumber,
  "routing-number",
  INSTALLMENTS_KEY,
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
    const qrCodePayments = this.frames[Apm.QRCodePayments];

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
      addOpenBankingPaymentMethod(openBanking);
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

  private requestDataFromAll(
    target: IframeField,
    installment?: InstallmentPaymentData
  ) {
    const fields: string[] = [];

    for (const type of frameFieldTypes) {
      if (!this.frames[type]) {
        continue;
      }

      if (type !== Apm.GooglePay
        && type !== Apm.ClickToPay
        && type !== Apm.ApplePay
        && type !== INSTALLMENTS_KEY
        && type !== Apm.QRCodePayments
        && type !== Apm.OpenBankingPayment) {
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

            ...(installment ? {installment} : {}),
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
      frames[CardFormFieldNames.CardHolderName],
    ];

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
