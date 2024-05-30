import { CardFormFieldNames } from "../../../../common/enums";
import { DataEncoderHelper } from "../../../../common/helpers";
import { options } from "../../options";
import { DCC_AVAILABILITY_STATUS_KEY, DCC_KEY } from "../contracts/constants";

export const getCurrencyConversionAvailabilityStatus = (): boolean => {
    const dccLocalAvailabilityStatus = localStorage.getItem(DCC_AVAILABILITY_STATUS_KEY);

    return (dccLocalAvailabilityStatus && dccLocalAvailabilityStatus === "1") ? true : false;
}

export const setCurrencyConversionAvailabilityStatus = (availabilityStatus: boolean): void => {
    if (!availabilityStatus) {
        removeCurrencyConversionAvailabilityStatus();
    } else {
        localStorage.setItem(DCC_AVAILABILITY_STATUS_KEY, "1");
    }
}

export const removeCurrencyConversionAvailabilityStatus = (): void => {
    localStorage.removeItem(DCC_AVAILABILITY_STATUS_KEY);
}

export const cleanUpCurrencyConversionAvailabilityStatus = (): void => {
    localStorage.removeItem(DCC_AVAILABILITY_STATUS_KEY);
}

export const handleCurrencyConversionValidationSetup = (fieldsToValidate: string[]): void => {
    const isCurrencyConversionEnabled = options.currencyConversion?.enabled;
    const isCurrencyConversionAvailable = getCurrencyConversionAvailabilityStatus();
    const shouldCurrencyConversionBeValidated = isCurrencyConversionEnabled && isCurrencyConversionAvailable;

    if (shouldCurrencyConversionBeValidated) {
      // Then include the field in the array of HFs to validate
      if (!fieldsToValidate.includes(DCC_KEY)) {
        fieldsToValidate.push(DCC_KEY);
      }
    } else {
      // If NOT, Removed DCC from the Fields to validate
      const dccIndex = fieldsToValidate.indexOf(DCC_KEY);
      if (dccIndex !== -1) fieldsToValidate.splice(dccIndex, 1);
    }
  }

export const hasCurrencyConversionSensitiveValueChanged = (fieldType: string, value: any): boolean => {
  let valueHasChanged = true;

  const storagePreValueKey = `${fieldType}-pre-value`;
  const encodedValue = DataEncoderHelper.encode(value);

  const w = window as any;
  const preValue = w[storagePreValueKey];

  if (preValue) {
    if (preValue === encodedValue) {
      valueHasChanged = false;
    } else {
      w[storagePreValueKey] = encodedValue;
    }
  } else {
    w[storagePreValueKey] = encodedValue;
  }
  return valueHasChanged;
}

export const removeCurrencyConversionPreviousValue = (fieldType: string): void => {
  const storagePreValueKey = `${fieldType}-pre-value`;
  const w = window as any;
  delete w[storagePreValueKey];
}

export const cleanUpCurrencyConversionPreviousValue = (): void => {
  removeCurrencyConversionPreviousValue(CardFormFieldNames.CardNumber);
  removeCurrencyConversionPreviousValue(CardFormFieldNames.CardExpiration);
}