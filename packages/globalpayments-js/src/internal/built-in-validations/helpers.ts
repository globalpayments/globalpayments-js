import { IApmConfiguration } from "../../apm/non-card-payments/contracts";
import { HostedFieldValidationEvents } from "../../common/enums";
import { bankListData, countryList } from "../lib/bank-selection/available-banks-data";
import { BankCountries, CountryCurrencies } from "../lib/bank-selection/contracts";
import { Apm, ApmProviders, CashpressoAmounts, EligibleCountries, EligibleCurrencies, FundingMode, Program } from "../lib/enums";
import { postMessage } from "../lib/post-message";
import { BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, GERMANY, POLAND } from "./constants";
import { countryListForAffirm, countryListForKlarna, countryListForSezzle, countryListForZip } from "../../apm/non-card-payments/bnpl-for-apex-data";
import { formatAmount } from "../../common/currency";
export const showHostedFieldValidation = (fieldId: string | null, validationMessage: string, target?: string): void => {
  postMessage.post(
    {
      data: {
        validationMessage,
      },
      id: fieldId,
      type: getHostedFieldValidationEventType(true),
    },
    target || 'parent',
  );
}

export const hideHostedFieldValidation = (fieldId: string | null, target?: string): void => {
  postMessage.post(
    {
      data: {},
      id: fieldId,
      type: getHostedFieldValidationEventType(false),
    },
    target || 'parent',
  );
}

const getHostedFieldValidationEventType = (show: boolean): string => `ui:iframe-field:${show ? HostedFieldValidationEvents.ValidationShow : HostedFieldValidationEvents.ValidationHide}`;

export const resetValidationRoundCounter = (): void => {
  localStorage.setItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, "1");
}

export const getValidationRoundCounter = (): number => +(localStorage.getItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY) || 1);

export const increaseValidationRoundCounter = (): void => {
  const counter = +(localStorage.getItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY) || 1);
  localStorage.setItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, `${counter + 1}`);
}

export const removeValidationRoundCounter = (): void => localStorage.removeItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY);

const eligibleCurrencyValues = new Set<string>(Object.values(EligibleCurrencies));

export const checkInstallmentsAvailability = (installmentsData: any): boolean => {
  const eligibleCountryCurrencyMapping: any[] = [
    {
      "country": EligibleCountries.CA,
      "currency": EligibleCurrencies.CA,
      "extraConfig": true
    },
    {
      "country": EligibleCountries.UK,
      "currency": EligibleCurrencies.UK,
      "extraConfig": true
    },
    {
      "country": EligibleCountries.MX,
      "currency": EligibleCurrencies.MX,
      "extraConfig": false
    },
  ];

  const mapping = eligibleCountryCurrencyMapping.find(
    (item) => item.country === installmentsData.country
  );

  if (!mapping) {
    // tslint:disable-next-line:no-console
    console.warn(`Installments failed to load due to missing/incorrect "country" configuration value. Eligible countries are: ${Object.values(EligibleCountries).join(', ')}`);
    return false;
  }

  if(!installmentsData.program || typeof installmentsData.program !== 'string') {
    // tslint:disable-next-line:no-console
    console.warn(`Installments failed to load due to missing/incorrect “program“ configuration value. Eligible values are: ${Object.values(Program).join(', ')}`);
    return false;
  }

  if (installmentsData.program === Program.VIS && (!installmentsData.country && typeof installmentsData.country !== 'string')) {
    // tslint:disable-next-line:no-console
    console.warn(`Installments failed to load due to missing/incorrect “country“ configuration value. Eligible values are: ${Object.values(EligibleCountries).join(', ')}`);
    return false;
}

  if (installmentsData.program === Program.VIS && (!installmentsData.currency || typeof installmentsData.currency !== 'string')) {
    // tslint:disable-next-line:no-console
    console.warn(`Installments failed to load due to missing/incorrect “currency“ configuration value. Eligible values are: ${Object.values(EligibleCurrencies).join(', ')}`);
    return false;
  }
  if (installmentsData.program === Program.LATAM && installmentsData.country !== EligibleCountries.MX) {
    // tslint:disable-next-line:no-console
    console.warn(`Country ${installmentsData.country} is not eligible for LATAM installments`);
    return false;
  }

  if (mapping.extraConfig) {
    if (!installmentsData.config || typeof installmentsData.config !== 'object') {
      // tslint:disable-next-line:no-console
      console.warn('Visa Installments has no configuration and is using default values. Check integration guide on how to set a configuration.');
    } else if (installmentsData.config.max_time_unit_number === undefined || installmentsData.config.max_amount === undefined) {
      // tslint:disable-next-line:no-console
      console.warn('Installments has a partial configuration and is using default values');
    }
    if(!installmentsData.config.hasOwnProperty('funding_mode')){
      // tslint:disable-next-line:no-console
      console.warn('Installments has no funding_mode configuration and is using default values');
    }
  }
  return true;
}

