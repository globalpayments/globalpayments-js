/**
 * InstallmentTermFees class model.
 */
export default class InstallmentTermsAndConditions {
    url: string;
    description: string;
    version: string;
    language: string;
    constructor(_url: string, _description: string, _version: string, _language: string);
}
export declare function installmentTermFeesMapper(origin: {
    url: string;
    description: string;
    version: string;
    language: string;
}): InstallmentTermsAndConditions;
