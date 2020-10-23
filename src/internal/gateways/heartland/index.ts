import { IActions } from "..";
import { options } from "../../lib/options";

import actionNormalizeResponse from "./action-normalize-response";
import actionTokenize from "./action-tokenize";
import actionValidateData from "./action-validate-data";

export const supports = {
  apm: {
    applePay: true,
    googlePay: false,
  },
  binCheck: {
    hsaFsa: true,
    surcharge: true,
  },
  consumerAuthentication: true,
  tokenization: {
    cardNotPresent: true,
    cardPresent: true,
    eCheck: true,
    gift: true,
  },
};

const domains = {
  production: "https://api.heartlandportico.com",
  sandbox: "https://cert.api2.heartlandportico.com",
};

export const urls = {
  tokenization: (prod: boolean) =>
    prod
      ? `${domains.production}/SecureSubmit.v1/api/token`
      : `${domains.sandbox}/Hps.Exchange.PosGateway.Hpf.v1/api/token`,
};

export const actions: IActions = {
  normalizeResponse: actionNormalizeResponse,
  tokenize: actionTokenize,
  validateData: actionValidateData,
};

export const requiredSettings = ["publicApiKey"];

export const getEnv = () => {
  const key: string = options.publicApiKey || "";
  const def = "production";

  if (options.env && options.env === "local") {
    return options.env;
  }

  if (!key) {
    return def;
  }

  const parts = key.split("_");

  if (!parts[1]) {
    return def;
  }

  switch (parts[1]) {
    case "cert":
      return "sandbox";
    case "prod":
    default:
      return def;
  }
};
