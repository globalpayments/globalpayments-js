// Holds global state and functions for managing iframe
// communication and event management.
//
// Not intended for external use.

import { EventEmitter } from "globalpayments-lib";
export * from "./lib/loaded-frames";
export * from "./lib/options";
export * from "./lib/post-message";

export { default as tokenize } from "./requests/tokenize";

export const bus = new EventEmitter();
