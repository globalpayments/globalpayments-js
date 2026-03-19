import { IDictionary } from "../../internal/lib/util";
declare const _default: (id: string, data: IDictionary) => Promise<void>;
/**
 * Completes a payment via the PaymentRequest API
 * after the integrator performs the server-side
 * authorization request. This is triggered in the parent
 * window, but the PaymentRequest functionality and
 * data only exists within the hoted field.
 *
 * @param id ID of the hosted field
 * @param data Payment status from the integrator
 */
export default _default;
