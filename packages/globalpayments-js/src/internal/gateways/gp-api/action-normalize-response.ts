import { ISuccess } from "..";
import cardTypes from "../../lib/card-types";
import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  if (data.error && data.reasons) {
    return {
      error: data.error,
      reasons: data.reasons,
    };
  }

  if (data.error_code) {
    const reasons = [
      {
        code: data.error_code,
        message: data.detailed_error_description,
      },
    ];

    return {
      error: true,
      reasons,
    };
  }

  const response: ISuccess = {
    details: {
      accountId: data.account_id,
      accountName: data.account_name,
      fingerprint: data.fingerprint,
      fingerprintPresenceIndicator: data.fingerprint_presence_indicator,
      merchantId: data.merchant_id,
      merchantName: data.merchant_name,
      reference: data.reference
    },
    paymentReference: data.id
  };

  if (data.card && data.card.masked_number_last4) {
    response.details.cardNumber = data.card.masked_number_last4;
  }

  if (data.card && data.card.brand) {
    response.details.cardType = cardTypeOfGpApiBrand(data.card.brand);
  }

  return response;
};

const cardTypeOfGpApiBrand = (brand: string): string => {
  if (cardTypes.map((ct) => ct.code).indexOf(brand.toLocaleLowerCase())) {
    return brand.toLocaleLowerCase();
  }

  return brand;
};
