// @ts-check

import { SecurePaymentElement } from './secure-payment-element.js';

export class SecureCardNumberField extends SecurePaymentElement {
    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureCardNumberField.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return 'card-number';
    }
}

SecureCardNumberField.TAG_NAME = 'secure-card-number-field';

customElements.define(SecureCardNumberField.TAG_NAME, SecureCardNumberField);
