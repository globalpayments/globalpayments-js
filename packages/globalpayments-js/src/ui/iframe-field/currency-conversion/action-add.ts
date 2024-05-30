import { IframeField } from "../index";
import { bus, options } from "../../../internal";
import { IError } from "../../../internal/gateways";
import { createRadioGroupHtmlElement } from "../../../internal/lib/currency-conversion/components/template";
import { CurrencyConversionPaymentData } from "../../../internal/lib/currency-conversion/contracts/interfaces";
import {
  CurrencyConversionEvents,
  CurrencyConversionStatus
} from "../../../internal/lib/currency-conversion/contracts/enums";
import { resetCurrencyConversion } from "../../../internal/lib/currency-conversion/utils/reset-currency-conversion";

/**
 * Adds currency conversion functionality to the specified iframe field.
 * @param iframeField The iframe field to which currency conversion is added.
 * @param data The data used to populate the currency conversion.
 * @param callback The callback function to handle the response data.
 */
export default function addCurrencyConversion(
  iframeField: IframeField | undefined,
  data: any,
  callback: (response: CurrencyConversionPaymentData, value: string) => void
): void {
  // If iframeField is not defined, or currency conversion is not enabled, or status is not available, return early
  if (!iframeField || !options.currencyConversion || !options.currencyConversion.enabled ||
    data.status !== CurrencyConversionStatus.CurrencyConversionAvailable) {
    return;
  }

  // Check for missing required configurations
  const missingRequiredConfig = getMissingRequiredConfigs();
  if (missingRequiredConfig.length) {
    emitMissingRequiredConfigsError(missingRequiredConfig);
    return;
  }

  // Generate response data
  const responseData = generateResponseData(data);
  callback(responseData, '');

  iframeField?.on(CurrencyConversionEvents.CurrencyConversionSendValue, (_data?: any) => {
    const { value, selectedCurrency } = _data;

    responseData.currencyConversionAccepted = selectedCurrency === "card-currency" ? "YES" : "NO";

    // Invoke the callback function with the response data
    callback(responseData, value);
  });

  // Display currency conversions
  displayCurrencyConversions(iframeField, data);
}

/**
 * Displays currency conversions within the specified iframe field.
 * @param iframeField The iframe field in which currency conversions are displayed.
 * @param data The data used to populate the currency conversions.
 */
function displayCurrencyConversions(iframeField: IframeField, data: any) {
  resetCurrencyConversion(iframeField);
  // Create radio group HTML element for currency conversions
  createRadioGroupHtmlElement(iframeField, data);
}

/**
 * Generates response data based on the provided input data.
 * @param data The input data used to generate the response data.
 * @returns The response data object.
 */
function generateResponseData(data: any) {
  return {
      id: data.id,
      exchangeRate: data.exchange_rate,
      exchangeRateSource: data.exchange_rate_source,
      cardHolderAmount: data.payer_amount,
      cardHolderCurrency: data.payer_currency,
      merchantAmount: data.amount,
      merchantCurrency: data.currency,
      marginPercentageRate: data.margin_rate_percentage,
      exchangeRateTimeCreated: data.exchange_rate_time_created,
      commissionPercentage: data.commission_percentage
  } as CurrencyConversionPaymentData;
}

/**
 * Retrieves the list of missing required configuration fields.
 * @returns An array containing the names of missing required configuration fields.
 */
function getMissingRequiredConfigs(): string[] {
  const missingConfig: string[] = [];
  const requiredConfigs = [
    'country',
    'currency',
    'accountName'
  ];

  const dccConfigs = options.currencyConversion || {};
  const actualConfigFields = Object.keys(dccConfigs);
  const actualConfigValues = Object.values(dccConfigs);

  requiredConfigs.forEach(requiredConfig => {
    const configIndex = actualConfigFields.indexOf(requiredConfig);
    if (configIndex === -1 || !actualConfigValues[configIndex]) {
      missingConfig.push(requiredConfig);
    }
  });

  return missingConfig;
}

/**
 * Emits an error event indicating missing required configuration fields.
 * @param missingConfigs An array containing the names of missing required configuration fields.
 */
function emitMissingRequiredConfigsError(missingConfigs: string[]) {
  const error: IError = {
    error: true,
    reasons: [{
      code: "ERROR",
      message: `Missing required configs: ${missingConfigs.toString()}`,
    }],
  };

  bus.emit('error', error);
}