import { IError, ISuccess } from "../gateways";
import { typeByNumber, typeByTrack } from "../lib/card-types";
import getGateway from "../lib/get-gateway";
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

  return new Promise((resolve, reject) => {
    gateway.actions
      .tokenize(data)
      .then(gateway.actions.normalizeResponse)
      .then((resp: IError | ISuccess) => {
        if ((resp as IError).error) {
          reject(resp);
          return;
        }

        resp = resp as ISuccess;

        if (data["card-number"]) {
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
