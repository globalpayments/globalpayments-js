import "unfetch/polyfill";

import "./lib/array-foreach-polyfill";
import "./lib/base64-polyfill";
import "./lib/json-polyfill";
import "./lib/object-freeze-polyfill";
import "./lib/object-getownpropertynames-polyfill";
import "./lib/promise-polyfill";
import "./lib/string-repeat-polyfill";

import * as creditCard from "./credit-card";
import * as eCheck from "./echeck";
import * as giftAndLoyalty from "./gift-and-loyalty";
import * as internal from "./internal";
import Events from "./internal/lib/events";
import { IEventListener } from "./lib/event-emitter";
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
