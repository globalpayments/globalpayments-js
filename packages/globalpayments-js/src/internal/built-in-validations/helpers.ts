import { IApmConfiguration } from "../../apm/non-card-payments/contracts";
import { HostedFieldValidationEvents } from "../../common/enums";
import { bankListData, countryList } from "../lib/bank-selection/available-banks-data";
import { BankCountries, CountryCurrencies } from "../lib/bank-selection/contracts";
import { Apm, ApmProviders } from "../lib/enums";
import { postMessage } from "../lib/post-message";
import { BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, GERMANY, POLAND } from "./constants";

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

const getHostedFieldValidationEventType = (show: boolean): string => `ui:iframe-field:${ show ? HostedFieldValidationEvents.ValidationShow : HostedFieldValidationEvents.ValidationHide }`;

export const resetValidationRoundCounter = (): void => {
  localStorage.setItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, "1");
}

export const getValidationRoundCounter = (): number => +(localStorage.getItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY) || 1);

export const increaseValidationRoundCounter = (): void => {
  const counter = +(localStorage.getItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY) || 1);
  localStorage.setItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY, `${counter + 1}`);
}

export const removeValidationRoundCounter = (): void => localStorage.removeItem(BUILT_IN_VALIDATIONS_VALIDATION_ROUND_COUNTER_KEY);

export const isOpenBankingAvailable = (countryCode:string | undefined, aquirer: string | undefined): boolean =>{
  let showOpenBanking = false;
  const validAquirers:any = bankListData.filter(item => {
    return item.countryCode === countryCode
  })[0]?.allowedAquirers;
  if((countryList.indexOf(countryCode) > -1) && ((countryCode === BankCountries.Poland || countryCode === BankCountries.UK) ? true : (validAquirers?.indexOf(aquirer) > -1))){
    showOpenBanking = true;
  }
  return showOpenBanking;
}

export const isBlikAvailable = (countryCode:string | undefined, currencyCode:string | undefined, options:IApmConfiguration | undefined): boolean => {
  let showBlik = false;
  const isBlikEnabled = options?.allowedPaymentMethods?.filter(item => {
    return item.provider === ApmProviders.Blik
  })[0]?.enabled;
  if(countryCode === POLAND && currencyCode === CountryCurrencies.Poland && isBlikEnabled){
    showBlik = true
  }
  return showBlik;
}

export const isExpressPayAvailable = (options:IApmConfiguration | undefined): boolean | undefined => {
  const showExpressPay = options?.allowedPaymentMethods?.filter(item => {
    return item.provider === ApmProviders.ExpressPay
  })[0]?.enabled;
  return showExpressPay;
}