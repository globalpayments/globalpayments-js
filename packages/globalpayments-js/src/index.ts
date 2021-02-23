import { IEventListener } from "globalpayments-lib";
import "globalpayments-lib/polyfills";

import * as creditCard from "./credit-card";
import * as eCheck from "./echeck";
import * as giftAndLoyalty from "./gift-and-loyalty";
import * as internal from "./internal";
import Events from "./internal/lib/events";
import * as paymentRequest from "./payment-request";
import * as configure from "./tools/configure";
import * as ui from "./ui";

export default {
  configure: configure.default,
  creditCard,
  eCheck,
  events: Events,
  giftAndLoyalty,
  internal,
  // Don't use Function.prototype bind because it's not available on
  // IE8 and polyfills use eval :(
  on: (ev: string, listener: IEventListener) => internal.bus.on(ev, listener),
  paymentRequest,
  ui,
};
