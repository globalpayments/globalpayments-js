import { IError, ISuccess } from "../gateways";
import buildUrl from "../lib/build-tokenization-url";
import { typeByNumber, typeByTrack } from "../lib/card-types";
import getGateway from "../lib/get-gateway";
import { options } from "../lib/options";
import { IDictionary } from "../lib/util";

export default (data: IDictionary) => {
  const gateway = getGateway();

  if (!gateway) {
    return Promise.reject({
      error: true,
      reasons: [
        { code: "INVALID_CONFIGURATION", message: "no gateway available" },
      ],
    });
  }

  const errors = gateway.actions.validateData(data);

  if (errors.length > 0) {
    return Promise.reject({ error: true, reasons: errors });
  }

  if (options.webApiKey) {
    data.webApiKey = options.webApiKey;
  }

  if (
    gateway.supports.binCheck &&
    gateway.supports.binCheck.hsaFsa &&
    options.binCheck &&
    options.binCheck.hsaFsa
  ) {
    data["bin-check-hsafsa"] = true;
  }

  if (
    gateway.supports.binCheck &&
    gateway.supports.binCheck.surcharge &&
    options.binCheck &&
    options.binCheck.surcharge
  ) {
    data["bin-check-surcharge"] = true;
  }

  return new Promise((resolve, reject) => {
    let query: any;
    if (gateway.requiredSettings.indexOf("publicApiKey") !== -1) {
      query = {
        api_key: options.publicApiKey,
      };
    }

    gateway.actions
      .tokenize(buildUrl(query), options.env || "", data)
      .then(gateway.actions.normalizeResponse)
      .then((resp: IError | ISuccess) => {
        if ((resp as IError).error) {
          reject(resp);
          return;
        }

        resp = resp as ISuccess;

        if (gateway.requiredSettings.indexOf("X-GP-Api-Key") !== -1) {
          resolve(resp);
          return;
        }

        if (data["card-number"]) {
          resp.details.masked_number_last4 = resp.details.cardNumber;
          const cardNumber = data["card-number"].replace(/\D/g, "");
          const bin = cardNumber.substr(0, 6);
          const last4 = cardNumber.substr(-4);
          const type = typeByNumber(cardNumber);

          resp.details = resp.details || {};
          resp.details.cardNumber =
            bin + "*".repeat(cardNumber.length - 10) + last4;
          resp.details.cardBin = bin;
          resp.details.cardLast4 = last4;
          resp.details.cardType = type ? type.code : "unknown";
          resp.details.cardSecurityCode = !!data["card-cvv"];
        }

        if (
          data["card-expiration"] &&
          data["card-expiration"].indexOf(" / ") !== -1
        ) {
          const exp = data["card-expiration"].split(" / ");

          resp.details = resp.details || {};
          resp.details.expiryMonth = exp[0] || "";
          resp.details.expiryYear = exp[1] || "";
        }

        if (data["card-holder-name"]) {
          resp.details = resp.details || {};
          // matches PaymentRequest spec naming for cardholder name
          resp.details.cardholderName =
            resp.details.cardholderName || data["card-holder-name"];
        }

        if (data["card-track"]) {
          const cardTrack = data["card-track"];
          const type = typeByTrack(cardTrack);

          resp.details = resp.details || {};
          resp.details.cardType = type ? type.code : "unknown";
        }

        if (data["account-number"]) {
          const accountNumber = data["account-number"].replace(/\D/g, "");
          const last4 = accountNumber.substr(-4);
          resp.details = resp.details || {};
          resp.details.accountNumber =
            "*".repeat(accountNumber.length - 4) + last4;
          resp.details.accountLast4 = last4;
        }

        resolve(resp);
      })
      .catch(reject);
  });
};
