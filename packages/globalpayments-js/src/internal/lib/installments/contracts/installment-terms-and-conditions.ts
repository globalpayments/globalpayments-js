/**
 * InstallmentTermFees class model.
 */
export default class InstallmentTermsAndConditions {
    public url: string;
    public description: string;
    public version: string;
    public language: string;

    constructor(
        _url: string,
        _description: string,
        _version: string,
        _language: string
    ) {
        this.url = _url;
        this.description = _description;
        this.version = _version;
        this.language = _language;
    }
}

export function installmentTermFeesMapper(origin: {
    url: string,
    description: string,
    version: string,
    language: string
}): InstallmentTermsAndConditions {
    return {
        url: origin.url,
        description: origin.description,
        version: origin.version,
        language: origin.language
    };
}