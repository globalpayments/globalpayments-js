import { IActions } from "..";
import { options } from "../../lib/options";

import actionNormalizeResponse from "./action-normalize-response";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";

export const supports = {
  apm: {
    androidPay: false,
    applePay: false,
  },
  consumerAuthentication: false,
  eCheck: false,
  gift: false,
  tokenization: {
    cardNotPresent: true,
    cardPresent: false,
    eCheck: false,
    gift: false,
  },
};

const domains = {
  // Genius Checkout has an automatic sandbox feature for developer / partner accounts
  production: "https://ecommerce.merchantware.net",
  sandbox: "https://ecommerce.merchantware.net",
};

export const urls = {
  tokenization: (prod: boolean) =>
    `${prod ? domains.production : domains.sandbox}/v1/api/tokens`,
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = ["webApiKey"];

export const getEnv = () => {
  return options.env || "production";
};
