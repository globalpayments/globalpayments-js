export interface IBankData {
    // TODO (Bank Selection): Add the rest of the needed bank props
    countryCode:string;
    currencyCode:string;
    availableBanks:IAvailableBankData[];
    allowedAquirers?:string[]
}

export interface IAvailableBankData {
    name: string;
    displayName: string;
    imageName: string;
    acquirer: string[];
}

export enum BankDisplayNames {
    Pkobankpolskisa = "PKO BP",
    Santander = "Santander",
    Ing = "ING Bank Śląski",
    Bankpekaosa = "PEKAO SA",
    QRPlatba = "QR Platba",
    Slovenská = "Slovenská sporiteľňa",
    Mbank = "mBank",
    Alior = "Alior Bank",
    BNP = "BNP Paribas",
    Millenium = "Millenium",
    Credit = "Credit Agricole",
    Citi = "Citi Handlowy",
    Inteligo = "Inteligo",
    Banki="Banki Spółdzielcze",
    BOŚ="BOŚ Bank",
    Nest="Nest Bank",
    VeloBank = "VeloBank",
    Nowy = "Bank Nowy S.A.",
    Plus = "PLUS BANK",
    Pocztowy = "Bank Pocztowy",
    Česká = "Česká spořitelna",
    ČSOB = "ČSOB",
    Komerční = "Komerční banka",
    Raiffesenbank = "Raiffesenbank",
    Fio = "Fio banka",
    MONETA = "MONETA Money Bank",
    AirBank = "AirBank",
    Tatra = "Tatra banka",
    VÚB = "VÚB banka",
    UniCredit = "UniCredit Bank",
    postacz = "Česká Pošta",
    unicredit = "UniCredit",
    creditasbanka = "Banka Creditas",
    jtbanka = "J&T Banka",
    bank365 = "365.bank",
    viamo = "Viamo"
    // TODO (Bank Selection): Add the rest of the Bank Display Names
};

export enum CountryCurrencies {
    Poland = "PLN",
    CzechRepublic = "CZK",
    Slovakia = "EUR"
}

export enum BankCountries {
    Poland = "PL",
    CzechRepublic = "CZ",
    Slovakia = "SK",
    UK = "GB"
    // TODO (Bank Selection): Add the rest of the Bank Locations
};

export enum BankAquirers {
    Eservice = "eservice",
    Erstecz = "erstecz",
    Eservicecba = "eservicecba",
    Erste = "erste"
}
export interface IBankSelectionProps {
    countryCode: string;
    currencyCode: string;
}