import { IActions } from "..";
import { options } from "../../lib/options";

import actionNormalizeResponse from "./action-normalize-response";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";
import getAssetBaseUrl from "./get-asset-base-url";
import getEnv from "./get-env";

export const supports = {
  apm: {
    applePay: false,
    googlePay: false,
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

export const urls = {
  assetBaseUrl: getAssetBaseUrl,
  tokenization: (prod: boolean) => {
    if (options.env && options.env === "qa") {
      return `${domains.qa}/ucp/payment-methods`;
    }

    return `${prod ? domains.production : domains.sandbox}/ucp/payment-methods`;
  },
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = ["accessToken"];

export {getEnv};
