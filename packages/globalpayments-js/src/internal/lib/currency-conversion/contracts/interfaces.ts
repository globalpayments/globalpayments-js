export interface CurrencyConversionPaymentData {
  id: string;
  exchangeRate: string;
  exchangeRateSource: string;
  cardHolderAmount: string;
  cardHolderCurrency: string;
  merchantAmount: string;
  merchantCurrency: string;
  marginPercentageRate: string;
  exchangeRateTimeCreated: string;
  commissionPercentage: string;
  currencyConversionAccepted: string
}