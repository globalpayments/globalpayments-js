import getGateway from "../internal/lib/get-gateway";
import { options as opts } from "../internal/lib/options";
import { IDictionary } from "../internal/lib/util";

export interface IConfiguration {
  [key: string]: any;
  // heartland
  publicApiKey?: string;
  // globalpayments
  merchantId?: string;
  account?: string;
  hash?: (data: IDictionary) => Promise<IDictionary>;
  customerExists?: boolean;
  customerReference?: string;
  validateOnly?: boolean;
  env?: string;
}

export default (options: IConfiguration) => {
  for (const prop in options) {
    if (options.hasOwnProperty(prop)) {
      opts[prop] = options[prop];
    }
  }

  const gateway = getGateway();

  if (gateway && gateway.actions.setup) {
    gateway.actions.setup();
  }
};
