import { IError } from "../../../gateways";
import getGateway from "../../get-gateway";
import { options } from "../../options";
import { IDictionary } from "../../util";

export default (data: IDictionary) => {
  const gateway = getGateway();

  if (!gateway) return Promise.reject(createInvalidConfigurationError("no gateway available"));

  return new Promise((resolve, reject) => {
    if (!gateway.actions.queryCurrencyConversion || !gateway.urls.queryCurrencyConversionUrl) return Promise.reject(createInvalidConfigurationError("no currency conversion gateway action/url available"));

    const url = gateway.urls.queryCurrencyConversionUrl();
    gateway.actions.queryCurrencyConversion(url, options.env || "", data)
      .then((response: IDictionary) => {
        return response;
      })
      .then((response: any) => {
        if ((response as IError).error) {
          reject(response);
          return;
        }

        if (gateway.requiredSettings.indexOf("X-GP-Api-Key") !== -1) {
          resolve(response);
          return;
        }

        resolve(response);
      })
      .catch(reject);
  });
};

function createInvalidConfigurationError(message: string) {
  return {
    error: true,
    reasons: [
      { code: "INVALID_CONFIGURATION", message },
    ],
  };
}