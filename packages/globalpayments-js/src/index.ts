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

// Library entry points for integrator use except where noted.
export default {
  // Allows integrators to configure the library with their
  // desired merchant account configuration and any global
  // library flags.
  configure: configure.default,
  // Allows integrators to create drop-in credit card forms.
  creditCard,
  // Allows integrators to create drop-in eCheck/ACH forms.
  eCheck,
  // Provides integrators helper functions for working with events.
  events: Events,
  // Allows integrators to create drop-in gift and loyalty forms.
  giftAndLoyalty,
  // Holds global state and functions for managing iframe
  // communication and event management.
  //
  // Not intended for external use.
  internal,
  // Allows integrators to attach global event handlers, mostly for
  // global error handling.
  //
  // Doesn't use Function.prototype bind because it's not available on
  // IE8 and polyfills use eval :(
  on: (ev: string, listener: IEventListener) => internal.bus.on(ev, listener),
  // Allows integrators to create payment request buttons.
  paymentRequest,
  // Allows integrators to custom payment data entry forms for credit
  // card, eCheck / ACH, or gift and loyalty cards.
  ui,
};
