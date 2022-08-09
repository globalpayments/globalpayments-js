import { ISuccess } from "..";
import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  if (data.error && data.reasons) {
    return {
      error: data.error,
      reasons: data.reasons,
    };
  }

  if (!data.GetTokenResult || !data.GetTokenResult.IsSuccessful) {
    const message =
      (data.GetTokenResult || {}).ErrorMessage || "Unexpected error";
    const reasons = [{ code: "INVALID_REQUEST", message }];

    return {
      error: true,
      reasons,
    };
  }

  const response: ISuccess = {
    details: {},
    paymentReference: data.GetTokenResult.Token,
  };

  return response;
};
