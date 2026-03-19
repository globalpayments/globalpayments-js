import { IActions } from "..";
import getEnv from "./get-env";
export declare const supports: {
    apm: {
        applePay: boolean;
        clickToPay: boolean;
        googlePay: boolean;
    };
    binCheck: {
        hsaFsa: boolean;
        surcharge: boolean;
    };
    consumerAuthentication: boolean;
    tokenization: {
        cardNotPresent: boolean;
        cardPresent: boolean;
        eCheck: boolean;
        gift: boolean;
    };
};
export declare const urls: {
    assetBaseUrl: (result: string) => string;
    tokenization: (prod: boolean) => string;
    queryInstallmentPlans: (prod: boolean) => string;
    queryCurrencyConversionUrl: () => string;
    getQRCodePaymentMethodsUrl: () => string;
};
export declare const actions: IActions;
export declare const requiredSettings: string[];
export { getEnv };
