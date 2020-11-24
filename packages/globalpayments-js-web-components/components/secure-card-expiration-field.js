// @ts-check

import { SecurePaymentElement } from './secure-payment-element.js';

export class SecureCardExpirationField extends SecurePaymentElement {
    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureCardExpirationField.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return 'card-expiration';
    }
}

SecureCardExpirationField.TAG_NAME = 'secure-card-expiration-field';

customElements.define(SecureCardExpirationField.TAG_NAME, SecureCardExpirationField);
