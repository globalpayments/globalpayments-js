/// <reference types="@globalpayments/js" />

import { loadLibrary } from "@globalpayments/js-loader";
import { IError } from "@globalpayments/js/types/internal/gateways";
import { IDictionary } from "@globalpayments/js/types/internal/lib/util";
import { IframeField, IFrameCollection } from "@globalpayments/js/types/ui";
import UIForm from "@globalpayments/js/types/ui/form";

import { SecurePaymentElement } from "./secure-payment-element";
import { SecureCardNumberField } from "./secure-card-number-field";
import { SecureCardExpirationField } from "./secure-card-expiration-field";
import { SecureCardCvvField } from "./secure-card-cvv-field";
import { SecureSubmitButton } from "./secure-submit-button";

const fieldTypeTagNameMap: IDictionary = {
    "card-number": SecureCardNumberField.TAG_NAME,
    "card-expiration": SecureCardExpirationField.TAG_NAME,
    "card-cvv": SecureCardCvvField.TAG_NAME,
    "submit": SecureSubmitButton.TAG_NAME,
};

const fieldTypes = Object.keys(fieldTypeTagNameMap);

/**
 * @slot - When the default slot is empty, the drop-in form is rendered.
 *
 * @fires ready - Triggered when all form fields have been rendered successfully.
 * @fires submit - Triggered when submit button is clicked.
 * @fires token-success - Triggered when a successful token response is received from the configured service.
 * @fires token-error - Triggered when an errored token response is received from the configured service.
 * @fires error - Triggered when a general error occurs.
 */
export class SecurePaymentForm extends SecurePaymentElement {
    protected formType: string | undefined;
    protected shadow: ShadowRoot;
    protected form: any;
    protected dropin: boolean;
    protected elements: {[key: string]: SecurePaymentElement};

    /**
     * Element constructor.
     *
     * Creates a shadow root for the element, and configures the Global Payments
     * JavaScript library based on set attributes.
     */
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });
        this.dropin = false;
        this.elements = {};

        this.shadow.appendChild(document.createElement("slot"));
        this.configure();
    }

    /**
     * Configures the Global Payments JavaScript library.
     */
    async configure() {
        await loadLibrary();

        const options = this.getAttributes();

        if (options.formType !== undefined) {
            this.formType = options.formType;
            this.removeAttribute("form-type");
        }

        window.GlobalPayments.configure(options);
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
     * @inheritdoc
     *
     * @returns An empty object if no styles have been set.
     */
    getStyles() {
        let result = {};

        if (this.hasStyles()) {
            try {
                result = JSON.parse(this.getAttribute(SecurePaymentElement.ATTRIBUTE_NAME_STYLES) || "");
            } catch (e) { /** */ }
        }

        return result;
    }

    /**
     * @inheritdoc
     */
    getTargetEvents() {
        return Array.of(...super.getTargetEvents(), ...["token-success", "token-error", "error"]);
    }

    /**
     * Renders the secure payment form with hosted fields.
     */
    async render() {
        await loadLibrary();

        if (this.dropin === true) {
            // render drop-in form
            return;
        }

        // render the hosted fields
        try {
            // allow elements to be loaded/defined asynchronously
            await this.allNeededElementsDefined();
            this.form = window.GlobalPayments.ui.form(this.extractOptions());
        } catch (e) {
            this.form = window.GlobalPayments.creditCard.form(this, {
                // @ts-ignore
                style: this.getAttribute("theme") || undefined,
            });
        }

        // get each hosted field
        for (const type in this.form.frames) {
            if (!this.form.frames.hasOwnProperty(type)) {
                continue;
            }

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

    setupEventListeners(source: UIForm | IframeField) {
        super.setupEventListeners(source);

        window.GlobalPayments.on("error",
            (detail?: IError) => this.dispatchEvent(new CustomEvent("error", { detail }))
        );

        if (typeof (source as UIForm).ready !== "undefined") {
            (source as UIForm).ready(
                (detail?: IFrameCollection) => this.dispatchEvent(new CustomEvent("ready", { detail }))
            );

            // custom form events
            (source as UIForm).on("submit", "click",
                (detail?: object) => this.dispatchEvent(new CustomEvent("submit", { detail }))
            );
        }
    }

    /**
     * Finds all implemented secure payment elements, and creates promises
     * to wait for them to be defined using `customElements.whenDefined`.
     *
     * @returns The promises for custom element definitions
     */
    protected allNeededElementsDefined() {
        const childTags: string[] = [];
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
     * Extracts field-level options for creating the form with the
     * Global Payments JavaScript library.
     *
     * @param isDropin
     *
     * @returns The form options
     */
    protected extractOptions(isDropin = false) {
        const fields: IDictionary = {};
        let styles = this.getStyles();

        if (isDropin) {
            return {};
        }

        // gather field/style configurations
        fieldTypes.forEach((type) => {
            const el = this.findFirstChild(type);

            // no valid child elements for the type
            if (!el || !(el instanceof SecurePaymentElement) || el.type !== type) {
                return;
            }

            this.elements[type] = el;

            fields[type] = Object.assign(el.getAttributes(), {
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
     * @param type
     *
     * @returns `Element` when a match is found; `null` when no matches
     */
    protected findFirstChild(type: string) {
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
     * Gets the `node`"s `nodeName` property in lower case to be used as the
     * hosted fields target / query selector.
     *
     * @param node
     *
     * @returns Name as a string; Empty string if node is `null`/`undefined`
     */
    protected nodeAsTarget(node: Node) {
        const name = (node || {}).nodeName;
        return (name || "").toLowerCase();
    }
}

customElements.define("secure-payment-form", SecurePaymentForm);

declare global {
    interface HTMLElementTagNameMap {
        "secure-payment-form": SecurePaymentForm,
    }
}
