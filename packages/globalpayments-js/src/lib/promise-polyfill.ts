import * as Promise from "promise-polyfill";

(window as any).Promise = (window as any).Promise || Promise;
