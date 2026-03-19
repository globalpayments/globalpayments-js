export default class Card {
    /**
     * addType
     *
     * Adds a class to the target element with the card type
     * inferred from the target"s current value.
     *
     * @param e
     */
    static addType(e: Event): void;
    /**
     * formatNumber
     *
     * Formats a target element"s value based on the
     * inferred card type"s formatting regex.
     *
     * @param e
     */
    static formatNumber(e: KeyboardEvent | Event): void;
    /**
     * formatExpiration
     *
     * Formats a target element"s value.
     *
     * @param e
     */
    static formatExpiration(e: KeyboardEvent): void;
    /**
     * restrictLength
     *
     * Restricts input in a target element to a
     * certain length data.
     *
     * @param length
     */
    static restrictLength(length: number): (e: KeyboardEvent) => void;
    /**
     * restrictCardNumberLength
     *
     * Restricts input in a target element to a
     * certain length data.
     *
     * @param length
     */
    static restrictCardNumberLength(e: KeyboardEvent): void;
    /**
     * restrictNumeric
     *
     * Restricts input in a target element to only
     * numeric data.
     *
     * @param e
     */
    static restrictNumeric(e: KeyboardEvent): void;
    /**
     * restrictNumericOnInput
     *
     * Restricts input in a target element to only
     * numeric data for input event type.
     *
     * @param e
     */
    static restrictNumericOnInput(e: Event): void;
    /**
     * deleteProperly
     *
     * Places cursor on the correct position to
     * let the browser delete the digit instead
     * of the space.
     *
     * @param e
     */
    static deleteProperly(e: KeyboardEvent): void;
    /**
     * validateNumber
     *
     * Validates a target element"s value based on the
     * inferred card type"s validation regex. Adds a
     * class to the target element to note `valid` or
     * `invalid`.
     *
     * @param e
     */
    static validateNumber(e: Event): void;
    /**
     * validateCvv
     *
     * Validates a target element"s value based on the
     * possible CVV lengths. Adds a class to the target
     * element to note `valid` or `invalid`.
     *
     * @param e
     */
    static validateCvv(e: Event): void;
    /**
     * validateExpiration
     *
     * Validates a target element"s value based on the
     * current date. Adds a class to the target element
     * to note `valid` or `invalid`.
     *
     * @param e
     */
    static validateExpiration(e: Event): void;
    /**
     * validateCardHolderName
     *
     * Validates a target element"s value based on the
     * possible Card Holder name. Adds a class to the target
     * element to note `valid` or `invalid`.
     *
     * @param e
     */
    static validateCardHolderName(e: Event, field: string): void;
    /**
     * validateCardHolderEmail
     *
     * Validates a target element"s value based on the
     * possible Card Holder Email. Adds a class to the target
     * element to note `valid` or `invalid`.
     *
     * @param e
     */
    static validateEmail(e: Event): void;
    static validatePhone(e: Event): void;
    static validatePostalCode(e: Event, field: string): void;
    static validateBillingAddress(e: Event, field: string): void;
    static validateCountry(e: Event, field: string): void;
    /**
     * validateInstallmentFields
     *
     * Validates a target element"s value based on the
     * availability of use installment plans.
     *
     * @param e
     * @param fieldType
     */
    static validateInstallmentFields(e: Event, fieldType: string): void;
    /**
     * validateCurrencyConversionFields
     *
     * Validates a target element"s value based on the
     * availability of use currency conversion.
     *
     * @param e
     * @param fieldType
     */
    static validateCurrencyConversionFields(e: Event, fieldType: string): void;
    /**
     * currencyConversionFieldsValidatedEvent
     *
     * Post an event when an installment related card field is validated
     *
     * @param e
     * @param fieldType
     */
    static currencyConversionFieldsValidatedEvent(e: Event, fieldType: string): void;
    /**
     * hideCurrencyConversionField
     *
     * Hides the currency conversion field component.
     *
     * @param e
     * @param fieldType
     */
    static hideCurrencyConversionField(e: Event, fieldType: string): void;
    /**
     * postInstallmentFieldValidatedEvent
     *
     * Post an event when an installment related card field is validated
     *
     * @param e
     */
    static postInstallmentFieldValidatedEvent(e: Event): void;
    /**
     * attachNumberEvents
     *
     * @param selector
     */
    static attachNumberEvents(selector: string): void;
    /**
     * attachExpirationEvents
     *
     * @param selector
     */
    static attachExpirationEvents(selector: string): void;
    /**
     * attachCvvEvents
     *
     * @param selector
     */
    static attachCvvEvents(selector: string): void;
    /**
     * attachCardHolderNameEvents
     *
     * @param selector
     */
    static attachCardHolderNameEvents(selector: string, field: string): void;
    /**
     * attachEmailEvents
     *
     * @param selector
     */
    static attachEmailEvents(selector: string): void;
    /**
     * attachPhoneEvents
     *
     * @param selector
     */
    static attachPhoneEvents(selector: string): void;
    /**
     * attachPostalCodeEvents
     *
     * @param selector
     */
    static attachPostalCodeEvents(selector: string, field: string): void;
    static attachAddressEvents(selector: string, field: string): void;
    /**
     * attachCountryEvents
     *
     * @param selector
     */
    static attachCountryEvents(selector: string, field: string): void;
    private static handleHostedFieldValidation;
    private static focusOutHostedFieldValidationHandler;
    private static focusInHostedFieldValidationHandler;
    private static getFieldEventData;
    private static getCardType;
    static validateToEnable(eventData: Event, isValid: boolean, fieldName: string): void;
}
