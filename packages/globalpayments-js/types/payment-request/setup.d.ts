import { EventEmitter, IEventListener } from "globalpayments-lib";
import { IframeField } from "../ui/iframe-field";
export declare class PaymentRequestEmitter extends EventEmitter {
    private iframe;
    constructor(iframe: IframeField);
    on(event: string, listener: IEventListener): void;
}
/**
 * Initiates a payment card via the PaymentRequest API
 * to leverage card data stored in a cardholder's
 * browser, tokenizing it via the configured gateway
 * implementation. This is triggered in the parent
 * window, but the PaymentRequest functionality and
 * data only exists within the hosted field.
 *
 * @param selector Selector for the target element.
 * @param details PaymentRequest details. Default includes
 *          no details.
 * @param instruments PaymentRequest instruments to allow.
 *          Default includes a single instrument for
 *          `basic-card`.
 * @param options Additional PaymentRequest options
 * @param startOnLoad If true, the payment card will be
 *          shown once the hosted field loads
 */
export default function (selector: string, details?: PaymentDetailsInit, instruments?: PaymentMethodData[], options?: PaymentOptions, startOnLoad?: boolean): void | PaymentRequestEmitter;
