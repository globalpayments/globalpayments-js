// @ts-check

/**
 * @typedef {{on: (event: string, callback: (e?: object) => any) => any;}} IframeField
 */

/**
 * @type {IframeField}
 */
let field;

/**
 * @typedef {{[key: string]: any}} IDictionary
 */

export class SecurePaymentElement extends HTMLElement {
    /**
     * Sets the underlying hosted field.
     * 
     * Exposes functionality from the hosted field object to the custom
     * element's JavaScript interface.
     * 
     * @param {IframeField} value
     */
    set field(value) {
        field = value;
        this.on = field.on.bind(this);
    }

    /**
     * Gets the underlying hosted field.
     */
    get field() {
        return field;
    }

    /**
     * Gets the custom element's pre-defined tag name.
     */
    get tagName() {
        return '';
    }

    /**
     * Gets the hosted field type.
     * 
     * Current options are:
     * 
     * - `card-number`
     * - `card-expiration`
     * - `card-cvv`
     * - `submit`
     */
    get type() {
        return '';
    }

    /**
     * @returns {string[]} List of event types supported on the element.
     */
    getTargetEvents() {
        return ['ready'];
    }

    /**
     * Gets the element's attributes as an object, replacing kebab cased attribute
     * names with their came cased equivalents.
     */
    getAttibutes() {
        /** @type {IDictionary} */
        const attributes = {};

        for (let i = 0; i < this.attributes.length; i++) {
            const att = this.attributes[i];
            attributes[this.kebabCaseToCamelCase(att.name)] = att.value;
        }

        return attributes;
    }

    /**
     * Gets hosted fields styles if they have been set on the custom element.
     * 
     * @returns An empty object if no styles have been set.
     */
    getStyles() {
        let result = {};

        if (this.hasStyles()) {
            try {
                result = this.scopeInputSelectors(JSON.parse(this.getAttribute(SecurePaymentElement.ATTRIBUTE_NAME_STYLES) || ''));
            } catch (e) { /** */ }
        }

        return result;
    }

    /**
     * Determines if hosted fields styles have been set on the custom element.
     */
    hasStyles() {
        return this.hasAttribute(SecurePaymentElement.ATTRIBUTE_NAME_STYLES);
    }

    /**
     * Converts kebab case (`kebab-case`) to camel case (`camelCase`).
     *
     * @param {string} name
     */
    kebabCaseToCamelCase(name) {
        const parts = name.split('-');

        if (parts.length === 1) { return parts[0]; }

        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            parts[i] = part.substring(0, 1).toUpperCase() + part.substring(1);
        }

        return parts.join('');
    }

    /**
     * Replaces generic CSS selectors (e.g. `input`) with alternatives for the specific
     * input field.
     * 
     * When configuring all hosted fields, all CSS is compiled together and sent to each
     * field that is constructed. Scoping CSS selectors prevents unintended side effects.
     *
     * @param {IDictionary} styles
     */
    scopeInputSelectors(styles) {
        /** @type {IDictionary} */
        const result = {};

        Object.keys(styles).forEach((key) => {
            let value = styles[key];

            if (typeof value !== 'string') {
                value = this.scopeInputSelectors(value);
            }

            if (key.indexOf('input') !== -1 || key.indexOf('#secure-payment-field') !== -1) {
                key = `.${this.type}`;
            }

            result[key] = value;
        });

        return result;
    }

    /**
     * Sets up event listeners to forward events from the Global Payments
     * JavaScript library to be dispatched as `CustomEvent`s from this
     * element.
     *
     * @param {IframeField} source
     */
    setupEventListeners(source) {
        if (!source) {
            return;
        }

        /**
         * @param {SecurePaymentElement} target
         * @param {string} event 
         */
        const dispatch = (target, event) => {
            return (
                /**
                 * @param {object} [detail]
                 */
                (detail) => target.dispatchEvent(new CustomEvent(event, { detail }))
            );
        };

        this.getTargetEvents().forEach((event) => source.on(event, dispatch(this, event)));
    }

    /**
     * Upgrades a property when the custom element is defined.
     *
     * @param {string} prop Property name
     */
    upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            /** @type {any} */
            const self = this;
            const value = self[prop];
            delete self[prop];
            self[prop] = value;
        }
    }
}

/**
 * RegEx for finding all valid secure payment element names
 */
SecurePaymentElement.FIND_ALL_REGEX = /secure-([\w\-]+)-(field|button)/ig;

/**
 * Attribute name for custom iframe styles
 */
SecurePaymentElement.ATTRIBUTE_NAME_STYLES = 'gp-style';
