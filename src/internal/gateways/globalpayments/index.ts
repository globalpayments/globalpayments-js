import { options } from "../../lib/options";

import actionNormalizeResponse from "./action-normalize-response";
import actionSetup from "./action-setup";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";

export const supports = {
  apm: {
    androidPay: true,
    applePay: true,
  },
  consumerAuthentication: true,
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
  production: "https://pay.realexpayments.com",
  sandbox: "https://pay.sandbox.realexpayments.com",
};

export const urls = {
  tokenization: (prod: boolean) =>
    `${prod ? domains.production : domains.sandbox}/pay`,
};

export const getEnv = () => {
  const def = "production";

  return options.env || def;
};

export const actions = {
  normalizeResponse: actionNormalizeResponse,
  setup: actionSetup,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = [
  "merchantId",
  "account",
  // "hash",
  "env",
];
