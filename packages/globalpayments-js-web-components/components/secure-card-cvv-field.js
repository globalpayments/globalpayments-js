// @ts-check

import { SecurePaymentElement } from './secure-payment-element.js';

export class SecureCardCvvField extends SecurePaymentElement {
    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureCardCvvField.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return 'card-cvv';
    }
}

SecureCardCvvField.TAG_NAME = 'secure-card-cvv-field';

customElements.define(SecureCardCvvField.TAG_NAME, SecureCardCvvField);
