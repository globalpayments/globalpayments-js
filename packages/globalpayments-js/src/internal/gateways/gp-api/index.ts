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
    let domain = prod ? domains.production : domains.sandbox;

    if (options.env && options.env === "qa") {
      domain = domains.qa;
    }

    let endpoint = 'payment-methods';

    if (options.merchantId) {
      endpoint = `merchants/${options.merchantId}/${endpoint}`;
    }

    return `${domain}/ucp/${endpoint}`;
  },
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = ["accessToken"];

export {getEnv};
