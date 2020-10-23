import { IActions } from "..";
import { options } from "../../lib/options";

import actionNormalizeResponse from "./action-normalize-response";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";

export const supports = {
  apm: {
    applePay: false,
    googlePay: false,
  },
  consumerAuthentication: false,
  tokenization: {
    cardNotPresent: true,
    cardPresent: false,
    eCheck: false,
    gift: false,
  },
};

const domains = {
  // Genius Checkout has an automatic sandbox feature for developer / partner accounts
  production: "https://gateway.transit-pass.com",
  sandbox: "https://stagegw.transnox.com",
};

export const urls = {
  tokenization: (prod: boolean) => {
    options.tsepHost = prod ? domains.production : domains.sandbox;
    return `${options.tsepHost}/transit-tsep-web/jsView/${options.deviceId}?${options.manifest}`;
  },
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = ["deviceId", "manifest"];

export const getEnv = () => {
  return options.env || "production";
};
