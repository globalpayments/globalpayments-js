import { IActions } from "..";
import { options } from "../../lib/options";

import actionNormalizeResponse from "./action-normalize-response";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";
import actionQueryInstallmentPlans from './action-query-installment-plans';
import actionQueryCurrencyConversion from './action-query-currency-conversion';
import getAssetBaseUrl from "./get-asset-base-url";
import getEnv from "./get-env";
import getQRCodePaymentMethods from "./get-apm-payment-methods";
import { Environments } from "../../../common/enums";

export const supports = {
  apm: {
    applePay: true,
    clickToPay: true,
    googlePay: true,
  },
  binCheck: {
    hsaFsa: false,
    surcharge: false,
  },
  consumerAuthentication: false,
  tokenization: {
    cardNotPresent: true,
    cardPresent: true,
    eCheck: false,
    gift: false,
  },
};

const domains = {
  production: "https://apis.globalpay.com",
  qa: "https://apis-qa.globalpay.com",
  sandbox: "https://apis.sandbox.globalpay.com",
};

/**
 * Validates if the provided service URL matches the domain pattern *.globalpay.com.
 *
 * @param serviceUrl - The URL to be validated.
 */
function validateServiceUrl(serviceUrl: string): boolean {
  // Define the regex pattern to match the domain *.globalpay.com
  const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)*globalpay\.com(\/.*)?$/;

  return pattern.test(serviceUrl);
}

export const urls = {
  assetBaseUrl: getAssetBaseUrl,
  tokenization: (prod: boolean) => {
    let domain = prod ? domains.production : domains.sandbox;

    if (options.env && options.env === "qa") {
      domain = domains.qa;
    }

    if (options.serviceURL && validateServiceUrl(options.serviceURL)) {
      domain = options.serviceURL;
    }

    let endpoint = "payment-methods";

    if (options.merchantId) {
      endpoint = `merchants/${options.merchantId}/${endpoint}`;
    }

    return `${domain}/ucp/${endpoint}`;
  },
  queryInstallmentPlans: (prod: boolean) => {
    let domain = prod ? domains.production : domains.sandbox;

    if (options.env && (options.env === "qa")) {
      domain = domains.qa;
    }

    if (options.serviceURL) {
      domain = options.serviceURL;
    }

    let endpoint = "installments";
    if (options.merchantId) {
      endpoint = `merchants/${options.merchantId}/${endpoint}`;
    }

    return `${domain}/ucp/${endpoint}`;
  },
  queryCurrencyConversionUrl: () => {
    let domain = domains.qa;

    switch(options.env) {
      case Environments.Local:
      case Environments.Sandbox:
        domain = domains.sandbox;
        break;
      case Environments.Production:
        domain = domains.production;
        break;
    }

    if (options.serviceURL) {
      domain = options.serviceURL;
    }

    return `${domain}/ucp/currency-conversions`;
  },
  getQRCodePaymentMethodsUrl: () => {
    let domain = domains.qa;

    switch(options.env) {
      case Environments.Local:
      case Environments.Sandbox:
        domain = domains.sandbox;
        break;
      case Environments.Production:
        domain = domains.production;
        break;
    }

    if (options.serviceURL) {
      domain = options.serviceURL;
    }

    let endpoint = `accounts/${options.account}`;
    if (options.merchantId) {
      endpoint = `merchants/${options.merchantId}/${endpoint}`;
    }

    return `${domain}/ucp/${endpoint}`;
  }
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
  queryInstallmentPlans: actionQueryInstallmentPlans,
  queryCurrencyConversion: actionQueryCurrencyConversion,
  getQRCodePaymentMethods,
};

export const requiredSettings = ["accessToken"];

export { getEnv };
