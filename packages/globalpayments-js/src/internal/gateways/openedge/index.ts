import { IActions } from "..";
import { IDictionary } from "../../lib/util";

import actionNormalizeResponse from "./action-normalize-response";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";
import getAssetBaseUrl from "./get-asset-base-url";
import getEnv from "./get-env";

export const supports = {
  apm: {
    applePay: true,
    googlePay: false,
  },
  consumerAuthentication: true,
  tokenization: {
    cardNotPresent: true,
    cardPresent: true,
    eCheck: true,
    gift: true,
  },
};
/* tslint:disable:object-literal-sort-keys */
const domains: IDictionary = {
  local: "https://api-sandbox.dev.paygateway.com",
  dev: "https://api.dev.paygateway.com",
  pqa: "https://api.dev.paygateway.com",
  qa: "https://api.qa.paygateway.com",
  test: "https://api.pit.paygateway.com",
  prod: "https://api.paygateway.com",
};
/* tslint:enable:object-literal-sort-keys */

export const urls = {
  assetBaseUrl: getAssetBaseUrl,
  tokenization: (prod: boolean) =>
    `${domains[getEnv()]}/tokenization/temporary_tokens`,
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = ["X-GP-Api-Key", "X-GP-Environment"];

export {getEnv};
