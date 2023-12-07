import { options } from "../../../internal";
import { IError } from "../../../internal/gateways";
import getGateway from "../../../internal/lib/get-gateway";
import { IDictionary } from "../../../internal/lib/util";

export default (data: IDictionary) => {
  const gateway = getGateway();

  if (!gateway) return Promise.reject(createInvalidConfigurationError("no gateway available"));

  return new Promise((resolve, reject) => {

    if (!gateway.actions.getQRCodePaymentMethods || !gateway.urls.getQRCodePaymentMethodsUrl) return Promise.reject(createInvalidConfigurationError("no installment gateway action/url available"));

    const url = gateway.urls.getQRCodePaymentMethodsUrl(false);

    gateway.actions.getQRCodePaymentMethods(url, options.env || "", data)
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