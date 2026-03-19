import { EventEmitter } from "globalpayments-lib";
import { IDictionary } from "../../internal/lib/util";
import { IUIFormOptions } from "../form";
export interface IFrameCollection {
    [key: string]: IframeField | undefined;
}
export interface IUIFormField {
    label?: string;
    placeholder?: string;
    target?: string;
    text?: string;
    title?: string;
    value?: string;
    amount?: string;
    fieldOptions?: any;
    validationMessages?: object;
}
export declare const fieldTypeAutocompleteMap: IDictionary;
/**
 * Represents logic surrounding individual hosted fields.
 *
 * Static methods are ran within the iframe / child window.
 *
 * Instance methods are ran within the parent window.
 */
export declare class IframeField extends EventEmitter {
    /**
     * Sets up the hosted field's iframe for further
     * processing, and registers the hosted field
     * with the parent window.
     *
     * @param type Field type of the hosted field
     */
    static register(type: string): void;
    /**
     * Sets the hosted field's `lang` attribute on the `html` element
     * with the globally configured value.
     *
     * @param lang The configured language code
     */
    static setHtmlLang(lang: string): void;
    /**
     * Creates the inner field within the iframe window and sets
     * any appropriate attributes, properties, and event handlers.
     * @param id Field ID
     * @param name Field type
     * @param type Type of element
     * @param enableAutocomplete Whether autocomplete should be enabled
     * @param fieldOptions Field Options
     */
    static createField(id: string, name: string, type: string, enableAutocomplete: boolean, fieldOptions?: any, disabledPayButton?: boolean): void;
    /**
     * Appends a hidden input to the given destination to accept
     * full autocomplete/autofill data from the browser. The
     * parent window is also notified of data changes to these
     * fields in order display the new data to the end-user.
     *
     * @param destination Parent node for new element
     * @param id Field ID
     * @param type Field type
     * @param name Field name to be used
     * @param autocomplete Value for field's autocomplete attribute
     */
    static createAutocompleteField(destination: Node, id: string, type: string, name: string, label: string, autocomplete: string): void;
    /**
     * addFrameFocusEvent
     *
     * Ensures an iframe's document forwards its received focus
     * to the input field. Helps provide consistent behavior in
     * all browsers.
     */
    static addFrameFocusEvent(): void;
    /**
     * Sets the iframe window's postMessage handler in order to
     * react to parent/sibling events.
     *
     * @param id ID of the hosted field
     * @param type Field type of the hosted field
     * @param targetOrigin Parent window's origin
     */
    static addMessageListener(id: string, type: string, targetOrigin: string, fieldOptions?: any): void;
    /**
     * Triggers a resize of the hosted field's iframe element
     * within the parent window.
     *
     * @param id ID of the hosted field
     */
    static triggerResize(id: string): void;
    container: Element | null;
    frame: HTMLIFrameElement;
    id: string;
    targetNode: any;
    type: "button" | "input" | "select";
    url: string;
    formOptionFields: IUIFormOptions | undefined;
    expressPayEnabled: boolean;
    /**
     * Instantiates a new IframeField object for a hosted field
     *
     * @param type Field type of the hosted field
     * @param opts Options for creating the iframe / hosted field
     * @param src URL for the hosted field's iframe
     */
    constructor(type: string, opts: IUIFormField, src: string, formOptionFields?: IUIFormOptions);
    /**
     * Appends additional CSS rules to the hosted field
     *
     * @param json New CSS rules
     */
    addStylesheet(json: IDictionary): void;
    /**
     * Gets the CVV value from the `card-cvv` hosted field.
     *
     * Used by gateway implementations that do not store the CVV
     * with the token value:
     *
     * - TransIT (tsep)
     * - Heartland Bill pay (billpay)
     *
     * @returns A promise that resolves with the CVV value
     */
    getCvv(): Promise<unknown>;
    /**
     * Sets input focus on the hosted field
     */
    setFocus(): void;
    /**
     * Sets the placeholder text of a hosted field
     *
     * @param placeholder The desired palceholder text
     */
    setPlaceholder(placeholder: string): void;
    /**
     * Sets the text content of a hosted field
     *
     * @param text The desired text value
     */
    setText(text: string): void;
    /**
     * Sets the value of a hosted field
     *
     * @param value The desired input value
     */
    setValue(value: string): void;
    getValue(): Promise<unknown>;
    /**
     * Sets the label of a hosted field
     *
     * @param label The desired input label
     */
    setLabel(label: string): void;
    /**
     * Sets the title of a hosted field
     *
     * @param title The desired title
     */
    setTitle(title: string): void;
    /**
     * Sets custom validation messages for the hosted field
     *
     * @param customMessages - an object containing custom validation messages
     * The `msg` object should have keys corresponding to specific validation messages for the field.
     * For example, { NotCompleted: 'Custom not completed message', YearNotValid: 'Custom year not valid message' }.
     */
    setCustomValidationMessages(customMessages: object): void;
    /**
     * Show the validation of a hosted field
     *
     * @param validationMessage The desired validation message
     */
    showValidation(validationMessage: string): void;
    /**
     * Hide the validation of a hosted field
     *
     */
    hideValidation(): void;
    /**
     * Validate hosted field
     *
     */
    validate(): void;
    private makeFrame;
}
