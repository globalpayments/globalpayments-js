export enum CurrencyConversionEvents {
  CurrencyConversionRequestStart = 'currency-conversion-request-start',
  CurrencyConversionRequestCompleted = 'currency-conversion-request-completed',
  CurrencyConversionRequestFailed = 'currency-conversion-request-failed',
  CurrencyConversionHide = 'currency-conversion-validate-fields',
  CurrencyConversionFieldsValidated = 'currency-conversion-fields-validated',

  CurrencyConversionRequestData = 'currency-conversion-request-data',
  CurrencyConversionAccumulateData = 'currency-conversion-accumulate-data',
  CurrencyConversionPassData = 'currency-conversion-pass-data',

  CurrencyConversionSendValue = 'currency-conversion-send-value',
}

export enum CurrencyConversionStatus {
  CurrencyConversionNotAvailable = 'NOT_AVAILABLE',
  CurrencyConversionAvailable = 'AVAILABLE'
}