export const isOpenBankingAvailable = (countryCode: string | undefined, aquirer: string | undefined): boolean => {
  let showOpenBanking = false;
  const validAquirers: any = bankListData.filter(item => {
    return item.countryCode === countryCode
  })[0]?.allowedAquirers;
  if ((countryList.indexOf(countryCode) > -1) && ((countryCode === BankCountries.Poland || countryCode === BankCountries.UK) ? true : (validAquirers?.indexOf(aquirer) > -1))) {
    showOpenBanking = true;
  }
  return showOpenBanking;
}

export const isBlikAvailable = (countryCode: string | undefined, currencyCode: string | undefined, options: IApmConfiguration | undefined): boolean => {
  let showBlik = false;
  const isBlikEnabled = options?.allowedPaymentMethods?.filter(item => {
    return item.provider === ApmProviders.Blik
  })[0]?.enabled;
  if (countryCode === POLAND && currencyCode === CountryCurrencies.Poland && isBlikEnabled) {
    showBlik = true
  }
  return showBlik;
}

export const isExpressPayAvailable = (options: IApmConfiguration | undefined): boolean | undefined => {
  const showExpressPay = options?.allowedPaymentMethods?.filter(item => {
    return item.provider === ApmProviders.ExpressPay
  })[0]?.enabled;
  return showExpressPay;
}

export const getAvailableOptionsForBnpl = (countryCode: string | undefined, options: IApmConfiguration | undefined): any => {
  if (!countryCode) return;
  const availableBnplOptions: Apm[] = [];
  const bnplConfigs = [
    { provider: ApmProviders.Affirm, apm: Apm.Affirm, countries: countryListForAffirm },
    { provider: ApmProviders.Klarna, apm: Apm.Klarna, countries: countryListForKlarna },
    { provider: ApmProviders.Sezzle, apm: Apm.Sezzle, countries: countryListForSezzle },
    { provider: ApmProviders.Zip, apm: Apm.Zip, countries: countryListForZip }
  ];

  bnplConfigs.forEach(({ provider, apm, countries }) => {
    const enabled = options?.allowedPaymentMethods?.some(item => item.provider === provider && item.enabled);
    if (enabled) {
      if (countries.indexOf(countryCode) > -1) {
        availableBnplOptions.push(apm);
      } else {
        // tslint:disable-next-line:no-console
        console.error(`Invalid country provided for ${provider}`);
      }
    }
  });

  return availableBnplOptions;
}

export const isCashpressoAvailable = (countryCode:string | undefined,currencyCode:string | undefined):boolean => {
  let showCashPresso = false;
  if(!countryCode || !currencyCode) return showCashPresso;
  if(countryCode === GERMANY && currencyCode === "EUR"){
    showCashPresso = true;
  } else{
    // tslint:disable-next-line:no-console
    console.warn("Cashpresso: Invalid country/currency combination");
  }
  return showCashPresso;
}

export const availableCashpressoOptions = (amount:number | undefined, currencyCode:string | undefined): Apm[] => {
  const cashPressoOptions = [];
  const formattedAmount = formatAmount(amount,currencyCode);
  if(formattedAmount && parseFloat(formattedAmount) >= CashpressoAmounts.installments3MinAmount){
    cashPressoOptions.push(Apm.Cashpresso3Installments, Apm.Cashpresso30Days, Apm.CashpressoInstallments);
  }
  else if(formattedAmount && parseFloat(formattedAmount) >= CashpressoAmounts.installmentsFlexibleMinAmount){
    cashPressoOptions.push(Apm.Cashpresso30Days, Apm.CashpressoInstallments)
  }
  else if(formattedAmount && parseFloat(formattedAmount) >= CashpressoAmounts.installments30MinAmount){
    cashPressoOptions.push(Apm.Cashpresso30Days)
  } else {
    // tslint:disable-next-line:no-console
    console.warn("Cashpresso: Amount below minimum threshold (30). Cannot display buttons.")
  }
  return cashPressoOptions;
}