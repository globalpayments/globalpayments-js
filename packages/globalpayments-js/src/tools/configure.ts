import getGateway from "../internal/lib/get-gateway";
import { options as opts } from "../internal/lib/options";
import { IDictionary } from "../internal/lib/util";

/**
 * Defines expected configuration properties for using the
 * library with the supported gateway implementations.
 */
export interface IConfiguration extends IDictionary {
  // General configuration properties
  enableAutocomplete?: boolean;
  language?: string;
  enableTwoDigitExpirationYear?: boolean;
  enableCardFingerPrinting?:boolean;
  requireCardHolderName?:boolean;

  // Specific configuration properties for
  // Portico (heartland)
  publicApiKey?: string;
  binCheck?: {
    hsaFsa?: boolean;
    surcharge?: boolean;
  };

  // Specific configuration properties for
  // GP eCommerce (globalpayments)
  merchantId?: string;
  account?: string;
  hash?: (data: IDictionary) => Promise<IDictionary>;
  customerExists?: boolean;
  customerReference?: string;
  validateOnly?: boolean;
  env?: string;

  // Specific configuration properties for
  // MerchantWare / Genius Checkout (genius)
  webApiKey?: string;

  // Specific configuration properties for
  // TransIT (tsep)
  deviceId?: string;
  manifest?: string;
  tsepHost?: string; // internal. inferred from env

  // Specific configuration properties for
  // Heartland Bill Pay (billpay)
  merchantName?: string;

  // Specific configuration properties for
  // Unified Commerce Platform (gp-api)
  accessToken?: string;
  accountName?: string;
  apiVersion?: string;
  reference?: string;
}

/**
 * Allows integrators to configure the library with their
 * desired merchant account configuration and any global
 * library flags.
 */
export default (options: IConfiguration) => {
  for (const prop in options) {
    if (options.hasOwnProperty(prop)) {
      opts[prop] = options[prop];
    }
  }

  const gateway = getGateway();

  // Some gateway implementations need to perform specific
  // window setup to aid functionality.
  if (gateway && gateway.actions.setup) {
    gateway.actions.setup();
  }
};
