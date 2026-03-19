import { IActions } from "..";
import getEnv from "./get-env";
export declare const supports: {
    apm: {
        applePay: boolean;
        googlePay: boolean;
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
};
export declare const actions: IActions;
export declare const requiredSettings: string[];
export { getEnv };
