import { IActions } from "..";
export declare const supports: {
    tokenization: {
        cardNotPresent: boolean;
        eCheck: boolean;
    };
};
export declare const urls: {
    tokenization: (prod: boolean) => string;
};
export declare const actions: IActions;
export declare const requiredSettings: string[];
export declare const getEnv: () => string;
