import { IThemePreset } from "./base/contracts";
declare const fieldStyles: (assetBaseUrl: string) => {};
declare const parentStyles: (assetBaseUrl: string) => {};
export declare const getThemeStyles: (assetBaseUrl: string) => {
    fieldStyles: object;
    parentStyles: object;
};
export declare const getThemePreset: () => IThemePreset;
export {};
