// @ts-check

import { SecurePaymentElement } from './secure-payment-element.js';
import { SecureCardNumberField } from './secure-card-number-field.js';
import { SecureCardExpirationField } from './secure-card-expiration-field.js';
import { SecureCardCvvField } from './secure-card-cvv-field.js';
import { SecureSubmitButton } from './secure-submit-button.js';
import { loadLibrary } from '../../globalpayments-js-loader/index.js';

/** @typedef { import('./secure-payment-element').IDictionary } IDictionary */

/** @type {any} */
let GlobalPayments = window.GlobalPayments || {};

/** @type {IDictionary} */
const fieldTypeTagNameMap = {
    'card-number': SecureCardNumberField.TAG_NAME,
    'card-expiration': SecureCardExpirationField.TAG_NAME,
    'card-cvv': SecureCardCvvField.TAG_NAME,
    'submit': SecureSubmitButton.TAG_NAME,
};

const fieldTypes = Object.keys(fieldTypeTagNameMap);

export class SecurePaymentForm extends SecurePaymentElement {
    /**
     * Element constructor.
     * 
     * Creates a shadow root for the element, and configures the Global Payments
     * JavaScript library based on set attributes.
     */
    constructor() {
        super();

        /** @type {string | null} */
        this.formType = null;
        /** @type {ShadowRoot} */
        this.shadow = this.attachShadow({ mode: 'open' });
        /** @type {any} */
        this.form = null;
        /** @type {boolean} */
        this.dropin = false;
        /** @type {{[key: string]: SecurePaymentElement}} */
        this.elements = {};

        this.shadow.appendChild(document.createElement('slot'));
        this.configure();
    }

    /**
     * Finds all implemented secure payment elements, and creates promises
     * to wait for them to be defined using `customElements.whenDefined`.
     * 
     * @returns The promises for custom element definitions
     */
    allNeededElementsDefined() {
        /** @type {string[]} */
        const childTags = [];
        const matches = this.innerHTML.match(SecurePaymentElement.FIND_ALL_REGEX);

        if (!matches) {
            return Promise.reject();
        }

        matches.forEach((tag) => {
            if (childTags.indexOf(tag) === -1) {
                childTags.push(tag);
            }
        });

        return Promise.all(childTags.map(
            (tag) => customElements.whenDefined(tag)
        ));
    }

    /**
     * Configures the Global Payments JavaScript library.
     */
    async configure() {
        GlobalPayments = await loadLibrary();

        const options = this.getAttibutes();

        if (options.formType !== undefined) {
            this.formType = options.formType;
            this.removeAttribute('form-type');
        }

        GlobalPayments.configure(options);
    }

    /**
     * Callback for when the element is attached to the DOM.
     * 
     * Renders the form.
     */
    connectedCallback() {
        if (this.form) {
            return;
        }

        this.render();
    }

    /**
     * Callback for when the element is attached to the DOM.
     * 
     * Disposes the form.
     */
    disconnectedCallback() {
        if (!this.form) {
            return;
        }

        this.form.dispose();
    }

    /**
     * Extracts field-level options for creating the form with the
     * Global Payments JavaScript library.
     * 
     * @returns The form options
     */
    extractOptions() {
        /** @type {IDictionary} */
        const fields = {};
        let styles = this.getStyles();

        // gather field/style configurations
        fieldTypes.forEach((type) => {
            const el = this.findFirstChild(type);

            // no valid child elements for the type
            if (!el || !(el instanceof SecurePaymentElement) || el.type !== type) {
                return;
            }

            this.elements[type] = el;

            fields[type] = Object.assign(el.getAttibutes(), {
                target: this.nodeAsTarget(el),
            });

            if (el.hasStyles()) {
                styles = Object.assign(styles, el.getStyles());
            }
        });

        return { fields, styles };
    }

    /**
     * Grabs the first form child of a given type.
     * 
     * To simplify things, integrators implement custom field elements
     * (e.g. `secure-card-number-field`) as children of `secure-payment-form`.
     * This removes the need for custom `id` or `class` attribute values, but
     * the form needs to ensure that only one element of each type is used
     * when configuring the Global Payment JavaScript library.
     *
     * @param {string} type 
     * 
     * @returns `Element` when a match is found; `null` when no matches
     */
    findFirstChild(type) {
        if (!fieldTypeTagNameMap[type]) {
            return null;
        }

        const elements = this.getElementsByTagName(fieldTypeTagNameMap[type]);

        if (elements.length === 0) {
            return null;
        }

        return elements[0];
    }

    /**
     * @inheritdoc
     */
    getTargetEvents() {
        return Array.of(...super.getTargetEvents(), ...['token-success', 'token-error', 'error']);
    }

    /**
     * Gets the `node`'s `nodeName` property in lower case to be used as the
     * hosted fields target / query selector.
     * 
     * @param {Node} node 
     * 
     * @returns Name as a string; Empty string if node is `null`/`undefined`
     */
    nodeAsTarget(node) {
        const name = (node || /** @type {Node} */ {}).nodeName;
        return (name || '').toLowerCase();
    }

    /**
     * Renders the secure payment form with hosted fields.
     */
    async render() {
        GlobalPayments = await loadLibrary();

        if (this.dropin === true) {
            // render drop-in form
            return;
        }

        // allow elements to be loaded/defined asynchronously
        await this.allNeededElementsDefined();

        // render the hosted fields
        this.form = GlobalPayments.ui.form(this.extractOptions());

        // get each hosted field
        for (const type in this.form.frames) {
            const frame = this.form.frames[type];
            const element = this.elements[type];

            if (!element) {
                continue;
            }

            element.field = frame;
            element.setupEventListeners(element.field);
        }

        this.setupEventListeners(this.form);
    }

    /**
     * @inheritdoc
     * 
     * @param {{on: (event: string, callback: (e?: object) => any) => any; ready: (e?: object) => any}} source
     */
    setupEventListeners(source) {
        super.setupEventListeners(source);

        // custom form events
        (/** @type any */ (source)).on('submit', 'click',
            /**
             * @param {object} detail
             */
            (detail) => this.dispatchEvent(new CustomEvent('submit', { detail }))
        );
        source.ready(
            /**
             * @param {object} detail
             */
            (detail) => this.dispatchEvent(new CustomEvent('ready', { detail }))
        );
        GlobalPayments.on('error',
            /**
             * @param {object} detail
             */
            (detail) => this.dispatchEvent(new CustomEvent('error', { detail }))
        );
    }

    /**
     * @inheritdoc
     * 
     * @returns An empty object if no styles have been set.
     */
    getStyles() {
        let result = {};

        if (this.hasStyles()) {
            try {
                result = JSON.parse(this.getAttribute(SecurePaymentElement.ATTRIBUTE_NAME_STYLES) || '');
            } catch (e) { /** */ }
        }

        return result;
    }
}

customElements.define('secure-payment-form', SecurePaymentForm);
