// @ts-check

import { SecurePaymentElement } from './secure-payment-element.js';

export class SecureSubmitButton extends SecurePaymentElement {
    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureSubmitButton.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return 'submit';
    }

    /**
     * @inheritdoc
     */
    getTargetEvents() {
        return Array.of(...super.getTargetEvents(), ...['click']);
    }
}

SecureSubmitButton.TAG_NAME = 'secure-submit-button';

customElements.define(SecureSubmitButton.TAG_NAME, SecureSubmitButton);
