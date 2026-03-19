import { IQRCodePaymentsConfiguration } from "../apm/qr-code-payments/contracts";
import { IDictionary } from "../internal/lib/util";
import { IApmConfiguration } from "../apm/non-card-payments/contracts";
/**
 * Defines expected configuration properties for using the
 * library with the supported gateway implementations.
 */
export interface IConfiguration extends IDictionary {
    enableAutocomplete?: boolean;
    language?: string;
    enableTwoDigitExpirationYear?: boolean;
    enableCardFingerPrinting?: boolean;
    requireCardHolderName?: boolean;
    publicApiKey?: string;
    binCheck?: {
        hsaFsa?: boolean;
        surcharge?: boolean;
    };
    merchantId?: string;
    merchantManagementAccountId?: string;
    account?: string;
    hash?: (data: IDictionary) => Promise<IDictionary>;
    customerExists?: boolean;
    customerReference?: string;
    validateOnly?: boolean;
    env?: string;
    serviceURL?: string;
    allowedCardTypes?: string[];
    useNetworkToken?: boolean;
    disablePayButton?: boolean;
    apms?: {
        allowedCardNetworks?: string[];
        nonCardPayments?: IApmConfiguration;
        countryCode?: string;
        currencyCode?: string;
        acquirer?: string;
        applePay?: {
            allowedAuthMethods?: string[];
            allowedCardNetworks?: string[];
            applePayVersionNumber?: number;
            buttonLocale?: string;
            buttonStyle?: string;
            buttonType?: string;
            countryCode?: string;
            currencyCode?: string;
            globalPaymentsClientID?: string;
            merchantCapabilities?: string[];
            merchantIdentifier?: string;
            merchantName?: string;
            merchantSessionUrl?: string;
            validateMerchantHeaders?: object;
        };
        clickToPay?: {
            allowedCardNetworks?: string[];
            canadianDebit?: boolean;
            ctpClientId: string;
            currencyCode?: string;
            subtotal: number;
            wrapper?: boolean;
            buttonless: boolean;
        };
        googlePay?: {
            allowedAuthMethods?: string[];
            allowedCardNetworks?: string[];
            buttonColor?: string;
            buttonLocale?: string;
            buttonSizeMode?: string;
            buttonType?: string;
            countryCode?: string;
            currencyCode?: string;
            globalPaymentsClientID?: string;
            merchantId?: string;
            merchantName?: string;
        };
        qrCodePayments?: IQRCodePaymentsConfiguration;
    };
    webApiKey?: string;
    deviceId?: string;
    manifest?: string;
    tsepHost?: string;
    merchantName?: string;
    accessToken?: string;
    accountName?: string;
    apiVersion?: string;
    reference?: string;
    installments?: {
        channel: string;
        country: string;
        mcc: string;
        currency: string;
        accountID?: string;
        accountName?: string;
    };
    currencyConversion?: {
        accountName: string;
        enabled: boolean;
        channel: string;
        country: string;
        currency: string;
        transactionType?: string;
    };
    fieldValidation?: {
        enabled?: boolean;
        characterValidation?: string;
    };
    orderInformation?: {
        enabled?: boolean;
        merchantName: string;
        orderTotalAmount: string;
        orderReference: string;
        currencyCode: string;
    };
    expressPay?: {
        enabled: boolean;
        paymentUri: string;
        cancelUri: string;
        isShippingRequired?: boolean;
        payButtonLabel?: string;
    };
    dataResidency?: string;
}
declare const _default: (options: IConfiguration) => void;
/**
 * Allows integrators to configure the library with their
 * desired merchant account configuration and any global
 * library flags.
 */
export default _default;
