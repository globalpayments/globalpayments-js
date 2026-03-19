export interface IBankData {
    countryCode: string;
    currencyCode: string;
    availableBanks: IAvailableBankData[];
    allowedAquirers?: string[];
}
export interface IAvailableBankData {
    name: string;
    displayName: string;
    imageName: string;
    acquirer: string[];
}
export declare enum BankDisplayNames {
    Pkobankpolskisa = "PKO BP",
    Santander = "Santander",
    Ing = "ING Bank \u015Al\u0105ski",
    Bankpekaosa = "PEKAO SA",
    QRPlatba = "QR Platba",
    Slovenská = "Slovensk\u00E1 sporite\u013E\u0148a",
    Mbank = "mBank",
    Alior = "Alior Bank",
    BNP = "BNP Paribas",
    Millenium = "Millenium",
    Credit = "Credit Agricole",
    Citi = "Citi Handlowy",
    Inteligo = "Inteligo",
    Banki = "Banki Sp\u00F3\u0142dzielcze",
    BOŚ = "BO\u015A Bank",
    Nest = "Nest Bank",
    VeloBank = "VeloBank",
    Nowy = "Bank Nowy S.A.",
    Plus = "PLUS BANK",
    Pocztowy = "Bank Pocztowy",
    Česká = "\u010Cesk\u00E1 spo\u0159itelna",
    ČSOB = "\u010CSOB",
    Komerční = "Komer\u010Dn\u00ED banka",
    Raiffesenbank = "Raiffesenbank",
    Fio = "Fio banka",
    MONETA = "MONETA Money Bank",
    AirBank = "AirBank",
    Tatra = "Tatra banka",
    VÚB = "V\u00DAB banka",
    UniCredit = "UniCredit Bank",
    postacz = "\u010Cesk\u00E1 Po\u0161ta",
    unicredit = "UniCredit",
    creditasbanka = "Banka Creditas",
    jtbanka = "J&T Banka",
    bank365 = "365.bank",
    viamo = "Viamo"
}
export declare enum CountryCurrencies {
    Poland = "PLN",
    CzechRepublic = "CZK",
    Slovakia = "EUR"
}
export declare enum BankCountries {
    Poland = "PL",
    CzechRepublic = "CZ",
    Slovakia = "SK",
    UK = "GB"
}
export declare enum BankAquirers {
    Eservice = "eservice",
    Erstecz = "erstecz",
    Eservicecba = "eservicecba",
    Erste = "erste"
}
export interface IBankSelectionProps {
    countryCode: string;
    currencyCode: string;
}
