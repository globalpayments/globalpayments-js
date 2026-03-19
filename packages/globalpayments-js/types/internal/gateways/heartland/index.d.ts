import { IActions } from "..";
export declare const supports: {
    apm: {
        applePay: boolean;
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
    tokenization: (prod: boolean) => string;
};
export declare const actions: IActions;
export declare const requiredSettings: string[];
export declare const getEnv: () => "local" | "production" | "sandbox";
