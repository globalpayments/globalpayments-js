import { IDictionary } from "../../internal/lib/util";
declare const _default: (id: string, data: IDictionary) => Promise<void>;
/**
 * Initiates a payment card via the PaymentRequest API
 * to leverage card data stored in a cardholder's
 * browser, tokenizing it via the configured gateway
 * implementation. This is triggered in the parent
 * window, but the PaymentRequest functionality and
 * data only exists within the hosted field.
 *
 * @param id ID of the hosted field
 * @param data PaymentRequest details
 */
export default _default;
