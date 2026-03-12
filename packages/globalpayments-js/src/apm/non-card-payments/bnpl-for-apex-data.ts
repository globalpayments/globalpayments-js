import { BnplCountries } from "../enums";

// Affirm: US
// Klarna: AU, NZ, EU, NO, CH, UK, US, CA
// Sezzle: AU, HK, IN, NZ, EU, IL, UK, BZ, MX, CA, US
// ZIP: US

export const countryListForAffirm:string[] = [BnplCountries.US];

export const countryListForKlarna:string[] = [
    BnplCountries.AU,
    BnplCountries.NZ,
    BnplCountries.EU,
    BnplCountries.NO,
    BnplCountries.CH,
    BnplCountries.UK,
    BnplCountries.US,
    BnplCountries.CA
];

export const countryListForSezzle:string[] = [
    BnplCountries.AU,
    BnplCountries.HK,
    BnplCountries.IN,
    BnplCountries.NZ,
    BnplCountries.EU,
    BnplCountries.IL,
    BnplCountries.UK,
    BnplCountries.BZ,
    BnplCountries.MX,
    BnplCountries.CA,
    BnplCountries.US
];

export const countryListForZip:string[] = [BnplCountries.US];