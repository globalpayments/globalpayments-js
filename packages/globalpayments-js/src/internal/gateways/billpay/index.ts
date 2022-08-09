import { IActions } from "..";
import { options } from "../../lib/options";

import actionNormalizeResponse from "./action-normalize-response";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";

export const supports = {
  tokenization: {
    cardNotPresent: true,
    eCheck: true,
  },
};

const domains = {
  production: "https://heartlandpaymentservices.net",
  sandbox: "https://staging.heartlandpaymentservices.net",
};

export const urls = {
  tokenization: (prod: boolean) =>
    `${
      prod ? domains.production : domains.sandbox
    }/QuickPayService/QuickPayService.svc/GetToken`,
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = ["merchantName"];

export const getEnv = () => {
  return options.env || "production";
};
