import { options, postMessage } from "../../internal";
import { HOSTED_FIELD_NAME_KEYS, HOSTED_FIELDS_ADDITIONAL_KEYS, HOSTED_FIELDS_SHIPPING_KEYS } from "../../common/constants";
import { IDictionary } from "../../internal/lib/util";
import { CardFormFieldNames, ExpressPayFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { getValidationRoundCounter, increaseValidationRoundCounter, removeValidationRoundCounter } from "../../internal/built-in-validations/helpers";
import { DCC_KEY } from "../../internal/lib/currency-conversion/contracts/constants";
import { getCurrencyConversionAvailabilityStatus, handleCurrencyConversionValidationSetup } from "../../internal/lib/currency-conversion/utils/helpers";

export default (id: string, data: IDictionary) => {
  const w = window as any;

  const fieldIsValid = false || data.data.isValid;

  // const shippingSameAsBilling:any = document.getElementById('shipping-as-billing-checkbox');

  w.formValidations = w.formValidations || {};
  w.formValidations[data.data.type] = fieldIsValid;

  let isFormValid: boolean = true;

  // Set the initial set of fields to validate
  let fieldsToValidate = HOSTED_FIELD_NAME_KEYS.map(x => x);

  let additionalFieldsToValidate = HOSTED_FIELDS_ADDITIONAL_KEYS.map(x => x);

  const shippingFieldsToValidate = HOSTED_FIELDS_SHIPPING_KEYS.map(x => x);
  if (!data.data.expressPayValidation) {
    if (options.expressPay?.enabled) {
      if (options.expressPay?.isShippingRequired !== false && localStorage.getItem("shippingSameAsBilling") === "false") {
        additionalFieldsToValidate = [...additionalFieldsToValidate, ...shippingFieldsToValidate];
      }
      fieldsToValidate = [...fieldsToValidate, ...additionalFieldsToValidate];
    }

    // Handle DCC Validations (if needed)
    handleCurrencyConversionValidationSetup(fieldsToValidate);

    const fieldsToValidateCount = fieldsToValidate.length;

    const cardHolderNotPresent = w.formValidations[CardFormFieldNames.CardHolderName] === undefined;
    const formFields: any = {
      cardNumber: w.formValidations[CardFormFieldNames.CardNumber],
      cardExpiration: w.formValidations[CardFormFieldNames.CardExpiration],
      cardCvv: w.formValidations[CardFormFieldNames.CardCvv],
      cardHolderName: w.formValidations[CardFormFieldNames.CardHolderName],
    };
    if (options.expressPay?.enabled) {
      formFields.emailId = w.formValidations[ExpressPayFieldNames.EmailId];
      formFields.countryCode = w.formValidations[ExpressPayFieldNames.CountryCode];
      formFields.phone = w.formValidations[ExpressPayFieldNames.Phone];
      formFields.billingAddress = w.formValidations[ExpressPayFieldNames.BillingAddress];
      formFields.country = w.formValidations[ExpressPayFieldNames.Country];
      formFields.billingCity = w.formValidations[ExpressPayFieldNames.BillingCity];
      formFields.billingState = w.formValidations[ExpressPayFieldNames.BillingState];
      formFields.billingPostalCode = w.formValidations[ExpressPayFieldNames.BillingPostalCode];
      if (options.expressPay?.isShippingRequired !== false && localStorage.getItem("shippingSameAsBilling") === "false") {
        formFields.shippingAddress = w.formValidations[ExpressPayFieldNames.ShippingAddress];
        formFields.ShippingCountry = w.formValidations[ExpressPayFieldNames.ShippingCountry];
        formFields.shippingAddressName = w.formValidations[ExpressPayFieldNames.ShippingName];
        formFields.shippingCity = w.formValidations[ExpressPayFieldNames.ShippingCity];
        formFields.shippingState = w.formValidations[ExpressPayFieldNames.ShippingState];
        formFields.shippingPostalCode = w.formValidations[ExpressPayFieldNames.ShippingPostalCode];
      }
    }
    const { cardNumber, cardExpiration, cardCvv, cardHolderName } = formFields;
    let expressPayFieldsValid = true;
    if (options.expressPay?.enabled) {
      const { emailId, countryCode, phone, billingAddress, country, billingCity, billingState, billingPostalCode } = formFields;
      let validateShippingDetails: boolean = true;

      if (options.expressPay?.isShippingRequired !== false && localStorage.getItem("shippingSameAsBilling") === "false") {
        const { shippingAddress, ShippingCountry, shippingAddressName, shippingCity, shippingState, shippingPostalCode } = formFields;
        validateShippingDetails = shippingAddress && ShippingCountry && shippingAddressName && shippingCity && shippingState && shippingPostalCode;
      }

      expressPayFieldsValid = emailId && countryCode && phone && billingAddress && country && billingCity && billingState && billingPostalCode && validateShippingDetails;
    }
    isFormValid = cardNumber && cardExpiration && cardCvv && (cardHolderName || cardHolderNotPresent) && expressPayFieldsValid;

    const isCurrencyConversionEnabled = options.currencyConversion?.enabled;
    const isCurrencyConversionAvailable = getCurrencyConversionAvailabilityStatus();
    const shouldCurrencyConversionBeValidated = isCurrencyConversionEnabled && isCurrencyConversionAvailable;
    if (shouldCurrencyConversionBeValidated) {
      isFormValid = isFormValid && w.formValidations[DCC_KEY];
    }

    let validFieldsCount = Object.values(formFields).filter(x => x).length;
    if (cardHolderNotPresent) {
      ++validFieldsCount;
    }

    const eventType = `ui:iframe-field:${isFormValid ? HostedFieldValidationEvents.ValidateFormValid : HostedFieldValidationEvents.ValidateFormInvalid}`;

    const validationRoundCounter = getValidationRoundCounter();
    if (fieldsToValidateCount === validationRoundCounter) {
      postMessage.post(
        {
          data: isFormValid,
          id,
          type: "ui:iframe-field:card-form-validity",
        },
        "parent",
      );
      removeValidationRoundCounter();
    } else {
      increaseValidationRoundCounter();

      return;
    }

    postMessage.post(
      {
        data: {
          ...formFields,
        },
        id,
        type: eventType,
      },
      "parent",
    );
  } else {
    w.enteredExpressPayFields = w.enteredExpressPayFields || {};
    // Mark the current field as entered
    w.enteredExpressPayFields[data.data.type] = true;

    // Build formFields only for entered fields
    const formFields: any = {};
    Object.keys(w.enteredExpressPayFields).forEach(fieldName => {
      formFields[fieldName] = w.formValidations[fieldName];
    });

    // Calculate isFormValid: all entered fields must be valid (truthy)
    const isFormValid1 = Object.values(formFields).every(Boolean);

    // Optionally, handle DCC validation if needed for ExpressPay
    // If you want to include DCC_KEY in ExpressPay validation:
    // if (options.currencyConversion?.enabled && getCurrencyConversionAvailabilityStatus()) {
    //   isFormValid = isFormValid && w.formValidations[DCC_KEY];
    // }

    // Validation round counter logic (optional, if you want to keep it)
    const validationRoundCounter = getValidationRoundCounter();
    const fieldsToValidateCount = Object.keys(w.enteredExpressPayFields).length;
    if (fieldsToValidateCount === validationRoundCounter) {
      postMessage.post(
        {
          data: isFormValid1,
          id,
          type: "ui:iframe-field:card-form-validity",
        },
        "parent",
      );
      removeValidationRoundCounter();
    } else {
      increaseValidationRoundCounter();
      return;
    }

    // Post the validation result for only entered fields
    const eventType = `ui:iframe-field:${isFormValid1 ? HostedFieldValidationEvents.ValidateFormValid : HostedFieldValidationEvents.ValidateFormInvalid}`;
    postMessage.post(
      {
        data: {
          ...formFields,
        },
        id,
        type: eventType,
      },
      "parent",
    );

  }
};